import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE_URL || "";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the DATABASE_URL environment variable inside .env"
  );
}

// Extend the global object in TypeScript to allow mongoose caching
declare global {
  // Use `var` instead of `let` for global scope augmentation in Node
  var mongooseCache:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

// Use `globalThis` for cross-platform safety
const globalWithMongoose = globalThis as typeof globalThis & {
  mongooseCache?: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

if (!globalWithMongoose.mongooseCache) {
  globalWithMongoose.mongooseCache = {
    conn: null,
    promise: null,
  };
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (globalWithMongoose.mongooseCache!.conn) {
    return globalWithMongoose.mongooseCache!.conn;
  }

  if (!globalWithMongoose.mongooseCache!.promise) {
    globalWithMongoose.mongooseCache!.promise = mongoose.connect(MONGODB_URI);
  }

  globalWithMongoose.mongooseCache!.conn =
    await globalWithMongoose.mongooseCache!.promise;
  return globalWithMongoose.mongooseCache!.conn;
}
