import AdminServicesHeader from "@/components/dashboard/services/Admin-Service-Header";
import AdminServicesTable from "@/components/dashboard/services/Admin-Service-Table";


export default function AdminServicesPage() {
  return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AdminServicesHeader />
        <AdminServicesTable />
      </div>
  );
}
