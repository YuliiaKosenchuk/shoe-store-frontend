export default function CatalogPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] px-6 py-14">
      <p className="text-[10px] tracking-widest text-gray-400 uppercase mb-4">Admin</p>
      <h1 className="font-serif text-3xl text-gray-900 mb-10">Catalog</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white border border-gray-100 p-5 flex flex-col gap-3">
            <div className="h-40 bg-gray-100" />
            <div className="h-3 w-2/3 bg-gray-200 rounded-sm" />
            <div className="h-3 w-1/3 bg-gray-100 rounded-sm" />
          </div>
        ))}
      </div>
    </div>
  );
}
