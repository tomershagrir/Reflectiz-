
import { Router, Request, Response } from 'express';
import DomainController from '../controllers/DomainController';
import { verifyDomainName } from '../middleware/verifyDomainName';



class DomainRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/', verifyDomainName, DomainController.findDomainOrAddOnAnalysis);
        this.router.post('/', DomainController.setExistingDomainOnAnalysis);
    }
}

const domainRoutes = new DomainRouter();

export default domainRoutes.router;