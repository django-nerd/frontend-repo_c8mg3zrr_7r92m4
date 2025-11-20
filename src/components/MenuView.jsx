import { useEffect, useState } from 'react'

function MenuItem({ item, onAdd }) {
  return (
    <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-4 flex gap-4">
      <img src={item.image_url} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="text-white font-semibold">{item.name}</h4>
          <span className="text-white font-medium">${item.price.toFixed(2)}</span>
        </div>
        <p className="text-blue-200/80 text-sm mt-1">{item.description}</p>
        <div className="mt-3">
          <button onClick={() => onAdd(item)} className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg text-sm">Add</button>
        </div>
      </div>
    </div>
  )
}

function MenuView({ restaurant, onBack, onAdd }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/restaurants/${restaurant.id}/menu`)
        const data = await res.json()
        setItems(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [restaurant.id])

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="text-blue-300 hover:text-white">← Back</button>
        <div>
          <h2 className="text-2xl font-bold text-white">{restaurant.name}</h2>
          <p className="text-blue-200/80 text-sm">{restaurant.cuisine} • {restaurant.delivery_time_min} min</p>
        </div>
      </div>

      {loading ? (
        <p className="text-blue-200">Loading menu...</p>
      ) : (
        <div className="space-y-4">
          {items.map((i) => (
            <MenuItem key={i.id} item={i} onAdd={onAdd} />
          ))}
        </div>
      )}
    </div>
  )
}

export default MenuView
