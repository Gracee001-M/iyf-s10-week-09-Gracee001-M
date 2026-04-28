
Task 17.4: Loading & Error States 🔴
Time: 45 minutes

Exercise: Professional Loading/Error Handling

// components/shared/LoadingSpinner.jsx
function LoadingSpinner({ size = 'medium', text = 'Loading...' }) {
    return (
        <div className={`loading-spinner ${size}`}>
            <div className="spinner"></div>
            <p>{text}</p>
        </div>
    );
}

// components/shared/ErrorMessage.jsx
function ErrorMessage({ message, onRetry }) {
    return (
        <div className="error-message">
            <span className="error-icon">⚠️</span>
            <p>{message}</p>
            {onRetry && (
                <button onClick={onRetry}>Try Again</button>
            )}
        </div>
    );
}

// Usage in component
function PostList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const fetchPosts = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch('/api/posts');
            const data = await response.json();
            setPosts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchPosts();
    }, []);
    
    if (loading) return <LoadingSpinner text="Loading posts..." />;
    if (error) return <ErrorMessage message={error} onRetry={fetchPosts} />;
    if (posts.length === 0) return <p>No posts found.</p>;
    
    return (
        <div className="post-list">
            {posts.map(post => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
}
