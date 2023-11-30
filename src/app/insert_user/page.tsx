"use client";
import React, { useState } from 'react';

const CreateUser: React.FC = () => {
  const [userData, setUserData] = useState({
    user_id: '',
    email: '',
    given_name: '',
    surname: '',
    city: '',
    phone_number: '',
    profile_description: '',
    the_password: '',
  });
  const [createSuccess, setCreateSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('https://backfinaldb-production.up.railway.app/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create user: ${response.statusText}`);
      }

      setCreateSuccess(true);
    } catch (error) {
      console.error('Error creating user:', error);
      setCreateSuccess(false);
    }
  };

  const goToHomePage = () => {
    // Redirect to the home page
    window.location.href = '/';
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg p-8 shadow-lg">
        <div className="mt-4">
          <button
            onClick={goToHomePage}
            className="text-blue-500 hover:underline"
          >
            Go to Home Page
          </button>
        </div>
        <h1 className="text-2xl font-bold mb-4">Create User</h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            User ID:
            <input
              type="number"
              name="user_id"
              value={userData.user_id}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </label>
          <label className="block mb-2">
            Email:
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </label>
          <label className="block mb-2">
            Given Name:
            <input
              type="text"
              name="given_name"
              value={userData.given_name}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </label>
          <label className="block mb-2">
            Surname:
            <input
              type="text"
              name="surname"
              value={userData.surname}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </label>
          <label className="block mb-2">
            City:
            <input
              type="text"
              name="city"
              value={userData.city}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </label>
          <label className="block mb-2">
            Phone Number:
            <input
              type="text"
              name="phone_number"
              value={userData.phone_number}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </label>
          <label className="block mb-2">
            Profile Description:
            <input
              type="text"
              name="profile_description"
              value={userData.profile_description}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </label>
          <label className="block mb-2">
            Password:
            <input
              type="password"
              name="the_password"
              value={userData.the_password}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </label>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Create User
          </button>
        </form>
        {createSuccess && (
          <p className="text-green-500 mt-4">User created successfully!</p>
        )}
      </div>
    </main>
  );
};

export default CreateUser;
