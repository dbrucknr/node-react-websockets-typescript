import { DataSource } from "typeorm";

export const database = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  database: "messenger",
  synchronize: true,
  logging: false,
  entities: ["src/database/entities/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
});

export const initializeDatabaseConnection = async (
  fn: Function,
  ...args: any[]
) => {
  try {
    const connection = await database.initialize();
    if (connection) {
      console.log("Database connection established");
      fn(...args);
    }
  } catch (error) {
    console.error("Unable to initialize database connection", error);
  }
};
