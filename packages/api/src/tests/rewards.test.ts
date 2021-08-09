import { Express } from "express";
import { Server } from "http";
import { Connection, getConnection } from "typeorm";
import { Reward } from "../entities/Reward";
import { startServer } from "../startServer";
import { createTypeormConn } from "../typeorm";
import { testUser } from "./utils/createTestUser";
import { supertest } from "./utils/supertest";

let app: Express;
let server: Server;
let connection: Connection;

describe("Rewards Test Suite", () => {
  beforeAll(async () => {
    const response = await startServer();
    app = response.app;
    server = response.server;
    connection = getConnection();
    await testUser.create();
    await createTypeormConn();
  });

  beforeEach(async () => {
    await connection.dropDatabase();
  });

  afterAll(async () => {
    if (connection.isConnected) {
      await connection.close();
    }
    testUser.clear();
    server.close();
  });

  test("Create Reward Test", async (done) => {
    supertest
      .post(app, "/rewards", {
        name: "example",
        description: "lorem ipsum",
        type: "link",
        points: 1,
      } as Reward)
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err) => {
        if (err) {
          done(err);
        }
        done();
      });
  });
});
