import React, { useEffect, useState, useRef } from 'react'

export default function Slideshow({ images = [], interval = 5000, theme = 'light' }) {
  const [loaded, setLoaded] = useState({})
  const [currentImages, setCurrentImages] = useState(images)
  const [index, setIndex] = useState(0)
  const timer = useRef(null)
  const initialIndexSet = useRef(false)

  // Choose mobile images when on small screens (max-width: 640px)
  useEffect(() => {
    const applyMobile = () => {
      const isMobile = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 640px)').matches
      if (!isMobile) {
        // Desktop: use all images from desktop/ folder
        const desktopImages = [
          '/images/img1.png',
          '/images/desktop/img1_desktop.jpeg',
          '/images/desktop/img2_desktop.jpeg',
          '/images/desktop/img3_desktop.jpeg'
        ]
        setCurrentImages(desktopImages)
        
        // Set random starting index only once on initial load for desktop too
        if (!initialIndexSet.current) {
          setIndex(Math.floor(Math.random() * desktopImages.length))
          initialIndexSet.current = true
        }
        return
      }

      // Mobile: use all images from mobile/ folder
      const mobileImages = [
        '/images/mobile/img1_mobile.jpeg',
        '/images/mobile/img3_mobile.jpeg',
        '/images/mobile/img4_mobile.jpeg',
        '/images/mobile/img5_mobile.jpeg',
        '/images/mobile/img6_mobile.jpeg',
        '/images/mobile/img7_mobile.jpeg',
        '/images/mobile/img8_mobile.jpeg',
        '/images/mobile/img9_mobile.jpeg',
        '/images/mobile/img10_mobile.jpeg',
        '/images/mobile/img11_mobile.jpeg',
        '/images/mobile/img12_mobile.jpeg',
        '/images/mobile/img13_mobile.jpeg',
        '/images/mobile/img14_mobile.jpeg'
      ]
      setCurrentImages(mobileImages)
      
      // Set random starting index only once on initial load
      if (!initialIndexSet.current) {
        setIndex(Math.floor(Math.random() * mobileImages.length))
        initialIndexSet.current = true
      }
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
      {/* Subtle dark overlay for text visibility */}
      <div className="absolute inset-0 bg-black/10 z-30 pointer-events-none" />
    </div>
  )
}