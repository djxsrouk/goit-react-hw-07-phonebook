import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './FilterSearch.module.css';
import { getStatusFilter } from '../../redux/selectors';
import { setStatusFilter } from '../../redux/filtersSlice';

function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector(getStatusFilter);

  const handleFilter = event => {
    dispatch(setStatusFilter(event.target.value));
  };

  return (
    <div className={styles.filterSection}>
      <h3 className={styles.filterTitle}>Find contacts by name:</h3>
      <input
        className={styles.filterInput}
        type="text"
        name="filter"
        value={filter}
        placeholder="Search contact"
        onChange={handleFilter}
        required
      />
    </div>
  );
}

export default Filter;
