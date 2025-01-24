import { Link } from "react-router-dom";
import { useAccessTokenContext } from "../../utils/AuthProvider";
import SearchForm from "../Forms/SearchForm";

const Navigation = () => {
  const {accessToken, setAccessToken} = useAccessTokenContext();

  return (
    <nav className="flex justify-between p-4">
      {/* Navigations */}
      <ul className=" flex gap-x-12 items-center">
        <li><Link to='/' className=""><b>RELIGHT</b></Link></li>
        <li className="font-semibold"><Link to='/'>Homepage</Link></li>
        <li className="font-semibold"><Link to='/addbook'>Add Book</Link></li>
        <li className="font-semibold"><Link to='/browse'>Browse</Link></li>
        <li><SearchForm /></li>
      </ul>
      {/* Authorizations */}
      <div className="flex gap-8">
        <Link to='/login'><button onClick={() => setAccessToken('')} className="py-1 px-4 rounded-xl bg-primaryRed text-white hover:-translate-y-1 hover:shadow-sm hover:shadow-gray-800">
          {accessToken ? 'Sign out' : 'Sign in'}</button>
          </Link>
      </div>
    </nav>
  );
};

export default Navigation;