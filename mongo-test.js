import { MongoClient, ServerApiVersion } from "mongodb";

const uri =
  "mongodb+srv://rajeshkumar1997rjs_db_user:9leGqDzRssKtlCci@cluster0.3gdvwsz.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ MongoDB Atlas connection SUCCESS");
  } catch (err) {
    console.error("❌ MongoDB Atlas connection FAILED");
    console.error(err);
  } finally {
    await client.close();
  }
}

run();
