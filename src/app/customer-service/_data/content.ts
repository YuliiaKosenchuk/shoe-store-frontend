export type AnswerBlock =
  | { kind: "p"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "subsection"; title: string; text: string };

export interface FaqItem {
  id: string;
  question: string;
  answer: string | AnswerBlock[];
}

export type FaqSection =
  | { id: string; label: string; type: "accordion"; items: FaqItem[] }
  | { id: string; label: string; type: "size-guide" };

export const faqSections: FaqSection[] = [
  {
    id: "cookies",
    label: "Cookies",
    type: "accordion",
    items: [
      {
        id: "cookies-what-are-cookies",
        question: "What are cookies?",
        answer:
          "Cookies are small text files stored on your device when you visit a website. They help the website remember your preferences, improve functionality, and understand how visitors use the site.",
      },
      {
        id: "cookies-types",
        question: "What types of cookies do we use?",
        answer: [
          {
            kind: "subsection",
            title: "Essential cookies",
            text: "These cookies are necessary for the website to function properly. They enable features such as shopping carts, checkout, account access, and secure areas of the website.",
          },
          {
            kind: "subsection",
            title: "Preference cookies",
            text: "These cookies remember choices you make, such as language, region, or other preferences, to provide a more personalized experience.",
          },
          {
            kind: "subsection",
            title: "Analytics cookies",
            text: "These cookies help us understand how visitors interact with our website, such as which pages are visited most often and how users navigate the site.",
          },
          {
            kind: "subsection",
            title: "Marketing cookies",
            text: "Where applicable, these cookies may be used to deliver more relevant advertising and measure the effectiveness of marketing campaigns.",
          },
        ],
      },
      {
        id: "cookies-required",
        question: "Are cookies required?",
        answer:
          "Some cookies are essential for the website to function and cannot be disabled through our cookie settings.\n\nOther types of cookies are optional and can be accepted or rejected through our cookie consent tool.\n\nPlease note that disabling certain cookies may affect the functionality or availability of some features.",
      },
      {
        id: "cookies-control",
        question: "How can I control or change my cookie preferences?",
        answer:
          "You can manage your cookie preferences through the cookie banner or cookie settings available on our website.\n\nYou can also change your browser settings to block or delete cookies. However, doing so may affect your experience on our website.",
      },
      {
        id: "cookies-third-parties",
        question: "Do third parties use cookies?",
        answer:
          "Yes. Some third-party services we use may place cookies or similar technologies on your device.\n\nThese services may include analytics, payment, advertising, social media, or other technology providers. Their use of cookies is governed by their own privacy policies.",
      },
      {
        id: "cookies-how-long",
        question: "How long do cookies stay on my device?",
        answer:
          "Some cookies are deleted automatically when you close your browser. These are known as session cookies.\n\nOther cookies remain on your device for a specific period or until you delete them. These are known as persistent cookies.\n\nThe storage period depends on the purpose of each cookie.",
      },
      {
        id: "cookies-delete",
        question: "Can I delete cookies?",
        answer:
          "Yes. You can delete cookies at any time through your browser settings.\n\nPlease note that removing or blocking cookies may cause certain website features to work incorrectly or become unavailable.",
      },
      {
        id: "cookies-policy-change",
        question: "Will this Cookie Policy change?",
        answer:
          "Yes. We may update this Cookie Policy from time to time to reflect changes in our website, technologies, services, or legal requirements.",
      },
    ],
  },
  {
    id: "care-instructions",
    label: "Care Instructions",
    type: "accordion",
    items: [
      {
        id: "care-shoes",
        question: "How should I care for my shoes?",
        answer:
          "To keep your shoes looking their best, clean them regularly with a soft, dry or slightly damp cloth. Avoid excessive moisture and allow them to air dry naturally. Store your shoes in a cool, dry place away from direct sunlight and heat.",
      },
      {
        id: "care-leather",
        question: "How do I clean leather shoes?",
        answer:
          "Use a soft cloth to gently remove dust and dirt. For deeper cleaning, use a leather cleaner suitable for the specific type of leather. Avoid soaking the shoes or using harsh household cleaning products.",
      },
      {
        id: "care-suede",
        question: "How do I care for suede or nubuck shoes?",
        answer:
          "Gently remove dirt using a soft suede brush. Avoid water and excessive moisture, as they can damage the texture and appearance of the material. For stubborn stains, we recommend using a specialist suede or nubuck cleaner.",
      },
      {
        id: "care-washing-machine",
        question: "Can I wash my shoes in a washing machine?",
        answer:
          "No. We do not recommend machine washing our shoes. Washing machines, strong detergents and excessive water can damage the materials, shape and construction of the shoes.",
      },
      {
        id: "care-dry",
        question: "How should I dry my shoes?",
        answer:
          "If your shoes become wet, gently wipe away excess moisture and leave them to dry naturally at room temperature. Do not use radiators, hairdryers or other direct heat sources, as heat can cause materials to dry out, crack or lose their shape.",
      },
      {
        id: "care-store",
        question: "How should I store my shoes?",
        answer:
          "Store your shoes in a cool, dry place away from direct sunlight and heat. Keep them in their original box or a dust bag when possible. Avoid storing shoes in damp or humid areas.",
      },
      {
        id: "care-handbag",
        question: "How do I care for my handbag?",
        answer:
          "Wipe your handbag gently with a soft, dry cloth to remove dust and everyday dirt. Avoid prolonged exposure to water, oils, cosmetics and direct sunlight. When not in use, store the bag in a dust bag and keep its shape by filling it lightly with clean tissue paper.",
      },
      {
        id: "care-bag-wet",
        question: "What should I do if my bag gets wet?",
        answer:
          "Gently blot the moisture with a clean, dry cloth and allow the bag to dry naturally at room temperature. Do not rub the material or use direct heat.",
      },
      {
        id: "care-protect",
        question: "How can I protect my shoes and bags?",
        answer:
          "For additional protection, use care products specifically designed for the material of your item. Always test any product on a small, hidden area first and follow the product manufacturer's instructions.",
      },
      {
        id: "care-colour-change",
        question: "Can the colour or texture change over time?",
        answer:
          "Yes. Natural materials such as leather, suede and nubuck may develop a unique patina and subtle changes in colour or texture with use. These changes are a natural characteristic of the material and are not considered defects.",
      },
    ],
  },
  {
    id: "size-guide",
    label: "Size Guide",
    type: "size-guide",
  },
  {
    id: "privacy-policy",
    label: "Privacy Policy",
    type: "accordion",
    items: [
      {
        id: "privacy-what-collect",
        question: "What information does Atelier collect?",
        answer:
          "When you visit our website or place an order, we may collect information that helps us provide and improve our services.\n\nThis may include your name, email address, phone number, billing and shipping address, order details, payment information, IP address, browser type, device information and information about how you interact with our website.",
      },
      {
        id: "privacy-why-collect",
        question: "Why do you collect my personal information?",
        answer: [
          { kind: "p", text: "We use your information to:" },
          {
            kind: "list",
            items: [
              "process and deliver your orders;",
              "process payments;",
              "provide order confirmations and invoices;",
              "communicate with you about your order;",
              "manage returns, refunds and exchanges;",
              "provide customer support;",
              "prevent fraud and unauthorised activity;",
              "improve our website and services;",
              "understand how customers use our website;",
              "send marketing communications where you have given consent;",
              "comply with legal and regulatory requirements.",
            ],
          },
        ],
      },
      {
        id: "privacy-cookies",
        question: "What are cookies and how does Atelier use them?",
        answer:
          "We use cookies and similar technologies to make our website work properly and to understand how visitors use it.\n\nSome cookies are essential for features such as shopping carts, checkout and website security.\n\nOther cookies may be used for analytics, personalisation or advertising and require your consent.\n\nYou can manage or withdraw your cookie preferences through our Cookie Settings.",
      },
      {
        id: "privacy-analytics",
        question: "Does Atelier use analytics?",
        answer:
          "Yes. We may use services such as Google Analytics to understand how visitors interact with our website.\n\nAnalytics may collect information about your device, website activity and general usage patterns.\n\nWhere required by law, analytics cookies will only be activated after you give your consent.",
      },
      {
        id: "privacy-share",
        question: "Who do you share my information with?",
        answer: [
          {
            kind: "p",
            text: "We may share your Personal Information with trusted service providers that help us operate our business.",
          },
          { kind: "p", text: "These may include:" },
          {
            kind: "list",
            items: [
              "Shopify and other e-commerce providers;",
              "payment processors;",
              "shipping and delivery companies;",
              "analytics providers;",
              "customer support services;",
              "fraud prevention services;",
              "technical and hosting providers.",
            ],
          },
          {
            kind: "p",
            text: "We only share information when it is necessary to provide a service, comply with the law or protect our legitimate interests.",
          },
        ],
      },
      {
        id: "privacy-payment",
        question: "Is my payment information stored by Atelier?",
        answer:
          "Your payment information may be processed by our third-party payment providers.\n\nWhere applicable, Atelier does not store your complete payment card details on its own servers.\n\nPayment providers may process your information according to their own privacy policies and applicable security requirements.",
      },
      {
        id: "privacy-advertising",
        question: "Do you use my information for advertising?",
        answer:
          "We may use your information to provide relevant marketing communications about Atelier products, collections and promotions.\n\nWe will only send marketing communications where we have a legal basis to do so, including your consent where required.\n\nYou can unsubscribe from marketing emails at any time by using the unsubscribe link in the email.",
      },
      {
        id: "privacy-how-long",
        question: "How long do you keep my information?",
        answer:
          "We keep your Personal Information only for as long as necessary for the purposes for which it was collected.\n\nOrder and transaction information may be retained for as long as necessary to fulfil our contractual, accounting, tax and legal obligations.\n\nWhen information is no longer required, we will delete or anonymise it where reasonably possible.",
      },
      {
        id: "privacy-transfer",
        question: "Is my information transferred outside the European Union?",
        answer:
          "Some of our service providers may process your Personal Information outside Germany or the European Economic Area.\n\nWhen this happens, we take appropriate safeguards required by applicable data protection laws, including GDPR-approved transfer mechanisms where necessary.",
      },
      {
        id: "privacy-protect",
        question: "How do you protect my information?",
        answer:
          "We apply appropriate technical and organisational measures to protect your Personal Information against unauthorised access, loss, misuse or disclosure.\n\nHowever, no online service can guarantee complete security of information transmitted over the internet.",
      },
    ],
  },
  {
    id: "shipping-policy",
    label: "Shipping Policy",
    type: "accordion",
    items: [
      {
        id: "shipping-countries",
        question: "Which countries do you ship to?",
        answer:
          "We ship to selected countries across Europe and internationally. Available destinations and shipping options are shown at checkout based on your delivery address.",
      },
      {
        id: "shipping-processing",
        question: "How long does order processing take?",
        answer:
          "Orders are usually processed within 1–2 business days after payment is received. Orders placed on weekends or public holidays are processed on the next business day.",
      },
      {
        id: "shipping-delivery-time",
        question: "How long does delivery take?",
        answer: [
          {
            kind: "p",
            text: "Delivery times depend on your location and selected shipping method:",
          },
          {
            kind: "list",
            items: ["Standard Shipping: 3–7 business days", "Express Shipping: 1–3 business days"],
          },
          {
            kind: "p",
            text: "Delivery times are estimates and may be affected by customs, weather, or carrier delays.",
          },
        ],
      },
      {
        id: "shipping-cost",
        question: "How much does shipping cost?",
        answer:
          "Shipping costs are calculated at checkout based on your delivery address and selected shipping method.",
      },
      {
        id: "shipping-track",
        question: "How can I track my order?",
        answer:
          "Once your order has been shipped, you'll receive an email with your tracking information. Please allow 24–48 hours for tracking updates to appear.",
      },
      {
        id: "shipping-customs",
        question: "Will I have to pay customs or import fees?",
        answer:
          "For international orders, customs duties, import taxes, or local fees may apply depending on your country. These charges are the customer's responsibility unless stated otherwise.",
      },
      {
        id: "shipping-delayed",
        question: "What should I do if my order is delayed or lost?",
        answer:
          "First, check your tracking information. If your parcel has not arrived within the estimated timeframe or appears to be lost, contact our Customer Support team and we'll help resolve the issue with the carrier.",
      },
      {
        id: "shipping-change-address",
        question: "Can I change my shipping address after placing an order?",
        answer:
          "Please contact us as soon as possible if you notice an error in your shipping address. We'll do our best to update it before dispatch. Once your order has been shipped, the address may no longer be changed.",
      },
      {
        id: "shipping-damaged",
        question: "What if my package arrives damaged?",
        answer:
          "Please contact us as soon as possible and provide photos of the damaged packaging and item. We'll review the case and help you find a suitable solution.",
      },
      {
        id: "shipping-contact",
        question: "Who can I contact about my delivery?",
        answer:
          "If you have any questions about your order or delivery, our Customer Support team is happy to help.",
      },
    ],
  },
  {
    id: "returns-policy",
    label: "Returns Policy",
    type: "accordion",
    items: [
      {
        id: "returns-time-limit",
        question: "How long do I have to return my order?",
        answer: "You can request a return within 14 days of receiving your order.",
      },
      {
        id: "returns-condition",
        question: "What condition must the item be in?",
        answer:
          "Items must be unworn, unused, and in their original condition, with all original packaging, tags, and accessories. Shoes should only be tried on indoors on a clean, soft surface.",
      },
      {
        id: "returns-how-to-start",
        question: "How do I start a return?",
        answer:
          "Contact our Customer Support team within 14 days of delivery and provide your order number and the item you would like to return. We will send you the return instructions once your request has been approved.",
      },
      {
        id: "returns-shipping-cost",
        question: "Do I have to pay for return shipping?",
        answer:
          "Unless the item is faulty, damaged, or incorrect, return shipping costs are the responsibility of the customer. We recommend using a tracked shipping service.",
      },
      {
        id: "returns-refund",
        question: "When will I receive my refund?",
        answer:
          "Once we receive and inspect your return, we will confirm whether the refund has been approved. Refunds are issued to your original payment method and usually take 5–10 business days to appear in your account.",
      },
      {
        id: "returns-exchange",
        question: "Can I exchange an item?",
        answer:
          "Yes. If you need a different size or another item, please contact our Customer Support team. Depending on availability, we may ask you to return the original item and place a new order.",
      },
      {
        id: "returns-damaged-incorrect",
        question: "What if I received a damaged or incorrect item?",
        answer:
          "Please contact us as soon as possible and provide your order number and photos of the item. If the item is confirmed to be faulty or incorrectly sent, we will cover the reasonable return shipping costs.",
      },
      {
        id: "returns-sale-items",
        question: "Are sale items eligible for return?",
        answer:
          "Sale items may be subject to specific return conditions. Any applicable restrictions will be clearly stated on the product page or at checkout.",
      },
      {
        id: "returns-cannot-be-returned",
        question: "What items cannot be returned?",
        answer:
          "We cannot accept returns for items that have been worn, used, damaged after delivery, returned without their original packaging or tags, or sent after the 14-day return period.",
      },
      {
        id: "returns-help",
        question: "Can I get help with my return?",
        answer:
          "Of course. If you have any questions about your return or refund, please contact our Customer Support team. We'll be happy to help.",
      },
    ],
  },
];

