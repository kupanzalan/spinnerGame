"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreateUser = () => {
  
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    name: '',
  });
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    getUsers();
  }, [])

  const getUsers = async (e) => {

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

  const createUser = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {

      const userInDb = users.find(element => {
        if (element.name === post.name) {
          return true;
        } else {
          return false;
        }
      });

      if (userInDb === undefined) {
        const response = await fetch('/api/user/new', {
          method: 'POST', 
          body: JSON.stringify({
            name: post.name, 
          })
        })

        if (response.ok) {
          router.push(`/game/${post.name}`);
        }
      } else {
        router.push(`/game/${post.name}`);
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
