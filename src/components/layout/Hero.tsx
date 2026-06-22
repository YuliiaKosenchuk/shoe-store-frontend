// "use client";

// import { useRef } from "react";
// import Image from "next/image";
// import { motion, useScroll, useTransform } from "framer-motion";

// export default function Hero() {
//   const ref = useRef(null);

//   // Налаштування паралаксу для тексту при скролі
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start start", "end start"],
//   });

//   // Текст буде повільно підніматися вгору при скролі
//   const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

//   return (
//     <section
//       ref={ref}
//       // Висота екрану. Якщо хедер фіксований, можна додати pt-[height]
//       className="relative w-full h-screen min-h-[600px] overflow-hidden bg-[#e9e7e2]"
//     >
//       {/* 1. НИЖНІЙ ШАР: Повне оригінальне фото */}
//       <div className="absolute inset-0 z-0">
//         <Image
//           src="/images/hero-11.jpg"
//           alt="Hero background"
//           fill
//           priority
//           className="object-cover object-center"
//         />
//       </div>

//       {/* 2. СЕРЕДНІЙ ШАР: Текст із паралаксом та анімацією появи */}
//       <motion.div
//         style={{ y: textY }}
//         className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
//       >
//         <motion.h1
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
//           className="text-black text-[12vw] md:text-[140px] lg:text-[200px] font-medium tracking-tight whitespace-nowrap"
//         >
//           <span className="mr-35">your per</span>
//           <span>sonality</span>
//         </motion.h1>
//       </motion.div>

//       {/* 3. ВЕРХНІЙ ШАР: Вирізана дівчина (PNG з прозорим фоном!) */}
//       <div className="absolute inset-0 z-20 pointer-events-none">
//         <Image
//           src="/images/hero-22.png"
//           alt="Model front layer"
//           fill
//           priority
//           className="object-cover object-center"
//         />
//       </div>
//     </section>
//   );
// }

"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const ref = useRef(null);

  // Налаштування паралаксу для тексту при скролі
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // ЗБІЛЬШЕНО ПАРАЛАКС: Тепер текст підніматиметься до 50% замість 40%
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section
      ref={ref}
      className="relative w-full h-screen min-h-150 overflow-hidden bg-[#ece9e2]"
    >
      <motion.div
        style={{ y: textY }}
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className="text-[#2c2c2c] font-serif text-[12vw] md:text-[140px] lg:text-[180px] tracking-tight whitespace-nowrap -translate-y-25 drop-shadow-md"
        >
          <span className="mr-[15vw] md:mr-56">MODERN</span>
          <span>LUXE</span>
        </motion.h1>
      </motion.div>

      <div className="absolute inset-0 z-20 pointer-events-none">
        <Image
          src="/images/hero-22.png"
          alt="Model front layer"
          fill
          priority
          className="object-cover object-center"
        />
      </div>
    </section>
  );
}