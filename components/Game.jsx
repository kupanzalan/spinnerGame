import React from 'react';
import { HiArrowSmDown } from 'react-icons/hi';
import texts from '../public/data/texts.json';

const Game = ({ player, money, rotationAngle, handleSpinClick }) => {

  return (
    <section className="w-full max-w-lg flex-start flex-col">
        <h1 className="head_text text-center">
          <span className="blue_gradient">{texts.hi} { player }!</span>
        </h1>
        <h2 className="money_text text-center">
          <span className="orange_gradient">{texts.yourMoney} { money }</span>
        </h2>
        <p className="desc text-center">
          {texts.gameRules}
        </p>

        <div className="center">
          <HiArrowSmDown className="arrow-icon"/>
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
