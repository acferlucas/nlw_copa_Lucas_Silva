import prisma from "../../../lib/prisma";

export class JoinTournamentHandler {

  public async joinTournament(userId: string, pollId: string, tournamentId: string) {
    try {
      const poll = await prisma.poll.findUnique({
        where: {
          id: pollId
        },
      })

      const tournament = await prisma.tournament.findUnique({
        where: {
          id: tournamentId
        }
      })

      if (!tournament) throw new Error(`Não foi possível encontrar o torneio ${tournamentId}`)

      if (!poll) throw new Error(`Não foi possível encontrar bolão ${pollId}`)

      if (poll.ownerId !== userId) throw new Error("Você não tem permissão para atualizar esse bolão")

      const updatedPoll = await prisma.poll.update({
        where: { id: poll.id },
        data: { tournamentId: tournament.id },
      });

      return updatedPoll;

    } catch (err: any) {
      throw new Error(err.message)
    }
  };

  constructor() { }
}