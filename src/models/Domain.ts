

import { Schema, model } from "mongoose";
import { DomainData } from "../interfaces/domainData";

const DomainSchema = new Schema({
    domain: { type: String, required: true, unique: true },
    status: { type: String, required: true },
    VTData: {
        numberOfDetection: { type: Number },
        numberOfScanners: { type: Number },
        detectedEngines: { type: String },
        lastUpdated: { type: String },
    },
    WhoisData: {
        dateCreated: { type: String },
        ownerName: { type: String },
        expiredOn: { type: String },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
});

export default model<DomainData>("Domains", DomainSchema);
