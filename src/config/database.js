import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import "dotenv/config";
export class VectorStoreManager {
  constructor() {
    this.embeddings = new OpenAIEmbeddings({
      model: "text-embedding-3-large",
    });
    this.vectorStore = null;
  }

  async initialize() {
    try {
      this.vectorStore = new QdrantVectorStore(this.embeddings, {
        url: process.env.QDRANT_URL || "http://localhost:6333",
        collectionName: process.env.QDRANT_COLLECTION_NAME || "rag-collection",
      });
      console.log("Vector store initialized");
      return this.vectorStore;
    } catch (error) {
      console.error("Error initializing vector store:", error);
      throw error;
    }
  }

  getVectorStore() {
    return this.vectorStore;
  }

  async addDocuments(docs) {
    if (!this.vectorStore) {
      await this.initialize();
    }
    return await this.vectorStore.addDocuments(docs);
  }

  async similaritySearch(query, k = 3) {
    if (!this.vectorStore) {
      throw new Error("Vector store not initialized");
    }
    return await this.vectorStore.similaritySearch(query, k);
  }
}
