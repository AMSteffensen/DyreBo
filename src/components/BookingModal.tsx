import { useState } from "react";
import PropTypes from "prop-types";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import styles from "./BookingModal.module.css";
import { BookingModalProps, BookingData } from "../types";

const BookingModal: React.FC<BookingModalProps> = ({ onClose, onSubmit }) => {
  const [bookingData, setBookingData] = useState<BookingData>({
    start_date: "",
    end_date: "",
    message: "",
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const booking: BookingData = {
        start_date:
          bookingData.start_date instanceof Date
            ? bookingData.start_date
            : null,
        end_date:
          bookingData.end_date instanceof Date ? bookingData.end_date : null,
        message: bookingData.message,
      };

      onSubmit(booking);
    } catch (error) {
      console.error("Error submitting booking:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`${styles.wrapper} rounded-lg bg-white p-8`}>
        <div className="rounded-lg bg-white p-8">
          <h2 className="mb-4 text-xl font-bold">Book Now</h2>
          <form onSubmit={handleBookingSubmit}>
            <div className="mb-4">
              <label htmlFor="dateRange" className="block font-semibold">
                Date Range
              </label>
              <DateRangePicker
                editableDateInputs={true}
                moveRangeOnFirstSelection={false}
                onChange={(range) =>
                  setBookingData({
                    ...bookingData,
                    start_date: range.selection.startDate || null,
                    end_date: range.selection.endDate || null,
                  })
                }
                ranges={[
                  {
                    startDate: bookingData.start_date
                      ? new Date(bookingData.start_date)
                      : undefined,
                    endDate: bookingData.end_date
                      ? new Date(bookingData.end_date)
                      : undefined,
                    key: "selection",
                  },
                ]}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block font-semibold">
                Message
              </label>
              <textarea
                id="message"
                className="w-full rounded-md border border-gray-300 px-4 py-2"
                rows={4}
                value={bookingData.message}
                onChange={(e) =>
                  setBookingData({ ...bookingData, message: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 ml-4 bg-blue-500 text-white font-semibold hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

BookingModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default BookingModal;
