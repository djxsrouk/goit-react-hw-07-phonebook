import React, { useState } from 'react';
import styles from './ContactForm.module.css';
import Notiflix from 'notiflix';
import { useDispatch } from 'react-redux';
import { addContacts } from '../../redux/operations';
import { useSelector } from 'react-redux';
import { getContacts } from '../../redux/selectors';

Notiflix.Notify.init({
  width: '280px',
  position: 'center-top',
  distance: '10px',
  opacity: 1,
  timeout: 3000,
});

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();

    const form = event.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;
    const existingContact = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      Notiflix.Notify.failure(`${name} is already in contacts!`);
    } else {
      try {
        console.log('Dispatching addContacts with:', { name, number });
        const response = await dispatch(addContacts({ name, number }));
        console.log('API Response:', response);

        if (response.error) {
          throw new Error(response.error.message);
        }

        Notiflix.Notify.success('Contact saved successfully!');
        form.reset();
      } catch (error) {
        console.error('Error saving contact:', error);
        Notiflix.Notify.failure('Failed to save contact.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formPhoneBook}>
      <label htmlFor="name" className={styles.labelName}>
        {' '}
        Name:
        <input
          className={styles.formInput}
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          pattern="^[a-zA-Z]+(([' \-][a-zA-Z ])?[a-zA-Z]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label htmlFor="number" className={styles.labelPhone}>
        {' '}
        Number:
        <input
          className={styles.formInput}
          type="tel"
          name="number"
          value={number}
          onChange={e => setNumber(e.target.value)}
          placeholder="Phone number"
          pattern="\+?\d{1,4}?[[\-.\s]]?\(?\d{1,3}?\)?[[\-.\s]]?\d{1,4}[[\-.\s]]?\d{1,4}[[\-.\s]]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit" className={styles.butonSubmit}>
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
