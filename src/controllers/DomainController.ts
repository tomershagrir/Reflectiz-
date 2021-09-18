import Domain from "../models/Domain";
import { Request, Response } from 'express';
import RedisPublisherService from "../services/RedisPublisherService";


class DomainController {

    public async findDomainOrAddOnAnalysis(req: Request, res: Response): Promise<void> {
        const domainName: string = req.query.domain as string;

        const foundDomain = await Domain.findOne({ domain: domainName })

        if (foundDomain) {
            res.status(200).send(foundDomain);
        }
        else {
            const newDomain = new Domain({
                domain: domainName,
                status: "onAnalysis",
                updatedAt: new Date()
            });
            const domain = await newDomain.save();

            RedisPublisherService.sendToAnalysis(domainName);

            res.status(201).send(domain);
        }
    }

    public async setExistingDomainOnAnalysis(req: Request, res: Response): Promise<void> {
        const domainName: string = req.body.domain as string;
        const foundDomain = await Domain.findOne({ domain: domainName })

        if (foundDomain) {

            if (foundDomain.status === "onAnalysis") {
                res.status(200).send(`The domain name ${domainName} is alrady on analysis`);
            }
            else {

                foundDomain.updateOne({ status: "onAnalysis", updatedAt: new Date() });

                RedisPublisherService.sendToAnalysis(foundDomain.domain);

                res.status(200).send(`The domain name ${domainName} sent to analysis`);
            }
        }
        else {
            res.status(404).send('domain doesnt exist');
        }

    }
}

export default new DomainController();

