import { apiClient } from "@/config/axios";
import { AxiosError } from "axios";

export interface ChatRequest {
  question: string;
}

export interface ChatResponse {
  answer: string;
  sources?: number;
  sourceTypes?: string[];
}

export interface UploadResponse {
  message: string;
  documentsCount: number;
}

export interface IndexTextRequest {
  text: string;
}

export interface IndexTextResponse {
  message: string;
  chunksCount: number;
}

export interface IndexWebsiteRequest {
  url: string;
}

export interface IndexWebsiteResponse {
  message: string;
  url: string;
  chunksCount: number;
}

export interface StatusResponse {
  status: string;
  message?: string;
  documentsCount?: number;
}

class ChatService {
  async sendMessage(question: string): Promise<ChatResponse> {
    try {
      const response = await apiClient.post<ChatResponse>("/chat", {
        question,
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data?.error ||
            error.message ||
            "Failed to send message"
        );
      }
      throw new Error("An unexpected error occurred");
    }
  }

  async uploadFile(file: File): Promise<UploadResponse> {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await apiClient.post<UploadResponse>(
        "/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data?.error ||
            error.message ||
            "Failed to upload file"
        );
      }
      throw new Error("An unexpected error occurred");
    }
  }

  async indexText(text: string): Promise<IndexTextResponse> {
    try {
      const response = await apiClient.post<IndexTextResponse>("/index-text", {
        text,
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data?.error || error.message || "Failed to index text"
        );
      }
      throw new Error("An unexpected error occurred");
    }
  }

  async indexWebsite(url: string): Promise<IndexWebsiteResponse> {
    try {
      const response = await apiClient.post<IndexWebsiteResponse>(
        "/index-website",
        { url }
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data?.error ||
            error.message ||
            "Failed to index website"
        );
      }
      throw new Error("An unexpected error occurred");
    }
  }

  async getStatus(): Promise<StatusResponse> {
    try {
      const response = await apiClient.get<StatusResponse>("/status");
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data?.error || error.message || "Failed to get status"
        );
      }
      throw new Error("An unexpected error occurred");
    }
  }
}

export const chatService = new ChatService();
