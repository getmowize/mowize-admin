import { ChannelPartnerDocument } from './channelPartnerDocument';

export class ChannelPartner {
    id: number;
    agent_id: string;
    name: string;
    email: string;
    phone: string;
    createdOn: Date;
    above25: number;
    below25: number;
    code: number;
    annualUsers: number;
    termUsers: number;
    earning: number;

    //extra data
    address: string;
    bankId: number;
    bankName: string;
    accountNumber: string;
    branchAddress: string;
    ifscCode: string;
    profilePic: string;
    status: number;
    annualPromoCode: string;
    termPromoCode: string;
    layer1: number;
    layer2: number;
    layer3: number;
    layer4: number;

    listOfDocuments: ChannelPartnerDocument[] = [];
}
