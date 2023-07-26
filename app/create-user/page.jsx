"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreateUser = () => {

  const fakeData = [{id: 1, name: "Zalan", money: 5000}, 
  {id: 2, name: "Ljvknsbd", money: 9000}, 
  {id: 3, name: "Pkdjbvl", money: 7000}, 
  {id: 4, name: "UUUUU", money: 8000}, 
  {id: 5, name: "TTTTT", money: 10000}];

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    name: '',
  });
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const router = useRouter();
  const someVar = 'Blablabla';

  useEffect(() => {
    getUsers();
  }, [])

  const getUsers = async (e) => {
    // e.preventDefault();

    try {
      const response = await fetch('/api/user/new', {
        method: 'GET'
      });
      
      const users = await response.json();
      setUsers(users);
      console.log(users);
    } catch(error) {
      console.log(`There was an error ${error}`);
    } finally {
      setLoading(false);
      console.log(isLoading);
    }
  }

  const createUser = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {

      const userInDb = users.find(element => {
        console.log(element);
        if (element.name === post.name) {
          console.log("Already in db");
          // use current user
          return true;
        } else {
          console.log("Not in db");
          // insert new user in db
          return false;
        }
      });

      console.log(userInDb);
      if (userInDb === undefined) {
        console.log('Inserting new user');
        const response = await fetch('/api/user/new', {
          method: 'POST', 
          body: JSON.stringify({
            name: post.name, 
          })
        })

        if (response.ok) {
          console.log(response);
          router.push(`/game/${post.name}`);
          // router.push({ pathname: '/game', query: { user: post.name }});
        }
      } else {
        console.log('User already in DB');
        router.push(`/game/${post.name}`);
        // router.push({ pathname: '/game', query: { user: post.name }});
      }
    } catch(error) {
      console.log(`There was an error ${error}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section>
    { !isLoading ? (<Form 
                type="Create"
                post={post}
                setPost={setPost}
                submitting={submitting}
                handleSubmit={createUser}
    />) : (<div className="spinnerCenter"><span className="loader"></span></div>)}
    </section>
  )
}

export default CreateUser
