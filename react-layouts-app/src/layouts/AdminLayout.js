import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";


export default function AdminLayout() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <AdminHeader />

      <main className="flex-grow-1">
        <Outlet />
      </main>

      <AdminFooter />
    </div>
  );
}
