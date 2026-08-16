"use client";

import { X } from "lucide-react";
import { sizeGuideSteps, sizeGuideTable } from "@/app/customer-service/_data/content";

interface SizeGuideModalProps {
  onClose: () => void;
}

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

        <div className="mb-6 bg-[#F8F8F8] p-5">
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
              fill="#F8F8F8"
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
            {sizeGuideSteps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full font-(family-name:--font-jost) border-collapse border border-[#CDCDCD] text-center">
            <thead>
              <tr>
                {sizeGuideTable.headers.map((header) => (
                  <th
                    key={header}
                    className="whitespace-pre-line border border-[#EBEBEB] py-2.5 px-3 text-sm font-medium text-black"
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
                    <td key={i} className="border border-[#EBEBEB] py-2.5 px-3 text-sm text-[#343434]">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
