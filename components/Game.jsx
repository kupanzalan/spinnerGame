import React from 'react';
import { HiArrowSmDown } from 'react-icons/hi';
import texts from '../public/data/texts.json';

const Game = ({ player, money, rotationAngle, handleSpinClick }) => {

  return (
    <section className="mt-8 w-full max-w-lg flex-start flex-col">
        <h1 className="head_text text-center">
          <span className="head_text_style">{texts.hi} { player }!</span>
        </h1>
        <h2 className="money_text text-center">
          <span className="your_money_style">{texts.yourMoney} { money }</span>
        </h2>
        <p className="desc text-center">
          {texts.gameRules}
        </p>

        <div className="center">
          <span className="arrow-icon">↓</span>
        </div>
        <button id="spin" onClick={handleSpinClick}>{texts.spin}</button>
        <span className="arrow"></span>
        <div className="spinnerContainer" style={{ transform: `rotate(${rotationAngle}deg)`,  transition: 'transform 5s', }}>
            <div className="one">{texts.double}</div>
            <div className="two">{texts.keep}</div>
            <div className="three">{texts.bankrupt}</div>
        </div>
    </section>
  )
}

export default Game
