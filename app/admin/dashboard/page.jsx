import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import AdminDashboard from "../admindashboard";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const authenticated =
    await isAdminAuthenticated();

  if (!authenticated) {
    redirect("/admin");
  }

  return <AdminDashboard />;
}