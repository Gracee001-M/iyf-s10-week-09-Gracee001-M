import { useState, useEffect } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    // Runs after every render
    useEffect(() => {
        console.log('Effect ran! Count is:', count);
    });

    // Runs only on mount
    useEffect(() => {
        console.log('Component mounted!');
    }, []);

    // Runs when count changes
    useEffect(() => {
        console.log('Count changed to:', count);
        document.title = `Count: ${count}`;
    }, [count]);

    // Cleanup example
    useEffect(() => {
        const interval = setInterval(() => {
            console.log('Tick');
        }, 1000);

        return () => {
            clearInterval(interval);
            console.log('Cleaned up!');
        };
    }, []);

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
}

function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            setLoading(true);
            const response = await fetch(`/api/users/${userId}`);
            const data = await response.json();
            setUser(data);
            setLoading(false);
        }
        fetchUser();
    }, [userId]); // re-fetch when userId changes

    if (loading) return <p>Loading...</p>;
    return <div>{user.name}</div>;
}

function WindowSize() {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return <p>Window: {size.width} x {size.height}</p>;
}