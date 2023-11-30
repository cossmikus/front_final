"use client";
import React, { useState } from 'react';

const GetUserById: React.FC = () => {
  const [userId, setUserId] = useState<number | undefined>();
  const [userData, setUserData] = useState<any>(null); // Adjust the type as per your response structure

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(Number(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://backfinaldb-production.up.railway.app/api/user/${userId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch user: ${response.statusText}`);
      }

      const userData = await response.json();
      setUserData(userData);
    } catch (error) {
      console.error('Error fetching user:', error);
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
        <h1 className="text-2xl font-bold mb-4">Get User by ID</h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            User ID:
            <input
              type="number"
              placeholder="Example: 1001 to 1024"
              value={userId || ''}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </label>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Submit
          </button>
        </form>
        {userData && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-2">User Details</h2>
            <pre>{JSON.stringify(userData, null, 2)}</pre>
          </div>
        )}
      </div>
    </main>
  );
};

export default GetUserById;
