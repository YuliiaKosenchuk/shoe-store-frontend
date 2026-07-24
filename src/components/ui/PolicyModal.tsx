"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

type PolicyType = "terms" | "privacy" | "cookies";

const TERMS_CONTENT = (
  <>
    <p className="text-sm text-gray-500 mb-6">Effective date: January 1, 2025</p>

    <section className="mb-6">
      <h3 className="font-serif text-lg text-black mb-2">1. Acceptance of Terms</h3>
      <p>By accessing or using Sharman Store, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site.</p>
    </section>

    <section className="mb-6">
      <h3 className="font-serif text-lg text-black mb-2">2. Use of the Service</h3>
      <p>You may use our services only for lawful purposes and in accordance with these Terms. You agree not to use the service in any way that violates any applicable local, national, or international law or regulation.</p>
    </section>

    <section className="mb-6">
      <h3 className="font-serif text-lg text-black mb-2">3. Account Registration</h3>
      <p>When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding the password and for all activities that occur under your account.</p>
    </section>

    <section className="mb-6">
      <h3 className="font-serif text-lg text-black mb-2">4. Orders and Payments</h3>
      <p>All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order at any time. Prices for products are subject to change without notice. Payment must be received prior to acceptance of an order.</p>
    </section>

    <section className="mb-6">
      <h3 className="font-serif text-lg text-black mb-2">5. Returns and Refunds</h3>
      <p>We accept returns within 14 days of delivery for unworn items in their original packaging. Refunds are processed within 7–10 business days of receiving the returned item. Sale items are final and cannot be returned.</p>
    </section>

    <section className="mb-6">
      <h3 className="font-serif text-lg text-black mb-2">6. Intellectual Property</h3>
      <p>The service and its original content, features, and functionality are and will remain the exclusive property of Sharman Store. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Sharman Store.</p>
    </section>

    <section className="mb-6">
      <h3 className="font-serif text-lg text-black mb-2">7. Limitation of Liability</h3>
      <p>In no event shall Sharman Store, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, goodwill, or other intangible losses.</p>
    </section>

    <section className="mb-6">
      <h3 className="font-serif text-lg text-black mb-2">8. Changes to Terms</h3>
      <p>We reserve the right to modify or replace these Terms at any time at our sole discretion. We will provide notice of any significant changes by updating the effective date at the top of this page.</p>
    </section>

    <section>
      <h3 className="font-serif text-lg text-black mb-2">9. Contact Us</h3>
      <p>If you have any questions about these Terms, please contact us at <span className="text-[#7A2633]">support@sharmanstore.com</span>.</p>
    </section>
  </>
);

const PRIVACY_CONTENT = (
  <>
    <p className="text-sm text-gray-500 mb-6">Effective date: January 1, 2025</p>

    <section className="mb-6">
      <h3 className="font-serif text-lg text-black mb-2">1. Information We Collect</h3>
      <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This includes your name, email address, phone number, shipping address, and payment information.</p>
    </section>

    <section className="mb-6">
      <h3 className="font-serif text-lg text-black mb-2">2. How We Use Your Information</h3>
      <p>We use the information we collect to process transactions, send order confirmations and shipping updates, respond to your comments and questions, send marketing communications (with your consent), and improve our services.</p>
    </section>

    <section className="mb-6">
      <h3 className="font-serif text-lg text-black mb-2">3. Sharing of Information</h3>
      <p>We do not sell, trade, or otherwise transfer your personal information to third parties except to trusted partners who assist us in operating our website and conducting our business, provided that those parties agree to keep this information confidential.</p>
    </section>

    <section className="mb-6">
      <h3 className="font-serif text-lg text-black mb-2">4. Cookies</h3>
      <p>We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.</p>
    </section>

    <section className="mb-6">
      <h3 className="font-serif text-lg text-black mb-2">5. Data Security</h3>
      <p>We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure.</p>
    </section>

    <section className="mb-6">
      <h3 className="font-serif text-lg text-black mb-2">6. Data Retention</h3>
      <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.</p>
    </section>

    <section className="mb-6">
      <h3 className="font-serif text-lg text-black mb-2">7. Your Rights</h3>
      <p>You have the right to access, update, or delete the information we have on you. You may also object to processing of your personal data, request restriction of processing, and request portability of your data. To exercise these rights, please contact us.</p>
    </section>

    <section className="mb-6">
      <h3 className="font-serif text-lg text-black mb-2">8. Third-Party Links</h3>
      <p>Our service may contain links to other websites that are not operated by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>
    </section>

    <section>
      <h3 className="font-serif text-lg text-black mb-2">9. Contact Us</h3>
      <p>If you have any questions about this Privacy Policy, please contact us at <span className="text-[#7A2633]">privacy@sharmanstore.com</span>.</p>
    </section>
  </>
);

