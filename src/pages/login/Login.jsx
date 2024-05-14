import React, { useState } from "react";

import logo from "../../../public/assets/logo.png";
import { login, signup } from "../../util/firebase";
import netflix_spinner from "../../../public/assets/netflix_spinner.gif";
const Login = () => {
  const [signState, setSignState] = useState("Sign In");

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const user_auth = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (signState == "Sign In") {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
    setLoading(false);
  };

  return loading ? (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <img src={netflix_spinner} alt="spinner" />{" "}
    </div>
  ) : (
    <div className="login px-5 px-[8%] h-[100vh] pt-5">
      <img src={logo} alt="logo"  className="w-[150px]" />
      <div className=" w-full max-w-[450px] bg-[#000000bd] p-[60px] rounded-md m-auto">
        <h1 className="text-[32px] font-medium mb-7">{signState}</h1>
        <form className="flex flex-col ">
          {signState == "Sign Up" ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-ful bg-[#333] h-[50px] text-[#fff]  border-0 outline-0 rounded-md px-5  py-4 text-[16px] font-medium"
            />
          ) : (
            <></>
          )}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" Email"
            className="w-ful bg-[#333] h-[50px] text-[#fff]  border-0 outline-0 rounded-md px-5  my-4 py-4 text-[16px] font-medium"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="Password"
            placeholder=" Password"
            className="w-ful bg-[#333] h-[50px] text-[#fff]  border-0 outline-0 rounded-md px-5  py-4 text-[16px] font-medium"
          />
          <button
            onClick={user_auth}
            type="submit"
            className=" bg-[#e50914] w-full border-0 outline-0 p-4 text-[16px] text-[#fff] mt-5 rounded-md cursor-pointer"
          >
            Sign In
          </button>
          <div className="flex justify-between mt-3 items-center text-[#b3b3b3] text-[13px]">
            <div className="flex gap-[5px]">
              <input type="checkbox" className="w-[18px] h-[18px]" id="check" />
              <label htmlFor="check">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="mt-10 text-[#737373]">
          {signState == "Sign In" ? (
            <p>
              New to Netflix?{" "}
              <span
                onClick={() => setSignState("Sign Up")}
                className="text-[#fff] ml-2 cursor-pointer font-medium"
              >
                Sign Up Now
              </span>
            </p>
          ) : (
            <p>
              Already have account?{" "}
              <span
                onClick={() => setSignState("Sign In")}
                className="text-[#fff] ml-2 cursor-pointer font-medium"
              >
                Sign In Now
              </span>{" "}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
