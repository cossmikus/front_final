"use client"

import { useState, ChangeEvent } from 'react';

interface NewUserData {
  given_name: string;
  surname: string;
  city: string;
  phone_number: string;
  profile_description: string;
  the_password: string;
}

export default function Home() {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState('');
  const [newUserData, setNewUserData] = useState<NewUserData>({
    given_name: '',
    surname: '',
    city: '',
    phone_number: '',
    profile_description: '',
    the_password: '',
  });

  const handleGetUser = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/user/${userId}`);
      const data = await response.json();
      setUserData(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error fetching user:', error);
      setUserData('User not found');
    }
  };

  const handlePostUser = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUserData),
      });
      const data = await response.json();
      setUserData(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error creating user:', error);
      setUserData('Error creating user');
    }
  };

  const handleUpdateUser = async () => {
    // Implement the logic for updating user here
    // Use the newUserData state for the updated user data
  };

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/user/${userId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      setUserData(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error deleting user:', error);
      setUserData('Error deleting user');
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof NewUserData
  ) => {
    setNewUserData({ ...newUserData, [key]: e.target.value });
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-100">
      <div className="max-w-3xl w-full bg-white rounded-lg p-8 shadow-lg">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-4">CRUD on database</h1>
          <div className="flex space-x-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
              onClick={handleGetUser}
            >
              Get User
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
              onClick={handlePostUser}
            >
              Post User
            </button>
            <button
              className="bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-2 rounded"
              onClick={handleUpdateUser}
            >
              Update User
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
              onClick={handleDeleteUser}
            >
              Delete User
            </button>
          </div>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="border rounded w-full px-3 py-2"
          />
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Given Name"
              value={newUserData.given_name}
              onChange={(e) => handleInputChange(e, 'given_name')}
              className="border rounded w-full px-3 py-2"
            />
            {/* Add similar input fields for other user properties */}
          </div>
          <div className="flex space-x-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
              onClick={handlePostUser}
            >
              Save
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded"
              onClick={() => setNewUserData({
                given_name: '',
                surname: '',
                city: '',
                phone_number: '',
                profile_description: '',
                the_password: '',
              })}
            >
              Clear
            </button>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-2">User Data:</h2>
          <pre className="bg-gray-200 p-4 rounded">{userData}</pre>
        </div>
      </div>
    </main>
  );
}
