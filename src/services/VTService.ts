import { domainStatus } from "../interfaces/domainData";
import Domain from "../models/Domain";


// const vtUrl = 'https://www.virustotal.com/api/v3/urls';
// const apiKey = '371a68ae6cf27e0fa59b78b41d29399b94c18777d6d2fd6e1e6b250d7918ac14';

class VTService {

    async processAnalysis(domain: string): Promise<void> {


        console.log(`VTService is now processing analysis for domain: ${domain}`);

        console.log('Using Mock data');
        Domain.updateOne({ domain: domain }, {
            status: domainStatus.done, updatedAt: new Date(),
            VTData: {
                detectedEngines: "CLEAN MX",
                numberOfDetection: 1,
                numberOfScanners: 70,
                lastUpdated: "09.09.19"
            }
        });

        console.log(`VTService is done processing analysis for domain: ${domain}`);
    }
}

export default new VTService();