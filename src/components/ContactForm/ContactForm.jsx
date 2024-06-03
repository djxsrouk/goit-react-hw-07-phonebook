import React from 'react';
import styles from './ContactForm.module.css';
import Notiflix from 'notiflix';
import { useDispatch } from 'react-redux';
import { addContacts } from '../../redux/contactsSlice';
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

  const handleSubmit = event => {
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
      dispatch(addContacts(name, number));
      Notiflix.Notify.success('Contact saved successfully!');
      form.reset();
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
