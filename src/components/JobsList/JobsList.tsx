import React, { useEffect, useState } from "react";
import { useWorker } from "src/scripts/WorkerProvider";
import { fetchWorkerMatches } from "src/scripts/callWorkerApi";

import JobsItem from "./JobsItem";
import { IJobItem } from "src/interfaces";

import styles from "./JobsList.module.scss";

export default React.memo(function JobsList() {
  const worker = useWorker();
  const workerId = worker.state.workerId;
  const [workerMatches, setWorkerMatches] = useState<IJobItem[]>([]);

  useEffect(() => {
    async function initialFetch() {
      try {
        const res = await fetchWorkerMatches(workerId);
        const data = await res.json();
        setWorkerMatches(data);
      } catch (err) {
        console.error("Failed to fetch worker info.");
      }
    }
    initialFetch();
  }, [workerId]);

  return (
    <div className={styles.jobList}>
      {workerMatches.map((match) => (
        <JobsItem key={match.jobId} job={match} />
      ))}
    </div>
  );
});
