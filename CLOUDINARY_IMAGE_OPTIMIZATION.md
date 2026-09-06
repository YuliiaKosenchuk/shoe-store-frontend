# Cloudinary image optimization (тимчасове рішення)

**Дата:** 2026-09-06
**Причина:** вичерпана квота Vercel Image Optimization на Hobby-плані (6032 / 5000 трансформацій), через що частина картинок на проді повертала 402 і показувала alt-текст — найпомітніше на мобільній Safari.
**Мета зміни:** перенести ресайз і конвертацію форматів картинок з Cloudinary на бік самого Cloudinary (`f_auto,q_auto,c_limit,w_{width}`), щоб лічильник трансформацій Vercel більше не рахував ці запити.

**Це тимчасове рішення.** Коли квота на Vercel відновиться (новий білінг-період або апгрейд плану), його можна повністю відкотити — інструкція нижче.

---

## Що було зроблено

### 1. Новий файл — `src/components/ui/CloudinaryImage.tsx`

Обгортка над `next/image` з кастомним `loader`, яка сама формує URL з трансформаціями Cloudinary (`f_auto,q_auto,c_limit,w_{width}`) замість того, щоб next/image проксував запит через `/_next/image`. Працює і з повним `secure_url` (`.../upload/v1784.../name.png`), і з голим `public_id`. Cloud name береться зі змінної оточення `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` (значення в `.env.local`: `dmavecpcx`).

### 2. Заміна імпорту `Image` на `CloudinaryImage` у 9 файлах

У кожному з цих файлів рядок `import Image from "next/image";` замінено на `import { CloudinaryImage as Image } from "@/components/ui/CloudinaryImage";` (окрім `OrderSummaryPanel.tsx` — див. нижче). JSX-розмітка (`width`, `height`, `fill`, `sizes`, `priority`, `className`) не змінювалась.

| Файл | Що там за картинка |
|---|---|
| `src/app/[category]/[id]/_components/ColorSelector.tsx` | `img.mainUrl` (свотчі кольорів) |
| `src/app/[category]/[id]/_components/ProductImageGallery.tsx` | масив `images` (галерея товару) |
| `src/app/[category]/[id]/_components/ProductImageLightbox.tsx` | той самий масив (lightbox + thumbnails) |
| `src/components/ui/ProductCard.tsx` | `carouselImages` (картки товарів у каталозі) |
| `src/app/admin/catalog/page.tsx` | `product.images[0].mainUrl` (список товарів в адмінці) |
| `src/components/cart/CartDrawerItem.tsx` | `item.imageUrl` (випадаючий кошик) |
| `src/components/cart/CartPageItem.tsx` | `item.imageUrl` (сторінка кошика) |
| `src/app/checkout/complete/page.tsx` | `item.imageUrl \|\| getOrderItemImage(...)` (сторінка підтвердження замовлення) |
| `src/components/checkout/OrderSummaryPanel.tsx` | `item.imageUrl` — файл змішаний: додано окремий іменований імпорт `CloudinaryImage` лише для цього тега, іконка-стрілка (`/images/arrow-right-hero.svg`) лишилась на звичайному `next/image` |

### Що НЕ чіпали

- `next.config.ts` — без змін (`remotePatterns` лишили, бо він досі потрібен для прапорців у `PhoneField.tsx` (зовнішній CDN `purecatamphetamine.github.io`, не Cloudinary і не `/public`); `images.unoptimized` глобально не вмикали).
- `src/app/admin/catalog/[id]/page.tsx` та `src/components/admin/ImageManager.tsx` — свідомо не чіпали: там `<Image>` вже мають проп `unoptimized`, тобто вже не витрачають квоту Vercel.
- `src/components/forms/PhoneField.tsx` — прапорці з зовнішнього CDN, не з `/public`; не були в списку зламаного, лишили на звичайному `next/image`.

---

## 2. Локальні `/public`-картинки теж почали падати в 402 — причина й фікс

Після деплою (2026-09-06) з'ясувалося: квота Vercel Image Optimization вичерпана **не лише** для Cloudinary-запитів, а взагалі для всього акаунту. Локальні `/public`-картинки й далі йшли через `/_next/image` — той самий вичерпаний лічильник. Ті, чий конкретний розмір/формат уже був закешований на Edge раніше, показувались нормально; ті, для яких потрібна нова трансформація (інший viewport/пристрій), падали в 402 — саме той самий баг, що й був у Cloudinary-картинок, тільки тепер видно на:

