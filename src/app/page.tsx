"use client"
// import React, { useEffect, useState } from 'react';

// interface UserData {
//   user_id: number;
//   email: string;
//   given_name: string;
//   surname: string;
//   city: string;
//   phone_number: string;
//   profile_description: string;
//   the_password: string;
// }

// const Home: React.FC = () => {
//   const [user, setUser] = useState<UserData | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [inputUserId, setInputUserId] = useState<string>(''); // State to store the input user_id

//   const fetchData = async (userId: number) => {
//     try {
//       const response = await fetch(`https://final-db-0o3n.onrender.com/api/user/${userId}`, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         // Handle non-2xx responses
//         throw new Error(`Failed to fetch data: ${response.statusText}`);
//       }

//       const data: UserData = await response.json();

//       // Ensure that all expected properties are present in the response
//       if (
//         'user_id' in data &&
//         'email' in data &&
//         'given_name' in data &&
//         'surname' in data &&
//         'city' in data &&
//         'phone_number' in data &&
//         'profile_description' in data &&
//         'the_password' in data
//       ) {
//         setUser(data);
//         setError(null); // Clear any previous errors
//       } else {
//         setError('Invalid data received from the server');
//       }
//     } catch (error: any) {
//       // Explicitly specify the type of 'error' as 'any'
//       console.error('Error fetching user:', error);
//       setError(error.message || 'Error fetching user');
//     }
//   };

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setInputUserId(event.target.value);
//   };

//   const handleFetchUser = () => {
//     const userId = parseInt(inputUserId, 10);
//     if (!isNaN(userId)) {
//       fetchData(userId);
//     } else {
//       setError('Please enter a valid user ID');
//     }
//   };

//   useEffect(() => {
//     // Fetch initial data when the component mounts (you may modify this behavior)
//     fetchData(1013);
//   }, []);

//   return (
//     <main className="flex min-h-screen flex-col items-center p-8 bg-gray-100">
//       <div className="max-w-3xl w-full bg-white rounded-lg p-8 shadow-lg">
//         <h1>User Details</h1>
//         <div className="flex flex-col mb-4">
//           <label htmlFor="userIdInput">Enter User ID:</label>
//           <div className="flex">
//             <input
//               type="text"
//               id="userIdInput"
//               value={inputUserId}
//               onChange={handleInputChange}
//               className="border p-2 mr-2"
//             />
//             <button onClick={handleFetchUser} className="bg-blue-500 text-white px-4 py-2">
//               Fetch User
//             </button>
//           </div>
//         </div>
//         {error ? (
//           <p className="text-red-500">{error}</p>
//         ) : (
//           <ul>
//             {user && (
//               <li>
//                 <p>User ID: {user.user_id}</p>
//                 <p>Email: {user.email}</p>
//                 <p>Given Name: {user.given_name}</p>
//                 <p>Surname: {user.surname}</p>
//                 <p>City: {user.city}</p>
//                 <p>Phone: {user.phone_number}</p>
//                 <p>Profile Description: {user.profile_description}</p>
//                 <p>Password: {user.the_password}</p>
//               </li>
//             )}
//           </ul>
//         )}
//       </div>
//     </main>
//   );
// };

