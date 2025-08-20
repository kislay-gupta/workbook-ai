import { ChatOpenAI } from "@langchain/openai";

export class ChatService {
  constructor(vectorStoreManager) {
    this.vectorStoreManager = vectorStoreManager;
    this.llm = new ChatOpenAI({
      model: "gpt-4o-mini",
    });
  }

  async processQuestion(question) {
    if (!this.vectorStoreManager.getVectorStore()) {
      throw new Error(
        "No data indexed yet. Please upload files, add text, or index a website first."
      );
    }

    // Retrieve relevant documents
    const relevantDocs = await this.vectorStoreManager.similaritySearch(
      question,
      3
    );

    if (relevantDocs.length === 0) {
      return {
        answer:
          "I couldn't find relevant information in the indexed data to answer your question.",
        sources: 0,
      };
    }

    // Create context from retrieved documents
    const context = relevantDocs.map((doc) => doc.pageContent).join("\n\n");

    // Generate answer using LLM
    const prompt = `Based on the following context, answer the question. If the answer is not in the context, say so.

Context:
${context}

Question: ${question}

Answer:`;

    const response = await this.llm.invoke(prompt);
    const answer = response.content;

    return {
      answer: answer.trim(),
      sources: relevantDocs.length,
      sourceTypes: [
        ...new Set(relevantDocs.map((doc) => doc.metadata.type || "unknown")),
      ],
    };
  }
}
