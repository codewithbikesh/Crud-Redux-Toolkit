import { createSlice } from '@reduxjs/toolkit';
import { createUser, deleteUser, showUserList, updateUser } from '../actions/userActions';

const userDetailSlice = createSlice({
  name: 'userDetail',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // create user reducer
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
        state.error = null; // Clear any previous errors
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred'; 
      })

      // show user list 
      .addCase(showUserList.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(showUserList.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null; // Clear any previous errors
      })
      .addCase(showUserList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      })

      //  delele user reducer
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        const deletedUserId = action.payload;
        state.users = state.users.filter(user => user.id !== deletedUserId);
        console.log("Delete User:", deletedUserId);
        state.error = null; // Clear any previous errors
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      })

       // Update user reducer
       .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        // Correctly update the user in the array
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
        state.error = null; // Clear any previous errors
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred'; 
      });
  },
});

export default userDetailSlice.reducer;