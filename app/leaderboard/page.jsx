"use client";

import React from 'react'
import Table from '../../components/Table'
import { useEffect, useState } from "react"
import texts from '../data/texts.json';

const page = () => {

  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getLeaderboard();
  }, [])

  const getLeaderboard = async (e) => {

    try {
      const response = await fetch('/api/user/new', {
        method: 'GET'
      });
      
      const users = await response.json();
      setUsers(users);
    } catch(error) {
      console.log(`There was an error ${error}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="head_text text-center">
      <span className="blue_gradient">{texts.leaderBoardPlayers}</span>
      </h1>
      { !isLoading ? (<Table data={users} />) : (<div className="spinnerCenter"><span className="loader"></span></div>)}
    </div>
  )
}

export default page
