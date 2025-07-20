import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export const api = {
  async sendMessage(tipo_consulta: string) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/web-consult`,
        { tipo_consulta },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw error;
    }
  },
};
