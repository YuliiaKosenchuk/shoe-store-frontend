"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PolicyModal } from "@/components/ui/PolicyModal";

const STORAGE_KEY = "cookie_consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  };

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="max-w-336 mx-auto px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <p className="flex-1 text-[13px] text-gray-600 leading-relaxed [font-family:var(--font-jost)]">
                We use cookies to improve your experience on our site.{" "}
                <button
                  onClick={() => setPolicyOpen(true)}
                  className="underline underline-offset-2 text-[#7A2633] hover:text-black transition-colors"
                >
                  Cookie Policy
                </button>
              </p>
              <div className="flex gap-3 shrink-0">
                <button
                  onClick={handleDecline}
                  className="px-5 py-2.5 text-xs tracking-widest uppercase border border-black text-black hover:bg-gray-100 transition-colors [font-family:var(--font-jost)]"
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="px-5 py-2.5 text-xs tracking-widest uppercase bg-black text-white hover:bg-gray-900 transition-colors [font-family:var(--font-jost)]"
                >
                  Accept
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <PolicyModal
        type={policyOpen ? "cookies" : null}
        onClose={() => setPolicyOpen(false)}
      />
    </>
  );
}
