"use client";
import { useState } from "react";
import AdminLogin from "./admin-login";
import AdminDashboard from "./admin-dashboard";

export default function AdminPage() {
  const [token, setToken] = useState<string>("");

  if (!token) {
    return <AdminLogin onLogin={setToken} />;
  }

  return <AdminDashboard token={token} />;
}
