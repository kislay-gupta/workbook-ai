import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "./uploads";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

export function createUploadRoutes(documentService) {
  // Upload and index file
  router.post("/upload", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const filePath = req.file.path;
      let docs = [];

      if (req.file.mimetype === "application/pdf") {
        docs = await documentService.processPDF(filePath);
      } else {
        return res
          .status(400)
          .json({ error: "Unsupported file type. Please upload PDF files." });
      }

      await documentService.indexDocuments(docs);

      // Clean up uploaded file
      fs.unlinkSync(filePath);

      res.json({
        message: "File uploaded and indexed successfully",
        documentsCount: docs.length,
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ error: "Failed to process file" });
    }
  });

  // Index text data
  router.post("/index-text", async (req, res) => {
    try {
      const { text } = req.body;

      if (!text) {
        return res.status(400).json({ error: "No text provided" });
      }

      const docs = await documentService.processText(text);
      await documentService.indexDocuments(docs);

      res.json({
        message: "Text indexed successfully",
        chunksCount: docs.length,
      });
    } catch (error) {
      console.error("Text indexing error:", error);
      res.status(500).json({ error: "Failed to index text" });
    }
  });

  // Index website data
  router.post("/index-website", async (req, res) => {
    try {
      const { url } = req.body;

      if (!url) {
        return res.status(400).json({ error: "No URL provided" });
      }

      // Basic URL validation
      try {
        new URL(url);
      } catch {
        return res.status(400).json({ error: "Invalid URL format" });
      }

      const docs = await documentService.processWebsite(url);
      await documentService.indexDocuments(docs);

      res.json({
        message: "Website indexed successfully",
        url: url,
        chunksCount: docs.length,
      });
    } catch (error) {
      console.error("Website indexing error:", error);
      res
        .status(500)
        .json({ error: error.message || "Failed to index website" });
    }
  });

  return router;
}
