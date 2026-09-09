import { useUser } from "../contexts/UserContext.jsx";

function Header()  {
  const user = useUser();
  return <h1>{user.name}님, 안녕하세요</h1>;
}

export default Header;
