import React from 'react'

export default function MenuModal({ open, onClose }) {
  if (!open) return null

  const openMenu = (fileName) => {
    window.open(`${import.meta.env.BASE_URL}files/${fileName}`, '_blank', 'noopener,noreferrer')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="relative bg-white/10 backdrop-blur-md rounded-md shadow-xl p-8 max-w-md w-[90vw] mx-4"
        role="dialog"
        aria-modal="true"
        aria-label="Choose a menu"
      >
        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={() => openMenu('menu_group.pdf')}
            className="w-full bg-[#013b80] hover:bg-[#014799] text-white py-4 px-6 rounded-sm transition-colors duration-200"
          >
            GROUPS MENU
          </button>

          <button
            type="button"
            onClick={() => openMenu('menu.pdf')}
            className="w-full bg-[#013b80] hover:bg-[#014799] text-white py-4 px-6 rounded-sm transition-colors duration-200"
          >
            NORMAL MENU
          </button>
        </div>
      </div>
    </div>
  )
}
