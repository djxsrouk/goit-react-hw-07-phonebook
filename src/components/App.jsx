import React from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './FilterSearch/FilterSearch';
import Section from './Section/Section';

export const App = () => {
  return (
    <>
      <Section title="Phonebook">
        <ContactForm />
        <Filter />
        <ContactList />
      </Section>
    </>
  );
};

export default App;
