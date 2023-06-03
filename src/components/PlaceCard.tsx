/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useEffect } from "react";

interface Place {
  id: string;
  title: string;
  description: string;
  price: number;
}

interface PlaceCardProps {
  place: Place;
}

const PlaceCard = ({ place }: PlaceCardProps) => {
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
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
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
        <p className="mt-2">{place.price} KR NOK</p>
        <button
          className="mt-2 rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md focus:outline-none"
          onClick={handleClick}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PlaceCard;
