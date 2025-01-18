const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// In-memory storage for bookings (replace with a database)
let bookings = [];

// Define available time slots (adjust as needed)
const availableTimeSlots = ['18:00', '19:00', '20:00', '21:00']; 

app.post('/api/bookings', (req, res) => {
  const { date, time, guests, name, contact } = req.body;

  // Basic validation
  if (!date || !time || !guests || !name || !contact) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Check for existing booking
  const existingBooking = bookings.find(
    (booking) => booking.date === date && booking.time === time
  );

  if (existingBooking) {
    return res.status(400).json({ message: 'Slot already booked' });
  }

  const newBooking = {
    date,
    time,
    guests,
    name,
    contact,
  };

  bookings.push(newBooking);

  res.status(201).json({ message: 'Booking created successfully', ...newBooking });
});

app.get('/api/bookings', (req, res) => {
  res.json(bookings); 
});

app.delete('/api/bookings/:id', (req, res) => {
  const { id } = req.params; 
  bookings = bookings.filter((booking, index) => index !== parseInt(id)); 
  res.status(200).json({ message: 'Booking deleted successfully' });
});

app.get('/api/availability', (req, res) => {
  const { date } = req.query; 

  if (!date) { 
    return res.status(400).json({ message: 'Date is required' }); 
  }

  const bookedSlotsOnDate = bookings
    .filter((booking) => booking.date === date)
    .map((booking) => booking.time); 

  const availableSlotsForDate = availableTimeSlots.filter(
    (slot) => !bookedSlotsOnDate.includes(slot)
  );

  res.json(availableSlotsForDate); 
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});