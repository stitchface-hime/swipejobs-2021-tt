import React, { useContext } from "react";
import { UserContext } from "src/App";
import { IJobItem } from "src/interfaces";
import { acceptJob, rejectJob } from "src/scripts/callWorkerApi";

import styles from "./JobsItem.module.scss";

type Props = {
  job: IJobItem;
};

export default function JobsItem({ job }: Props) {
  const userId = useContext(UserContext);

  const handleAcceptJob = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await acceptJob(userId, "");
    } catch (err) {
      console.error("Failed to accept job.");
    }
  };

  const handleRejectJob = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await rejectJob(userId, "");
    } catch (err) {
      console.error("Failed to accept job.");
    }
  };

  return (
    <div className={styles.jobItem}>
      <div className={styles.header}></div>
      <div className={styles.location}></div>
      <div className={styles.requirements}></div>
      <div className={styles.reportTo}></div>
      <div className={styles.buttonSpace}>
        <button className="button-neutral-outline" onClick={handleRejectJob}>
          No, Thanks
        </button>
        <button className="button-neutral" onClick={handleAcceptJob}>
          I&apos;ll Take It
        </button>
      </div>
    </div>
  );
}
