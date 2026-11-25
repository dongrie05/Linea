import { readFile } from "node:fs/promises";
import postgres from "postgres";

const databaseUrl = process.env.DEMO_DATABASE_URL;
if (!databaseUrl) {
  throw new Error("Define DEMO_DATABASE_URL antes de continuar.");
}
const sql = postgres(databaseUrl, { max: 1, prepare: false });
try {
  await sql.unsafe(
    await readFile(new URL("./schema.sql", import.meta.url), "utf8")
  );
  console.log("Tabela da demonstração pronta.");
} finally {
  await sql.end();
}
