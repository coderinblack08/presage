import axios from "axios";

export const testUser = {
  user: null,
  accessToken: "",
  async create() {
    const request = await axios.post("/auth/test-user");
    this.accessToken = request.data.accessToken;

    const userRequest = await axios.get("/me", {
      headers: { cookie: `jid=${this.accessToken}` },
      withCredentials: true,
    });
    this.user = userRequest.data;
    return this;
  },
  async clear() {
    this.user = null;
    this.accessToken = "";
  },
};
