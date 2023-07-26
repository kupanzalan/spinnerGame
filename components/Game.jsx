import React from 'react';
import { HiArrowSmDown } from 'react-icons/hi';

const Game = ({ player, money, rotationAngle, handleSpinClick }) => {

  return (
    <section className="w-full max-w-lg flex-start flex-col">
        <h1 className="head_text text-center">
          <span className="blue_gradient">Hi { player }!</span>
        </h1>
        <h2 className="money_text text-center">
          <span className="orange_gradient">Your money: { money }</span>
        </h2>
        <p className="desc text-center">
          Simple rules: Double your money, keep it, or go bankrupt
        </p>

        <div className="center">
          <HiArrowSmDown className="arrow-icon"/>
        </div>
        <button id="spin" onClick={handleSpinClick}>Spin!</button>
        <span className="arrow"></span>
        <div className="spinnerContainer" style={{ transform: `rotate(${rotationAngle}deg)`,  transition: 'transform 5s', }}>
            <div className="one">Double</div>
            <div className="two">Keep</div>
            <div className="three">Bankrupt</div>
        </div>
    </section>
  )
}

export default Game
