import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1 style={{ fontSize: '6rem', color: '#ff4040' }}>404</h1>
            <p style={{ fontSize: '1.5rem', color: '#555', marginBottom: "5em" }}>
                The page you're looking for was not found.
            </p>
            <Link
                to="/"
                style={{
                    color: 'white',
                    backgroundColor: '#007bff',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    textDecoration: 'none',

                }}
            >
                Return to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
