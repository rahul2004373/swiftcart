// Dashboard.jsx
import {
  useUser,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import { UserProfile } from "@clerk/clerk-react";

export default function Dashboard() {
  return (
    <>
      <UserProfile />
    </>
  );
}
