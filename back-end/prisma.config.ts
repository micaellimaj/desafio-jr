import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error("ERRO: A variável DATABASE_URL não foi encontrada no arquivo .env");
}

export default defineConfig({
  datasource: {
    url: dbUrl,
  },
});