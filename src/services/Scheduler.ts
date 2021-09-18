
import Domain from "../models/Domain";

import { CronJob } from 'cron';
import moment from "moment";
import RedisPublisherService from "./RedisPublisherService";
import { domainStatus } from "../interfaces/domainData";

const timeSpanToUpdate: number = 60 * 1000 * 2; //Defined in the task as the time the record needs to updates. Specified 1 month. But for the sake of the exercise it is set to 2 minutes.

class Scheduler {

    cronJob: CronJob;

    constructor() {
        this.cronJob = new CronJob('* * * * * ', async () => { //every minute
            try {
                await this.runSchedulerJob();
            } catch (e) {
                console.error(e);
            }
        });

        if (!this.cronJob.running) {
            this.cronJob.start();
        }

    }

    public async runSchedulerJob(): Promise<void> {
        const rows = await Domain.find();

        const rowsNeedToBeUpdated = rows.filter(row => row.status !== domainStatus.onAnalysis && moment().valueOf() - moment(row.updatedAt).valueOf() > timeSpanToUpdate);


        console.log(`Scheduler found ${rowsNeedToBeUpdated.length} rows and ends them to analysis`)

        for (const row of rowsNeedToBeUpdated){
            RedisPublisherService.sendToAnalysis(row.domain);
        }
    }
}

export default Scheduler;