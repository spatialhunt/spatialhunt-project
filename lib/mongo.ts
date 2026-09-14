import mongoose from 'mongoose';

const globalForMongoose = global as unknown as { mongooseConn: Promise<typeof mongoose> };

export function connectMongo() {
  if (!globalForMongoose.mongooseConn) {
    globalForMongoose.mongooseConn = mongoose.connect(process.env.MONGO_URI!);
  }
  return globalForMongoose.mongooseConn;
}