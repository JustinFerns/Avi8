import React, { useEffect, useState } from 'react';

function MockTest() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://api.example.com/mocktest');
                if (!response.ok) throw new Error('Network response was not ok');
                const result = await response.json();
                // Additional data validation can go here
                if (!Array.isArray(result)) throw new Error('Data format is invalid');
                setData(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Mock Test</h1>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default MockTest;
