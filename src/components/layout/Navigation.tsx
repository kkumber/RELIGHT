import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="flex justify-between p-4">
      {/* Navigations */}
      <ul className=" flex gap-x-12 items-center">
        <li><Link to='/' className=""><b>RELIGHT</b></Link></li>
        <li className="font-semibold"><Link to='/'>Homepage</Link></li>
        <li className="font-semibold"><Link to='/addbook'>Add Book</Link></li>
        <li className="font-semibold"><Link to='/browse'>Browse</Link></li>
        <li className="font-semibold"><Link to='/search'>Search</Link></li>

      </ul>
      {/* Authorizations */}
      <div className="">
        <Link to='/login'><button className="py-1 px-4 rounded-xl bg-primaryRed text-white hover:-translate-y-1 hover:shadow-sm hover:shadow-gray-800">Sign in</button></Link>
      </div>
    </nav>
  );
};

export default Navigation;