import { join } from "path";
import { ConnectionOptions } from "typeorm";

const isTest = process.env.NODE_ENV === "test";

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "",
  database: isTest ? "presagedb-test" : "presagedb",
  synchronize: true,
  logging: !isTest,
  migrationsRun: true,
  entities: [join(__dirname, "**/**.entity{.ts,.js}")],
  migrations: [join(__dirname, "migrations/**/*.{ts,js}")],
  subscribers: [join(__dirname, "subscribers/**/*.{ts,js}")],
  cli: {
    migrationsDir: "src/migrations",
  },
};

export = connectionOptions;
