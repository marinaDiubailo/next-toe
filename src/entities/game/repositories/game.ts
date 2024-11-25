import { GameEntity } from '../domain'

export const gamerepository = {
  gamesList: (): Promise<GameEntity[]> => {
    return Promise.resolve([])
  },
}
