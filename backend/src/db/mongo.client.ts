import { PrismaClient as MongoClient } from '@/prisma/mongo/generated';

declare global {
  var mongo: MongoClient | undefined;
}

export const mg = global.mongo || new MongoClient();

if (process.env.NODE_ENV !== 'production') global.mongo = mg;

export { MongoClient };
