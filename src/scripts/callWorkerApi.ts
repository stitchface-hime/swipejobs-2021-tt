import callApi from "./callApi";

function fetchWorkerProfile(workerId: string) {
  try {
    return callApi(`worker/${workerId}/profile`);
  } catch (err) {
    throw err;
  }
}

function fetchWorkerMatches(workerId: string) {
  try {
    return callApi(`worker/${workerId}/matches`);
  } catch (err) {
    throw err;
  }
}

function acceptJob(workerId: string, jobId: string) {
  try {
    return callApi(`worker/${workerId}/job/${jobId}/accept`);
  } catch (err) {
    throw err;
  }
}

function rejectJob(workerId: string, jobId: string) {
  try {
    return callApi(`worker/${workerId}/job/${jobId}/reject`);
  } catch (err) {
    throw err;
  }
}

export { fetchWorkerProfile, fetchWorkerMatches, acceptJob, rejectJob };
