import React from "react";
import {
  Navbar,
  Nav,
  DropdownButton,
  Dropdown,
  Container,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Navbars() {
  let userName = localStorage.getItem("userName");
  let role = localStorage.getItem("accountType");

  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.go(0);
  };

  return (
    <div style={{ width: "100%" }}>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">
            <img src="https://technext.github.io/foodwagon/v1.0.0/assets/img/gallery/logo.svg" />
            Makelti
          </Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link>
              <Link class="routerLink" to="/">
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link class="routerLink" to="/home">
                Browse
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link class="routerLink" to="/cart">
                Cart
              </Link>
            </Nav.Link>
            <Nav.Link style={{ paddingTop: "2px" }}>
              <DropdownButton
                variant="light"
                id="dropdown-basic-button"
                title={userName ? userName : "User"}
              >
                <Dropdown.Item onClick={() => history.push("/profile")}>
                  Profile
                </Dropdown.Item>
                {role == "admin" ? (
                  <Dropdown.Item onClick={() => history.push("/admin")}>
                    Admin Dashboard
                  </Dropdown.Item>
                ) : (
                  ""
                )}
                {role == "delivery" ? (
                  <Dropdown.Item onClick={() => history.push("/delivery")}>
                    Delivery Dashboard
                  </Dropdown.Item>
                ) : (
                  ""
                )}
                {role == "restaurant" ? (
                  <Dropdown.Item onClick={() => history.push("/owner")}>
                    Owner Dashboard
                  </Dropdown.Item>
                ) : (
                  ""
                )}
                <Dropdown.Item style={{ color: "red" }} onClick={handleLogout}>
                  Logout
                </Dropdown.Item>
              </DropdownButton>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navbars;