export const lastUpdatedBySection: Record<string, string> = {
  cookies: "17.08.2026",
  "care-instructions": "17.08.2026",
  "size-guide": "17.08.2026",
  "privacy-policy": "17.08.2026",
  "shipping-policy": "17.08.2026",
  "returns-policy": "17.08.2026",
};

export const sizeGuideTable = {
  headers: ["EU", "UK", "US", "Foot Lenght (cm)", "Foot Lenght\n(inch)"],
  rows: [
    ["35", "2", "5", "22.3 - 22.9", "8.8 - 9"],
    ["36", "3", "6", "23.0 - 23.5", "9.1 - 9.3"],
    ["37", "4", "7", "23.6 - 24.2", "9.3 - 9.5"],
    ["38", "5", "8", "24.3 - 24.5", "9.6 - 9.8"],
    ["39", "6", "9", "25.0 - 25.5", "9.8 - 10"],
    ["40", "7", "10", "25.6 - 26.2", "10.1 - 10.3"],
    ["41", "8", "11", "26.3 - 26.9", "10.4 - 10.6"],
    ["42", "9", "12", "27.0 - 27.6", "10.6 - 10.8"],
  ],
};

export const sizeGuideSteps = [
  "Stand on a flat surface with your heel against a wall.",
  "Place a ruler or measuring tape along the floor beside your foot.",
  "Measure the distance from your heel to your longest toe.",
  "Compare your measurement with the size chart to find your recommended size.",
];
