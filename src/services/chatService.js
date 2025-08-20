import { ChatOpenAI } from "@langchain/openai";

export class ChatService {
  constructor(vectorStoreManager) {
    this.vectorStoreManager = vectorStoreManager;
    this.llm = new ChatOpenAI({
      model: "gpt-4o-mini",
    });
  }

  async processQuestion(question) {
    // Map each casual talk pattern to a prompt for the AI to generate a reply
    const casualTalkMap = [
      {
        pattern: /how are you/i,
        prompt: "Reply to 'How are you?' in a friendly, conversational way.",
      },
      {
        pattern: /what's up/i,
        prompt: "Reply to 'What's up?' in a casual, conversational way.",
      },
      { pattern: /hello|hi|hey/i, prompt: "Greet the user in a friendly way." },
      {
        pattern: /who are you/i,
        prompt:
          "Briefly introduce yourself as an AI assistant named Mecha Kissu.",
      },
      {
        pattern: /your name/i,
        prompt: "Tell the user your name is Mecha Kissu, the AI assistant.",
      },
      { pattern: /thank(s| you)/i, prompt: "Reply to thanks in a polite way." },
      {
        pattern: /good morning/i,
        prompt: "Wish the user a good morning in a friendly way.",
      },
      {
        pattern: /good afternoon/i,
        prompt: "Wish the user a good afternoon in a friendly way.",
      },
      {
        pattern: /good evening/i,
        prompt: "Wish the user a good evening in a friendly way.",
      },
      {
        pattern: /good night/i,
        prompt: "Wish the user a good night in a friendly way.",
      },
      {
        pattern: /bye|goodbye|see you/i,
        prompt: "Say goodbye to the user in a friendly way.",
      },
      {
        pattern: /tell me a joke/i,
        prompt: "Tell a short, friendly computer-related joke.",
      },
      {
        pattern: /how old are you/i,
        prompt: "Reply to 'How old are you?' as an AI assistant.",
      },
    ];
    for (const { pattern, prompt } of casualTalkMap) {
      if (pattern.test(question)) {
        const response = await this.llm.invoke(prompt);
        return { answer: response.content.trim(), sources: 0 };
      }
    }

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
