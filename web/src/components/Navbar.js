import React from "react";
import { Navbar, Nav, DropdownButton, Dropdown } from "react-bootstrap";
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
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Makelti</Navbar.Brand>
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
              variant="dark"
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
      </Navbar>
    </div>
  );
}

export default Navbars;
