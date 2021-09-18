import e from "express";
import { domainStatus } from "../interfaces/domainData";
import Domain from "../models/Domain";


class WhoisService {

    async processAnalysis(domain: string): Promise<void> {

        console.log(`WhoisService is now processing analysis for domain: ${domain}`);


        //In reality it should get the data from the service datasource but here I used mock data to simulate
        setTimeout(async () => {
            console.log('Using Mock data');

            const foundDomain = await Domain.findOne({ domain: domain })

            if (foundDomain) {
                await foundDomain.updateOne({
                    status: domainStatus.done, updatedAt: new Date(),
                    WhoisData: {
                        dateCreated: "09.15.97",
                        ownerName: "MarkMonitor, Inc.",
                        expiredOn: "09.13.28"
                    }
                });

                foundDomain.save();

                console.log(`WhoisService is done processing analysis for domain: ${domain}`);
            }
            else{
                console.error(`domain: ${domain} not found`);
            }

        }, 10 * 1000);
    }
}

export default new WhoisService();