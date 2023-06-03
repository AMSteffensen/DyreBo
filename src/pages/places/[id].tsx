import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../lib/supabase";
import BookingModal from "@/components/BookingModal";
import { Place } from "../../types";

const PlaceDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedImage, setSelectedImage] = useState<string[] | null>(null);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    date: "",
    message: "",
  });

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const { data, error }: { data: any; error: any } = await supabase
          .from("places")
          .select("*")
          .eq("id", id)
          .single();
        if (error) {
          console.error("Error fetching place:", error.message);
        } else {
          setPlaces([data]);
          if (!selectedImage && data.images && data.images.length > 0) {
            setSelectedImage(data.images[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching place:", error);
      }
    };

    if (id) {
      fetchPlace();
    }
  }, [id, selectedImage]);

  const handleThumbnailClick = (image: string[]) => {
    setSelectedImage(image);
  };

  const openBookingModal = () => {
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  const handleViewImageButtonClick = () => {
    // Add your logic here
  };

  const handleBookingSubmit = () => {
    // Perform your booking submission logic here
    console.log(bookingData);
    // Clear the form
    setBookingData({
      name: "",
      email: "",
      date: "",
      message: "",
    });
    // Close the modal
    closeBookingModal();
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
              src={
                Array.isArray(selectedImage) ? selectedImage[0] : selectedImage
              }
              alt={place.title}
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <button
              className="font-semibold text-white"
              onClick={() => handleViewImageButtonClick()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleViewImageButtonClick();
                }
              }}
              tabIndex={0}
              aria-label="View Image"
            >
              View Image
            </button>
          </div>
        </div>
        <div className="px-6 py-4">
          <h2 className="mb-2 text-xl font-bold">{place.title}</h2>
          <p className="text-gray-700">{place.description}</p>
          <p className="text-gray-500">{place.address}</p>
          <p className="text-gray-700">{place.price} KR NOK</p>
        </div>
        {/* Thumbnail images */}
        <div className="flex justify-center gap-4 p-4">
          {places.length > 0 &&
            places[0].images.map((image, index) => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
              <div
                key={index}
                className={`h-16 w-16 cursor-pointer object-cover ${
                  selectedImage && selectedImage.includes(image)
                    ? "ring-2 ring-blue-500"
                    : ""
                }`}
                onClick={() => handleThumbnailClick([image])}
              >
                <img
                  className="h-full w-full"
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                />
              </div>
            ))}
        </div>

        {/* Booking button */}
        <div className="my-4 flex justify-center">
          <button
            className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
            onClick={openBookingModal}
          >
            Book Now
          </button>
        </div>
      </div>

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
