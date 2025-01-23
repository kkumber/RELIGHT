import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="flex justify-between p-4">
      {/* Navigations */}
      <ul className=" flex gap-x-12 items-center">
        <li><Link to='/' className=""><b>RELIGHT</b></Link></li>
        <li className="font-semibold"><Link to='/'>Homepage</Link></li>
        <li className="font-semibold"><Link to='/addbook'>Add Book</Link></li>
      </ul>
      {/* Authorizations */}
      <div className="">
        <Link to='/login'>Sign in</Link>
      </div>
    </nav>
  );
};

export default Navigation;