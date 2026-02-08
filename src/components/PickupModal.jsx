import BookingModal from './BookingModal'

/**
 * PickupModal Component
 * Wrapper component that uses the new 3-step BookingModal
 */
export default function PickupModal({ isOpen, onClose }) {
  return <BookingModal isOpen={isOpen} onClose={onClose} />
}

