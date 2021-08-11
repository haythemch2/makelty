import React, { useState, useEffect } from "react";
import { Image, Badge, Jumbotron, Button, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, Link, useHistory } from "react-router-dom";

function OwnerManager({ Restaurant }) {
  const MenuItems = useSelector((state) => state.Restaurant.menu);
  return (
    <div>
      <Alert variant="info" style={{ display: "flex" }}>
        <div>
          <h1>{Restaurant.title}</h1>
          <p>{Restaurant.description}</p>
        </div>
        <Image
          src={Restaurant.image}
          style={{
            width: "60%",
            height: "50vh",
            borderRadius: "2%",
            marginLeft: "2rem",
          }}
        />
      </Alert>
      
    </div>
  );
}

export default OwnerManager;
