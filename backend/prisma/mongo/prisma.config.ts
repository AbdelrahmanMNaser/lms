import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { defineConfig } from "prisma/config";

dotenvExpand.expand(dotenv.config());

export default defineConfig({
  schema: "./schema.prisma",
  datasource: {
    url: process.env.MONGODB_URL ?? "",
  },
});
