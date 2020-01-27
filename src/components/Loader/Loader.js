import React from 'react';
import LoaderSpinner from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <LoaderSpinner
        type="ThreeDots"
        color="#00BFFF"
        height={200}
        width={200}
      />
    </div>
  );
};

export default Loader;
