import { createConnection, getConnectionOptions } from "typeorm";

export const createTypeormConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  const conn = await createConnection({
    ...connectionOptions,
    name: "default",
  });
  await conn.runMigrations();
  return conn;
};
