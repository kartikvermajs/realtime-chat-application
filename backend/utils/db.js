import mongoose from 'mongoose'

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Mongo uri not set");
  }

  try {
    await mongoose.connect(uri, { dbName: "chat" });
    console.log('MonogDB connected!')
  } catch (error) {
    console.error("MongoDB connection error", error);
    process.exit(1);
  }
};
