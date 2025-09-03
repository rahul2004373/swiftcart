// Logout.jsx
import { SignOutButton } from "@clerk/clerk-react";

export default function Logout() {
  return (
    <div style={{ marginTop: "20px" }}>
      <SignOutButton>
        <button>Log Out</button>
      </SignOutButton>
    </div>
  );
}
