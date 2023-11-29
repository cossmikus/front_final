"use client";
import React, { useState, useEffect } from 'react';

interface User {
  user_id: number;
  email: string;
  given_name: string;
  surname: string;
  city: string;
  phone_number: string;
  profile_description: string;
  the_password: string;
}

const goToHomePage = () => {
  // Redirect to the home page
  window.location.href = '/';
};

const GetAllUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await fetch('https://final-db-0o3n.onrender.com/api/users');
        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.statusText}`);
        }

        const usersData = await response.json();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching all users:', error);
      }
    };

    fetchAllUsers();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-100">
      <div className="max-w-3xl w-full bg-white rounded-lg p-8 shadow-lg">
        <div className="mt-4">
          <button className="text-blue-500 hover:underline" onClick={goToHomePage}>
            Go to Home Page
          </button>
        </div>
        <h1 className="text-2xl font-bold mb-4">All Users</h1>
        {users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2">UserID</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Given Name</th>
                  <th className="border p-2">Surname</th>
                  <th className="border p-2">City</th>
                  <th className="border p-2">Phone Number</th>
                  <th className="border p-2">Profile Description</th>
                  <th className="border p-2">Password</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.user_id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                    <td className="border p-2">{user.user_id}</td>
                    <td className="border p-2">{user.email}</td>
                    <td className="border p-2">{user.given_name}</td>
                    <td className="border p-2">{user.surname}</td>
                    <td className="border p-2">{user.city}</td>
                    <td className="border p-2">{user.phone_number}</td>
                    <td className="border p-2">{user.profile_description}</td>
                    <td className="border p-2">{user.the_password}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No users found.</p>
        )}
      </div>
    </main>
  );
};

export default GetAllUsers;
