import React from "react";
import { Link } from "react-router-dom";
import styles from "./not-found-page.module.css";

export const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.notFoundContainer}>
      <h1>Ошибка 404</h1>
      <p>Страница не найдена</p>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
};