import client from "../api/client";

class AlertsService {
  async getAlerts() {
    const { data } = await client.get("/alerts");
    return data;
  }

  async getAlert(id: number) {
    const { data } = await client.get(`/alerts/${id}`);
    return data;
  }

  async updateAlert(
    id: number,
    payload: any
  ) {
    const { data } = await client.put(
      `/alerts/${id}`,
      payload
    );

    return data;
  }

  async deleteAlert(id: number) {
    const { data } = await client.delete(
      `/alerts/${id}`
    );

    return data;
  }
}

export default new AlertsService();