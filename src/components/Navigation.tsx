import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
        <Link to='/'>Homepage</Link>
        <Link to='/register'>Register</Link>
        <Link to='/login'>Login</Link>
    </nav>
  );
};

export default Navigation;