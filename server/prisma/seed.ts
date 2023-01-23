import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      nome: "Admin",
      email: "admin@prisma.com",
    },
  });

  const secondUser = await prisma.user.create({
    data: {
      nome: "Jhon JO",
      email: "jhonJO@prisma.com",
    },
  });

  const pool = await prisma.pool.create({
    data: {
      ownerId: user.id,
      title: "Game Pool",
      code: "POOL",
      participants: {
        create: {
          userId: user.id,
        },

      }
    },
  })

  const game = await prisma.game.create({
    data: {
      date: "2023-01-16T17:53:52.310Z",
      firstTeamCountryCode: "US",
      secondTeamCountryCode: "BR",

      guesses: {
        create: {
          firstTeamScore: 3,
          secondTeamScore: 0,
          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id
              }
            }
          }
        }
      }
    }
  })

}

main()