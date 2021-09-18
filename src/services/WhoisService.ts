import Domain from "../models/Domain";


class WhoisService {

    async processAnalysis(domain: string): Promise<void> {

        console.log(`WhoisService is now processing analysis for domain: ${domain}`);

        console.log('Using Mock data');
        Domain.updateOne({ domain: domain }, {
            status: "done", updatedAt: new Date(),
            WhoisData: {
                dateCreated: "09.15.97",
                ownerName: "MarkMonitor, Inc.",
                expiredOn: "09.13.28"
            }
        });

        console.log(`WhoisService is done processing analysis for domain: ${domain}`);
    }
}

export default new WhoisService();