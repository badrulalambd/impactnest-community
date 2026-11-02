
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoUrl = process.env.MONGODB_URL;
const authUrl = process.env.BETTER_AUTH_URL;
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!mongoUrl || !authUrl || !googleClientId || !googleClientSecret) {
    throw new Error("Missing required authentication environment variables.");
}

const client = new MongoClient(mongoUrl);
const db = client.db("impactnestdb");

export const auth = betterAuth({
    database: mongodbAdapter(db, { client }),

    baseURL: authUrl,

    emailAndPassword: {
        enabled: true,
    },

    socialProviders: {
        google: {
            clientId: googleClientId,
            clientSecret: googleClientSecret,
        },
    },

    account: {
        accountLinking: {
            enabled: true,
            trustedProviders: ["google"],
        },
    },
});