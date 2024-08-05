import dotenv from 'dotenv';

dotenv.config();

export const config={
    PORT:8080,
    PASS_APP_GMAIL:process.env.PASS_APP_GMAIL
}