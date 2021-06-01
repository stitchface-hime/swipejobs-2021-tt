interface IWorkerProfile {
  email: string;
  firstName: string;
  lastName: string;
  maxJobDistance: number;
  phoneNumber: string;
  workerId: string;
}

interface IReportTo {
  name: string;
  phone?: string;
}

interface IAddress {
  formattedAddress: string;
  zoneId: string;
}

interface ICompany {
  address: IAddress;
  name: string;
  reportTo: IReportTo;
}

interface IJobTitle {
  name: string;
  imageUrl: string;
}

interface IShift {
  startDate: string;
  endDate: string;
}

interface IJobItem {
  branch: string;
  branchPhoneNumber: string;
  company: ICompany;
  jobId: string;
  jobTitle: IJobTitle;
  milesToTravel: number;
  requirements?: string[];
  shifts: IShift[];
  wagePerHourInCents: number;
}
interface IAcceptJobResponse {
  success: boolean;
  message?: string;
  errorCode?: string;
}

interface IRejectJobResponse extends IAcceptJobResponse {}

export type {
  IWorkerProfile,
  IJobItem,
  IAcceptJobResponse,
  IRejectJobResponse,
};
