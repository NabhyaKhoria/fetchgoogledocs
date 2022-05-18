import styles from "./LandingPage.module.css";


const LandingPage = () => {
    return (
    <div>
      <video
        className={styles["video"]}
        src="./media/introHD.mp4"
        alt=""
        autoPlay
        loop
      />
    </div>
  );
};

export default LandingPage;
