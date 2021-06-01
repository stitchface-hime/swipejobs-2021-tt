import React, { useState } from "react";
import classNames from "classnames";
import { useWorker } from "src/scripts/WorkerProvider";
import {
  IAcceptJobResponse,
  IJobItem,
  IRejectJobResponse,
} from "src/interfaces";
import { acceptJob, rejectJob } from "src/scripts/callWorkerApi";

import styles from "./JobsItem.module.scss";

type Props = {
  job: IJobItem;
};

export default function JobsItem({ job }: Props) {
  const worker = useWorker();
  const [response, setResponse] =
    useState<IAcceptJobResponse | IRejectJobResponse | undefined>(undefined);

  const [toggleMap, setToggleMap] = useState(false);

  const handleAcceptJob = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const res = await acceptJob(worker.state.workerId, job.jobId);
      const data = await res.json();
      if (data.success) data.message = "You've accepted the job!";
      setResponse(data);
    } catch (err) {
      console.error("Failed to contact api");
    }
  };

  const handleRejectJob = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const res = await rejectJob(worker.state.workerId, job.jobId);
      const data = await res.json();
      if (data.success) data.message = "You've rejected the job!";
      setResponse(data);
    } catch (err) {
      console.error("Failed to contact api");
    }
  };

  return (
    <div className={styles.jobItem}>
      <img alt={job.jobTitle.name} src={job.jobTitle.imageUrl} />

      <div className={styles.header}>
        <span className={styles.jobTitle}>{job.jobTitle.name}</span>
        <span className={styles.companyName}>{job.company.name}</span>
      </div>
      <div className={styles.travelPayContainer}>
        <div className={styles.travelPay}>
          <div className={styles.travel}>
            <span className={styles.smallLabel}>Distance</span>
            <span
              className={styles.travelPayInfo}
            >{`${job.milesToTravel.toFixed(1)} miles`}</span>
          </div>
          <div className={styles.pay}>
            <span className={styles.smallLabel}>Hourly Rate</span>
            <span className={styles.travelPayInfo}>{`$${(
              job.wagePerHourInCents / 100
            ).toFixed(2)}`}</span>
          </div>
        </div>
      </div>
      <div className={styles.shifts}>
        <span className="icon">date_range</span>
        <div className={styles.content}>
          <span className={styles.mediumLabel}>Shift Dates</span>
          <ul>
            {job.shifts.map((shift) => {
              const startDate = new Date(shift.startDate);
              const endDate = new Date(shift.endDate);
              const dateString = `${startDate.toLocaleString("en-US", {
                weekday: "short",
                day: "numeric",
                month: "short",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
                    -
                    ${endDate.toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })} PST`;
              // Assuming shift starts and ends on same day
              return (
                <li key={dateString}>
                  <span className={styles.details}>{dateString}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div
        className={classNames(styles.location, { [styles.mapOn]: toggleMap })}
        onClick={() => setToggleMap(true)}
      >
        <span className="icon">place</span>
        <div className={styles.content}>
          <span className={styles.mediumLabel}>Location</span>
          <span className={styles.details}>
            {job.company.address.formattedAddress}
          </span>
          <span className={styles.suppDetails}>
            {`${job.milesToTravel.toFixed(
              2
            )} miles from your job search location.`}
          </span>
          {toggleMap && (
            <div className={styles.map}>
              <span>Placeholder map</span>
            </div>
          )}
        </div>
        {!toggleMap && (
          <span className={classNames("icon", styles.navigate)}>
            navigate_next
          </span>
        )}
      </div>
      {job.requirements && (
        <div className={styles.requirements}>
          <span className="icon">construction</span>
          <div className={styles.content}>
            <span className={styles.mediumLabel}>Requirements</span>
            <ul>
              {job.requirements.map((requirement) => (
                <li key={requirement}>
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <div className={styles.reportTo}>
        <span className="icon">account_circle</span>
        <div className={styles.content}>
          <span className={styles.mediumLabel}>Report To</span>
          <span className={styles.details}>
            {`${job.company.reportTo.name}`}
            {job.company.reportTo.phone && ` ${job.company.reportTo.phone}`}
          </span>
        </div>
      </div>
      <div className={styles.acceptReject}>
        {!response && (
          <>
            <button
              className="button-neutral-outline"
              onClick={handleRejectJob}
            >
              No, Thanks
            </button>
            <button className="button-neutral" onClick={handleAcceptJob}>
              I&apos;ll Take It
            </button>
          </>
        )}
        {response && (
          <>
            {response.success && (
              <span className={styles.success}>{response.message}</span>
            )}
            {!response.success && (
              <span className={styles.failed}>
                {response.message} {`(Error Code: ${response.errorCode})`}
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}
