"use client"
import React, { useEffect, useState } from 'react';

interface UserData {
  user_id: number;
  email: string;
  given_name: string;
  surname: string;
  city: string;
  phone_number: string;
  profile_description: string;
  the_password: string;
}

const Home: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [inputUserId, setInputUserId] = useState<string>(''); // State to store the input user_id

  const fetchData = async (userId: number) => {
    try {
      const response = await fetch(`https://final-db-0o3n.onrender.com/api/user/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // Handle non-2xx responses
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const data: UserData = await response.json();

      // Ensure that all expected properties are present in the response
      if (
        'user_id' in data &&
        'email' in data &&
        'given_name' in data &&
        'surname' in data &&
        'city' in data &&
        'phone_number' in data &&
        'profile_description' in data &&
        'the_password' in data
      ) {
        setUser(data);
        setError(null); // Clear any previous errors
      } else {
        setError('Invalid data received from the server');
      }
    } catch (error: any) {
      // Explicitly specify the type of 'error' as 'any'
      console.error('Error fetching user:', error);
      setError(error.message || 'Error fetching user');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputUserId(event.target.value);
  };

  const handleFetchUser = () => {
    const userId = parseInt(inputUserId, 10);
    if (!isNaN(userId)) {
      fetchData(userId);
    } else {
      setError('Please enter a valid user ID');
    }
  };

  useEffect(() => {
    // Fetch initial data when the component mounts (you may modify this behavior)
    fetchData(1013);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-100">
      <div className="max-w-3xl w-full bg-white rounded-lg p-8 shadow-lg">
        <h1>User Details</h1>
        <div className="flex flex-col mb-4">
          <label htmlFor="userIdInput">Enter User ID:</label>
          <div className="flex">
            <input
              type="text"
              id="userIdInput"
              value={inputUserId}
              onChange={handleInputChange}
              className="border p-2 mr-2"
            />
            <button onClick={handleFetchUser} className="bg-blue-500 text-white px-4 py-2">
              Fetch User
            </button>
          </div>
        </div>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ul>
            {user && (
              <li>
                <p>User ID: {user.user_id}</p>
                <p>Email: {user.email}</p>
                <p>Given Name: {user.given_name}</p>
                <p>Surname: {user.surname}</p>
                <p>City: {user.city}</p>
                <p>Phone: {user.phone_number}</p>
                <p>Profile Description: {user.profile_description}</p>
                <p>Password: {user.the_password}</p>
              </li>
            )}
          </ul>
        )}
      </div>
    </main>
  );
};

export default Home;