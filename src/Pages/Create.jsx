import React, { useState } from "react";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !method || !rating) {
      setFormError("Please fill in all the fields correctly");
      return;
    }

    //const numericRating = Number(rating);

    const { data, error } = await supabase
      .from("smoothies") // table name
      .insert([{ title, method , rating}])
      .select()

    if (error) {
      console.log(error);
      setFormError("Error submitting the form. Please try again.");
    }

    if (data) {
      console.log(data);
      setFormError(null);
      console.log("Navigation triggered");
      navigate('/')
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="method">Method:</label>
          <input
            id="method"
            type="text"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="rating">Rating:</label>
          <input
            id="rating"
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <button type="submit">Create Smoothie Recipe</button>

        {formError && <p style={{ color: "red" }}>{formError}</p>}
      </form>
    </div>
  );
};

export default Create;
