// ViewModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap components correctly
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const ViewModal = ({ isOpen, onClose, userData }) => {
  if (!userData) return null; // Return null if userData is not provided

  const { id, name, email, age, gender } = userData;

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>User Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>ID:</strong> {id}</p>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Age:</strong> {age}</p>
        <p><strong>Gender:</strong> {gender}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewModal;
