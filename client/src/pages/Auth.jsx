import { use, useState } from "react";
import toast from "react-hot-toast";
import { LOGIN_USER, REGISTER_USER } from "../apis/local.apis";
import { SelectedCategoryContext, UserContext } from "../contexts/all.context";
import { useNavigate } from "react-router-dom";
const TOAST_OPTIONS = {
  position: "top-center",
  duration: 1500,
};

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const { setUser } = use(UserContext);
  const { setCategory } = use(SelectedCategoryContext);
  const navigate = useNavigate();

  const handleFormData = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLoginForm = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password)
      return toast.error("enter all mandatory fields", TOAST_OPTIONS);
    let res = await fetch(LOGIN_USER, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userCred: formData.email,
        userPassword: formData.password,
      }),
    });
    if (res.status == 400)
      return toast.error("Missing Credentials", TOAST_OPTIONS);
    else if (res.status == 401)
      return toast.error("Invalid Credentials", TOAST_OPTIONS);
    res = await res.json();
    setUser({ ...res });
    setCategory("dashboard");
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "",
    });
    navigate("/");
    return;
  };

  const handleSignUpForm = async (e) => {
    e.preventDefault();
    if (
      !formData.email ||
      !formData.name ||
      !formData.password ||
      !formData.role
    )
      return toast.error("enter all mandatory fields", TOAST_OPTIONS);
    let res = await fetch(REGISTER_USER, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        userName: formData.name,
        userEmail: formData.email,
        userPassword: formData.password,
        userRole: formData.role,
      }),
    });
    if (res.status == 409)
      return toast.error("User Alreadiy Exists", TOAST_OPTIONS);
    else if (res.status == 400)
      return toast.error("Missing Credentials", TOAST_OPTIONS);
    res = await res.json();
    setUser({ ...res });
    setCategory("dashboard");
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "",
    });
    navigate("/");
    return;
  };
  const handleGuestLogin = async (name, password) => {
    let res = await fetch(LOGIN_USER, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userCred: name,
        userPassword: password,
      }),
    });
    if (res.status == 400)
      return toast.error("Missing Credentials", TOAST_OPTIONS);
    else if (res.status == 401)
      return toast.error("Invalid Credentials", TOAST_OPTIONS);
    res = await res.json();
    setUser({ ...res });
    setCategory("dashboard");
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "",
    });
    navigate("/");
    return;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-orange-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
        <div className="flex flex-col items-center mb-8">
          <span className="text-3xl font-extrabold text-green-700 tracking-tight mb-1">
            Wild Care Zoo
          </span>
          <span className="text-sm text-gray-400 font-medium">
            Welcome to the Zoo Management System
          </span>
        </div>
        <div className="flex mb-8 bg-gray-100 rounded-full p-1 transition-all duration-500">
          <button
            className={`flex-1 py-2 rounded-full text-lg font-semibold transition-all duration-500 ${
              isLogin
                ? "bg-green-500 text-white shadow"
                : "text-green-700 hover:bg-green-100"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 rounded-full text-lg font-semibold transition-all duration-500 ${
              !isLogin
                ? "bg-orange-400 text-white shadow"
                : "text-orange-500 hover:bg-orange-100"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </button>
        </div>
        <div className="relative h-72" style={{ minHeight: 280 }}>
          <div
            className={`absolute inset-0 transition-all duration-700 ${
              isLogin
                ? "opacity-100 translate-x-0 z-10"
                : "opacity-0 -translate-x-10 z-0 pointer-events-none"
            }`}
          >
            <form onSubmit={handleLoginForm} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Enter email or name"
                name="email"
                value={formData.email}
                onChange={handleFormData}
                className="border rounded-md px-4 py-2 focus:outline-none focus:border-green-500 transition"
                autoComplete="username"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleFormData}
                placeholder="Password"
                className="border rounded-md px-4 py-2 focus:outline-none focus:border-green-500 transition"
                autoComplete="current-password"
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-md transition"
              >
                Login
              </button>
              <span className="text-xs text-gray-400 text-center">
                Forgot password?
              </span>
            </form>
          </div>
          <div
            className={`absolute inset-0 transition-all duration-700 ${
              !isLogin
                ? "opacity-100 translate-x-0 z-10"
                : "opacity-0 translate-x-10 z-0 pointer-events-none"
            }`}
          >
            {/* Signup Form */}
            <form onSubmit={handleSignUpForm} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleFormData}
                className="border rounded-md px-4 py-2 focus:outline-none focus:border-orange-400 transition"
                autoComplete="name"
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleFormData}
                className="border rounded-md px-4 py-2 focus:outline-none focus:border-orange-400 transition"
                autoComplete="username"
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleFormData}
                className="border rounded-md px-4 py-2 focus:outline-none focus:border-orange-400 transition"
                autoComplete="new-password"
              />
              <select
                className="border rounded-md px-4 py-2 focus:outline-none focus:border-orange-400 transition text-gray-700"
                defaultValue=""
                required
                name="role"
                onChange={handleFormData}
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="manager">Manager</option>
                <option value="zookeeper">Zookeeper</option>
                <option value="veterinarian">Veterinarian</option>
                <option value="other">Other</option>
              </select>
              <button
                type="submit"
                className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 rounded-md transition"
              >
                Signup
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500 text-sm">
          {isLogin ? (
            <>
              New to Wild Care Zoo?{" "}
              <button
                className="text-orange-500 font-semibold hover:underline"
                onClick={() => setIsLogin(false)}
              >
                Create an account
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                className="text-green-700 font-semibold hover:underline"
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </>
          )}
          <div className="flex justify-center items-center text-[11px] text-gray-700 font-semibold py-2">
            <div
              onClick={() => handleGuestLogin("guest1", "guest")}
              className="flex justify-center items-center px-1 cursor-pointer hover:underline"
            >
              Guest Login (manager)
            </div>
            <div
              onClick={() => handleGuestLogin("guest2", "guest")}
              className="flex justify-center items-center px-1 cursor-pointer hover:underline"
            >
              Guest Login (zookeeper)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
