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

- `next.config.ts` — без змін (`remotePatterns` лишили, бо він досі потрібен для не-Cloudinary картинок, напр. прапорців у `PhoneField.tsx`; `images.unoptimized` глобально не вмикали).
- Локальні картинки з `/public` — усі лишились на звичайному `next/image`.
- `src/app/admin/catalog/[id]/page.tsx` та `src/components/admin/ImageManager.tsx` — свідомо не чіпали: там `<Image>` вже мають проп `unoptimized`, тобто вже не витрачають квоту Vercel.

---

## Як повністю відкотити зміну

Якщо на момент відкату зміни ще НЕ закомічені окремим комітом — просто:

1. Видалити файл `src/components/ui/CloudinaryImage.tsx`.
2. У кожному з 9 файлів зі списку вище повернути імпорт назад на `import Image from "next/image";`.
3. У `src/components/checkout/OrderSummaryPanel.tsx` додатково прибрати рядок `import { CloudinaryImage } from "@/components/ui/CloudinaryImage";` і замінити тег `<CloudinaryImage ...>` (з `item.imageUrl`) назад на `<Image ...>`.
4. `npm run build` — переконатися, що збірка проходить.

Якщо ці зміни закомічені окремим комітом — найпростіше:

```bash
git log --oneline -- src/components/ui/CloudinaryImage.tsx
git revert <hash-коміту>
```

(або `git revert` діапазону комітів, якщо зміну розбито на кілька).

---

## Як перевірити, що зараз працює саме Cloudinary-варіант

У DevTools → Network → Img на сторінці товару, в кошику або на сторінці підтвердження замовлення:

- **Не повинно бути** запитів виду `/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2F...`
- **Мають бути** прямі запити на `res.cloudinary.com/dmavecpcx/image/upload/f_auto,q_auto,c_limit,w_XXX/...` зі статусом 200.
- Локальні картинки (Hero, Footer, категорії тощо) і далі йдуть через `/_next/image?url=%2Fimages%2F...` — це очікувано, вони поза межами цієї зміни.
