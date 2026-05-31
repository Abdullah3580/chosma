<<<<<<< HEAD
# চশমা.com — Chosma

বাংলাদেশের প্রিমিয়াম আইওয়্যার ড্রপশিপিং ওয়েবসাইট।

**Tech Stack:** Next.js 14 · TypeScript · Tailwind CSS · Supabase · Vercel

---

## 🚀 Quick Setup

### ১. Repository Clone করুন
```bash
git clone https://github.com/your-username/chosma.git
cd chosma
npm install
```

### ২. Supabase Setup

1. [supabase.com](https://supabase.com) এ যান → New Project তৈরি করুন
2. **SQL Editor** খুলুন → `supabase/migrations/001_initial.sql` ফাইলের সম্পূর্ণ কোড পেস্ট করুন → Run করুন
3. **Project Settings → API** থেকে নিচের তথ্য নিন:
   - `Project URL`
   - `anon public` key
   - `service_role` key (secret)

### ৩. Environment Variables

`.env.example` কপি করে `.env.local` তৈরি করুন:
```bash
cp .env.example .env.local
```

তারপর `.env.local` ফাইলে Supabase credentials বসান:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### ৪. Local এ চালান
```bash
npm run dev
```
→ http://localhost:3000 খুলুন

---

## 📦 GitHub → Vercel Deploy

### GitHub Push
```bash
git init
git add .
git commit -m "Initial commit: Chosma dropshipping site"
git branch -M main
git remote add origin https://github.com/your-username/chosma.git
git push -u origin main
```

### Vercel Deploy
1. [vercel.com](https://vercel.com) → **Add New Project**
2. GitHub repository import করুন
3. **Environment Variables** সেকশনে `.env.local` এর সব variable যোগ করুন
4. **Deploy** ক্লিক করুন ✅

---

## 📁 Project Structure

```
chosma/
├── app/
│   ├── layout.tsx          # Root layout (Header + Footer)
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles
│   ├── shop/
│   │   └── page.tsx        # Shop with category filter
│   ├── checkout/
│   │   └── page.tsx        # Checkout + order form
│   ├── orders/
│   │   └── page.tsx        # Order tracking by phone
│   ├── contact/
│   │   └── page.tsx        # Contact page
│   └── api/
│       ├── orders/route.ts # POST (place order) + GET (track)
│       └── products/route.ts
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Sticky header + nav + cart button
│   │   ├── Footer.tsx
│   │   └── Ticker.tsx      # Scrolling promo bar
│   └── shop/
│       ├── CartProvider.tsx # Global cart state (React Context)
│       ├── CartDrawer.tsx   # Slide-in cart
│       ├── HeroBanner.tsx   # Auto-sliding hero
│       ├── CategoryGrid.tsx
│       ├── ProductGrid.tsx  # Product cards with Add to Cart
│       ├── PromoBanners.tsx
│       └── FeatureStrip.tsx
├── lib/
│   ├── types.ts            # TypeScript interfaces
│   └── supabase/
│       ├── client.ts       # Browser client
│       └── server.ts       # Server client
└── supabase/
    └── migrations/
        └── 001_initial.sql # DB schema + seed data
```

---

## 🗄️ Database Tables

### `products`
| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| name | text | English name |
| name_bn | text | Bengali name |
| slug | text | URL slug (unique) |
| category | text | eyeglasses / sunglasses / designer / photochromic / free-frame / accessories |
| price | integer | Sale price (৳) |
| original_price | integer | Original price (৳) |
| discount_percent | integer | Auto-calculated |
| emoji | text | Display emoji |
| in_stock | boolean | |
| is_featured | boolean | Show on homepage |
| is_new_arrival | boolean | |

### `orders`
| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| customer_name | text | |
| customer_phone | text | Used for order tracking |
| customer_address | text | |
| district | text | |
| product_id | uuid | FK → products |
| product_name | text | Snapshot at order time |
| product_price | integer | |
| quantity | integer | |
| total_amount | integer | |
| status | text | pending / confirmed / processing / shipped / delivered / cancelled |

---

## 🔄 Order Flow

```
Customer → Chosma.com → আপনি manually দেখেন → Dukpion.com এ order করেন → আপনার নামে delivery → Customer কে পাঠান
```

**Orders দেখার উপায়:**
- Supabase Dashboard → Table Editor → orders table
- অথবা `/api/orders` endpoint (GET)

---

## ➕ নতুন পণ্য যোগ করা

Supabase Dashboard → SQL Editor:
```sql
INSERT INTO products (name, name_bn, slug, category, price, original_price, emoji, is_featured)
VALUES ('Product Name', 'পণ্যের নাম', 'unique-slug', 'sunglasses', 999, 1499, '🕶️', true);
```

---

## 🛠️ Customization

**রঙ পরিবর্তন:** `tailwind.config.js` → colors section  
**লোগো পরিবর্তন:** `components/layout/Header.tsx` → logo section  
**ফোন নম্বর:** `components/layout/Footer.tsx` + `app/contact/page.tsx`  
**ডেলিভারি চার্জ:** `app/checkout/page.tsx` → `delivery` variable  

---

## 📞 Support

কোনো সমস্যায়: info@chosma.com
=======
# chosma
>>>>>>> 95e4706f0f9d9eedb643db867c71427342aeb905
