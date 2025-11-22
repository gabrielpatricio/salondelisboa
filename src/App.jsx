import React, { useState } from 'react'
import Slideshow from './components/Slideshow'
import CornerButton from './components/CornerButton'
import ReservationModal from './components/ReservationModal'

export default function App() {
  const images = [
    import.meta.env.BASE_URL + 'images/img1.png',
    import.meta.env.BASE_URL + 'images/img2.png'
    // '/images/img3.png',
    // '/images/img4.png',
    ]

  // theme switching removed — UI is static (dark squares, black text)

  const [showReservation, setShowReservation] = useState(false)

  return (
  <div className="min-h-screen w-screen bg-[#e8c8b3] flex items-center justify-center font-cooperplate text-black">
    <Slideshow images={images} interval={10000}/>

      <CornerButton
        position="top-left"
        label="Contact Us"
        onClick={() => {
          // open mail client and optionally prompt for a phone number to call
          try {
            window.open('mailto:Salondelisboa@gmail.com', '_self')
          } catch (e) {
            // fallback
            window.location.href = 'mailto:Salondelisboa@gmail.com'
          }
        }}
      />
      <CornerButton
        position="top-right"
        label="Reservations"
        onClick={() => setShowReservation(true)}
      />
      <CornerButton
        position="bottom-left"
        label="Menu"
        onClick={() => window.open(import.meta.env.BASE_URL + 'files/menu.pdf', '_blank')}
      />
      <CornerButton
        position="bottom-right"
        label="Instagram"
        onClick={() => window.open('https://www.instagram.com/salondelisboa/', '_blank')}
      />
      
      <ReservationModal
        open={showReservation}
        onClose={() => setShowReservation(false)}
        url="https://reservation.umai.io/en/widget/salon"
      />
    </div>
  )
}