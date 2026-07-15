import client from "../api/client";

class SIEMService {

  async getDashboard() {

    const response = await client.get(
      "/dashboard"
    );

    return response.data;

  }

  async getEvents() {

    const response = await client.get(
      "/events"
    );

    return response.data;

  }

}

export default new SIEMService();