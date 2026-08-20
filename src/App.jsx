import React, { useState } from 'react'
import Slideshow from './components/Slideshow'
import CornerButton from './components/CornerButton'
import ReservationModal from './components/ReservationModal'
import ContactModal from './components/ContactModal'
import MenuModal from './components/MenuModal'

export default function App() {
  const images = [
    import.meta.env.BASE_URL + 'images/img1.png',
    import.meta.env.BASE_URL + 'images/img2.png'
    // '/images/img3.png',
    // '/images/img4.png',
    ]

  // theme switching removed — UI is static (dark squares, black text)

  const [showReservation, setShowReservation] = useState(false)
  const [showContact, setShowContact] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  return (
  <div className="min-h-screen w-screen bg-[#e8c8b3] flex items-center justify-center font-cooperplate text-black">
    <Slideshow images={images} interval={5000}/>

      <CornerButton
        position="top-left"
        label="Contact Us"
        onClick={() => setShowContact(true)}
      />
      <CornerButton
        position="top-right"
        label="Reservations"
        onClick={() => setShowReservation(true)}
      />
      <CornerButton
        position="bottom-left"
        label="Menu"
        onClick={() => setShowMenu(true)}
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
      
      <ContactModal
        open={showContact}
        onClose={() => setShowContact(false)}
      />

      <MenuModal
        open={showMenu}
        onClose={() => setShowMenu(false)}
      />
    </div>
  )
}
