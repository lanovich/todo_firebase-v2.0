import styles from './description.module.css';
import React from 'react';

interface DescriptionProps {
  children: React.ReactNode;
}

export const Description: React.FC<DescriptionProps> = ({ children }) => {
  return (
    <div className={styles.footer}>
      <p className={styles.footerText}>{children}</p>
    </div>
  );
};