- фоновій картинці Hero на головній (`hero-222.png`),
- картинці "bags" у секції категорій (`categories-bags.png`),
- фото команди на `/about-us` (backend/frontend),
- частині картинок у статтях, на які веде секція Editorials.

Ці файли важать від сотень КБ до кількох МБ (напр. `members/yuliia.png` — 5.8 МБ, `editorials/atelier-1.png` — 2 МБ), тому Vercel потрібно було генерувати нові варіанти щоразу.

### Фікс — `src/components/ui/UnoptimizedImage.tsx`

Ще одна тонка обгортка над `next/image`, яка форсує проп `unoptimized`. Це не змінює `next.config.ts` (глобальний `images.unoptimized` і далі вимкнений) — картинки просто віддаються напряму з `/public`, без ресайзу/конвертації формату на боці Vercel, і взагалі не торкаються метрованого пайплайну.

Замінено `import Image from "next/image";` на `import { UnoptimizedImage as Image } from "@/components/ui/UnoptimizedImage";` у 25 файлах, де джерело — виключно `/public`:

`about-us/page.tsx`, `checkout/payment/page.tsx`, `community/page.tsx`, `customer-service/page.tsx`, `editorials/[slug]/page.tsx`, `editorials/atelier-evora/page.tsx`, `editorials/between-sea-and-silence/page.tsx`, `materials/page.tsx`, `not-found.tsx`, `ShippingMethodSection.tsx`, `BestsellersSection.tsx`, `CategoriesSection.tsx`, `DiscountsSection.tsx`, `EditorialsSection.tsx`, `FeatureBar.tsx`, `Footer.tsx`, `Hero.tsx`, `HeroV2.tsx`, `HeroV3.tsx`, `HeroV4.tsx`, `MaterialsSection.tsx`, `SaleSection.tsx`, `SearchPanel.tsx`, `SocialSection.tsx`, `LogoComponent.tsx`.

У `OrderSummaryPanel.tsx` (файл змішаний) — залишковий `Image` для іконки-стрілки теж переведено на `UnoptimizedImage`, окремо від уже підключеного `CloudinaryImage` для `item.imageUrl`.

**Компроміс:** ці картинки тепер вантажаться як є, без ресайзу під viewport і без конвертації в сучасніші формати — трохи важче для мобільного трафіку, зате не падають у 402. Якщо хочеться повернути реальну оптимізацію без витрат квоти Vercel — варіант на майбутнє: залити ці ж файли в Cloudinary і перевести на `CloudinaryImage` так само, як product-картинки (README не описує це як зроблене — це лише ідея на потім).

---

## Як повністю відкотити обидві зміни

Якщо на момент відкату зміни ще НЕ закомічені окремим комітом:

1. Видалити файли `src/components/ui/CloudinaryImage.tsx` і `src/components/ui/UnoptimizedImage.tsx`.
2. У 9 файлах з таблиці вище повернути імпорт на `import Image from "next/image";`.
3. У 25 файлах зі списку локальних картинок вище — так само повернути `import Image from "next/image";`.
4. У `src/components/checkout/OrderSummaryPanel.tsx` — прибрати обидва кастомні імпорти, повернути єдиний `import Image from "next/image";`, замінити тег `<CloudinaryImage ...>` назад на `<Image ...>`.
5. `npm run build` — переконатися, що збірка проходить.

Якщо ці зміни закомічені окремим комітом — найпростіше:

```bash
git log --oneline -- src/components/ui/CloudinaryImage.tsx src/components/ui/UnoptimizedImage.tsx
git revert <hash-коміту(-ів)>
```

---

## Як перевірити в DevTools (Network → Img)

**Cloudinary-картинки** (картки товарів, кошик, підтвердження замовлення):
- Не повинно бути `/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2F...`
- Мають бути прямі запити на `res.cloudinary.com/dmavecpcx/image/upload/f_auto,q_auto,c_limit,w_XXX/...` зі статусом 200.

**Локальні `/public`-картинки** (Hero, категорії, команда, editorials тощо):
- Не повинно бути `/_next/image?url=%2Fimages%2F...` — запити йдуть напряму на `/images/...` (той самий origin, без проксі), статус 200.
