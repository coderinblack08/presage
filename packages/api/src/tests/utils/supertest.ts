import { Express } from "express";
import request from "supertest";
import { testUser } from "./createTestUser";

export const supertest = {
  post: (app: Express, url: string, data?: string | object | undefined) => {
    return request(app)
      .post(url)
      .set("Cookie", testUser.user ? [`jid=${testUser.accessToken}`] : [])
      .send(data);
  },
};
