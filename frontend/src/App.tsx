import "./index.css";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import { About } from "./pages/About";
import SignUp from "./pages/Signup";
import LoginPage from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import MyProfile from "./pages/dashboard/MyProfile";
import PageNotFound from "./pages/NotFoundPage";
import Settings from "./pages/dashboard/Settings";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import CreateCategory from "./pages/dashboard/CreateCategory";

function App() {
  // @ts-ignore
  const { user } = useSelector((state) => state.profile);
  return (
    <div className="w-screen min-h-screen flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/dashboard/my-profile" element={<MyProfile />} />
        <Route path="/dashboard/Settings" element={<Settings />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="update-password/:id" element={<UpdatePassword />} />
        <Route path="dashboard/create-category" element={<CreateCategory />} />
        <Route path="dashboard/cart" element={<Cart />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
