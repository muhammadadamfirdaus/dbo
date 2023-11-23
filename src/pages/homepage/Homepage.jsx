import React from "react";
import Button from "../../components/utilities/button/button";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="font-bold text-2xl">Homepage</h1>
      <div className="flex mt-6">
        <div className="mx-2">
          <Link to={"/login"}>
            <Button>Login</Button>
          </Link>
        </div>
        <div className="mx-2">
          <Link to={"/login"}>
            <Button>Register</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
