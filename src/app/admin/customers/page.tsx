import { Container } from "@/components/ui/Container";

export default function CustomersPage() {
  const customers = [
    { name: "Anna Smith", email: "anna@example.com", orders: 4, joined: "2025-11-02" },
    { name: "Mark Lee", email: "mark@example.com", orders: 1, joined: "2026-01-15" },
    { name: "Sofia Brown", email: "sofia@example.com", orders: 7, joined: "2025-08-20" },
    { name: "James Kim", email: "james@example.com", orders: 2, joined: "2026-03-08" },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <Container className="px-6 py-14">
        <p className="text-[10px] tracking-widest text-gray-400 uppercase mb-4">Admin</p>
        <h1 className="font-serif text-3xl text-gray-900 mb-10">Customers</h1>

        <div className="bg-white border border-gray-100 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {["Name", "Email", "Orders", "Joined"].map((h) => (
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
              {customers.map((c) => (
                <tr key={c.email} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black text-white text-[9px] font-medium tracking-wide">
                        {c.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="text-xs font-medium text-gray-900">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs text-gray-500">{c.email}</td>
                  <td className="px-5 py-4 text-xs text-gray-700">{c.orders}</td>
                  <td className="px-5 py-4 text-xs text-gray-500">{c.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
}
