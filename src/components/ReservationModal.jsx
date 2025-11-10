import React, { useState } from 'react'

export default function ReservationModal({ open = false, onClose = () => {}, url = '' }) {
  const [loaded, setLoaded] = useState(false)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-[90vw] h-[80vh] bg-white rounded-md overflow-hidden shadow-xl">
        {/* loader overlay */}
        {!loaded && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-t-transparent border-black" />
              <div className="text-sm text-black">Loading reservation widget…</div>
            </div>
          </div>
        )}

        <iframe
          src={url}
          title="Reservations"
          onLoad={() => setLoaded(true)}
          className="w-full h-full border-0"
        />
      </div>
    </div>
  )
}
