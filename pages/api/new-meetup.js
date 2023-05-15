import { MongoClient } from "mongodb";

async function dataHandler(req, res) {
  if (req.method === "POST") {
    const { body: data } = req;
    console.log("API data", data);

    if (!data) {
      return;
    }

    const client = await MongoClient.connect(
      "mongodb+srv://sudhijohn:Ed55o1qo4Xaba1R0@cluster0.ebshz.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne({ data });
    console.log(result);

    client.close();
    res.status(201).json({ message: "Data inserted" });
  }
}

export default dataHandler;
