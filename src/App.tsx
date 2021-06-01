import React from "react";
import { WorkerProvider } from "src/scripts/WorkerProvider";

import JobsList from "./components/JobsList";
import TopBar from "./components/TopBar/TopBar";

import "./styles/styles.scss";

export default function App() {
  return (
    <WorkerProvider>
      <TopBar />
      <JobsList />
    </WorkerProvider>
  );
}
