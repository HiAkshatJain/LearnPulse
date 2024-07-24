//@ts-nocheck
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfileDropDown from "../core/auth/ProfileDropDown";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  // const { totalItems } = useSelector((state) => state.cart)
  return (
    <nav className="pl-4 pr-4 inset-x-0 top-0 z-30 w-full border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6">
      <div className="px-4">
        <div className="flex items-center justify-between">
          <span className="font-bold text-2xl">LearnPulse</span>
          <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
            <a
              className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
              href="/"
            >
              Home
            </a>
            <a
              className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
              href="about"
            >
              About Us
            </a>
            <a
              className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
              href="contact"
            >
              Contact Us
            </a>
          </div>
          <div className="flex items-center justify-end gap-3">
            {user && user?.accountType === "student" && (
              <Link to="/dashboard/cart" className="relative">
                <AiOutlineShoppingCart className="text-[2.35rem] text-richblack-5 hover:bg-richblack-700 rounded-full p-2 duration-200" />
              </Link>
            )}

            {token === null && (
              <a
                className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
                href="/signup"
              >
                Sign up
              </a>
            )}

            {token === null && (
              <a
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                href="/login"
              >
                Login
              </a>
            )}

            {token !== null && <ProfileDropDown />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
