import dotenv from 'dotenv';

dotenv.config();

export const config={
    PORT:8080,
    GMAIL_APP_USER:process.env.GMAIL_APP_USER,
    PASS_APP_GMAIL:process.env.PASS_APP_GMAIL
}