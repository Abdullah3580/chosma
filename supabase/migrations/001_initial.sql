-- Products table
create table if not exists products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  name_bn text not null,
  slug text unique not null,
  category text not null check (category in ('eyeglasses','sunglasses','designer','photochromic','free-frame','accessories')),
  price integer not null,
  original_price integer not null,
  discount_percent integer generated always as (round((1 - price::numeric / original_price) * 100)) stored,
  emoji text default '👓',
  description text,
  in_stock boolean default true,
  is_featured boolean default false,
  is_new_arrival boolean default false,
  created_at timestamptz default now()
);

-- Orders table
create table if not exists orders (
  id uuid default gen_random_uuid() primary key,
  customer_name text not null,
  customer_phone text not null,
  customer_address text not null,
  district text not null,
  quantity integer default 1,
  note text,
  product_id uuid references products(id),
  product_name text not null,
  product_price integer not null,
  total_amount integer not null,
  status text default 'pending' check (status in ('pending','confirmed','processing','shipped','delivered','cancelled')),
  created_at timestamptz default now()
);

-- Enable RLS
alter table products enable row level security;
alter table orders enable row level security;

-- Public can read products
create policy "Anyone can view products" on products for select using (true);

-- Anyone can insert orders
create policy "Anyone can place orders" on orders for insert with check (true);

-- Seed products
insert into products (name, name_bn, slug, category, price, original_price, emoji, is_featured, is_new_arrival) values
  ('Trendy Men Square Sunglasses Blue Mirror','ট্রেন্ডি স্কোয়ার সানগ্লাস','trendy-square-sunglass',     'sunglasses',400,950,'🕶️',true,false),
  ('Light Weight Black Mix Color Eyeglass',  'লাইট ওয়েট ব্ল্যাক আইগ্লাস','lightweight-black-eyeglass',  'eyeglasses',675,1350,'👓',true,false),
  ('Black Transparent Color Sunglasses',     'ব্ল্যাক ট্রান্সপারেন্ট সানগ্লাস','black-transparent-sunglass', 'sunglasses',600,1199,'🕶️',true,false),
  ('Grey Geometric Shape Eyeglasses',        'গ্রে জিওমেট্রিক আইগ্লাস','grey-geometric-eyeglass',        'eyeglasses',500,999,'👓',false,false),
  ('Night Vision Premium Sunglasses',        'নাইট ভিশন সানগ্লাস','night-vision-sunglass',              'sunglasses',1100,2199,'🕶️',true,false),
  ('Unique Design Fashionable Sunglasses',   'ইউনিক ডিজাইন সানগ্লাস','unique-design-sunglass',          'sunglasses',750,1499,'🕶️',false,false),
  ('Round Shape Premium Eyeglass',           'রাউন্ড প্রিমিয়াম আইগ্লাস','round-premium-eyeglass',         'eyeglasses',1300,2599,'👓',false,false),
  ('Gorgeous Design Fashionable Sunglasses', 'গর্জিয়াস ডিজাইন সানগ্লাস','gorgeous-design-sunglass',      'sunglasses',2999,5999,'🕶️',false,false),
  ('New Arrival Black Fashionable Sunglass', 'নিউ অ্যারাইভাল ব্ল্যাক সানগ্লাস','new-arrival-black-sunglass','sunglasses',1124,1499,'🕶️',false,true),
  ('High Quality Light Weight Sunglass',     'হাই কোয়ালিটি লাইটওয়েট সানগ্লাস','hq-lightweight-sunglass',   'sunglasses',899,1199,'🕶️',false,true),
  ('New Arrival Stylish Sunglass',           'নতুন স্টাইলিশ সানগ্লাস','new-arrival-stylish-sunglass',    'sunglasses',1349,1799,'🕶️',false,true),
  ('Unique Shape Woman Sunglass',            'ইউনিক শেপ ওমেন সানগ্লাস','unique-shape-woman-sunglass',     'sunglasses',1125,1500,'🕶️',false,true),
  ('Premium Quality Durable Eyeglasses',     'প্রিমিয়াম ডিউরেবল আইগ্লাস','premium-durable-eyeglass',       'eyeglasses',3599,4799,'👓',false,false),
  ('Round Shape Kids Eyeglasses Purple',     'কিডস পার্পেল আইগ্লাস','kids-purple-eyeglass',             'eyeglasses',824,1099,'👓',false,false),
  ('Light Weight Premium Eyeglasses',        'লাইটওয়েট প্রিমিয়াম আইগ্লাস','lw-premium-eyeglass',           'eyeglasses',2399,3199,'👓',false,false),
  ('Golden Color Halfrim Eyeglasses',        'গোল্ডেন হাফরিম আইগ্লাস','golden-halfrim-eyeglass',          'eyeglasses',2399,3199,'👓',false,false),
  ('Luxurious Titanium Eyeglasses',          'লাক্সারি টাইটানিয়াম আইগ্লাস','luxurious-titanium-eyeglass',  'designer',14175,18900,'💎',true,false),
  ('Unique Design Premium Eyeglass',         'ইউনিক ডিজাইন প্রিমিয়াম আইগ্লাস','unique-premium-eyeglass',   'designer',5249,6999,'💎',false,false),
  ('Fashionable Premium Sunglasses Designer','ফ্যাশনেবল প্রিমিয়াম সানগ্লাস','fashionable-premium-sunglass', 'designer',5999,7999,'💎',false,false),
  ('Stylish Rectangle Frame Eyeglasses',     'স্টাইলিশ রেকটাঙ্গেল ফ্রেম','stylish-rectangle-eyeglass',      'designer',17249,22999,'💎',true,false),
  ('400UV Protective Baby Sunglasses',       '৪০০UV বেবি সানগ্লাস','baby-uv-sunglass',                  'sunglasses',749,999,'🕶️',false,false),
  ('Photochromic Adaptive Lens Eyeglass',    'ফটোক্রোমিক আইগ্লাস','photochromic-adaptive',              'photochromic',1800,2399,'🔵',false,true);
