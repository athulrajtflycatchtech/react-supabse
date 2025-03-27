import React, { useEffect, useState } from "react";
import { replace, useNavigate, useParams } from "react-router-dom";
import supabase from "../config/supabaseClient";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");

  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !method || !rating) {
      setFormError("Please fill in all the fields correctly");
      return;
    }

    const { data, error } = await supabase
      .from("smoothies")
      .update({ title, method , rating })
      .eq("id", id)
      .select()

    if (error) {
      console.log(error);
      setFormError('Please fill all the fields correctly')
    }

    if (data) {
      console.log(data);
      setFormError(null)
      navigate('/')
    }

  };

  useEffect(() => {
    const fetchSmoothie = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        navigate("/", { replace: true });
      }

      if (data) {
        setTitle(data.title);
        setMethod(data.method);
        setRating(data.rating);
        console.log(data);
      }
    };

    fetchSmoothie();
  }, [id, navigate]);
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
        <button type="submit">Update Smoothie Recipe</button>

        {formError && <p style={{ color: "red" }}>{formError}</p>}
      </form>
    </div>
  );
};

export default Update;
