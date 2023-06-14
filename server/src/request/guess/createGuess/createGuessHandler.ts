import prisma from "../../../lib/prisma";

export interface CreateGuessRequest {
  pollId: string;
  gameId: string;
  userId: string;
  firstTeamScore: number;
  secondTeamScore: number;
}

export class CreateGuessHandler {
  public async createGuessHandler(body: CreateGuessRequest) {
    try {
      const participant = await prisma.participant.findUnique({
        where: {
          userId_pollId: {
            pollId: body.pollId,
            userId: body.userId
          }
        }
      })

      if (!participant) throw new Error("Você não tem permissão para criar um palpite nessa aposta")

      const guess = await prisma.guess.findUnique({
        where: {
          participantId_gameId: {
            participantId: participant.id,
            gameId: body.gameId
          }
        }
      })

      if (guess) throw new Error('Voce já fez um palpite para esse game')

      const game = await prisma.game.findUnique({
        where: {
          id: body.gameId
        }
      })

      if (!game) throw new Error('Game não encontrado')

      //if (game.date < new Date()) throw new Error('Não pode fazer palpite em um jogo finalizado')

      const createdGuess = await prisma.guess.create({
        data: {
          firstTeamScore: body.firstTeamScore,
          secondTeamScore: body.secondTeamScore,
          gameId: body.gameId,
          participantId: participant.id,
        }
      })

      return createdGuess;
    } catch (err: any) {
      throw new Error(err)
    }
  }

  constructor() { }
}