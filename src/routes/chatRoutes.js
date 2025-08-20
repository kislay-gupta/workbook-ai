import express from "express";

const router = express.Router();

export function createChatRoutes(chatService, vectorStoreManager) {
  // Chat endpoint
  router.post("/chat", async (req, res) => {
    try {
      const { question } = req.body;

      if (!question) {
        return res.status(400).json({ error: "No question provided" });
      }

      const result = await chatService.processQuestion(question);
      res.json(result);
    } catch (error) {
      console.error("Chat error:", error);
      res
        .status(500)
        .json({ error: error.message || "Failed to process question" });
    }
  });

  // Get collection info
  router.get("/status", async (req, res) => {
    try {
      if (!vectorStoreManager.getVectorStore()) {
        return res.json({ status: "No data indexed", documentsCount: 0 });
      }

      res.json({
        status: "Ready",
        message: "Vector store is initialized and ready for queries",
      });
    } catch (error) {
      console.error("Status error:", error);
      res.status(500).json({ error: "Failed to get status" });
    }
  });

  return router;
}
