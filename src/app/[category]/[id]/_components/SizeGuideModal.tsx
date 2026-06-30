"use client";

import { X } from "lucide-react";

interface SizeGuideModalProps {
  onClose: () => void;
}

const SIZE_TABLE = [
  { eu: 35, uk: 2, us: 5, cm: "22.3 – 22.9", inch: "8.8 – 9" },
  { eu: 36, uk: 3, us: 6, cm: "23.0 – 23.5", inch: "9.1 – 9.3" },
  { eu: 37, uk: 4, us: 7, cm: "23.6 – 24.2", inch: "9.3 – 9.5" },
  { eu: 38, uk: 5, us: 8, cm: "24.3 – 24.5", inch: "9.6 – 9.8" },
  { eu: 39, uk: 6, us: 9, cm: "25.0 – 25.5", inch: "9.8 – 10" },
  { eu: 40, uk: 7, us: 10, cm: "25.6 – 26.2", inch: "10.1 – 10.3" },
  { eu: 41, uk: 8, us: 11, cm: "26.3 – 26.9", inch: "10.4 – 10.6" },
  { eu: 42, uk: 9, us: 12, cm: "27.0 – 27.6", inch: "10.6 – 10.8" },
];

export function SizeGuideModal({ onClose }: SizeGuideModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 bg-white w-full max-w-lg mx-4 p-8 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#818181] hover:text-black transition-colors"
          aria-label="Close"
        >
          <X size={24} strokeWidth={1.25} />
        </button>

        <h2 className="font-(family-name:--font-cormorant-garamond) text-2xl font-semibold text-[#010101] mb-6">
          Size Guide
        </h2>

        <div className="space-y-3 font-(family-name:--font-jost) text-sm text-[#4E4E4E] leading-relaxed mb-6">
          <p>Need help finding your size?</p>
          <p>
            Our footwear follows standard European sizing. Please note that fit may vary slightly
            between styles due to differences in materials, construction, and design.
          </p>
          <p>
            If a particular style runs larger or smaller than usual, this information will be
            clearly indicated on the product page above the size selector.
          </p>
        </div>

        <div className="mb-6 bg-[#F9F6F2] p-5">
          <p className="font-(family-name:--font-jost) text-xs tracking-widest uppercase text-[#4E4E4E] mb-4">
            How to measure your foot
          </p>

          <svg
            viewBox="0 0 360 170"
            className="w-full"
            aria-label="Diagram showing how to measure foot length from heel to longest toe"
          >
            {/* Floor */}
            <line x1="30" y1="118" x2="340" y2="118" stroke="#C4BDB5" strokeWidth="1.5" />

            {/* Heel reference (wall) */}
            <line
              x1="52"
              y1="28"
              x2="52"
              y2="130"
              stroke="#C4BDB5"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />

            {/* Foot silhouette – side profile */}
            <path
              d="M 52 118
                 C 52 95, 59 76, 74 70
                 C 92 63, 116 70, 136 82
                 C 155 93, 164 103, 192 107
                 C 228 111, 272 113, 300 111
                 C 320 109, 328 113, 326 118
                 Z"
              fill="#EDE7DE"
              stroke="#010101"
              strokeWidth="1.25"
            />

            {/* Toe reference line */}
            <line
              x1="326"
              y1="28"
              x2="326"
              y2="130"
              stroke="#C4BDB5"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />

            {/* Measurement arrow */}
            <g stroke="#7A2633" strokeWidth="1.5" fill="none">
              <line x1="52" y1="142" x2="326" y2="142" />
              <polyline points="61,137 52,142 61,147" />
              <polyline points="317,137 326,142 317,147" />
            </g>

            {/* Measurement label */}
            <text
              x="189"
              y="160"
              textAnchor="middle"
              fontFamily="Jost, sans-serif"
              fontSize="11"
              fill="#4E4E4E"
              letterSpacing="0.06em"
            >
              Foot Length
            </text>

            {/* Wall label */}
            <text
              x="52"
              y="22"
              textAnchor="middle"
              fontFamily="Jost, sans-serif"
              fontSize="10"
              fill="#818181"
            >
              Wall
            </text>

            {/* Heel label */}
            <text
              x="52"
              y="135"
              textAnchor="middle"
              fontFamily="Jost, sans-serif"
              fontSize="9"
              fill="#818181"
            >
              Heel
            </text>

            {/* Toe label */}
            <text
              x="326"
              y="135"
              textAnchor="middle"
              fontFamily="Jost, sans-serif"
              fontSize="9"
              fill="#818181"
            >
              Toe
            </text>
          </svg>

          <ol className="mt-4 space-y-1.5 font-(family-name:--font-jost) text-xs text-[#4E4E4E] leading-relaxed list-decimal list-inside">
            <li>Stand on a flat surface with your heel against a wall.</li>
            <li>Place a ruler or measuring tape along the floor beside your foot.</li>
            <li>Measure the distance from your heel to your longest toe.</li>
            <li>Compare your measurement with the size chart below.</li>
          </ol>
        </div>

        <table className="w-full font-(family-name:--font-jost) text-sm text-[#010101] border-collapse">
          <thead>
            <tr className="border-b border-[#EBEBEB]">
              {["EU", "UK", "US", "Foot Length (cm)", "Foot Length (inch)"].map((h) => (
                <th
                  key={h}
                  className="py-2.5 text-center text-xs text-[#4E4E4E] font-normal tracking-wide"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SIZE_TABLE.map((row) => (
              <tr key={row.eu} className="border-b border-[#EBEBEB] last:border-0">
                <td className="py-2.5 text-center font-medium">{row.eu}</td>
                <td className="py-2.5 text-center text-[#4E4E4E]">{row.uk}</td>
                <td className="py-2.5 text-center text-[#4E4E4E]">{row.us}</td>
                <td className="py-2.5 text-center text-[#4E4E4E]">{row.cm}</td>
                <td className="py-2.5 text-center text-[#4E4E4E]">{row.inch}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
