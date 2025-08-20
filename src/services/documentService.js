import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export class DocumentService {
  constructor(vectorStoreManager) {
    this.vectorStoreManager = vectorStoreManager;
    this.textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
  }

  async processPDF(filePath) {
    const loader = new PDFLoader(filePath);
    const docs = await loader.load();
    const splitDocs = await this.textSplitter.splitDocuments(docs);
    return splitDocs;
  }

  async processWebsite(url) {
    try {
      const loader = new CheerioWebBaseLoader(url, {
        selector: "body",
      });
      const docs = await loader.load();
      const splitDocs = await this.textSplitter.splitDocuments(docs);

      // Add URL metadata
      splitDocs.forEach((doc) => {
        doc.metadata.source = url;
        doc.metadata.type = "website";
      });

      return splitDocs;
    } catch (error) {
      console.error("Error processing website:", error);
      throw new Error(`Failed to load website: ${error.message}`);
    }
  }

  async processText(text) {
    const docs = [
      {
        pageContent: text,
        metadata: { source: "text-input", type: "text" },
      },
    ];
    const splitDocs = await this.textSplitter.splitDocuments(docs);
    return splitDocs;
  }

  async indexDocuments(docs) {
    return await this.vectorStoreManager.addDocuments(docs);
  }
}
