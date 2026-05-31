'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const allStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']

interface Props {
  orderId: string
  currentStatus: string
  statusColors: Record<string, string>
  statusLabels: Record<string, string>
}

export function OrderStatusUpdater({ orderId, currentStatus, statusColors, statusLabels }: Props) {
  const [status, setStatus] = useState(currentStatus)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = async (newStatus: string) => {
    setLoading(true)
    try {
      await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId, status: newStatus }),
      })
      setStatus(newStatus)
      router.refresh()
    } catch {
      alert('Update করা যায়নি')
    } finally {
      setLoading(false)
    }
  }

  return (
    <select
      value={status}
      onChange={e => handleChange(e.target.value)}
      disabled={loading}
      className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-300 ${statusColors[status] ?? 'bg-gray-100 text-gray-600'}`}
    >
      {allStatuses.map(s => (
        <option key={s} value={s}>{statusLabels[s] ?? s}</option>
      ))}
    </select>
  )
}
