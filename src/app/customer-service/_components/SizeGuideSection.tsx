import { sizeGuideSteps, sizeGuideTable } from "../_data/content";

export function SizeGuideSection() {
  return (
    <div className="font-(family-name:--font-jost) text-[16px] text-[#4E4E4E] leading-[1.3]">
      <h2 className="text-[16px] font-medium text-black mb-4">Size guide</h2>

      <p className="text-black mb-4">Need help finding your size?</p>

      <p className="mb-4">
        Our footwear follows standard European sizing. Please note that fit may vary slightly between styles due
        to differences in materials, construction, and design.
      </p>

      <p className="mb-4">
        If a particular style runs larger or smaller than usual, this information will be clearly indicated on
        the product page above the size selector.
      </p>

      <p className="mb-4">How to measure your foot:</p>
      <ol className="list-decimal pl-5 space-y-1 mb-8">
        {sizeGuideSteps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>

      <div className="overflow-x-auto">
        <table className="w-full md:w-120 border-collapse border border-[#CDCDCD] text-center">
          <thead>
            <tr>
              {sizeGuideTable.headers.map((header) => (
                <th
                  key={header}
                  className="whitespace-pre-line border border-[#EBEBEB] py-3 px-4 text-[16px] font-medium text-black"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sizeGuideTable.rows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, i) => (
                  <td key={i} className="border border-[#EBEBEB] py-3 px-4 text-[16px] text-[#343434]">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
