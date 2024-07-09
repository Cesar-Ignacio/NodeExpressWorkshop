import { Command } from 'commander';
import dotenv from 'dotenv';
const commandLine = new Command();

commandLine
    .option('--port <port>')
    .option('--mode <mode>')
commandLine.parse();
const clOptions = commandLine.opts();

dotenv.config();
const config = {
    PORT: process.env.PORT
}

export default config;