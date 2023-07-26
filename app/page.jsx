"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import texts from './data/texts.json';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/create-user');
  }, []);

  return (
    <section className="max-w-2xl flex-center flex-col">
      <h1 className="head_text text-center">
      <br className="max-md:hidden" />
      <span className="orange_gradient text-center">
        {texts.gameLoading}
      </span>
      </h1>
    </section>
  )
}

export default Home;
