"use client";
import React, { useState } from 'react';

const UpdateUser: React.FC = () => {
  const [userId, setUserId] = useState<number | undefined>();
  const [userData, setUserData] = useState<any>(null);
  const [updatedUserData, setUpdatedUserData] = useState({
    email: '',
    given_name: '',
    surname: '',
    city: '',
    phone_number: '',
    profile_description: '',
    the_password: '',
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(Number(e.target.value));
  };

  const handleSubmitUserId = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://final-db-0o3n.onrender.com/api/user/${userId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch user: ${response.statusText}`);
      }

      const userData = await response.json();
      setUserData(userData);
      // Set initial state for updatedUserData based on fetched userData
      setUpdatedUserData(userData);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://final-db-0o3n.onrender.com/api/user/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update user: ${response.statusText}`);
      }

      setUpdateSuccess(true);
    } catch (error) {
      console.error('Error updating user:', error);
      setUpdateSuccess(false);
    }
  };

  const handleUpdateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedUserData({
      ...updatedUserData,
      [e.target.name]: e.target.value,
    });
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
        <h1 className="text-2xl font-bold mb-4">Update User</h1>
        <form onSubmit={handleSubmitUserId}>
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
            Submit User ID
          </button>
        </form>
        {userData && (
          <form onSubmit={handleUpdateUser} className="mt-4">
            <h2 className="text-xl font-bold mb-2">Update User Details</h2>
            <label className="block mb-2">
              Email:
              <input
                type="text"
                name="email"
                value={updatedUserData.email}
                onChange={handleUpdateInputChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </label>
            <label className="block mb-2">
              Given Name:
              <input
                type="text"
                name="given_name"
                value={updatedUserData.given_name}
                onChange={handleUpdateInputChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </label>
            <label className="block mb-2">
              Surname:
              <input
                type="text"
                name="surname"
                value={updatedUserData.surname}
                onChange={handleUpdateInputChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </label>
            <label className="block mb-2">
              Surname:
              <input
                type="text"
                name="city"
                value={updatedUserData.city}
                onChange={handleUpdateInputChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </label>
            <label className="block mb-2">
              Surname:
              <input
                type="text"
                name="phone_number"
                value={updatedUserData.phone_number}
                onChange={handleUpdateInputChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </label>
            <label className="block mb-2">
              Surname:
              <input
                type="text"
                name="profile_description"
                value={updatedUserData.profile_description}
                onChange={handleUpdateInputChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </label>
            <label className="block mb-2">
              Surname:
              <input
                type="text"
                name="profile_description"
                value={updatedUserData.profile_description}
                onChange={handleUpdateInputChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </label>
            <label className="block mb-2">
              Surname:
              <input
                type="text"
                name="the_password"
                value={updatedUserData.the_password}
                onChange={handleUpdateInputChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </label>
            {/* Add similar input fields for other user attributes */}
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Update User
            </button>
          </form>
        )}
        {updateSuccess && (
          <p className="text-green-500 mt-4">User updated successfully!</p>
        )}
      </div>
    </main>
  );
};

export default UpdateUser;
