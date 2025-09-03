// src/pages/SignInPage.jsx

import { SignIn } from "@clerk/clerk-react";

export default function LoginPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <SignIn path="/login" routing="path" signUpUrl="/sign-up" />
    </div>
  );
}
