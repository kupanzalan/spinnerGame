"use client";

import React from 'react'
import Table from '../../components/Table'
import { useEffect, useState } from "react"

const page = () => {

  // const fakeData = [{id: 1, name: "Zalan", money: 5000}, 
  // {id: 2, name: "Ljvknsbd", money: 9000}, 
  // {id: 3, name: "Pkdjbvl", money: 7000}, 
  // {id: 4, name: "UUUUU", money: 8000}, 
  // {id: 5, name: "TTTTT", money: 10000}];

  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getLeaderboard();
  }, [])

  const getLeaderboard = async (e) => {
    // e.preventDefault();

    try {
      const response = await fetch('/api/user/new', {
        method: 'GET'
      });
      
      const users = await response.json();
      setUsers(users);
      console.log(`users: ${users}`);
    } catch(error) {
      console.log(`There was an error ${error}`);
    } finally {
      setLoading(false);
      console.log(isLoading);
    }
  }

  return (
    <div>
      <h1 className="head_text text-center">
        <span className="blue_gradient">Leaderboard of players</span>
      </h1>
      { !isLoading ? (<Table data={users} />) : (<div className="spinnerCenter"><span className="loader"></span></div>)}
    </div>
  )
}

export default page
