import { useEffect, useState } from 'react'

function RestaurantCard({ r, onOpen }) {
  return (
    <button onClick={() => onOpen(r)} className="group text-left bg-slate-800/40 border border-slate-700 hover:border-blue-500/40 hover:shadow-blue-500/20 hover:shadow-xl transition-all rounded-xl overflow-hidden">
      <div className="h-40 w-full overflow-hidden">
        <img src={r.image_url} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold text-lg">{r.name}</h3>
          <span className="text-yellow-400 font-medium">⭐ {r.rating?.toFixed(1) || '4.5'}</span>
        </div>
        <div className="text-blue-200/80 text-sm mt-1 flex items-center justify-between">
          <span>{r.cuisine}</span>
          <span>{r.delivery_time_min} min</span>
        </div>
      </div>
    </button>
  )
}

function RestaurantList({ onOpen }) {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/restaurants`)
        const data = await res.json()
        setRestaurants(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <p className="text-blue-200">Loading restaurants...</p>

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {restaurants.map((r) => (
        <RestaurantCard key={r.id} r={r} onOpen={onOpen} />
      ))}
    </div>
  )
}

export default RestaurantList
