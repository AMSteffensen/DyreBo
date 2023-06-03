import { useRouter } from "next/router";
import supabase from "../../lib/supabase";

import { Formik, Form, Field, ErrorMessage } from "formik";

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const AddPlaceForm = () => {
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    try {
      // Insert new place into the "places" table
      const { data, error } = await supabase.from("places").insert([values]);

      if (error) {
        throw new Error(error.message);
      }

      console.log("New place added:", data);
      router.push("/places");
    } catch (error) {
      console.error("Error adding place:", error);
    }
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Add New Place</h1>
      <Formik
        initialValues={{
          id: generateUUID(),
          user_id: "87c7ed86-7a2d-4b02-9f60-54e9cb5644b4",
          title: "Cozy Apartment",
          description: "A cozy apartment with beautiful views.",
          price: 0,
          address: "123 Main St",
          city: "Cityville",
          state: "Stateville",
          country: "Countryland",
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
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <FormField label="ID" name="id" type="text" />
            <FormField label="User ID" name="user_id" type="text" />
            <FormField label="Title" name="title" type="text" />
            <FormField label="Description" name="description" type="text" />
            <FormField label="Price" name="price" type="number" />
            <FormField label="Address" name="address" type="text" />
            <FormField label="City" name="city" type="text" />
            <FormField label="State" name="state" type="text" />
            <FormField label="Country" name="country" type="text" />
            <FormField label="Created At" name="created_at" type="text" />
            <FormField label="Category ID" name="category_id" type="number" />
            <FormField label="Images" name="images" type="text" />

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
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
      className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
    />
    <ErrorMessage name={name} component="div" className="mt-1 text-red-500" />
  </div>
);

export default AddPlaceForm;
