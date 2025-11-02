// scripts/seedClerkUsers.ts
import "dotenv/config"; // load .env vars
import { createClerkClient } from "@clerk/backend"; // correct import
import { db } from "../lib/db";
import { seedUsers } from "../lib/hardData";

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY! }); // 

async function main() {
    console.log(" Starting user seeding...");

    if (!process.env.CLERK_SECRET_KEY) {
        console.error(" Missing CLERK_SECRET_KEY in .env file");
        process.exit(1);
    }

    for (const u of seedUsers) {
        try {
            const user = await clerk.users.createUser({
                emailAddress: [u.email],
                firstName: u.firstName,
                lastName: u.lastName,
                password: "@#TesT.123*12",
            });
            //   console.log('--------user---------')
            //   console.log(user)

            await db.user.create({
                data: {
                    clerkId: user.id,
                    email: u.email,
                    name: `${u.firstName} ${u.lastName}`,
                    image: user.imageUrl ?? null,
                },
            });

            console.log(` Created ${u.firstName} ${u.lastName} (${u.email})`);
        } catch (err: any) {
            console.error(` Error creating ${u.email}:`, err.message);
        }
    }

    console.log("All users seeded successfully.");
    process.exit(0);
}

main().catch((err) => {
    console.error(" Fatal error:", err);
    process.exit(1);
});
/*  
password: @#TesT.123*12 
*/