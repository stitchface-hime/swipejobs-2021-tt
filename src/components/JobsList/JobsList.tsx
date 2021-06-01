import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "src/App";
import { fetchWorkerMatches } from "src/scripts/callWorkerApi";

import JobsItem from "./JobsItem";

export default function JobsList() {
  const userId = useContext(UserContext);
  const [workerMatches, setWorkerMatches] = useState({});

  /*useEffect(() => {
    async function initialFetch() {
      try {
        const res = await fetchWorkerMatches(userId);
        setWorkerMatches(res);
      } catch (err) {
        console.error("Failed to fetch worker info.");
      }
    }
    initialFetch();
  }, [userId]);*/

  return (
    <div>
      <JobsItem job={{}} />
    </div>
  );
}
