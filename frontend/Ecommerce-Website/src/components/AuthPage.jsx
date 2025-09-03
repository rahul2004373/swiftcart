import React from "react";
import { SignIn, SignUp } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom"; // To check current path

const AuthPage = () => {
  const location = useLocation();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      {location.pathname === "/sign-in" ? (
        <SignIn
          appearance={{ elements: { footerAction: { display: "none" } } }}
        />
      ) : (
        <SignUp
          appearance={{ elements: { footerAction: { display: "none" } } }}
        />
      )}
    </div>
  );
};

export default AuthPage;
