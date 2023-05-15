import Head from "next/head";
import MeetupList from "/components/meetups/MeetupList";
import { MongoClient } from "mongodb";
// import { meetups } from "@/data/meetups";

function HomePage({ meetups }) {
  return (
    <>
      <Head>
        <title>Next MeetUps</title>
        <meta name="descreiption" content="Browse Next JS Meetups" />
      </Head>
      <MeetupList meetups={meetups} />
    </>
  );
}

export async function getStaticProps() {
  //Fetch the data here

  const client = await MongoClient.connect(
    "mongodb+srv://sudhijohn:Ed55o1qo4Xaba1R0@cluster0.ebshz.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();
  console.log(meetups);

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.data.title,
        address: meetup.data.address,
        description: meetup.data.description,
        image: meetup.data.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

// export async function getServerSideProps(context) {
//   const { req, res } = context;
//   //Fetch the data here
//   return {
//     props: {
//       meetups,
//     },
//   };
// }

export default HomePage;
