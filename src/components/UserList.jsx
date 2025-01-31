import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { showUserList, deleteUser } from '../redux/actions/userActions'; // Adjust the path as per your project structure
import ViewModal from './ViewModal'; // Import the ViewModal component

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(state => state.user); // Assuming 'user' is the slice name in your Redux state

  const [selectedUserId, setSelectedUserId] = useState(null); // State to hold selected user ID for viewing
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    dispatch(showUserList());
  }, [dispatch]);

  const handleView = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // const handleEdit = (userId) => {
  //   console.log(`Edit user with ID: ${userId}`);
  //   // Implement edit action logic here, e.g., navigate to edit user page
  // };

  const handleDelete = (userId) => {
    // Dispatch the deleteUser action with the user ID
    dispatch(deleteUser(userId));
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <div className="container mt-4">
      <h3>User Information</h3>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>
                <button className="btn btn-primary me-2" onClick={() => handleView(user.id)}>View</button>
                {/* <button className="btn btn-warning me-2" onClick={() => handleEdit(user.id)}>Edit</button> */}
                <Link to={`/user/edit/${user.id}`} className="btn btn-warning me-2">Edit</Link>
                <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render ViewModal component */}
      {isModalOpen && <ViewModal isOpen={isModalOpen} onClose={closeModal} userData={users.find(user => user.id === selectedUserId)} />}
    </div>
  );
};

export default UserList;
