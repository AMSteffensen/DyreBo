import { useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../lib/supabase";

import { Formik, Form, Field, ErrorMessage } from "formik";

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const AddPlaceForm = () => {
  const router = useRouter();

  const handleSubmit = async (values) => {
    try {
      // Insert new place into the "places" table
      const { data, error } = await supabase.from("places").insert([values]);

      if (error) {
        throw new Error(error.message);
      }

      console.log("New place added:", data);
      router.push("/places"); //Redirect to the places page after successful submission
    } catch (error) {
      console.error("Error adding place:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add New Place</h1>
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Place
            </button>
          </Form>
        )}
      </Formik>
    </div>
    //   <Formik

    //     validate={(values) => {
    //       const errors = {};
    //       // Add any validation rules for the form fields
    //       return errors;
    //     }}
    //     onSubmit={handleSubmit}
    //   >
    //     {({ isSubmitting }) => (
    //       <Form>
    //         <div className="form-group">
    //           <label htmlFor="id">ID:</label>
    //           <Field type="text" id="id" name="id" className="form-control" />
    //           <ErrorMessage name="id" component="div" className="error" />
    //         </div>
    //         <div className="form-group">
    //           <label htmlFor="user_id">User ID:</label>
    //           <Field
    //             type="text"
    //             id="user_id"
    //             name="user_id"
    //             className="form-control"
    //           />
    //           <ErrorMessage name="user_id" component="div" className="error" />
    //         </div>
    //         <div className="form-group">
    //           <label htmlFor="title">Title:</label>
    //           <Field
    //             type="text"
    //             id="title"
    //             name="title"
    //             className="form-control"
    //           />
    //           <ErrorMessage name="title" component="div" className="error" />
    //         </div>
    //         <div className="form-group">
    //           <label htmlFor="description">Description:</label>
    //           <Field
    //             type="text"
    //             id="description"
    //             name="description"
    //             className="form-control"
    //           />
    //           <ErrorMessage
    //             name="description"
    //             component="div"
    //             className="error"
    //           />
    //         </div>
    //         <div className="form-group">
    //           <label htmlFor="price">Price:</label>
    //           <Field
    //             type="number"
    //             id="price"
    //             name="price"
    //             className="form-control"
    //           />
    //           <ErrorMessage name="price" component="div" className="error" />
    //         </div>
    //         <div className="form-group">
    //           <label htmlFor="address">Address:</label>
    //           <Field
    //             type="text"
    //             id="address"
    //             name="address"
    //             className="form-control"
    //           />
    //           <ErrorMessage name="address" component="div" className="error" />
    //         </div>
    //         <div className="form-group">
    //           <label htmlFor="city">City:</label>
    //           <Field
    //             type="text"
    //             id="city"
    //             name="city"
    //             className="form-control"
    //           />
    //           <ErrorMessage name="city" component="div" className="error" />
    //         </div>
    //         <div className="form-group">
    //           <label htmlFor="state">State:</label>
    //           <Field
    //             type="text"
    //             id="state"
    //             name="state"
    //             className="form-control"
    //           />
    //           <ErrorMessage name="state" component="div" className="error" />
    //         </div>
    //         <div className="form-group">
    //           <label htmlFor="country">Country:</label>
    //           <Field
    //             type="text"
    //             id="country"
    //             name="country"
    //             className="form-control"
    //           />
    //           <ErrorMessage name="country" component="div" className="error" />
    //         </div>
    //         <div className="form-group">
    //           <label htmlFor="created_at">Created At:</label>
    //           <Field
    //             type="text"
    //             id="created_at"
    //             name="created_at"
    //             className="form-control"
    //           />
    //           <ErrorMessage
    //             name="created_at"
    //             component="div"
    //             className="error"
    //           />
    //         </div>
    //         <div className="form-group">
    //           <label htmlFor="category_id">Category ID:</label>
    //           <Field
    //             type="number"
    //             id="category_id"
    //             name="category_id"
    //             className="form-control"
    //           />
    //           <ErrorMessage
    //             name="category_id"
    //             component="div"
    //             className="error"
    //           />
    //         </div>
    //         <div className="form-group">
    //           <label htmlFor="images">Images:</label>
    //           <Field
    //             type="text"
    //             id="images"
    //             name="images"
    //             className="form-control"
    //           />
    //           <ErrorMessage name="images" component="div" className="error" />
    //         </div>
    //         <button
    //           type="submit"
    //           disabled={isSubmitting}
    //           className="btn btn-primary"
    //         >
    //           Add Place
    //         </button>
    //       </Form>
    //     )}
  );
};

const FormField = ({ label, name, type }) => (
  <div>
    <label htmlFor={name} className="text-lg font-medium">
      {label}
    </label>
    <Field
      type={type}
      id={name}
      name={name}
      className="border border-gray-300 px-3 py-2 mt-1 rounded w-full"
    />
    <ErrorMessage name={name} component="div" className="text-red-500 mt-1" />
  </div>
);

export default AddPlaceForm;
