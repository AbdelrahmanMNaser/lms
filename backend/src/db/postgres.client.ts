import { PrismaClient as PostgresClient } from '@/prisma/postgres/generated';

declare global {
  var postgres: PostgresClient | undefined;
}

export const pg = global.postgres || new PostgresClient();

if (process.env.NODE_ENV !== 'production') global.postgres = pg;

export { PostgresClient };
