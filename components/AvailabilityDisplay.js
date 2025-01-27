import { fetchAvailableDates, bookTable } from '../utils/api';
import { useState, useEffect } from 'react';
import axios from 'axios';

const AvailabilityDisplay = ({ selectedDate }) => { 
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedDate) { 
          const response = await axios.get('https://table-booking-backend-7qpr.onrender.com/api/availability', { 
            params: { date: selectedDate } 
          }); 
          setAvailableSlots(response.data); 
        } else {
          setAvailableSlots([]); 
        }
      } catch (error) {
        console.error('Error fetching availability:', error);
        setAvailableSlots([]); 
      }
    };

    fetchData();
  }, [selectedDate]); 

  return (
    <div className="availability-container"> 
      <h3>Available Time Slots:</h3>
      {availableSlots.length > 0 ? (
        <ul>
          {availableSlots.map((slot) => (
            <li key={slot}>{slot}</li>
          ))}
        </ul>
      ) : (
        <p>No available slots for the selected date.</p> 
      )}
    </div>
  );
};

export default AvailabilityDisplay;