import { Boats } from "./boats.interface";

export interface Crew {
  crewMemberId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  type: string;
  status: string;
  createdDate: string;
  lastModifiedDate: string;
  vessel: Boats;
}
