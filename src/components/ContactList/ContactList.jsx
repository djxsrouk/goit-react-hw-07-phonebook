import React from 'react';
import styles from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getStatusFilter } from '../../redux/selectors';
import { deleteContacts } from '../../redux/operations';

const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getStatusFilter);
  const dispatch = useDispatch();

  const handleDelete = async id => {
    console.log('Deleting contact with id:', id);
    try {
      const response = await dispatch(deleteContacts(id)).unwrap();
      console.log('Delete Response:', response);
      if (response.error) {
        throw new Error(response.error.message);
      }
    } catch (error) {
      console.error('Delete Error:', error);
    }
  };

  const handleFilteredContacts = (contacts, filter = '') => {
    return contacts.filter(contact => {
      return (
        typeof contact.name === 'string' &&
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
    });
  };

  const filteredContacts = Array.isArray(contacts)
    ? handleFilteredContacts(contacts, filter)
    : [];

  if (!Array.isArray(contacts)) {
    console.error('Contacts is not an array:', contacts);
    return null;
  }

  return (
    <div className={styles.contactSection}>
      <h3 className={styles.contactList}>Contact List:</h3>
      <ul className={styles.contactItem}>
        {filteredContacts.map(contact => (
          <li key={contact.id} className={styles.contactNr}>
            {`${contact.name}: ${contact.number}`}
            <div className={styles.deleteButonsSection}>
              <button
                className={styles.deleteButons}
                onClick={() => handleDelete(contact.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
