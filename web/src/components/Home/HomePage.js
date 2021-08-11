import React from "react";
import { Container, Button, Card, Image, Navbar, Nav } from "react-bootstrap";

import {
  editActive,
  storerestaurants,
  storeMenuItems,
} from "./../../Slices/RestaurantsSlice";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import ResCard from "./ResCard";
import "./HomePage.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

const isThisDeviceMobile = function () {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check && typeof window.orientation !== "undefined";
};

let serverHostName = isThisDeviceMobile() ? "192.168.43.4" : "localhost";

function HomePage() {
  const history = useHistory();
  const option = {
    items: 1,
    responsiveClass: true,
    margin: 10,
    nav: true,
    rewind: true,
    autoplay: true,
    slideBy: 1,
    dots: true,
    dotsEach: true,
    dotData: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      600: {
        items: 1,
      },
      700: {
        items: 2,
      },
      800: {
        items: 2,
      },
      900: {
        items: 3,
      },
      1000: {
        items: 3,
      },
      1300: {
        items: 4,
      },
    },
  };

  let dispatch = useDispatch();

  const fetchrestaurants = () => {
    axios
      .get(`http://${serverHostName}:3001/C/getrestaurants`)
      .then((res) => {
        dispatch(storerestaurants(res.data));
      })
      .catch((err) => {
        console.log("Error from show restaurant list");
      });
  };
  const fetchMenuItems = () => {
    axios
      .get(`http://${serverHostName}:3001/C/getmenuitems`)
      .then((res) => {
        dispatch(storeMenuItems(res.data));
      })
      .catch((err) => {
        console.log("Error from show menu item list");
      });
  };
  useEffect(() => {
    fetchrestaurants();
    fetchMenuItems();
  }, []);

  const restaurants = useSelector((state) => state.Restaurant.restaurants);
  const token = useSelector((state) => state.Client.client?.token);
  let storedToken = localStorage.getItem("token");

  return (
    <>
      <div style={{ width: "100%" }}>
        <Navbar bg="light" variant="light">
          <Container>
            <img className="logo" src="logo.png" alt="logo" />
            {!storedToken ? (
              <Button
                onClick={() => history.push("/auth/login")}
                variant="outline-white"
              >
                Signin/Signup
              </Button>
            ) : (
              <Button
                onClick={() => history.push("/home")}
                variant="outline-white"
              >
                Browse
              </Button>
            )}
          </Container>
        </Navbar>
      </div>
      <main>
        <div>
          <h1>Are you starving?</h1>
          <FontAwesomeIcon icon="fa-solid fa-circle-location-arrow" />{" "}
          <h3>Within a few clicks, find meals thatare accessible near you</h3>
          <div className="special"></div>
        </div>
        <img
          className="anim-img"
          src="https://technext.github.io/foodwagon/v1.0.0/assets/img/gallery/hero-header.png"
        />
      </main>
      <Container>
        <section className="news">
          <div className="news-item">
            <div className="percentage">
              <h1>15</h1>
              <p>%</p>
            </div>
            <img
              src="https://technext.github.io/foodwagon/v1.0.0/assets/img/gallery/discount-item-2.png"
              alt=""
            />

            <h3>Ma9loub Chawarma</h3>
            <span>6 days Remaining</span>
          </div>
          <div className="news-item">
            <div className="percentage">
              <h1>30</h1>
              <p>%</p>
            </div>
            <img
              src="https://technext.github.io/foodwagon/v1.0.0/assets/img/gallery/discount-item-1.png"
              alt=""
            />

            <h3>Pizza 4 Fromage</h3>
            <span>2 days Remaining</span>
          </div>
          <div className="news-item">
            <div className="percentage">
              <h1>20</h1>
              <p>%</p>
            </div>
            <img
              src="https://technext.github.io/foodwagon/v1.0.0/assets/img/gallery/discount-item-3.png"
              alt=""
            />

            <h3>Pack Lunch 5pcs</h3>
            <span>7 days Remaining</span>
          </div>
          <div className="news-item">
            <div className="percentage">
              <h1>15</h1>
              <p>%</p>
            </div>
            <img
              src="https://technext.github.io/foodwagon/v1.0.0/assets/img/gallery/discount-item-4.png"
              alt=""
            />

            <h3>Mlawi special</h3>
            <span>6 days Remaining</span>
          </div>
        </section>
      </Container>

      <section className="about-us">
        <Container>
          <div className="about">
            <h1 style={{ fontWeight: "bold" }}>How does it work</h1>
            <div className="about-list">
              <div className="about-card">
                <img src="https://technext.github.io/foodwagon/v1.0.0/assets/img/gallery/location.png"></img>
                <h3>Select location</h3>
                <p>Choose the location where your food will be delivered.</p>
              </div>
              <div className="about-card">
                <img src="https://technext.github.io/foodwagon/v1.0.0/assets/img/gallery/order.png"></img>
                <h3>Choose order</h3>
                <p>Check over hundreds of menus to pick your favorite food</p>
              </div>
              <div className="about-card">
                <img src="https://technext.github.io/foodwagon/v1.0.0/assets/img/gallery/pay.png"></img>
                <h3>Pay advanced</h3>
                <p>
                  It's quick, safe, and simple. Select several methods of
                  payment
                </p>
              </div>
              <div className="about-card">
                <img src="https://technext.github.io/foodwagon/v1.0.0/assets/img/gallery/meals.png"></img>
                <h3>Enjoy meals</h3>
                <p>Food is made and delivered directly to your home.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="carousel-f">
        <h1 style={{ fontWeight: "bold", color: "#f0742c" }}>Popular items</h1>
        <OwlCarousel className="owl-theme carou" {...option}>
          <div class="carousel-card">
            <img src="https://technext.github.io/foodwagon/v1.0.0/assets/img/gallery/toffes-cake.png"></img>
            <h3>Toffes Cake</h3>
            <span>
              <FontAwesomeIcon icon={faLocationArrow} size="sm" /> Burger Arena
            </span>
            <h5>3.5 Dt</h5>
            <button>Order now !</button>
          </div>
          <div class="carousel-card">
            <img src="https://technext.github.io/foodwagon/v1.0.0/assets/img/gallery/dancake.png"></img>
            <h3>DanCake</h3>
            <span>
              <FontAwesomeIcon icon={faLocationArrow} size="sm" />
              McKoul
            </span>
            <h5>4 Dt</h5>
            <button>Order now !</button>
          </div>{" "}
          <div class="carousel-card">
            <img src="https://technext.github.io/foodwagon/v1.0.0/assets/img/gallery/crispy-sandwitch.png"></img>
            <h3>Crispy Dandwitch</h3>
            <span>
              <FontAwesomeIcon icon={faLocationArrow} size="sm" />
              Plan B
            </span>
            <h5>4.5 Dt</h5>
            <button>Order now !</button>
          </div>{" "}
          <div class="carousel-card">
            <img src="https://technext.github.io/foodwagon/v1.0.0/assets/img/gallery/thai-soup.png"></img>
            <h3>Thai Soup</h3>
            <span>
              <FontAwesomeIcon icon={faLocationArrow} size="sm" />
              My House
            </span>
            <h5>4.8 Dt</h5>
            <button>Order now !</button>
          </div>
          <div class="carousel-card">
            <img src="https://technext.github.io/foodwagon/v1.0.0/assets/img/gallery/cheese-burger.png"></img>
            <h3>Cheese Burger</h3>
            <span>
              {" "}
              <FontAwesomeIcon icon={faLocationArrow} size="sm" />
              Burger Arena
            </span>
            <h5>7 Dt</h5>
            <button>Order now !</button>
          </div>
        </OwlCarousel>
      </section>
      <section className="last">
        <h1>Are you ready to order with the best deals?</h1>
        <button onClick={() => history.push("/home")}>
          <FontAwesomeIcon icon={faLocationArrow} size="sm" />
          <span> PROCEED TO ORDER</span>
        </button>
      </section>
      <section></section>
    </>
  );
}

export default HomePage;