const COOKIES_CONTENT = (
  <>
    <p className="text-sm text-gray-500 mb-6">Effective date: January 1, 2025</p>

    <section className="mb-6">
      <h3 className="font-serif text-lg text-black mb-2">1. What Are Cookies</h3>
      <p>Cookies are small text files placed on your device by websites you visit. They are widely used to make websites work, or work more efficiently, as well as to provide information to the site owners.</p>
    </section>

    <section className="mb-6">
      <h3 className="font-serif text-lg text-black mb-2">2. Cookies We Use</h3>
      <p className="mb-3">We use the following categories of cookies:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Essential cookies</strong> — required for the website to function. They enable core features such as authentication and shopping cart. These cannot be disabled.</li>
        <li><strong>Analytics cookies</strong> — help us understand how visitors interact with our website by collecting and reporting information anonymously (e.g., pages visited, time spent).</li>
        <li><strong>Preference cookies</strong> — allow the website to remember choices you make (such as language or region) to provide a more personalised experience.</li>
        <li><strong>Marketing cookies</strong> — used to track visitors across websites and display relevant advertisements. We do not currently use these, but may introduce them in the future with your consent.</li>
      </ul>
    </section>

    <section className="mb-6">
      <h3 className="font-serif text-lg text-black mb-2">3. Duration</h3>
      <p>Session cookies are deleted when you close your browser. Persistent cookies remain on your device until they expire or you delete them. Most of our analytics cookies expire within 12 months.</p>
    </section>

    <section className="mb-6">
      <h3 className="font-serif text-lg text-black mb-2">4. Third-Party Cookies</h3>
      <p>Some cookies are set by third-party services that appear on our pages. We do not control these cookies. Please refer to the relevant third party&apos;s privacy policy for more information.</p>
    </section>

    <section className="mb-6">
      <h3 className="font-serif text-lg text-black mb-2">5. Managing Cookies</h3>
      <p>You can control and delete cookies through your browser settings. Note that disabling cookies may affect the functionality of this website. You can also withdraw your consent at any time by clearing your browser&apos;s local storage and cookies.</p>
    </section>

    <section>
      <h3 className="font-serif text-lg text-black mb-2">6. Contact Us</h3>
      <p>If you have any questions about our use of cookies, please contact us at <span className="text-[#7A2633]">privacy@sharmanstore.com</span>.</p>
    </section>
  </>
);

const CONFIG: Record<PolicyType, { title: string; content: React.ReactNode }> = {
  terms: { title: "Terms of Service", content: TERMS_CONTENT },
  privacy: { title: "Privacy Policy", content: PRIVACY_CONTENT },
  cookies: { title: "Cookie Policy", content: COOKIES_CONTENT },
};

interface PolicyModalProps {
  type: PolicyType | null;
  onClose: () => void;
}

export function PolicyModal({ type, onClose }: PolicyModalProps) {
  useEffect(() => {
    if (!type) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [type]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {type && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-2xl bg-white flex flex-col max-h-[85vh]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-8 pt-8 pb-4 border-b border-gray-100 shrink-0">
              <h2 className="font-serif text-2xl text-black">
                {CONFIG[type].title}
              </h2>
              <button
                onClick={onClose}
                aria-label="Close"
                className="text-gray-400 hover:text-black transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto px-8 py-6 text-[14px] text-gray-600 leading-relaxed space-y-0">
              {CONFIG[type].content}
            </div>

            <div className="px-8 pb-8 pt-4 shrink-0 border-t border-gray-100">
              <button
                onClick={onClose}
                className="w-full py-3 text-xs tracking-widest uppercase bg-[#010101] text-white hover:bg-[#2C2C2C] transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
