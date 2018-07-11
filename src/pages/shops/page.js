import React from 'react';
import styles from './page.css';
import UsersComponent from './components/Shops/Shops';

function Shops() {
  return (
    <div className={styles.normal}>
      <UsersComponent />
    </div>
  );
}

export default Shops;
