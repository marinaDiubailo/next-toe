import type {
  GameEntity,
  GameIdleEntity,
  GameOverEntity,
  PlayerEntity,
} from '../domain'
import { prisma } from '@/shared/db/db'
import { Game, GamePlayer, Prisma, User } from '@prisma/client'
import { z } from 'zod'

const fieldSchema = z.array(z.union([z.string(), z.null()]))

const dbPlayerToPlayer = (db: GamePlayer & { user: User }): PlayerEntity => {
  return {
    id: db.user.id,
    username: db.user.username,
    rating: db.user.rating,
  }
}

const dbGameToGameEntity = (
  game: Game & {
    players: Array<GamePlayer & { user: User }>
    winner?: (GamePlayer & { user: User }) | null
  },
): GameEntity => {
  const players = game.players
    .sort((a, b) => a.index - b.index)
    .map(dbPlayerToPlayer)

  switch (game.status) {
    case 'idle': {
      const [creator] = players

      if (!creator) throw new Error('creator should be in game idle')

      return {
        id: game.id,
        creator: creator,
        status: game.status,
        field: fieldSchema.parse(game.field),
      } satisfies GameIdleEntity
    }
    case 'inProgress':
    case 'gameOverDraw': {
      return {
        id: game.id,
        players: players,
        status: game.status,
        field: fieldSchema.parse(game.field),
      }
    }
    case 'gameOver': {
      if (!game.winner) throw new Error('winner should be in game over')

      return {
        id: game.id,
        players: players,
        status: game.status,
        field: fieldSchema.parse(game.field),
        winner: dbPlayerToPlayer(game.winner),
      } satisfies GameOverEntity
    }
  }
}

const gameIncludes = {
  winner: { include: { user: true } },
  players: { include: { user: true } },
}

const getGamesList = async (
  where?: Prisma.GameWhereInput,
): Promise<GameEntity[]> => {
  const games = await prisma.game.findMany({
    where,
    include: gameIncludes,
  })
  games.map((game) => game.players.map((player) => player.user))

  return games.map(dbGameToGameEntity)
}

export const gamesRepository = {
  getGamesList,
}
