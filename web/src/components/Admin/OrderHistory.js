import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { RealtimeClientComponent } from "./../../realtime";
import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addOrders,addOrder } from "../../Slices/AdminSlice";

function OrderHistory() {
  let token = localStorage.getItem("token");
  const realtime = useRef(null);
  const dispatch= useDispatch();

 axios.get("http://localhost:3001/A/getAllOrders").then((res) => {
        const result = res.data
        dispatch(addOrders(result))
    });

  useEffect(() => {
    
        realtime.current.subscribe("newOrder", {}, (newOrder) => {
          dispatch(addOrder(newOrder))
          });
  }, []);

  
  const orders = useSelector(state => state.Admin.orders)
  return (
    <div>
      <RealtimeClientComponent
        ref={realtime}
        ENDPOINT={"http://localhost:3001"}
        token={token}
      />
      <ListGroup>
        {Object.keys(orders).map((orderKey) => (
          <ListGroup horizontal>
            <ListGroup.Item>{orders[orderKey]._id}</ListGroup.Item>
            <ListGroup.Item>{(orders[orderKey].confirmed)?'confirmed':'pending'}</ListGroup.Item>
            <ListGroup.Item>{(orders[orderKey].ready)?'ready':'pickup soon'}</ListGroup.Item>
            <ListGroup.Item>{orders[orderKey].note}</ListGroup.Item>
          </ListGroup>
        ))}
      </ListGroup>
    </div>
  );
}

export default OrderHistory;
