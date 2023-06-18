import { useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../lib/supabase";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import generateUUID from "../../utils/generate";
import useGeolocation from "../../lib/geolocation";

const AddPlaceForm = () => {
  const router = useRouter();
  const [countrySuggestions, setCountrySuggestions] = useState<string[]>([]);
  const [address, setAddress] = useState<string[]>([]);
  const location = useGeolocation();

  const handleSubmit = async (values: any) => {
    try {
      // Insert new place into the "places" table
      const { data, error } = await supabase
        .from("places")
        .insert([
          { ...values, latitude: values.latitude, longitude: values.longitude },
        ]);

      if (error) {
        throw new Error(error.message);
      }

      console.log("New place added:", data);
      router.push("/places");
    } catch (error) {
      console.error("Error adding place:", error);
    }
  };
  const handleDetectAddress = async (setFieldValue) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;
          const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
          try {
            const response = await axios.get(url);
            const address =
              response.data.results[0].formatted ||
              "Address not found for the given coordinates";
            setAddress(address);
            setFieldValue("address", address);
            setFieldValue("latitude", latitude);
            setFieldValue("longitude", longitude);
          } catch (error) {
            console.error("Error getting address:", error);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="mb-4 text-2xl font-bold">Add New Place</h1>
      <Formik
        initialValues={{
          id: generateUUID(),
          user_id: "87c7ed86-7a2d-4b02-9f60-54e9cb5644b4",
          title: "Cozy Apartment",
          description: "A cozy apartment with beautiful views.",
          price: 0,
          address: "",
          latitude: "",
          longitude: "",
          city: "",
          state: "",
          country: "",
          created_at: "2023-05-20 12:50:33.483965+00",
          category_id: 1,
          images: [
            "https://source.unsplash.com/featured/800x600",
            "https://source.unsplash.com/featured/800x601",
            "https://source.unsplash.com/featured/800x602",
          ],
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="space-y-4">
            <FormField label="Title" name="title" type="text" />
            <FormField label="Description" name="description" type="text" />
            <FormField label="Price" name="price" type="number" />
            <div>
              <label htmlFor="address" className="text-lg font-medium">
                Address
              </label>
              <Field
                type="text"
                id="address"
                name="address"
                className="w-full px-3 py-2 mt-1 border rounded border-gray-300 focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="mt-1 text-red-500"
              />
            </div>
            <button
              type="button"
              onClick={() => handleDetectAddress(setFieldValue)}
              className="w-full py-2 px-4 rounded bg-blue-500 text-white font-bold hover:bg-blue-700"
            >
              Detect Address
            </button>
            <FormField label="Images" name="images" type="text" />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 rounded bg-blue-500 text-white font-bold hover:bg-blue-700"
            >
              Add Place
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const FormField = ({
  label,
  name,
  type,
}: {
  label: string;
  name: string;
  type: string;
}) => (
  <div>
    <label htmlFor={name} className="text-lg font-medium">
      {label}
    </label>
    <Field
      type={type}
      id={name}
      name={name}
      className="w-full px-3 py-2 mt-1 border rounded border-gray-300 focus:outline-none focus:border-blue-500"
    />
    <ErrorMessage name={name} component="div" className="mt-1 text-red-500" />
  </div>
);

export default AddPlaceForm;
