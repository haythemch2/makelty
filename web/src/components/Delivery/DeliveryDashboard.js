import React, { useEffect, useState, useRef } from "react";
import { RealtimeClientComponent } from "./../../realtime";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setorder } from "./../../Slices/DeliverySlice";

function DeliveryDashboard() {
  let token = localStorage.getItem("token");
  const realtime = useRef(null);
  const dispatch = useDispatch();
  const accountType = localStorage.getItem("accountType");

  useEffect(() => {
    console.log("subscribed");
    realtime.current.subscribe("deliveryOrder", {}, (newOrder) => {
      dispatch(setorder(newOrder));
      // alert("order came");
    });
  }, []);

  const newOrderToDeliver = useSelector((state) => state.Delivery.orders) || {};

  return (
    <div>
      <RealtimeClientComponent
        ref={realtime}
        ENDPOINT={"http://localhost:3001"}
        token={token}
      />
      {accountType == "delivery" ? (
        <Alert variant="success">
          <Alert.Heading>Hey, nice to see you</Alert.Heading>
          <p>
            You're now available to get orders and make money :D ! you will get
            notification when a nearby order has been placed !
          </p>
          <hr />
          <p className="mb-0">goodluck on your journey !</p>
        </Alert>
      ) : (
        <Alert variant="danger">
          <Alert.Heading>please Apply first !</Alert.Heading>
        </Alert>
      )}
      {newOrderToDeliver !== {} ? <h3>{newOrderToDeliver.note}</h3> : ""}
    </div>
  );
}

export default DeliveryDashboard;
