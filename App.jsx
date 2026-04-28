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

function ThemeToggle() {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.body.className = theme;
    }, [theme]);

    return (
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            Toggle Theme ({theme})
        </button>
    );
}

import { useState, useEffect } from 'react';

function PostList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPosts() {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(
                    'https://jsonplaceholder.typicode.com/posts'
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }

                const data = await response.json();
                setPosts(data.slice(0, 10)); // First 10 posts
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, []);

    if (loading) return <div className="loading">Loading posts...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="post-list">
            {posts.map(post => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
}

function PostCard({ post }) {
    return (
        <article className="post-card">
            <h3>{post.title}</h3>
            <p>{post.body.slice(0, 100)}...</p>
        </article>
    );
}

// hooks/useFetch.js
import { useState, useEffect } from 'react';

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Fetch failed');
                }

                const json = await response.json();
                setData(json);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [url]);

    return { data, loading, error };
}

export default useFetch;

import useFetch from './hooks/useFetch';

function PostList() {
    const { data: posts, loading, error } = useFetch(
        'https://jsonplaceholder.typicode.com/posts'
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            {posts.map(post => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
}

// App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Posts from './pages/Posts';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="posts" element={<Posts />} />
                <Route path="about" element={<About />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

// App.jsx
<Route path="posts/:postId" element={<PostDetail />} />

import { useNavigate, NavLink } from 'react-router-dom';

function Navigation() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user data here
        navigate('/'); // Redirect to home
    };

    return (
        <nav>
            <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? 'active' : ''}
            >
                Home
            </NavLink>
            <NavLink to="/posts">Posts</NavLink>
            <NavLink to="/about">About</NavLink>

            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
}