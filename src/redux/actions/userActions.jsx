import { createAsyncThunk } from '@reduxjs/toolkit';

// Create user action
export const createUser = createAsyncThunk(
  'createUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch('https://6791f4e1cf994cc68048166a.mockapi.io/crud', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


// Show User List action 
// Show User List action 
export const showUserList = createAsyncThunk(
  'user/showUserList', // Action name or prefix
  async (_, { rejectWithValue }) => { // The second argument is destructured to get the rejectWithValue function
    try {
      const response = await fetch('https://6791f4e1cf994cc68048166a.mockapi.io/crud');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message); // Returning error message using rejectWithValue
    }
  }
)
  // Show User List action 

  export const deleteUser = createAsyncThunk(
    'user/deleteUser', // Action name or prefix
    async (id, { rejectWithValue }) => {
      try {
        const response = await fetch(`https://6791f4e1cf994cc68048166a.mockapi.io/crud/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete user');
        }
        // Assuming the API returns an empty response on successful deletion
        return id; // Return the deleted user ID or some confirmation if needed
      } catch (error) {
        return rejectWithValue(error.message); // Returning error message using rejectWithValue
      }
    }
  );

  // Update user action
export const updateUser = createAsyncThunk(
  'updateUser',
  async (data, { rejectWithValue }) => {
    console.log("Update Data:",data);
    try {
      const response = await fetch(`https://6791f4e1cf994cc68048166a.mockapi.io/crud/${data.id}`, {
        method: 'Put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
