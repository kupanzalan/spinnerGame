"use client";

import React from 'react'
import Game from '@components/Game'
import { useEffect, useState } from 'react';

const page = ({ params }) => {

  const [rotationAngle, setRotationAngle] = useState(0);
  const [money, setMoney] = useState(1000);
  const [isLoading, setLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);

  let moneyTransform = '';

  useEffect(() => {
    console.log(params.user);
    if (!dataLoaded) {
      getCurrentUser();
    }
    
    console.log('money in useEffect: ', money);
    updateUserMoney();
  }, [money]);

  const getCurrentUser = async (e) => {
    // e.preventDefault();

    try {
      const response = await fetch(`/api/user/${params.user}`, {
        method: 'GET'
      });
      
      const user = await response.json();
      if (response.ok) {
        console.log('user from backend', user);
        setMoney(user[0].money);
        setLoading(false);
        setDataLoaded(true);
      }
    } catch(error) {
      console.log(`There was an error ${error}`);
    } finally {
      console.log('Something');
    }
  }

  const calculateNewValue = (randomAngle, allRotations) => {
    if (randomAngle > 360) {
      randomAngle = randomAngle % 360;
    }

    console.log(`all in all the wheel rotated: ${(randomAngle + (allRotations % 360)) % 360}`);

    if ((randomAngle + (allRotations % 360)) % 360 < 60 || (randomAngle + (allRotations % 360)) % 360 >= 300) {
      moneyTransform = 'double';
      
      setTimeout(() => {
        setMoney(money * 2);
      }, "5000");
      
      
    }
    if ((randomAngle + (allRotations % 360)) % 360 >= 60 && (randomAngle + (allRotations % 360)) % 360 < 180) {
      moneyTransform = 'bankrupt';
      
      setTimeout(() => {
        setMoney((money * 0) + 1);
      }, "5000");
      
    }
    if ((randomAngle + (allRotations % 360)) % 360 >= 180 && (randomAngle + (allRotations % 360)) % 360 < 300) {
      moneyTransform = 'keep';
      
      setTimeout(() => {
        setMoney(money * 1);
      }, "5000");
      
    }
    
    console.log(moneyTransform);
  }

  const handleSpinClick = () => {
    console.log(money);
    const randomAngle = Math.ceil(Math.random() * (8000 - 1000 + 1)) + 1000;
    setRotationAngle(prevAngle => prevAngle + randomAngle);
    calculateNewValue(randomAngle, rotationAngle);
  };

  const updateUserMoney = async (e) => {

    console.log('in update usr money');
    try {
      console.log(`user: ${params.user}`);
      console.log(`money: ${money}`);
      const response = await fetch('/api/user/new', {
        method: 'PUT', 
        body: JSON.stringify({
          name: params.user, 
          money: money
        })
      });
      
      if (response.ok) {
        console.log("Everything was OK");
      }
    } catch(error) {
      console.log(`There was an error ${error}`);
    } finally {
      console.log(money);
    }
  }

  return (
    <section>
      { !isLoading ? (<Game 
        player={params.user}
        money={money}
        rotationAngle={rotationAngle}
        handleSpinClick={handleSpinClick}/>) : (<div className="spinnerCenter"><span className="loader"></span></div>)}
    </section>
  )
}

export default page
