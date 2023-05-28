import { useRouter } from "next/router";
import { useEffect } from "react";

const PlaceCard = ({ place }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/places/${place.id}`);
  };

  const getRandomString = () => {
    return Math.random().toString(36).substring(7);
  };

  useEffect(() => {
    const image = new Image();
    image.src = `https://source.unsplash.com/400x200/?nature,travel&${getRandomString()}`;
  }, []);

  return (
    <div key={place.id} className="mb-4" onClick={handleClick}>
      <div className="flex flex-col">
        <img
          src={`https://source.unsplash.com/400x200/?nature,travel&${getRandomString()}`}
          alt={place.title}
          className="mb-2 rounded-lg"
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
        />
        <h3 className="text-lg font-bold">{place.title}</h3>
        <p>{place.description}</p>
        <p className="mt-2">Price: {place.price}</p>
        <button
          className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-lg shadow-md focus:outline-none"
          onClick={handleClick}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PlaceCard;
