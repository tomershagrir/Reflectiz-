import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';

// import routes
import indexRoutes from './routes/indexRoutes';
import DomainRoutes from './routes/DomainRoutes';


//import services
import VTService from './services/VTService';
import WhoisService from './services/WhoisService';
import Scheduler from './services/Scheduler';


//Run redis subscriber
const redis = require("redis")
const subscriber = redis.createClient()
subscriber.on("message", (channel, message) => {
    console.log("Received data :" + message)
    VTService.processAnalysis(message);
    WhoisService.processAnalysis(message);
})
subscriber.subscribe("analysis-request")


// Server Class
class Server {
    public app: express.Application;
    public scheduler: Scheduler;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.scheduler = new Scheduler();
    }

    public config(): void {
        // Settings
        this.app.set('port', process.env.PORT || 3000);
        // middlewares
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
    }

    public routes(): void {
        const router: express.Router = express.Router();

        this.app.use('/', indexRoutes);
        this.app.use('/api/domains', DomainRoutes);
    }

    public start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server is listenning on port', this.app.get('port'));
        });
    }
}

export { Server };