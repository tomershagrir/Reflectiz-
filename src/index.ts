import { Server } from "./server";
import './config/mongoose'

require('./services/VTService')

const server = new Server();

server.start();
