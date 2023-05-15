import styles from "./MeetupDetail.module.css";

function MeetupDetail({ meetUpDetails }) {
  return (
    <div className={styles["meetup-detail"]}>
      <img
        className="img"
        src={meetUpDetails.image}
        alt={meetUpDetails.title}
      />
      <h3>{meetUpDetails.title}</h3>
      <address>{meetUpDetails.address}</address>
      <p>{meetUpDetails.description}</p>
    </div>
  );
}

export default MeetupDetail;
