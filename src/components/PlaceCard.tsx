const PlaceCard = ({ place }) => {
  const { title, description, price } = place;

  return (
    <div className="bg-white shadow-md rounded-md p-4 flex flex-col justify-between">
      <div className="h-48 bg-black flex items-center justify-center">
        <span className="text-white text-xl font-bold">{title}</span>
      </div>
      <div>
        <p className="text-lg font-bold mb-2">{title}</p>
        <p className="text-gray-500">{description}</p>
        <p className="mt-2 text-gray-700">${price} / night</p>
      </div>
    </div>
  );
};

export default PlaceCard;
