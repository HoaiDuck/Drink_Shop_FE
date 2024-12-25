import { useAuth } from "../context/Authcontext";

const UserStatus = () => {
  const { user, logout } = useAuth;

  if (!user) {
    return <p>Bạn chưa đăng nhập</p>;
  }

  return (
    <div>
      <p>Chào, {user.name}!</p>
      <button onClick={logout}>Đăng xuất</button>
    </div>
  );
};

export default UserStatus;
