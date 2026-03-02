export default function OverlayPanel({ isActive, onToggle }) {
  return (
    <div className="overlay">
      <div className="overlay-content">
        {!isActive ? (
          <>
            <h2>Hello, Welcome!</h2>
            <p>Don&apos;t have an account yet? Create one in seconds.</p>
            <button className="ghost-btn" onClick={onToggle}>
              Register
            </button>
          </>
        ) : (
          <>
            <h2>Welcome Back!</h2>
            <p>Already have an account? Login and continue.</p>
            <button className="ghost-btn" onClick={onToggle}>
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}