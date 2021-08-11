import React from "react";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";

function NavLink({ menuItemId }) {
  const MenuItems = useSelector((state) => state.Restaurant.menu);
  let MenuItem = MenuItems.filter((item) => item._id == menuItemId)[0];
  return (
    <Nav.Link
      style={{ backgroundColor: "white", marginTop: "1rem" }}
      eventKey={menuItemId}
    >
      ______________________________________________________
      <h3 style={{ color: "orange" }}>{MenuItem.name}</h3>
      ______________________________________________________
    </Nav.Link>
  );
}

export default NavLink;
