import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { product } from "./schema";


const pool = new Pool({
  connectionString: "postgres://postgres:postgres@localhost:5432/onlinestore",
});

const db =  drizzle(pool, {
  schema: {
    product,
   
  },
});

export  { db };