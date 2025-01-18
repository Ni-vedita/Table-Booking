const BookingSummary = ({ bookingData }) => {
  return (
    <div className="booking-summary">
      <h2>Booking Confirmed!</h2>
      <p>Thank you, {bookingData.name}, for your reservation.</p> 

      <div className="summary-details">
        <p><strong>Date:</strong> {bookingData.date}</p>
        <p><strong>Time:</strong> {bookingData.time}</p>
        <p><strong>Number of Guests:</strong> {bookingData.guests}</p> 
      </div>

      <p>We look forward to seeing you soon!</p>
    </div>
  );
};

export default BookingSummary;