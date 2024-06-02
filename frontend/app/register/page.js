'use client';

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserRegister() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { name, username, email, password, confirmPassword } = userInfo;
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !username || !email || !password || !confirmPassword) {
      toast.error('Please fill all the fields!');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Confirmation password did not match!');
      return;
    }
    // handleRegister(userInfo);
    try {
      const res = await fetch(`http://20.2.28.134:4000/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, username, email, password }),
      });
      if (res.status === 401) throw new Error(res.body);
      toast.success('User registered successfully!');
      window.location.href = '/login';
    } catch (err) {
      console.error(err);
      toast.error('Error while registering user!');
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-reg-bg bg-cover">
      <Head>
        <title>Rental Bahari | Register</title>
      </Head>
      <main className="bg-reg-bg bg-cover flex-row flex items-center justify-center w-full flex-1 py-100 text-center">
        {/* Logo section */}
        <div className="w-1/2 p-5 flex flex-col items-center justify-center">
          <img src="/assets/logo.png" className="img-logo mb-5 " alt="Logo" />
          <div className="py-2">
            <h2 className="text-5xl font-bold text-white mt-7 mb-7">
              Beat Task!
            </h2>
          </div>
        </div>

        {/* Regis section */}
        <div className="bg-white min-h-screen w-6/12 flex flex-col justify-center">
          <div className="py-reg">
            <h2 className="text-3xl font-bold text-purple mt-8 mb-4">
              Welcome to Beat Task!
            </h2>
            <div className="text-neutral-800 text-xs mb-8">
              <p className="">
                Create an account to get started with Beat Task.
              </p>
              <p>Stay focused, Stay Organized!</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col px-20 md:px-28 lg:px-36 xl:px-44 text-black"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-medium text-base text-left">Name</label>
                <div>
                  <input
                    type="name"
                    onChange={handleChange}
                    value={name}
                    name="name"
                    className="border-2 border-main-black/20 focus:border-dark-green-1 focus:outline-none rounded-2xl px-6 py-2 w-full bg-gray-100"
                    placeholder="Enter name"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-base text-left">
                  Username
                </label>
                <div>
                  <input
                    type="username"
                    onChange={handleChange}
                    value={username}
                    name="username"
                    className="border-2 border-main-black/20 focus:border-dark-green-1 focus:outline-none rounded-2xl px-6 py-2 w-full bg-gray-100"
                    placeholder="Enter username"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-base text-left">Email</label>
                <div className="relative">
                  <input
                    onChange={handleChange}
                    value={email}
                    name="email"
                    placeholder="Enter email"
                    className="border-2 border-main-black/20 focus:border-dark-green-1 focus:outline-none rounded-2xl px-6 py-2 w-full bg-gray-100"
                    required
                  />
                </div>
              </div>
              {/* <div className="flex flex-col gap-2">
                <label className="font-medium text-base text-left">
                  Phone number
                </label>
                <div>
                  <input
                    type="telp"
                    onChange={handleChange}
                    value={telp}
                    name="telp"
                    className="border-2 border-main-black/20 focus:border-dark-green-1 focus:outline-none rounded-2xl px-6 py-2 w-full bg-gray-100"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
              </div> */}
              <div className="flex flex-col gap-2">
                <label className="font-medium text-base text-left">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    onChange={handleChange}
                    value={password}
                    name="password"
                    placeholder="Enter password"
                    className="border-2 border-main-black/20 focus:border-dark-green-1 focus:outline-none rounded-2xl px-6 py-2 w-full bg-gray-100"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-medium text-base text-left">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    onChange={handleChange}
                    value={confirmPassword}
                    name="confirmPassword"
                    placeholder="Confirm password"
                    className="border-2 border-main-black/20 focus:border-dark-green-1 focus:outline-none rounded-2xl px-6 py-2 w-full bg-gray-100"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <button
                type="submit"
                className="bg-purple w-1/2 py-2 rounded-3xl text-white font-semibold mt-8"
              >
                Sign Up
              </button>
            </div>
            <div className="flex items-center justify-center text-xs mb-4">
              <span>Already have an account?&nbsp;</span>
              <Link href="/login" className="underline">
                Log in
              </Link>
            </div>
          </form>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}
