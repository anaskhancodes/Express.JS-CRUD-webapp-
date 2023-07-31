import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://anaskhancodes:bhoolay406@cluster0.5hxp5de.mongodb.net/?retryWrites=true&w=majority";

export const client = new MongoClient(uri);


async function run() {
  try {
    await client.connect();
    console.log("Successfully connected to Atlas");
  } catch (err) {
    console.log(err.stack);
    await client.close();
    process.exit(1);
  }
}
run().catch(console.dir);

process.on('SIGINT', async function () {
  console.log("App is terminating");
  await client.close();
  process.exit(0);
})