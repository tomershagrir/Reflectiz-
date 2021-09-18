import { domainStatus } from "../interfaces/domainData";
import Domain from "../models/Domain";
import axios from "axios";

import xml2js from 'xml2js';

const config = require('../config.env');

const parser = new xml2js.Parser();


class WhoisService {

    async processAnalysis(domain: string): Promise<void> {

        console.log(`WhoisService is now processing analysis for domain: ${domain}`);

        const foundDomain = await Domain.findOne({ domain: domain })

        if (foundDomain) {

            try {

                const response = await axios.get(`${config.whoIsUrl}?apiKey=${config.whoIsApiKey}&domainName=${domain}`);

                console.log("Requesting data from Whois")
                const jsonResponse = await parser.parseStringPromise(response.data);
                console.log("done fetching data from who is")

                await foundDomain.updateOne({
                    status: domainStatus.done, updatedAt: new Date(),
                    WhoisData: {
                        dateCreated: jsonResponse.WhoisRecord.createdDate[0],
                        ownerName: jsonResponse.WhoisRecord.registrarName[0],
                        expiredOn: jsonResponse.WhoisRecord.expiresDate[0]
                    }
                });
            }
            catch (ex) {
                console.error('Whois service failed to fetch and store data', ex)

                await foundDomain.updateOne({
                    status: domainStatus.error, updatedAt: new Date(),
                });
            }
            finally {
                foundDomain.save();
            }

            console.log(`WhoisService is done processing analysis for domain: ${domain}`);
        }
        else {
            console.error(`domain: ${domain} not found`);
        }

    }
}

export default new WhoisService();