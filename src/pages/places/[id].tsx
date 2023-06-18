import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../lib/supabase";
import BookingModal from "@/components/BookingModal";
import { Place, BookingData } from "../../types";

const PlaceDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState<BookingData>({
    id: "",
    start_date: "",
    end_date: "",
    message: "",
  });

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  const fetchPlace = async () => {
    try {
      const { data, error }: { data: Place | null; error: any } = await supabase
        .from("places")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setPlaces([data]);
        if (!selectedImage && data.images && data.images.length > 0) {
          setSelectedImage(data.images[0]);
        }
      } else {
        console.error("Error fetching place:", error.message);
      }
    } catch (error) {
      console.error("Error fetching place:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPlace();
    }
  }, [id, selectedImage]);

  const handleThumbnailClick = (image: string) => {
    setSelectedImage(image);
  };

  const openBookingModal = () => {
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  const handleViewImageButtonClick = () => {
    setIsBookingModalOpen(true);
  };

  const handleBookingSubmit = async (bookingData: BookingData) => {
    try {
      // Make the booking submission to the database
      const { data, error } = await supabase
        .from("bookings")
        .insert([{ ...bookingData }])
        .single();

      if (error) {
        console.error("Error submitting booking:", error.message);
      } else {
        console.log("Booking submitted successfully:", data);
        setIsBookingConfirmed(true); // Set booking confirmation status to true
        setTimeout(() => {
          setIsBookingConfirmed(false); // Clear booking confirmation after 3 seconds
        }, 3000);
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
    }

    // Close the modal
    closeBookingModal();
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment.trim() !== "") {
      setComments((prevComments) => [...prevComments, comment.trim()]);
      setComment("");
    }
  };

  if (!places || places.length === 0) {
    return <div>Loading...</div>;
  }

  const place = places[0];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold">{place.title}</h1>
      <p className="text-gray-700">4.95 ★ 87 reviews</p>
      <div className="mx-auto max-w-full overflow-hidden rounded-lg bg-white shadow-md lg:max-w-3xl">
        <div className="relative">
          {selectedImage && (
            <img
              className="h-64 w-full object-cover"
              src={selectedImage}
              alt={place.title}
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <button
              className="text-white"
              onClick={handleViewImageButtonClick}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleViewImageButtonClick();
                }
              }}
              tabIndex={0}
              aria-label="View Image"
            />
          </div>
        </div>

        {/* Thumbnails section */}
        <div className="flex flex-wrap gap-4">
          {places.length > 0 &&
            places[0].images.map((image, index) => (
              <button
                key={index}
                className={`h-16 w-16 cursor-pointer object-cover ${
                  selectedImage === image ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => handleThumbnailClick(image)}
              >
                <img
                  className="h-full w-full"
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                />
              </button>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="px-6 py-4">
          <h2 className="mb-2 text-xl font-bold">{place.title}</h2>
          <p className="text-gray-700">{place.description}</p>
          <p className="text-gray-500">{place.address}</p>
          <p className="text-gray-700">{place.price} KR NOK</p>
        </div>
        <div className="flex justify-center items-center">
          <button
            className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
            onClick={openBookingModal}
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Comments section */}
      <div className="max-w-lg mx-auto">
        <h3 className="text-lg font-bold mb-2">Comments</h3>
        {comments.length > 0 ? (
          <ul className="space-y-2">
            {comments.map((comment, index) => (
              <li key={index} className="border p-2 rounded">
                {comment}
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Leave a comment"
            value={comment}
            onChange={handleCommentChange}
            className="border p-2 rounded"
          />
          <button
            onClick={handleCommentSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Booking confirmation message */}
      {isBookingConfirmed && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-200 text-green-800 p-4 text-center rounded">
          Booking confirmed!
        </div>
      )}

      {/* Booking modal */}
      {isBookingModalOpen && (
        <BookingModal
          onClose={closeBookingModal}
          onSubmit={handleBookingSubmit}
        />
      )}
    </div>
  );
};

export default PlaceDetailPage;
