export default function UserCard({ user }) {
  return (
    <div style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "12px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
        }}>
      <strong style={{ fontSize: "16px"}}>{user.name}</strong>
      <p style={{ margin: "4px 0", color: "#555" }}>{user.email}</p>
      <p style={{ margin: 0, fontSize: "14px", color: "#777" }}>Company: {user.company.name}</p>
    </div>
  );
}