export type Category = 'eyeglasses' | 'sunglasses' | 'designer' | 'photochromic' | 'free-frame' | 'accessories'

export interface Product {
  id: string
  name: string
  name_bn: string
  slug: string
  category: Category
  price: number
  original_price: number
  discount_percent: number
  emoji: string
  description?: string
  in_stock: boolean
  is_featured: boolean
  is_new_arrival: boolean
  created_at: string
}

export interface Order {
  id: string
  customer_name: string
  customer_phone: string
  customer_address: string
  district: string
  quantity: number
  note?: string
  product_id: string
  product_name: string
  product_price: number
  total_amount: number
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  created_at: string
}

export interface CartItem {
  product: Product
  quantity: number
}
