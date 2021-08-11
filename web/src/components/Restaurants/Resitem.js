import React from "react";
import { Card, Button } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Resitem({ rest }, props) {
  const user = useSelector((state) => state.Client.client);
  const Distance = ({ lat1, lat2, lon1, lon2 }) => {
    const R = 6371e3; // metres
    var pi = Math.PI;
    const φ1 = lat1 * (pi / 180); // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres
    return <p>{Math.round(d)}m away !</p>;
  };
  return (
    <>
      <Link className="noHover" to={`/menu/${rest._id}`}>
        <Card
          style={{ width: "18rem", height: "25rem" }}
          className="restaurantCard"
        >
          <Card.Img
            variant="top"
            src={rest.image}
            style={{ height: "191px" }}
          />
          <Card.Body>
            <Card.Title style={{ color: "black", textDecoration: "none" }}>
              {rest.title}
            </Card.Title>
            <Card.Text style={{ color: "black" }}>
              {rest.description.slice(0, 50) + "..."}
            </Card.Text>
            <Distance
              lat1={user.lat}
              lon1={user.lng}
              lat2={rest.coordinatelatitude}
              lon2={rest.coordinatelongitude}
            />
            <ReactStars
              count={5}
              value={rest.rating}
              size={24}
              activeColor="#ffd700"
              edit={false}
            />
          </Card.Body>
        </Card>
      </Link>
    </>
  );
}

export default Resitem;
