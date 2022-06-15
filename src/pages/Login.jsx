import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {
  auth,
  signInWithEmailAndPassword,
} from '../firebase';
import { useDispatch } from 'react-redux';
import { login } from '../slicer/userSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const loginToApp = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
          })
        );
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className='bg-gray-200 min-h-screen flex flex-col'>
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
          <h1 className='mb-8 text-2xl text-center'>This is Virtual Notes For You</h1>
          <form>
            <p className='mb-4 text-ls'>Please login into your account</p>
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
              className='w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-dark focus:outline-none my-1'
              type='submit'
              onClick={loginToApp}
            >
              Sign In
            </button>
          </form>
        </div>
        <div className='text-grey-dark mt-6'>
          Don't have an account?{' '}
          <Link to='/register' className='inline-block px-6 py-2 border-2 border-green-600 text-green-600 font-medium text-xs leading-tight uppercase rounded hover:bg-gray-400 focus:outline-none focus:ring-0 transition duration-150 ease-in-out'>
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;