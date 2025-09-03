import { getAuth, clerkClient } from "@clerk/express";

const requireAdmin = async (req, res, next) => {
  try {
    const auth = getAuth(req);
    const userId = auth.userId;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await clerkClient.users.getUser(userId);
    if (user.publicMetadata?.role !== "admin") {
      return res.status(403).json({ message: "Admins only" });
    }

    next();
  } catch (err) {
    console.error("Admin check error:", err);
    res.status(500).json({ message: "Admin check failed" });
  }
};
export default requireAdmin;
