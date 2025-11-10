// ...existing code...
import React from 'react'

const posMap = {
  'top-left': 'top-5 left-5',
  'top-right': 'top-5 right-5',
  'bottom-left': 'bottom-5 left-5',
  'bottom-right': 'bottom-5 right-5'
}

export default function CornerButton({ position='top-left', label='', onClick = ()=>{} }){
  const pos = posMap[position] || posMap['top-left']
  const labelPos = position.includes('top') ? 'top-16' : 'bottom-16'
  const labelSide = position.includes('left') ? 'left-5' : 'right-5'

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className={`${pos} w-8 h-8 fixed rounded-sm shadow-md hover:scale-110 transition-transform
          bg-black border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4576bb]
          z-50 cursor-pointer`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onClick()
          }
        }}
      />
      <div className={`${labelPos} ${labelSide} fixed text-xs uppercase tracking-widest select-none
        text-black z-50`}>
        {label}
      </div>
    </>
  )
}
// ...existing code...