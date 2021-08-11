import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Image,
  Badge,
  Jumbotron,
  Button,
  Alert,
  ListGroup,
  Form,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, Link, useHistory } from "react-router-dom";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const ManageMenu = ({ Restaurant }) => {
  const MySwal = withReactContent(Swal);
  const MenuItems = useSelector((state) => state.Restaurant.menu);
  const [newMenuItem, setNewMenuItem] = useState({
    name: "",
    price: 0,
    image: "",
    description: "",
  });

  const handleAddMenuItem = () => {
    axios
      .post("http://localhost:3001/R/addmenuitem", {
        Item: newMenuItem,
        restId: Restaurant._id,
      })
      .then((res) => {
        console.log(res.data);
        MySwal.fire({
          icon: "success",
          title: `Item Added`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  return (
    <div>
      <Alert variant="light">
        <ListGroup variant="flush">
          {Restaurant?.menu?.map((menuitem) => (
            <>
              <ListGroup.Item
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <img
                  src={MenuItems.filter((e) => e._id == menuitem)[0].image}
                  width="50px"
                  style={{ borderRadius: "15%" }}
                />
                <div>{MenuItems.filter((e) => e._id == menuitem)[0].name}</div>
                <div>
                  {MenuItems.filter((e) => e._id == menuitem)[0].price} Dt
                </div>
                <div>
                  {MenuItems.filter(
                    (e) => e._id == menuitem
                  )[0].description.slice(0, 50) + "..."}
                </div>
              </ListGroup.Item>
            </>
          ))}
          <ListGroup.Item
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Form
              style={{
                display: "flex",
                width: "80%",
                justifyContent: "space-around",
              }}
            >
              <Form.Control
                onChange={(e) =>
                  setNewMenuItem({ ...newMenuItem, image: e.target.value })
                }
                type="url"
                placeholder="IMG URL"
              ></Form.Control>
              <Form.Control
                onChange={(e) =>
                  setNewMenuItem({ ...newMenuItem, name: e.target.value })
                }
                type="text"
                placeholder="Item name"
              ></Form.Control>
              <Form.Control
                onChange={(e) =>
                  setNewMenuItem({ ...newMenuItem, price: e.target.value })
                }
                type="number"
                placeholder="0 Dt"
              ></Form.Control>
              <Form.Control
                onChange={(e) =>
                  setNewMenuItem({
                    ...newMenuItem,
                    description: e.target.value,
                  })
                }
                type="text"
                placeholder="Item description"
              ></Form.Control>
              <Button
                variant="outline-dark"
                style={{ width: "30%" }}
                onClick={() => handleAddMenuItem()}
              >
                Add!
              </Button>
            </Form>
          </ListGroup.Item>
        </ListGroup>
      </Alert>
    </div>
  );
};

export default ManageMenu;
