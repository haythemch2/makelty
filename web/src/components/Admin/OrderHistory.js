import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { RealtimeClientComponent } from "./../../realtime";
import { Col, ListGroup, ProgressBar, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addOrders, addOrder } from "../../Slices/AdminSlice";
import { Doughnut, Line, defaults } from "react-chartjs-2";

function OrderHistory() {
  defaults.animation = false;
  let token = localStorage.getItem("token");
  const realtime = useRef(null);
  const dispatch = useDispatch();

  axios.get("http://localhost:3001/A/getAllOrders").then((res) => {
    const result = res.data;
    dispatch(addOrders(result));
  });

  useEffect(() => {
    realtime.current.subscribe("newOrder", {}, (newOrder) => {
      dispatch(addOrder(newOrder));
    });
  }, []);

  const orders = useSelector((state) => state.Admin.orders);
  const data = {
    labels: ["confirmed", "ready", "picked up"],
    datasets: [
      {
        label: "# Of Orders !",
        data: [12, 19, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const data2 = {
    labels: [
      "07/08/2021",
      "08/08/2021",
      "09/08/2021",
      "10/08/2021",
      "11/08/2021",
      "12/08/2021",
    ],
    datasets: [
      {
        label: "Daily Orders",
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <div>
      <RealtimeClientComponent
        ref={realtime}
        ENDPOINT={"http://localhost:3001"}
        token={token}
      />
      <Row>
        <Col sm={6}>
          <ListGroup style={{ width: "100%" }}>
            {Object.keys(orders).map((orderKey) => (
              <>
                <ListGroup horizontal>
                  <ListGroup.Item>{orders[orderKey]._id}</ListGroup.Item>
                  <ListGroup.Item>{orders[orderKey].note}</ListGroup.Item>
                </ListGroup>
                <ProgressBar>
                  <ProgressBar
                    animated={!orders[orderKey].confirmed}
                    striped={!orders[orderKey].confirmed}
                    label={orders[orderKey].confirmed ? "confirmed" : "pending"}
                    variant={orders[orderKey].confirmed ? "success" : "danger"}
                    now={33}
                  />
                  <ProgressBar
                    animated={!orders[orderKey].ready}
                    striped={!orders[orderKey].ready}
                    label={orders[orderKey].ready ? "ready" : "cooking"}
                    variant={orders[orderKey].ready ? "warning" : "danger"}
                    now={33}
                  />
                  <ProgressBar
                    animated={!orders[orderKey].ready}
                    striped={!orders[orderKey].ready}
                    label={orders[orderKey].ready ? "pickup soon" : "waiting"}
                    variant={orders[orderKey].ready ? "info" : "danger"}
                    now={33}
                  />
                </ProgressBar>
              </>
            ))}
          </ListGroup>
        </Col>
        <Col sm={6}>
          <h1 style={{ justifySelf: "center" }}>Orders State</h1>
          <Doughnut data={data} />
          <Line style={{ marginTop: "5rem" }} data={data2} options={options} />
        </Col>
      </Row>
    </div>
  );
}

export default OrderHistory;
