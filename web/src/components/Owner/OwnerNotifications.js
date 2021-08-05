import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { RealtimeClientComponent } from "./../../realtime";
import { useDispatch, useSelector } from "react-redux";
import { setOrderItems, addOrderItem } from "../../Slices/RestaurantsSlice";
import { Button } from "react-bootstrap";

function OwnerNotifications({ Restaurant }) {
  let token = localStorage.getItem("token");
  const [ping, setPing] = useState(false);
  const realtime = useRef(null);
  const dispatch = useDispatch();

  Restaurant
    ? axios
        .post("http://localhost:3001/R/getorders", {
          restaurantId: Restaurant._id,
        })
        .then((res) => {
          dispatch(setOrderItems(res.data));
        })
    : console.log("waiting");

  const orderItemList =
    useSelector((state) => state.Restaurant.orderitems) || [];

  useEffect(() => {
    console.log("subscribed");
    realtime.current.subscribe("newOrderItem", {}, (newOrderItem) => {
      dispatch(addOrderItem(newOrderItem));
      //WAKE UP DADADADADA !!
    });
  }, []);

  const handleConfirm = ({ orderItemId }) => {
    axios
      .post("http://localhost:3001/R/updateOrderItem", {
        orderItemId,
        updates: { confirmed: true },
      })
      .then((res) => {
        setPing(!ping);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      notifications here
      <RealtimeClientComponent
        ref={realtime}
        ENDPOINT={"http://localhost:3001"}
        token={token}
      />
      {orderItemList.map((orderItem) => (
        <>
          <Button
            variant="success"
            onClick={() =>
              handleConfirm({
                orderItemId: orderItem._id,
                orderId: orderItem.orderId,
              })
            }
          >
            confirm
          </Button>
          {orderItem.items.map((item) => (
            <h3>{item.name}</h3>
          ))}
        </>
      ))}
    </div>
  );
}

export default OwnerNotifications;
