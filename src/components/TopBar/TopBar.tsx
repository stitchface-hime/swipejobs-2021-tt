import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "src/App";
import { fetchWorkerProfile } from "src/scripts/callWorkerApi";

import styles from "./TopBar.module.scss";

export default function TopBar() {
  const userId = useContext(UserContext);
  const [workerInfo, setWorkerInfo] = useState({});

  /*useEffect(() => {
    async function initialFetch() {
      try {
        const res = await fetchWorkerProfile(userId);
        setWorkerInfo(res);
      } catch (err) {
        console.error("Failed to fetch worker info.");
      }
    }
    initialFetch();
  }, [userId]);*/

  return (
    <div className={styles.topBar}>
      <div className={styles.topBarContents}>
        <h1>swipejobs</h1>
        <div>
          <span>{userId}</span>
        </div>
      </div>
    </div>
  );
}
