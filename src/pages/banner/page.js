import React from 'react';
import styles from './page.css';
import BannerComponent from './components/Banner/Banner';

function Service() {
  return (
    <div className={styles.normal}>
      <BannerComponent />
    </div>
  );
}

export default Service;
