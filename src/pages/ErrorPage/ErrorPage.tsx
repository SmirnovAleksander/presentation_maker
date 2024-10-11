import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ErrorPage.module.css'

const ErrorPage: React.FC = () => {
    return (
        <div className={styles.errorPage}>
            <h1 className={styles.errorTitle}>404</h1>
            <h1>Страница не найдена</h1>
            <p>К сожалению такой страницы не существует.</p>
            <Link to="/">
                <button className={styles.errorButton}>Вернуться на главную</button>
            </Link>
        </div>
    );
};

export default ErrorPage;
