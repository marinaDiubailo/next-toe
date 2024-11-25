import type { GameIdleEntity } from '../domain'
import { gamesRepository } from '../repositories/game'

export const getIdleGames = async (): Promise<GameIdleEntity[]> => {
  const games = await gamesRepository.getGamesList({
    status: 'idle',
  })

  return games as GameIdleEntity[]
}
