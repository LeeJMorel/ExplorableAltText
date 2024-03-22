/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import styles from "./Pages.module.scss";

function HomeDetail() {
  const { faqId } = useParams();

  // Logic for rendering individual home FAQ details goes here
  return (
    <div className={styles.homeDetail}>
      <h2>FAQ Detail for ID: {faqId}</h2>
    </div>
  );
}

export default HomeDetail;
