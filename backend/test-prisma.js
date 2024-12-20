const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
    try {
        console.log("Testing Prisma connection...");

        // Test : Récupérer les utilisateurs
        const users = await prisma.users.findMany();
        console.log("Users fetched successfully:", users);
    } catch (err) {
        console.error("Error while fetching users with Prisma:", err);
    } finally {
        await prisma.$disconnect(); // Fermer la connexion Prisma
        console.log("nous sommes dans le finally");
    }
})();
