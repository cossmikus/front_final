"use client";
import React, { useState } from 'react';

const DeleteUser: React.FC = () => {
  const [userId, setUserId] = useState<number | undefined>();
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(Number(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://final-db-0o3n.onrender.com/api/user/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete user: ${response.statusText}`);
      }

      setDeleteSuccess(true);
    } catch (error) {
      console.error('Error deleting user:', error);
      setDeleteSuccess(false);
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
        <h1 className="text-2xl font-bold mb-4">Delete User</h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
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
          <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded-md">
            Delete User
          </button>
        </form>
        {deleteSuccess && (
          <p className="text-green-500 mt-4">User deleted successfully!</p>
        )}
      </div>
    </main>
  );
};

export default DeleteUser;
