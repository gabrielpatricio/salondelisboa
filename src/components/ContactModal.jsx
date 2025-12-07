import React from 'react'

export default function ContactModal({ open, onClose }) {
  if (!open) return null

  const handleEmail = () => {
    try {
      window.open('mailto:Salondelisboa@gmail.com', '_self')
    } catch (e) {
      window.location.href = 'mailto:Salondelisboa@gmail.com'
    }
    onClose()
  }

  const handleCall = () => {
    window.location.href = 'tel:+351213900215'
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white/95 backdrop-blur-sm rounded-md shadow-xl p-8 max-w-md w-[90vw] mx-4">
        <div className="flex flex-col gap-4">
          <button
            onClick={handleEmail}
            className="w-full bg-[#013b80] hover:bg-[#014799] text-white py-4 px-6 rounded-sm transition-colors duration-200 flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Send Email</span>
          </button>
          
          <button
            onClick={handleCall}
            className="w-full bg-[#013b80] hover:bg-[#014799] text-white py-4 px-6 rounded-sm transition-colors duration-200 flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>Call +351 213 900 215</span>
          </button>
        </div>
      </div>
    </div>
  )
}
