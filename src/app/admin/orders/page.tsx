export default function OrdersPage() {
  const rows = [
    { id: "#00124", customer: "Anna Smith", date: "2026-06-10", status: "Delivered", total: "$340" },
    { id: "#00123", customer: "Mark Lee", date: "2026-06-09", status: "Processing", total: "$210" },
    { id: "#00122", customer: "Sofia Brown", date: "2026-06-08", status: "Shipped", total: "$590" },
    { id: "#00121", customer: "James Kim", date: "2026-06-07", status: "Cancelled", total: "$120" },
  ];

  const statusColor: Record<string, string> = {
    Delivered: "text-green-600",
    Processing: "text-yellow-600",
    Shipped: "text-blue-600",
    Cancelled: "text-red-500",
  };

  return (
    <div className="min-h-screen bg-[#F2EDE6] px-6 py-14">
      <p className="text-[10px] tracking-widest text-gray-400 uppercase mb-4">Admin</p>
      <h1 className="font-serif text-3xl text-gray-900 mb-10">Orders</h1>

      <div className="bg-white border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              {["Order", "Customer", "Date", "Status", "Total"].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3 text-left text-[10px] tracking-widest text-gray-400 uppercase font-medium"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4 text-xs font-medium text-gray-900">{row.id}</td>
                <td className="px-5 py-4 text-xs text-gray-700">{row.customer}</td>
                <td className="px-5 py-4 text-xs text-gray-500">{row.date}</td>
                <td className={`px-5 py-4 text-xs font-medium ${statusColor[row.status]}`}>{row.status}</td>
                <td className="px-5 py-4 text-xs text-gray-900">{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
