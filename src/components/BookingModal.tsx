import React, { useState } from "react";
import PropTypes from "prop-types";
import { BookingData, BookingModalProps } from "../types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingModal: React.FC<BookingModalProps> = ({ onClose, onSubmit }) => {
  const [bookingData, setBookingData] = useState<BookingData>({
    start_date: "",
    end_date: "",
    message: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingData.start_date && bookingData.end_date) {
      if (bookingData.start_date <= bookingData.end_date) {
        onSubmit(bookingData);
      } else {
        setErrorMessage("Invalid date range. Please select a valid range.");
      }
    } else {
      setErrorMessage("Please select a date range.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg bg-white p-8">
        <h2 className="mb-4 text-xl font-bold">Book Now</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="dateRange" className="mb-2 block text-gray-700">
              Date Range
            </label>
            <DatePicker
              id="dateRange"
              className="w-full rounded-md border border-gray-300 px-4 py-2"
              selected={bookingData.start_date}
              startDate={bookingData.start_date}
              endDate={bookingData.end_date}
              onChange={(dates: [Date, Date]) => {
                setBookingData({
                  ...bookingData,
                  start_date: dates[0],
                  end_date: dates[1],
                });
                setErrorMessage(null);
              }}
              selectsRange
              inline
              dateFormat="yyyy-MM-dd"
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
            />
          </div>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
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
