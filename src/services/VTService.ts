import { domainStatus } from "../interfaces/domainData";
import Domain from "../models/Domain";

class VTService {

    async processAnalysis(domain: string): Promise<void> {


        console.log(`VTService is now processing analysis for domain: ${domain}`);


        //In reality it should get the data from the service datasource but here I used mock data to simulate
        setTimeout(async () => {
            console.log('Using Mock data');

            const foundDomain = await Domain.findOne({ domain: domain })
            if (foundDomain) {
                await foundDomain.updateOne({
                    status: domainStatus.done, updatedAt: new Date(),
                    VTData: {
                        detectedEngines: "CLEAN MX",
                        numberOfDetection: 1,
                        numberOfScanners: 70,
                        lastUpdated: "09.09.19"
                    }
                });

                foundDomain.save();

                console.log(`VTService is done processing analysis for domain: ${domain}`);
            }
            else {
                console.error(`domain: ${domain} not found`);
            }

        }, 10 * 1000)
    }
}

export default new VTService();