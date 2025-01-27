// utils/api.js
const API_URL = 'https://table-booking-backend-7qpr.onrender.com';  // Replace with your Render backend URL

export const fetchAvailableDates = async () => {
  const response = await fetch(`${API_URL}/api/get-dates`);
  const data = await response.json();
  return data;
};

export const bookTable = async (bookingData) => {
  const response = await fetch(`${API_URL}/api/book`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData),
  });
  const data = await response.json();
  return data;
};
