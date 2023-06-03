import React, { useState, FormEvent } from "react";
import PropTypes from "prop-types";
import { BookingData, BookingModalProps } from "../types";

const BookingModal: React.FC<BookingModalProps> = ({ onClose, onSubmit }) => {
  const [bookingData, setBookingData] = useState<BookingData>({
    name: "",
    email: "",
    date: "",
    message: "",
  });

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(bookingData);
    setBookingData({
      name: "",
      email: "",
      date: "",
      message: "",
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg bg-white p-8">
        <h2 className="mb-4 text-xl font-bold">Book Now</h2>
        <form onSubmit={handleBookingSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="mb-2 block text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full rounded-md border border-gray-300 px-4 py-2"
              value={bookingData.name}
              onChange={(e) =>
                setBookingData({ ...bookingData, name: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="mb-2 block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full rounded-md border border-gray-300 px-4 py-2"
              value={bookingData.email}
              onChange={(e) =>
                setBookingData({ ...bookingData, email: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="mb-2 block text-gray-700">
              Date
            </label>
            <input
              type="date"
              id="date"
              className="w-full rounded-md border border-gray-300 px-4 py-2"
              value={bookingData.date}
              onChange={(e) =>
                setBookingData({ ...bookingData, date: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="mb-2 block text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              className="w-full rounded-md border border-gray-300 px-4 py-2"
              value={bookingData.message}
              onChange={(e) =>
                setBookingData({ ...bookingData, message: e.target.value })
              }
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-4 text-gray-600"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

BookingModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default BookingModal;
