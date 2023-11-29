"use client"
import React from 'react';

const Home: React.FC = () => {
  const handleActionClick = (path: string) => {
    window.location.href = `/${path}`;
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-100">
      <div className="max-w-3xl w-full bg-white rounded-lg p-8 shadow-lg">
        <div className="flex space-x-4">
          <button onClick={() => handleActionClick('get_all_users')} className="bg-green-500 text-white px-4 py-2">
            Get All Users
          </button>
          <button onClick={() => handleActionClick('get_user')} className="bg-blue-500 text-white px-4 py-2">
            Get User
          </button>
          <button onClick={() => handleActionClick('modify_user')} className="bg-yellow-500 text-white px-4 py-2">
            Update User
          </button>
          <button onClick={() => handleActionClick('insert_user')} className="bg-purple-500 text-white px-4 py-2">
            Post User
          </button>
          <button onClick={() => handleActionClick('delete_user')} className="bg-red-500 text-white px-4 py-2">
            Delete User
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
