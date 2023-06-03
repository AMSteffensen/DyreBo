//import { BookingData, Place, BookingModalProps, SetPlaceAction, CustomError } from "./types";

export type BookingData = {
    name: string;
    email: string;
    date: string;
    message: string;
  };
  
  export type Place = {
    id: string;
    user_id: string;
    title: string;
    description: string;
    price: number;
    address: string;
    city: string;
    state: string;
    country: string;
    created_at: string;
    category_id: number;
    images: string[];
  };
  

  export type SetPlaceAction = React.Dispatch<React.SetStateAction<Place | null>>;

  
  export type BookingModalProps = {
    onClose: () => void;
    onSubmit: (data: BookingData) => void;
  };

  export type CustomError = {
    message: string;
  };

  export type Category = {
    id: number;
    name: string;
    // Add any other properties specific to the Category type
  };
  
  