// export default Home;








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
  const [user, setUser] = useState<UserData | UserData[] | null>(null); // Updated state type
  const [error, setError] = useState<string | null>(null);
  const [inputUserId, setInputUserId] = useState<string>('');
  const [action, setAction] = useState<string | null>(null);
  const [newUserData, setNewUserData] = useState<UserData>({
    user_id: 0,
    email: '',
    given_name: '',
    surname: '',
    city: '',
    phone_number: '',
    profile_description: '',
    the_password: '',
  });
  

  const fetchData = async (userId: number) => {
    try {
      const response = await fetch(`https://final-db-0o3n.onrender.com/api/user/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const data: UserData = await response.json();

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
        setError(null);
      } else {
        setError('Invalid data received from the server');
      }
    } catch (error: any) {
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

  const handleActionClick = (actionType: string) => {
    setAction(actionType);
  };

  const handleInputFieldChange = (field: string, value: string) => {
    setNewUserData((prevUserData) => ({
      ...prevUserData,
      [field]: value,
    }));
  };

  const performAction = async () => {
    try {
      switch (action) {
        case 'GET_ALL_USERS':
          await fetchAllUsers();
          break;
        case 'GET_USER':
          await fetchData(parseInt(inputUserId, 10));
          break;
        case 'UPDATE_USER':
          // Implement logic for updating user
          break;
        case 'POST_USER':
          // Show modal for input and confirm post
          setAction('POST_USER');
          break;
        case 'DELETE_USER':
          // Implement logic for deleting user
          break;
        default:
          break;
      }
    } catch (error: any) {
      console.error(`Error performing action ${action}:`, error);
    } finally {
      setAction(null);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await fetch('https://final-db-0o3n.onrender.com/api/users');
      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.statusText}`);
      }

      const usersData: UserData[] = await response.json();
      console.log('All Users:', usersData);

      // Update state directly with the fetched users
      setUser(usersData);
      setError(null); // Clear any previous errors
      setAction(null); // Clear the action state
    } catch (error: any) {
      console.error('Error fetching all users:', error);
    }
  };

  useEffect(() => {
    fetchData(1013);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-100">
      <div className="max-w-3xl w-full bg-white rounded-lg p-8 shadow-lg">

        <div className="flex space-x-4">
          <button onClick={() => handleActionClick('GET_ALL_USERS')} className="bg-green-500 text-white px-4 py-2">
            Get All Users
          </button>
          <button onClick={() => handleActionClick('GET_USER')} className="bg-blue-500 text-white px-4 py-2">
            Get User
          </button>
          <button onClick={() => handleActionClick('UPDATE_USER')} className="bg-yellow-500 text-white px-4 py-2">
            Update User
          </button>
          <button onClick={() => handleActionClick('POST_USER')} className="bg-purple-500 text-white px-4 py-2">
            Post User
          </button>
          <button onClick={() => handleActionClick('DELETE_USER')} className="bg-red-500 text-white px-4 py-2">
            Delete User
          </button>
        </div>
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
        {action && action === 'POST_USER' && (
          <div className="flex flex-col mb-4">
            <label htmlFor="userEmailInput">Email:</label>
            <input
              type="text"
              id="userEmailInput"
              value={newUserData.email}
              onChange={(e) => handleInputFieldChange('email', e.target.value)}
              className="border p-2 mb-2"
            />

            <label htmlFor="userGivenNameInput">Given Name:</label>
            <input
              type="text"
              id="userGivenNameInput"
              value={newUserData.given_name}
              onChange={(e) => handleInputFieldChange('given_name', e.target.value)}
              className="border p-2 mb-2"
            />

            {/* Add input fields for other attributes as needed */}

            <button onClick={performAction} className="bg-purple-500 text-white px-4 py-2 mt-2">
              Confirm Post User
            </button>
          </div>
        )}
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ul>
            {user && Array.isArray(user) ? (
              user.map((userData) => (
                <li key={userData.user_id}>
                  <p>User ID: {userData.user_id}</p>
                  <p>Email: {userData.email}</p>
                  <p>Given Name: {userData.given_name}</p>
                  <p>Surname: {userData.surname}</p>
                  <p>City: {userData.city}</p>
                  <p>Phone: {userData.phone_number}</p>
                  <p>Profile Description: {userData.profile_description}</p>
                  <p>Password: {userData.the_password}</p>
                  <p>==================================================================</p>
                  <p>==================================================================</p>

                </li>
              ))
            ) : (
              user && (
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
              )
            )}
          </ul>
        )}
        {/* Modal for executing actions */}
        {action && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg">
              <h2>Confirm Action</h2>
              <p>Are you sure you want to {action.toLowerCase().replace('_', ' ')}?</p>
              <div className="flex justify-end mt-4">
                <button onClick={() => setAction(null)} className="mr-4">
                  Cancel
                </button>
                <button onClick={performAction} className="bg-blue-500 text-white px-4 py-2">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;




/////////////////////////////////////////////////////

////////////////////////////////////////////////////
