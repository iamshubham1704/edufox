import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) throw new Error('Please define MONGODB_URI in .env.local');

let cached = global.mongoose || { conn: null, promise: null };

if (!cached.promise) {
  cached.promise = mongoose.connect(MONGODB_URI, {
    bufferCommands: false,
  });
}

cached.conn = cached.conn || await cached.promise;

export default async function connectToDB() {
  return cached.conn;
}
