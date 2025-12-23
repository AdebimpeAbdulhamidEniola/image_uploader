import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });
// Ensure connection is established
prisma.$connect().catch((err) => {
    console.error("Failed to connect to database:", err);
    process.exit(1);
});
export default prisma;
//# sourceMappingURL=prisma.js.map