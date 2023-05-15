import { useRouter } from "next/router";
import MeetUpDetail from "@/components/meetups/MeetupDetail";
import { meetups } from "@/data/meetups";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

function MeetUpDetails({ meetUpDetails }) {
  return (
    <>
      <Head>
        <title>{meetUpDetails.title}</title>
        <meta name="description" content={meetUpDetails.description} />
      </Head>
      <MeetUpDetail meetUpDetails={meetUpDetails} />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://sudhijohn:Ed55o1qo4Xaba1R0@cluster0.ebshz.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();
  return {
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const {
    params: { meetupId },
  } = context;

  const client = await MongoClient.connect(
    "mongodb+srv://sudhijohn:Ed55o1qo4Xaba1R0@cluster0.ebshz.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  console.log("meetupsCollection", meetupsCollection);

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  console.log("selectedMeetup", selectedMeetup);

  const {
    _id,
    data: { title, image, description, address },
  } = selectedMeetup;

  client.close();

  return {
    props: {
      meetUpDetails: { id: _id.toString(), title, image, description, address },
    },
  };
}

// export async function getServerSideProps(context) {
//   const {
//     params: { meetupId },
//   } = context;
//   const meetUpDetails = meetups.find((meetup) => meetup.id === meetupId);
//   return {
//     props: {
//       meetUpDetails,
//     },
//   };
// }

export default MeetUpDetails;
