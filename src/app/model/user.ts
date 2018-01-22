import { Timeline } from './timeline';

export class User {
    id: number;
    name: string;
    email: string;
    dob: Date;
    status: number;
    createdOn: Date;
    agentCode: string;
    assetCount: number;
    accountCount: number;
    plan: string;
    phone: string;
    gender: string;
    professionId: number;
    salaryBracket: number;
    deviceId: number;
    deviceName: string;
    profilePic: string;

    listOfTimeline: Timeline[] = [];
}
