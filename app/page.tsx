import { prisma } from '@/shared/lib/db/db';
import { HomePage } from '@pages/home';

export default async function Home() {
  const games = await prisma.game.findMany();

  console.log(games);
  return <HomePage />;
}
