import React, { useEffect } from "react";

import { fetchWorkerProfile } from "src/scripts/callWorkerApi";
import { useWorker } from "src/scripts/WorkerProvider";

import styles from "./TopBar.module.scss";

export default function TopBar() {
  const worker = useWorker();
  const workerId = worker.state.workerId;
  const dispatch = worker.dispatch;

  useEffect(() => {
    async function initialFetch() {
      try {
        const res = await fetchWorkerProfile(workerId);
        const data = await res.json();
        dispatch({ type: "update", payload: data });
      } catch (err) {
        console.error("Failed to fetch worker info.");
      }
    }
    initialFetch();
  }, [workerId, dispatch]);

  return (
    <div className={styles.topBar}>
      <div className={styles.topBarContents}>
        <h1>swipejobs</h1>
        <div>
          <span>
            {worker.state.firstName} {worker.state.lastName}
          </span>
        </div>
      </div>
    </div>
  );
}
