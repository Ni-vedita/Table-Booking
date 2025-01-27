import { fetchAvailableDates, bookTable } from '../utils/api';
import { useState } from 'react';
import BookingForm from '../components/BookingForm';
import BookingSummary from '../components/BookingSummary';

export default function Home() {
  const [isBooked, setIsBooked] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  return (
    <div className="container">
      <h1>Restaurant Table Booking</h1>
      {!isBooked && (
        <BookingForm 
          onBookingSuccess={(data) => { 
            setIsBooked(true); 
            setBookingData(data); 
          }} 
        />
      )}
      {isBooked && (
        <BookingSummary bookingData={bookingData} />
      )}
    </div>
  );
}