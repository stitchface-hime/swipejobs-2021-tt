import React, { createContext } from "react";
import { IWorkerProfile } from "src/interfaces";

type Action = { type: string; payload?: IWorkerProfile };
type Dispatch = (action: Action) => void;

const userId = "7f90df6e-b832-44e2-b624-3143d428001f";

const initialWorker: IWorkerProfile = {
  email: "",
  firstName: "",
  lastName: "",
  maxJobDistance: -1,
  phoneNumber: "",
  workerId: userId,
};

const WorkerContext =
  createContext<{ state: IWorkerProfile; dispatch: Dispatch } | undefined>(
    undefined
  );

function workerReducer(state: IWorkerProfile, action: Action) {
  switch (action.type) {
    case "update": {
      if (action.payload) {
        return {
          ...action.payload,
        };
      } else {
        return state;
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function WorkerProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(workerReducer, initialWorker);

  const value = { state, dispatch };
  return (
    <WorkerContext.Provider value={value}>{children}</WorkerContext.Provider>
  );
}

function useWorker() {
  const context = React.useContext(WorkerContext);
  if (context === undefined) {
    throw new Error("useWorker must be used within a WorkerProvider");
  }
  return context;
}

export { WorkerProvider, useWorker };
