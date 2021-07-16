import { useState } from "react";
import { Card, Button, Form, Container, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { additem } from "../../Slices/CartSlice";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleUp,
  faArrowAltCircleDown,
} from "@fortawesome/free-regular-svg-icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function FoodItem({ menuItemId, restaurantId, setShow, setShowAlert }) {
  const MySwal = withReactContent(Swal);
  const items = useSelector((state) => state.Cart.cart);
  const MenuItems = useSelector((state) => state.Restaurant.menu);
  let MenuItem = MenuItems.filter((item) => item._id == menuItemId)[0];
  let userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const [qt, setQt] = useState(1);
  const handleadd = (event) => {
    MySwal.fire({
      icon: "success",
      title: "Item Added to Cart !",
      showConfirmButton: false,
      timer: 1500,
    });
    setShow(true);
    // setShowAlert(true);
    dispatch(
      additem({
        name: MenuItem.name,
        price: MenuItem.price,
        qt: qt,
        from: restaurantId,
        to: userId,
        id: menuItemId + Math.random(),
      })
    );
    console.log("item added");
    console.log(items);
    setTimeout(() => {
      setShowAlert(false);
    }, 1500);
  };

  return (
    <>
      {/* <Container>
        <div style={{ display: "flex" }}>
          <FontAwesomeIcon icon={faHamburger} size="3x" />
          <h2 style={{ marginLeft: "1rem", paddingTop: "0.8rem" }}>
            {MenuItem.name}
          </h2>
        </div>
        <p>{MenuItem.price} Dt</p>
      </Container> */}
      <Card>
        <Card.Header>{MenuItem.name}</Card.Header>
        <Card.Body>
          <div style={{ display: "flex", marginBottom: "1rem" }}>
            <Card.Img
              roundedCircle
              variant="left"
              style={{
                width: "5rem",
                marginRight: "1rem",
                borderRadius: "50%",
              }}
              src={MenuItem.image}
              alt="Card image"
            />
            <Card.Text style={{ color: "black" }}>
              {MenuItem.description}
            </Card.Text>
          </div>
          <Card.Text style={{ color: "black", marginLeft: "1rem" }}>
            Price : {MenuItem.price} Dt
          </Card.Text>
          <Card.Footer>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex" }}>
                <Card.Text style={{ color: "black" }}>
                  Quantity : {qt}
                </Card.Text>
                <div style={{ marginLeft: "1rem" }}>
                  <FontAwesomeIcon
                    icon={faArrowAltCircleUp}
                    size="lg"
                    onClick={() => setQt(qt + 1)}
                  />
                  <FontAwesomeIcon
                    icon={faArrowAltCircleDown}
                    size="lg"
                    onClick={() => (qt > 1 ? setQt : () => null)(qt - 1)}
                  />
                </div>
              </div>
              <Button onClick={handleadd} variant="outline-info">
                Add to Cart !
              </Button>
            </div>
          </Card.Footer>
        </Card.Body>
      </Card>
    </>
  );
}

export default FoodItem;
