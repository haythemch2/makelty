import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { RealtimeClientComponent } from "./../../realtime";
import { useDispatch, useSelector } from "react-redux";
import {
  setOrderItems,
  addOrder,
  setOrders,
} from "../../Slices/RestaurantsSlice";
import { Button, Col, Container, Toast, Table, Alert } from "react-bootstrap";

function OwnerNotifications({ Restaurant }) {
  let token = localStorage.getItem("token");
  const [ping, setPing] = useState(false);
  const realtime = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    Restaurant
      ? axios
          .post("http://localhost:3001/R/getOrderItems", {
            restaurantId: Restaurant._id,
          })
          .then((res) => {
            dispatch(setOrderItems(res.data));
          })
      : console.log("waiting");
  }, [ping]);

  const orderItemList =
    useSelector((state) => state.Restaurant.orderitems) || [];

  const findOrder = (orderId) => {
    return ordersList.filter((order) => order._id == orderId)[0];
  };

  useEffect(() => {
    Restaurant
      ? axios
          .post("http://localhost:3001/R/getOrderItems", {
            restaurantId: Restaurant._id,
          })
          .then((res) => {
            dispatch(setOrderItems(res.data));
          })
      : console.log("waiting");
    Restaurant
      ? axios
          .post("http://localhost:3001/R/getOrders", {
            restaurantId: Restaurant._id,
          })
          .then((res) => {
            dispatch(setOrders(res.data));
          })
      : console.log("waiting");
    console.log("subscribed");
    realtime.current.subscribe("newOrder", {}, (newOrder) => {
      dispatch(addOrder(newOrder));
      setPing(!ping);
    });
  }, []);
  const ordersList = useSelector((state) => state.Restaurant.orders) || [];

  const handleConfirm = ({ orderItemId }) => {
    axios
      .post("http://localhost:3001/R/updateOrderItem", {
        orderItemId,
        updates: { confirmed: true },
      })
      .then((res) => {
        console.log("pinged");
      })
      .catch((err) => {
        console.log(err);
      });
    setPing(!ping);
  };
  const handleReady = ({ orderItemId }) => {
    axios
      .post("http://localhost:3001/R/updateOrderItem", {
        orderItemId,
        updates: { ready: true },
      })
      .then((res) => {
        console.log("pinged");
      })
      .catch((err) => {
        console.log(err);
      });
    setPing(!ping);
  };

  return (
    <Container style={{ display: "flex" }}>
      <RealtimeClientComponent
        ref={realtime}
        ENDPOINT={"http://localhost:3001"}
        token={token}
      />
      <Col>
        <Alert variant="success">New Orders Notification</Alert>
        {orderItemList
          .filter((orderItem) => orderItem.confirmed == false)
          .map((orderItem, key) => (
            <Toast key={key}>
              <Toast.Header>
                <strong className="mr-auto" style={{ color: "#d4edda" }}>
                  New Order
                </strong>
                <small>just now!</small>
              </Toast.Header>
              <Toast.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Quantity</th>
                      <th>Item</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItem.items.map((item) => (
                      <tr>
                        <td>{item.qt}</td>
                        <td>{item.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Toast.Body>
              <Toast.Body>
                <h6 className="mr-auto">
                  <span style={{ color: "#d4edda" }}>note : </span>
                  {findOrder(orderItem.orderId).note}
                </h6>
                <Button
                  style={{ width: "100%" }}
                  variant="outline-success"
                  onClick={() =>
                    handleConfirm({
                      orderItemId: orderItem._id,
                      orderId: orderItem.orderId,
                    })
                  }
                >
                  Confirm
                </Button>
              </Toast.Body>
            </Toast>
          ))}
      </Col>
      <Col>
        <Alert variant="info">Orders Cooking </Alert>{" "}
        {orderItemList
          .filter(
            (orderItem) =>
              orderItem.confirmed == true && orderItem.ready == false
          )
          .map((orderItem, key) => (
            <Toast key={key}>
              <Toast.Header>
                <strong className="mr-auto" style={{ color: "lightblue" }}>
                  Confirmed Order
                </strong>
                <small>just now!</small>
              </Toast.Header>
              <Toast.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Quantity</th>
                      <th>Item</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItem.items.map((item) => (
                      <tr>
                        <td>{item.qt}</td>
                        <td>{item.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Toast.Body>
              <Toast.Body>
                <h6 className="mr-auto">
                  <span style={{ color: "lightblue" }}>note : </span>
                  {findOrder(orderItem.orderId).note}
                </h6>
                <Button
                  style={{ width: "100%" }}
                  variant="outline-info"
                  onClick={() =>
                    handleReady({
                      orderItemId: orderItem._id,
                      orderId: orderItem.orderId,
                    })
                  }
                >
                  Ready !
                </Button>
              </Toast.Body>
            </Toast>
          ))}
      </Col>
      <Col>
        <Alert variant="danger">Ready for Pickup</Alert>{" "}
        {orderItemList
          .filter(
            (orderItem) =>
              orderItem.confirmed == true && orderItem.ready == true
          )
          .map((orderItem, key) => (
            <Toast key={key}>
              <Toast.Header>
                <strong className="mr-auto" style={{ color: "#f8d7da" }}>
                  Order ready
                </strong>
                <small>for pickup</small>
              </Toast.Header>
              <Toast.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Quantity</th>
                      <th>Item</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItem.items.map((item) => (
                      <tr>
                        <td>{item.qt}</td>
                        <td>{item.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Toast.Body>
              <Toast.Body>
                <h6 className="mr-auto">
                  <span style={{ color: "#f8d7da" }}>note : </span>
                  {findOrder(orderItem.orderId).note}
                </h6>
                <Button
                  style={{ width: "100%" }}
                  variant="outline-danger"
                  onClick={() =>
                    handleReady({
                      orderItemId: orderItem._id,
                      orderId: orderItem.orderId,
                    })
                  }
                >
                  Picked Up
                </Button>
              </Toast.Body>
            </Toast>
          ))}
      </Col>
    </Container>
  );
}

export default OwnerNotifications;
