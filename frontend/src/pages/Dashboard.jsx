import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: 30 }}>
      <h1>Dashboard</h1>
      <p>Welcome {user?.username || user?.email || "User"}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}