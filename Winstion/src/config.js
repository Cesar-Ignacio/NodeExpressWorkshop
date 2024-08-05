import * as url from 'url';
import { Command } from 'commander'
import dotenv from 'dotenv'

const commandLine = new Command();
commandLine
    .option('--port <port>')
    .option('--mode <mode>')
commandLine.parse();
const clOptions = commandLine.opts();

dotenv.config();

export const config = {
    PORT: 8000,
    DIRNAME: url.fileURLToPath(new URL('.', import.meta.url)),
    MODE: process.env.NODE_ENV || clOptions.mode || "development"
}