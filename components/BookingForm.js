import { fetchAvailableDates, bookTable } from '../utils/api';
import { useState } from 'react';
import axios from 'axios';

const BookingForm = ({ onBookingSuccess }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '',
    name: '',
    contact: '',
  });
  const [errors, setErrors] = useState({});
  const [availableSlots, setAvailableSlots] = useState([]); 
  const [showAvailability, setShowAvailability] = useState(false); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckAvailability = async () => {
    try {
      const response = await axios.get('https://table-booking-backend-7qpr.onrender.com/api/availability', { 
        params: { date: formData.date } 
      });
      setAvailableSlots(response.data);
      setShowAvailability(true); 
    } catch (error) {
      console.error('Error fetching availability:', error);
      setAvailableSlots([]); 
      setShowAvailability(true); // Show availability section even if no slots
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic input validation
    const newErrors = {};
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.guests) newErrors.guests = 'Number of guests is required';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.contact) newErrors.contact = 'Contact information is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post('https://table-booking-backend-7qpr.onrender.com/api/bookings', formData);
      onBookingSuccess(response.data);
    } catch (error) {
      console.error('Error booking table:', error);
      // Handle API request errors (e.g., display error message to the user)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form"> 
      <div>
        <label htmlFor="date">Date:</label>
        <input 
          type="date" 
          id="date" 
          name="date" 
          value={formData.date} 
          onChange={handleChange} 
        />
        {errors.date && <span className="error">{errors.date}</span>}
      </div>

      <button type="button" onClick={handleCheckAvailability}>Check Availability</button> 

      {showAvailability && (
        <div>
          <label htmlFor="time">Time:</label>
          <select 
            id="time" 
            name="time" 
            value={formData.time} 
            onChange={handleChange} 
          >
            <option value="">Select Time</option>
            {availableSlots.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select> 
          {errors.time && <span className="error">{errors.time}</span>}
        </div>
      )}

      <div>
        <label htmlFor="guests">Number of Guests:</label>
        <input 
          type="number" 
          id="guests" 
          name="guests" 
          value={formData.guests} 
          onChange={handleChange} 
        />
        {errors.guests && <span className="error">{errors.guests}</span>}
      </div>

      <div>
        <label htmlFor="name">Name:</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div>
        <label htmlFor="contact">Contact:</label>
        <input 
          type="text" 
          id="contact" 
          name="contact" 
          value={formData.contact} 
          onChange={handleChange} 
        />
        {errors.contact && <span className="error">{errors.contact}</span>}
      </div>

      <button type="submit">Book Table</button>
    </form>
  );
};

export default BookingForm;