"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if not authenticated (backup for middleware)
  if (status === "loading") {
    return <div className="admin-dashboard">Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/admin/login");
    return null;
  }

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/admin/login");
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1 className="admin-title">Admin Dashboard</h1>
        <div className="admin-nav">
          <Link href="/" className="admin-nav-link">
            View Site
          </Link>
          <button onClick={handleSignOut} className="admin-nav-link">
            Sign Out
          </button>
        </div>
      </div>

      <div className="admin-content">
        <div className="admin-card">
          <h2 className="admin-card-title">Welcome, {session?.user?.name}</h2>
          <p className="admin-card-description">
            You are logged in as an administrator. From here you can manage your documentation.
          </p>
        </div>

        <div className="admin-card">
          <h2 className="admin-card-title">Quick Actions</h2>
          <div className="admin-nav">
            <Link href="/admin/upload" className="admin-nav-link">
              Upload New Documentation
            </Link>
            <Link href="/admin/manage" className="admin-nav-link">
              Manage Existing Pages
            </Link>
          </div>
        </div>

        <div className="admin-card">
          <h2 className="admin-card-title">System Status</h2>
          <p className="admin-card-description">
            Authentication: Active<br />
            Session expires in: 24 hours<br />
            Environment: {process.env.NODE_ENV}
          </p>
        </div>
      </div>
    </div>
  );
}