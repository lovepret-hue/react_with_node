import { Outlet } from "react-router-dom";
import PublicHeader from "../components/PublicHeader";
import PublicFooter from "../components/PublicFooter";

export default function PublicLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
  <PublicHeader />
  <main className="flex-grow-1 d-flex">
    <Outlet />
  </main>
  <PublicFooter />
</div>

  );
}
