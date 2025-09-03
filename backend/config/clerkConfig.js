import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import dotenv from "dotenv";

dotenv.config();

app.use(
  ClerkExpressWithAuth({
    apiKey: process.env.CLERK_SECRET_KEY, // from your Clerk dashboard
  })
);
