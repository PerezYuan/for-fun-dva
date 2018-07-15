import React from 'react';
import styles from './page.css';
import ServiceComponent from './components/Service/Service';

function Service() {
  return (
    <div className={styles.normal}>
      <ServiceComponent />
    </div>
  );
}

export default Service;
