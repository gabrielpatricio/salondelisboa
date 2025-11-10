import React, { useEffect, useState, useRef } from 'react'

export default function Slideshow({ images = [], interval = 5000, theme = 'light' }) {
  const [index, setIndex] = useState(0)
  const [loaded, setLoaded] = useState({})
  const timer = useRef(null)

  // preload images
  useEffect(() => {
    images.forEach(src => {
      const img = new Image()
      img.src = src
      img.onload = () => setLoaded(prev => ({ ...prev, [src]: true }))
    })
  }, [images])

  useEffect(() => {
    timer.current = setInterval(() => {
      setIndex(i => (i + 1) % images.length)
    }, interval)
    return () => clearInterval(timer.current)
  }, [images.length, interval])

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      {images.map((src, i) => {
        const active = i === index
        return (
          <img
            key={src + i}
            src={src}
            alt={`slide-${i}`}
            // disable pointer events/clicks and touch scrolling/drag on mobile
            className={`absolute inset-0 w-full h-full object-cover object-center block transition-opacity duration-700 ease-out
              ${active ? 'opacity-100 scale-100 z-20' : 'opacity-0 scale-95 z-10'} pointer-events-none select-none no-touch`}
            style={{ WebkitUserDrag: 'none' }}
          />
        )
      })}
    </div>
  )
}