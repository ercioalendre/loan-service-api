const { PrismaClient } = require('@prisma/client');
const { randomUUID } = require('crypto');
require('reflect-metadata');

const prismaClient = new PrismaClient();

async function prismaSeed() {
  try {
    const adminUserExists = await prismaClient.user.findUnique({
      where: {
        email:
          '303ba366d4760d157b1def3540dbe103f93ba4b18a162490c76a1a8a6aa4b5.565a627e3f46734736635351',
      },
    });

    if (!adminUserExists) {
      await prismaClient.user.create({
        data: {
          id: randomUUID(),
          fullName: 'Admin',
          email:
            '377487debd937263f4f9f7833681831f2c8e80d9d49710ae2cab9a6f0a2328.565a627e3f46734736635351',
          phone:
            '04e611b09a29c5ce32df08a12e8db2f7c0f2ad5b45a2ec4e5e10ce76c335.565a627e3f46734736635351',
          role: 'ebd3b981b7720e142356c2ddc47b69d5a3.565a627e3f46734736635351',
          password:
            '$2b$12$Pu4H9O4Zwss6kTRXkIvw1uV0xyxmUK.6ceW9RPTMDgWybeV8iMGCm',
          isActive: true,
          createdAt: new Date(),
        },
      });
    }

    console.log('User table seeded successfully!');
  } catch (error) {
    console.log(error);

    process.exit(1);
  }

  prismaClient.$disconnect();
}

(async () => {
  await prismaSeed();
})();
