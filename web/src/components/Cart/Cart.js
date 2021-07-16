import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ListGroup, Button, Form, Alert, Container } from "react-bootstrap";
import { deleteitem } from "./../../Slices/CartSlice.js";
import { addOrder } from "./../../Slices/ClientSlice";
import _ from "lodash";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faMotorcycle } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Cart() {
  const MySwal = withReactContent(Swal);
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    variant: "primary",
    msg: "",
  });
  let items = useSelector((state) => state.Cart.cart);
  const dispatch = useDispatch();
  const handleremove = (id) => {
    dispatch(deleteitem({ id }));
    MySwal.fire({
      icon: "success",
      title: `Item Deleted !`,
      showConfirmButton: false,
      timer: 1500,
    });
  };
  let prices = [0];
  items.forEach((item) => (prices = [...prices, item.price * item.qt]));
  let Total = 0;
  prices !== []
    ? (Total = prices.reduce((total, acc) => total + acc))
    : (Total = 0);
  const [note, setNote] = useState("");

  let arrangedItems = _.groupBy(items, "from");
  let orderItems = {};
  Object.keys(arrangedItems).forEach((key) => {
    orderItems[key] = {
      items: arrangedItems[key],
      ready: false,
      confirmed: false,
      from: arrangedItems[key][0].from,
      to: arrangedItems[key][0].to,
    };
  });
  let orderprint = { ready: false, confirmed: false, note: note, orderItems };

  const handleOrder = () => {
    if (items.length !== 0) {
      dispatch(addOrder(orderprint));
      axios.post("http://localhost:3001/C/pushorder", orderprint);
      console.log(orderprint);
      MySwal.fire({
        icon: "success",
        title: `Order Placed !
         awaiting restaurant Confirmation`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      MySwal.fire({
        icon: "error",
        title: `please add items before Ordering !`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div style={{ marginTop: "2rem" }}>
      <Container>
        <ListGroup>
          <ListGroup.Item variant="success">Cart</ListGroup.Item>
          {items.map((item) => (
            <div style={{ display: "flex" }}>
              <ListGroup.Item
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <h5>
                  {item.qt}x {item.name}
                </h5>
                <div>
                  Price : {item.price}dt
                  <FontAwesomeIcon
                    style={{ marginLeft: "2rem" }}
                    icon={faTrashAlt}
                    color="red"
                    size="2x"
                    onClick={() => handleremove(item.id)}
                  />
                </div>
              </ListGroup.Item>
            </div>
          ))}
          <ListGroup.Item
            disabled
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            Food value : {Total}Dt
          </ListGroup.Item>
          <ListGroup.Item
            disabled
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            Delivery cost : 2.5 Dt
          </ListGroup.Item>
          <ListGroup.Item
            disabled
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            Total price : {Total + 2.5}Dt
          </ListGroup.Item>
          <Form>
            <Form.Group>
              <Form.Control
                size="lg"
                type="text"
                placeholder="note..."
                onChange={(e) => setNote(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Button variant="success" onClick={handleOrder}>
            <FontAwesomeIcon
              size="lg"
              icon={faMotorcycle}
              style={{ paddingRight: "1%" }}
            />
            Order !
          </Button>
        </ListGroup>
      </Container>
    </div>
  );
}

export default Cart;
