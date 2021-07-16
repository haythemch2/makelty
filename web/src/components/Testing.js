import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function Testing() {
  const [restaurant, setRestaurant] = useState({
    title: "restaurant 1",
    description: "description 1",
    rating: 5,
    coordLong: 33,
    coordAlt: 34,
    menu: ["1", "2", "3"],
    orders: ["4", "5", "6"],
  });
  const [restaurants, setRestaurants] = useState([]);

  const handleadd = () => {
    axios.post("http://localhost:3001/apitest/addrestaurant", restaurant).then(
      (response) => {
        alert("posted");
        console.log(response);
      },
      (error) => {
        alert("error");
        console.log(error);
      }
    );
  };
  const handleshow = () => {
    axios
      .get("http://localhost:3001/apitest/getall")
      .then((res) => {
        setRestaurants(res.data);
      })
      .catch((err) => {
        console.log("Error from show restaurant list");
      });
  };

  console.log(restaurants);

  return (
    <div>
      <Button onClick={handleadd}>add restaurant</Button>
      <Button onClick={handleshow}>show</Button>
      {Object.values(restaurants).map((res) => {
        <div>
          
        </div>;
      })}
    </div>
  );
}

export default Testing;
