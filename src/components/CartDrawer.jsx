function CartDrawer({ open, items, onClose, onPlaceOrder, updating }) {
  const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0)

  return (
    <div className={`fixed inset-0 z-30 ${open ? '' : 'pointer-events-none'}`}>
      {/* overlay */}
      <div onClick={onClose} className={`absolute inset-0 bg-black/50 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} />
      {/* panel */}
      <div className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-slate-900 border-l border-slate-800 transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-white font-semibold">Your Cart</h3>
          <button onClick={onClose} className="text-blue-300 hover:text-white">✕</button>
        </div>
        <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-180px)]">
          {items.length === 0 ? (
            <p className="text-blue-200/80">Your cart is empty.</p>
          ) : (
            items.map((it) => (
              <div key={it.id} className="flex items-center justify-between bg-slate-800/40 border border-slate-700 rounded-lg p-3">
                <div>
                  <p className="text-white font-medium">{it.name}</p>
                  <p className="text-blue-200/80 text-sm">${it.price.toFixed(2)} × {it.quantity}</p>
                </div>
                <p className="text-white font-semibold">${(it.price * it.quantity).toFixed(2)}</p>
              </div>
            ))
          )}
        </div>
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-blue-200/80">Total</span>
            <span className="text-white font-semibold">${total.toFixed(2)}</span>
          </div>
          <button disabled={items.length===0 || updating} onClick={onPlaceOrder} className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white py-2 rounded-lg">
            {updating ? 'Placing order...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartDrawer
