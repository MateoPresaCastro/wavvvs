import mongoose from 'mongoose';

export default async function connect() {
  try {
    const options = {
      serverSelectionTimeoutMS: 4000, // Keep trying to send operations for 4 seconds
    };
    mongoose.set('strictQuery', true);
    await mongoose.connect('mongodb://127.0.0.1:27017/wavvvs', options);
    console.log('Connected to the DB');
  } catch (error) {
    console.log('Error connecting to DB');
    let msg = ''
    if(error instanceof Error) msg = error.message
    throw new Error(msg);
    // console.log({ error });
  }
}
