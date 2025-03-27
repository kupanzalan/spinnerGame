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

  // const dummyUser = {
  //   name: params.user || "GuestPlayer",
  //   money: 1000,
  // };

  // useEffect(() => {
  //   setMoney(dummyUser.money); // Set dummy user's initial money
  // }, []);

  useEffect(() => {
    if (!dataLoaded) {
      getCurrentUser();
    }
    updateUserMoney();
  }, [money]);

  const getCurrentUser = async (e) => {

    try {
      const response = await fetch(`/api/user/${params.user}`, {
        method: 'GET'
      });
      
      const user = await response.json();
      if (response.ok) {
        setMoney(user[0].money);
        setLoading(false);
        setDataLoaded(true);
      }
    } catch(error) {
      console.log(`There was an error ${error}`);
    }
  }

  const calculateNewValue = (randomAngle, allRotations) => {
    if (randomAngle > 360) {
      randomAngle = randomAngle % 360;
    }

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
  }

  const handleSpinClick = () => {
    const randomAngle = Math.ceil(Math.random() * (8000 - 1000 + 1)) + 1000;
    setRotationAngle(prevAngle => prevAngle + randomAngle);
    calculateNewValue(randomAngle, rotationAngle);
  };

  const updateUserMoney = async (e) => {

    try {
      const response = await fetch('/api/user/new', {
        method: 'PUT', 
        body: JSON.stringify({
          name: params.user, 
          money: money
        })
      });
      
    } catch(error) {
      console.log(`There was an error ${error}`);
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
    // <section>
    //   <Game player={dummyUser.name} money={money} rotationAngle={rotationAngle} handleSpinClick={handleSpinClick} />
    // </section>
  )
}

export default page
