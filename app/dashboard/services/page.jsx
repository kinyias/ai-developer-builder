'use client';

import { useState } from 'react';
import AdminServicesHeader from "@/components/dashboard/services/Admin-Service-Header";
import AdminServicesTable from "@/components/dashboard/services/Admin-Service-Table";


export default function AdminServicesPage() {
  const [searchResults, setSearchResults] = useState([]);
  return (
      <div className="flex-1 space-y-4 p-8 pt-6">
         <AdminServicesHeader setSearchResults={setSearchResults} />
         <AdminServicesTable searchResults={searchResults} />
      </div>
  );
}
