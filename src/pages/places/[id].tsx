import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../lib/supabase";

const PlaceDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [place, setPlace] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    date: "",
    message: "",
  });

  useEffect(() => {
    fetchPlace();
  }, [id]);

  const fetchPlace = async () => {
    try {
      const { data, error } = await supabase
        .from("places")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching place:", error.message);
      } else {
        setPlace(data);
        setSelectedImage(data.images[0]);
      }
    } catch (error) {
      console.error("Error fetching place:", error.message);
    }
  };

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  const openBookingModal = () => {
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
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

  if (!place) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold">{place.title}</h1>
      <p className="text-gray-700">4.95 ★ 87 reviews{place.rating}</p>
      <div className="mx-auto max-w-full overflow-hidden rounded-lg bg-white shadow-md lg:max-w-3xl">
        {/* Place image */}
        <div className="relative">
          <img
            className="h-64 w-full object-cover"
            src={selectedImage}
            alt={place.title}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <button className="font-semibold text-white">View Image</button>
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
          {place.images.map((image, index) => (
            <img
              key={index}
              className={`h-16 w-16 cursor-pointer object-cover ${
                image === selectedImage && "ring-2 ring-blue-500"
              }`}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => handleThumbnailClick(image)}
            />
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-white p-8">
            <h2 className="mb-4 text-xl font-bold">Book Now</h2>
            <form onSubmit={handleBookingSubmit}>
              <div className="mb-4">
                <label className="mb-2 block text-gray-700">Name</label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-4 py-2"
                  value={bookingData.name}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, name: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full rounded-md border border-gray-300 px-4 py-2"
                  value={bookingData.email}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, email: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block text-gray-700">Date</label>
                <input
                  type="date"
                  className="w-full rounded-md border border-gray-300 px-4 py-2"
                  value={bookingData.date}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, date: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block text-gray-700">Message</label>
                <textarea
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
                  onClick={closeBookingModal}
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
      )}
    </div>
  );
};

export default PlaceDetailPage;
