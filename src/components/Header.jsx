import { useMemo } from 'react'

function Header({ cartCount, onViewCart, onBack, canGoBack }) {
  const title = useMemo(() => 'Foodie Express', [])
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-slate-900/70 border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {canGoBack && (
            <button onClick={onBack} className="text-blue-300 hover:text-white transition-colors">
              ← Back
            </button>
          )}
          <div className="flex items-center gap-2">
            <img src="/flame-icon.svg" className="w-8 h-8" alt="logo" />
            <h1 className="text-white text-xl font-semibold tracking-tight">{title}</h1>
          </div>
        </div>
        <button onClick={onViewCart} className="relative bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors">
          View Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 text-xs bg-rose-500 text-white rounded-full px-2 py-0.5">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}

export default Header
