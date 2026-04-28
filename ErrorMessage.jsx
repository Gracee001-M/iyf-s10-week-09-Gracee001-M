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
export default ErrorMessage;