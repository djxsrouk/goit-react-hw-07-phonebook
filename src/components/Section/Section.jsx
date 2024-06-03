import React from 'react';
import styles from './Section.module.css';
import PropTypes from 'prop-types';
import { FcContacts } from 'react-icons/fc';

function Section({ title, children }) {
  return (
    <section className={styles.sectionBook}>
      <div className={styles.titleStyle}>
        <FcContacts className={styles.icon} />
        <h2 className={styles.titleBook}>{title}</h2>
      </div>
      {children}
    </section>
  );
}
Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Section;
