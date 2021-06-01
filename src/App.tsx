import React, { createContext } from "react";

import JobsList from "./components/JobsList";
import TopBar from "./components/TopBar/TopBar";

import "./styles/styles.scss";

const userId = "7f90df6e-b832-44e2-b624-3143d428001f";
export const UserContext = createContext(userId);

export default function App() {
  return (
    <div>
      <UserContext.Provider value={userId}>
        {<TopBar />}
        {<JobsList />}
      </UserContext.Provider>
    </div>
  );
}
