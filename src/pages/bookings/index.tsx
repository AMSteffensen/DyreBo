import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";
import { BookingData } from "../../types";

const BookingsPage = () => {
  const [bookings, setBookings] = useState<BookingData[]>([]);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase.from("bookings").select("*");

      if (data) {
        setBookings(data);
      } else {
        console.error("Error fetching bookings:", error?.message);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (!bookings || bookings.length === 0) {
    return <div>No bookings found.</div>;
  }

  return (
    <div>
      <h1>Bookings</h1>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            <p>Start Date: {booking.start_date}</p>
            <p>End Date: {booking.end_date}</p>
            <p>Message: {booking.message}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingsPage;