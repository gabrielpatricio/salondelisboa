import React, { useEffect, useState, useRef } from 'react'

export default function Slideshow({ images = [], interval = 5000, theme = 'light' }) {
  const [index, setIndex] = useState(0)
  const [loaded, setLoaded] = useState({})
  const [currentImages, setCurrentImages] = useState(images)
  const timer = useRef(null)

  // Choose mobile images when on small screens (max-width: 640px)
  useEffect(() => {
    const applyMobile = () => {
      const isMobile = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 640px)').matches
      if (!isMobile) {
        // Desktop: only show first image (img1.png)
        setCurrentImages([images[0]])
        return
      }

      // Mobile: map to mobile variants when available: replace base filename starting with "img1" -> "img1_mobile" and keep directory
      const mapped = images.map(src => {
        try {
          const parts = src.split('/')
          const filename = parts[parts.length - 1]
          if (/mobile/i.test(filename)) return src // already mobile
          // replace imgN.png with imgN_mobile.jpeg (pattern: img1, img2, etc.)
          const match = filename.match(/^(img\d+)\.(png|jpg|jpeg)$/i)
          if (match) {
            parts[parts.length - 1] = `${match[1]}_mobile.jpeg`
            return parts.join('/')
          }
          return src
        } catch (e) {
          return src
        }
      })
      setCurrentImages(mapped)
    }

    applyMobile()
    // also listen for orientation/resize changes
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(max-width: 640px)')
      const handler = () => applyMobile()
      mq.addEventListener ? mq.addEventListener('change', handler) : mq.addListener(handler)
      return () => {
        mq.removeEventListener ? mq.removeEventListener('change', handler) : mq.removeListener(handler)
      }
    }
  }, [images])

  // preload images
  useEffect(() => {
    currentImages.forEach(src => {
      const img = new Image()
      img.src = src
      img.onload = () => setLoaded(prev => ({ ...prev, [src]: true }))
    })
  }, [currentImages])

  useEffect(() => {
    timer.current = setInterval(() => {
      setIndex(i => (i + 1) % currentImages.length)
    }, interval)
    return () => clearInterval(timer.current)
  }, [currentImages.length, interval])

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      {currentImages.map((src, i) => {
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