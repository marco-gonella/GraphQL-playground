import 'reflect-metadata';
import { Server } from "./server";
import config from './config/config';

const server = new Server(config.port);
