import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
} from '../firebase';
import { useDispatch } from 'react-redux';
import { login } from '../slicer/userSlice';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const register = () => {
    if (!name) {
      return alert('Please enter a full name');
    }

    console.log('register the user');

    createUserWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        updateProfile(userAuth.user, {
          displayName: name,
        })
          .then(
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name,
              })
            )
          )
          .catch((error) => {
            console.log('user not updated');
          });
      })
      .catch((err) => {
        console.log(err)
        alert(err);
      });
  };

  return (
    <div className='bg-gray-200 min-h-screen flex flex-col'>
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
          <h1 className='mb-8 text-3xl text-center'>Sign up</h1>
          <form>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Full name (required if registering)'
              type='text'
              className='block border border-grey-light w-full p-3 rounded mb-4'
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              type='email'
              className='block border border-grey-light w-full p-3 rounded mb-4'
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              type='password'
              className='block border border-grey-light w-full p-3 rounded mb-4'
            />
            <button 
              className='w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1'
              onClick={register}
            >
              Create Account
            </button>
          </form>
        </div>
        <div className='text-grey-dark mt-6'>
          Already have an account?{' '}
          <Link to='/' className='inline-block px-6 py-2 border-2 border-green-600 text-green-600 font-medium text-xs leading-tight uppercase rounded hover:bg-gray-400 focus:outline-none focus:ring-0 transition duration-150 ease-in-out'>
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;