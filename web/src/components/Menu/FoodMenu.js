import { useState, useEffect } from "react";
import { withRouter, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FoodItem from "./FoodItem";
import { Toast, Button, Row, Col, Nav, Tab, Carousel } from "react-bootstrap";
import axios from "axios";
import { Alert } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import NavLink from "./NavLink";

// add menuItemIds to restaurant menus in db !!!
function FoodMenu(props) {
  let dispatch = useDispatch();
  let history = useHistory();

  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const list = useSelector((state) =>
    Object.values(state.Restaurant.restaurants)
  );
  const items = useSelector((state) => state.Cart.cart);
  let toasts = [...items];

  let restaurant = list.find((el) => el._id == props.match.params.id);

  if (restaurant == undefined) {
    history.push("/home");
    window.location.reload();
  }

  let prices = [0];
  items.forEach((item) => (prices = [...prices, item.price]));
  let Total = 0;
  prices !== []
    ? (Total = prices.reduce((total, acc) => total + acc))
    : (Total = 0);
  const MenuItems = useSelector((state) => state.Restaurant.menu);
  return (
    <div style={{ height: "85vh" }}>
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "relative",
          minHeight: "200px",
        }}
      >
        <Col sm={9}></Col>
        <Tab.Container defaultActiveKey={restaurant.menu[0]}>
          <Row>
            <Col sm={5}>
              <Nav fill variant="pills" className="flex-column">
                {restaurant.menu.map((menuItemId) => (
                  <Nav.Item>
                    <NavLink menuItemId={menuItemId} />
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
            <Col sm={7}>
              <Carousel fade interval={1500} variant="dark" controls={false}>
                {MenuItems.map((MenuItem) => (
                  <Carousel.Item>
                    <img
                      style={{ height: "50vh" }}
                      className="d-block w-100 "
                      src={MenuItem.image}
                      alt="First slide"
                    />
                  </Carousel.Item>
                ))}
                <Carousel.Caption
                  style={{
                    backgroundColor: "RGBA(0,0,0,0.64)",
                    borderRadius: "4%",
                  }}
                >
                  <h3>{restaurant.title}</h3>
                  <p>{restaurant.description}</p>
                </Carousel.Caption>
              </Carousel>
              <Tab.Content>
                {restaurant.menu.map((menuItemId) => (
                  <Tab.Pane eventKey={menuItemId}>
                    <FoodItem
                      menuItemId={menuItemId}
                      restaurantId={restaurant._id}
                      setShow={setShow}
                      setShowAlert={setShowAlert}
                    />
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
        {/* {restaurant.menu.map((menuItemId) => (
          <FoodItem
            menuItemId={menuItemId}
            restaurantId={restaurant._id}
            setShow={setShow}
            setShowAlert={setShowAlert}
          />
        ))} */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
          }}
        >
          <Toast
            style={{ top: "10%", right: 0, position: "fixed", zIndex: "999" }}
            onClose={() => setShow(false)}
            show={show}
          >
            <Toast.Header>
              <strong className="mr-auto">Cart :</strong>
              <small>just now</small>
            </Toast.Header>
            {toasts.map((t) => (
              <Toast.Body>
                {t.name} | {t.price}Dt
              </Toast.Body>
            ))}
            <Toast.Body>______________________</Toast.Body>
            <Toast.Body>Food value : {Total}Dt</Toast.Body>
            <Toast.Body>Delivery cost : 2.5 Dt</Toast.Body>
            <Toast.Body>Total price : {Total + 2.5}Dt</Toast.Body>
            <Toast.Body>
              <Link to={`/cart`}>
                <Button style={{ width: "8rem" }} variant="outline-danger">
                  Cart
                </Button>
              </Link>
            </Toast.Body>
          </Toast>
        </div>
      </div>

      <Alert
        style={{ position: "absolute", bottom: 0 }}
        show={showAlert}
        variant="success"
        onClose={() => setShowAlert(false)}
        severity="success"
      >
        Added Item to Cart
      </Alert>
    </div>
  );
}

export default withRouter(FoodMenu);
