import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="flex justify-between items-center">
      {/* Navigations */}
      <div className=" flex justify-between items-center">
          <Link to='/' className=""><b>RELIGHT</b></Link>
          <Link to='/'>Homepage</Link>
      </div>
      {/* Authorizations */}
      <div className="">
        <Link to='/login'>Sign in</Link>
      </div>
    </nav>
  );
};

export default Navigation;