import { Document } from "mongoose";
import { vtData } from "./vtData";
import { WhoisData } from "./WhoisData";

export const domainStatus = {
    onAnalysis: 'onAnalysis',
    done: 'done',
    error: 'error'
}

export interface DomainData extends Document{
    domain: string,
    status: string,
    VTData?: vtData,
    WhoisData?: WhoisData,
    createdAt?: Date,
    updatedAt?: Date,
}