"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {

  const isUserLoggedIn = true;

  return (
    <nav className="flex flex-between w-full mb-6 pt-3">
      {/* <Link href="/" className="flex gap-2 flex-center">
        <Image 
          src="/assets/images/logo.svg"
          alt="Some logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Leaderboard</p>
      </Link> */}

      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5 mt-3">
            <Link href="/leaderboard" className="blue_btn">
              Leaderboard
            </Link>

            {/* <button type="button" onClick={signOut} className="outline_btn">
              New Game
            </button> */}
            <Link href="/create-user" className="orange_btn">
              New Game
            </Link>
          </div>
        ) : (
          <>
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
