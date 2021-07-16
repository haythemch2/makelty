import React from "react";
import { Image, Badge, Jumbotron, Button } from "react-bootstrap";

function OwnerManager({ Restaurant }) {
  return (
    <div>
      <Jumbotron>
        <Image
          src={Restaurant.image}
          style={{ width: "100%", height: "50vh" }}
        />
        <h1>{Restaurant.title}</h1>
        <p>{Restaurant.description}</p>
        <p>
          <Button variant="outline-warning">Orders</Button>
        </p>
      </Jumbotron>
    </div>
  );
}

export default OwnerManager;
