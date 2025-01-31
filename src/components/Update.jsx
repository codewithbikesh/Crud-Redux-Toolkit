import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateUser } from '../redux/actions/userActions';

function Update() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const [updateData, setUpdateData] = useState(null); // Initialize with null or empty object
    const { users, error } = useSelector((state) => state.user);

    useEffect(() => {
        if (id && users.length > 0) {
            const singleUser = users.find((user) => user.id === id); // Parse ID
            if (singleUser) {
                setUpdateData(singleUser);
            } else {
                // If the user isn't found, handle appropriately
                console.error('User not found');
            }
        }
    }, [id, users]); // Ensure the effect runs when `id` or `users` changes.

    const handleChange = (e) => {
        setUpdateData({
            ...updateData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (updateData) {
            // Dispatch the update action and wait for it to complete
            await dispatch(updateUser(updateData)); // Dispatch the update action
            navigate("/user"); // Navigate to user list after update
        }
    };


    if (error) {
        return <h2>{error}</h2>; // Display error if it exists
    }

    if (!updateData) {
        return <h2>User not found</h2>; // Display a message if the user is not found
    }

    return (
        <div className="container mt-5">
            <h2>Update Form</h2>
            <form onSubmit={handleUpdate}>
                {/* Name Field */}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={updateData.name || ""}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                    />
                </div>

                {/* Email Field */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={updateData.email || ""}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />
                </div>

                {/* Age Field */}
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">
                        Age
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="age"
                        name="age"
                        value={updateData.age || ""}
                        onChange={handleChange}
                        placeholder="Enter your age"
                        required
                    />
                </div>

                {/* Gender Field */}
                <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="male"
                                value="male"
                                checked={updateData.gender === "male"}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="male">
                                Male
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="female"
                                value="female"
                                checked={updateData.gender === "female"}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="female">
                                Female
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="other"
                                value="other"
                                checked={updateData.gender === "other"}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="other">
                                Other
                            </label>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Update;
