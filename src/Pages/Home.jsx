import React, { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import SmoothieCard from "../Components/SmoothieCard";

const Home = () => {
    // console.log(supabase);
    
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
      .from("smoothies") // table nte name aan
      .select();

      if (error) {
        setFetchError("Could not fetch the smoothies");
        setSmoothies(null);
        console.log(error);
      } else {
        setFetchError(null);
        setSmoothies(data);
      }
    };

    fetchData();
  }, []);

// useEffect(() => {
//     const fetchData = async () => {
//       const { data, error } = await supabase.from("smoothies").select();
  
//       console.log("Data:", data);   // Log response data
//       console.log("Error:", error); // Log error (if any)
  
//       if (error) {
//         setFetchError("Could not fetch smoothies");
//       } else {
//         setFetchError(null);
//         setSmoothies(data);
//       }
//     };
//     fetchData();
//   }, []);
  

  return (
    <div>
      {fetchError && <p>{fetchError}</p>}
      {smoothies && (
        <div>
            {smoothies.map(smoothie => (
                <SmoothieCard smoothie={smoothie}/>
            ))}
        </div>
      )}
    </div>
  );
};

export default Home;
