import type { Ad } from "../types/ad";

export class ApiService {
  private apiHost = `${import.meta.env.VITE_API_URL}/items`;

  private async handleResponse(response: Response) {
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Request failed");
    }
    if (response.status === 204) return; // При успешном DELETE
    return response.json();
  }

  async getAds(): Promise<Ad[]> {
    const response = await fetch(this.apiHost);
    return this.handleResponse(response);
  }

  async getAdById(id: number): Promise<Ad | never> {
    const response = await fetch(`${this.apiHost}/${id}`);
    return this.handleResponse(response);
  }

  async createAd(ad: Ad): Promise<Ad> {
    const response = await fetch(this.apiHost, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ad),
    });

    return this.handleResponse(response);
  }

  async updateAdById(id: number, ad: Ad): Promise<Ad | never> {
    const response = await fetch(`${this.apiHost}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ad),
    });

    return this.handleResponse(response);
  }

  async deleteAdById(id: number): Promise<Ad | never> {
    const response = await fetch(`${this.apiHost}/${id}`, {
      method: "DELETE",
    });

    return this.handleResponse(response);
  }
}
