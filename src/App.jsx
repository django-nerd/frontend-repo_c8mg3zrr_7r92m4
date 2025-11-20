import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import RestaurantList from './components/RestaurantList'
import MenuView from './components/MenuView'
import CartDrawer from './components/CartDrawer'

function App() {
  const [view, setView] = useState('home')
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [placing, setPlacing] = useState(false)
  const base = useMemo(() => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', [])

  useEffect(() => {
    // seed demo data once
    const seed = async () => {
      try { await fetch(`${base}/seed`, { method: 'POST' }) } catch {}
    }
    seed()
  }, [base])

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id)
      if (existing) {
        return prev.map((p) => p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p)
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }]
    })
  }

  const placeOrder = async () => {
    if (!selectedRestaurant || cart.length === 0) return
    setPlacing(true)
    try {
      const payload = {
        restaurant_id: selectedRestaurant.id,
        items: cart.map((c) => ({ menuitem_id: c.id, quantity: c.quantity })),
        customer_name: 'Demo User',
        address: '123 Demo Street',
        phone: '555-0100',
      }
      const res = await fetch(`${base}/orders`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await res.json()
      if (res.ok) {
        alert(`Order placed! Total $${data.total}`)
        setCart([])
        setCartOpen(false)
      } else {
        alert(data.detail || 'Failed to place order')
      }
    } catch (e) {
      alert('Network error placing order')
    } finally {
      setPlacing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header cartCount={cart.reduce((s,c)=>s+c.quantity,0)} onViewCart={()=>setCartOpen(true)} onBack={()=>setView('home')} canGoBack={view!== 'home'} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {view === 'home' && (
          <div>
            <h2 className="text-white text-2xl font-bold mb-6">Popular Restaurants</h2>
            <RestaurantList onOpen={(r)=>{ setSelectedRestaurant(r); setView('menu') }} />
          </div>
        )}

        {view === 'menu' && selectedRestaurant && (
          <MenuView restaurant={selectedRestaurant} onBack={()=>setView('home')} onAdd={addToCart} />
        )}
      </main>

      <CartDrawer open={cartOpen} items={cart} onClose={()=>setCartOpen(false)} onPlaceOrder={placeOrder} updating={placing} />
    </div>
  )
}

export default App
