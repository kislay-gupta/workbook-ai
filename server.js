import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { VectorStoreManager } from "./src/config/database.js";
import { DocumentService } from "./src/services/documentService.js";
import { ChatService } from "./src/services/chatService.js";
import { createUploadRoutes } from "./src/routes/uploadRoutes.js";
import { createChatRoutes } from "./src/routes/chatRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("client/dist"));

// Initialize services
const vectorStoreManager = new VectorStoreManager();
const documentService = new DocumentService(vectorStoreManager);
const chatService = new ChatService(vectorStoreManager);

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "client", "dist", "index.html"));
});

// API Routes
app.use("/api", createUploadRoutes(documentService));
app.use("/api", createChatRoutes(chatService, vectorStoreManager));

// Serve React app for all non-API routes (client-side routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "client", "dist", "index.html"));
});

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  try {
    await vectorStoreManager.initialize();
    console.log("Application initialized successfully");
  } catch (error) {
    console.error("Failed to initialize application:", error);
  }
});
