const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUVyUjdNZGRySjlxQ002ZndqaVZTM0NUcFhMUUtLaVVnbDlScnpyNmJGTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWjhJRjY2MWtsOTFVRW9xZFZldmlqcGZaWEdNK1R6K3B1N0dhR1FGQzVqMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwRmFaTURDdDAxNENnV0p0SEV5d3MyRkNiTGw1T09lQ0tUK2dDWGg0SEZFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLNk1UT3V3clNJZkM2R1l0TStuVVIvQjd0NzViRFdGQjhJNlBtc0x6RHlRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVGckNVWEVmYkh0TitSZE9iRDhZYUdtTitsNnpFdFQ0U2dDb1o3QkFwVWs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Inh3ZWo5bEVMTUdpU2tISVhrSEhZM05ORnE2OHR2SlVhSEdVRWwrOXA5RG89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0o5WDEzNWVaSnh2YVpxcVdMaFVzMHEzeG5FUDNEblluMk4rVmZibTJHWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNnpMbXFoL1g3a0ZVSFJ4c3Z0Wmg0ODJqdUg4M3pkTGFxeWRwVDM3ZkN4TT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFvYjVFN2pmQUJ3WFJxQ2srTzN1bmdqRGs5MXUwMEx6ZkdHaklyQnBLMGthdWo2K3Q5YkQ1Q0hLaTExVGVJcURkOW1vbzJoeXFoNXc1RzMyMzU0MGpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjIwLCJhZHZTZWNyZXRLZXkiOiIxSHRlN0NNU2ZrbTJCZUdHcHBsY09EMmZ6RlEzUUZkczZpLzF0STZtM0k0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIzM29wY2F1Z1JmbV9tTHN3ZmUzREJBIiwicGhvbmVJZCI6IjQ3NDI3OGRiLTc0ZjEtNDZjNy1hZjc5LTdhY2M1ZGI5NzA4YiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlMDRFVnZ3YjNjZ0FkVW9GNG5IdDNXLzBtdmM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicU9uVDFmaDBmZVBhTkpCbk13UjJJZ2czYzVvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlFKUFBTUVBZIiwibWUiOnsiaWQiOiIyNTQxMDI1MTA3NDc6OTdAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ012djBmUUZFSmZwOWJRR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjdhZzl5eCtxS2tpLzBLQ0xoZlo2R2huUVNSQXZrcEp5Y1RZVDVlSnlpQjA9IiwiYWNjb3VudFNpZ25hdHVyZSI6InAva1Z6ekJ3VHFzYnhlbWd6T0poSFZnVC81cjRnSkxlR3BRSWxmNjdKUC9sL1dzMmhDNjBERjVaeU5lZFRDT3NwbU15eFRxSHdkK292WG5kNTFuVkFRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJiN3BiQ29HTFN1emh2djVTUXFsTTdzMTltN3BYNTBrMkJLamZFQkEyZE02d0tpaTZwNFg5NE5PcjhuWTdpZHVwYkw4bHl0dmFMVTFnT09KMmFMeStodz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDEwMjUxMDc0Nzo5N0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJlMm9QY3NmcWlwSXY5Q2dpNFgyZWhvWjBFa1FMNUtTY25FMkUrWGljb2dkIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxNTk1MDQ0fQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "♝# ᗯᗩᒍᗩᑕKOYᗩ#(♖)",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254102510747",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/c894c8ee8dd35b55a131b.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
