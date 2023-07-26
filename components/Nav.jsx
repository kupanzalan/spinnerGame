import Link from 'next/link';
import texts from '../public/data/texts.json';

const Nav = () => {

  return (
    <nav className="flex flex-between w-full mb-6 pt-3">
      <div className="sm:flex hidden">
        <div className="flex gap-3 md:gap-5 mt-3">
          <Link href="/leaderboard" className="blue_btn">
            {texts.leaderBoard}
          </Link>
          <Link href="/create-user" className="orange_btn">
            {texts.newGame}
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Nav
