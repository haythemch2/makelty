import React, { useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  storerestaurants,
  storeMenuItems,
} from "./../../Slices/RestaurantsSlice";
import { useEffect } from "react";

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

function ManageRestaurants() {
  const [show, setShow] = useState(false);
  const [showOwnerEdit, setShowOwnerEdit] = useState(false);
  const [restaurantOwners, setRestaurantOwners] = useState({});
  const [newOwner, setNewOwner] = useState(0);
  const [toEditRestaurantId, setToEditRestaurantId] = useState("");
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
    axios
      .get(`http://${serverHostName}:3001/A/getRestaurantOwners`)
      .then((res) => {
        let owners = {}
        res.data.forEach(owner=>{
          owners[owner._id] = owner
        })
        setRestaurantOwners(owners);
      });
  }, []);
  const restaurants = useSelector((state) => state.Restaurant.restaurants);

  /////////:::::::::::ADDING RESTAURANT:::::::::::::::////////////////
  const [newRestaurant, setNewRestaurant] = useState({
    title: "",
    image: "",
    description: "",
    coordinatelatitude: "",
    coordinatelongitude: "",
  });

  const handleRestaurantAdd = () => {
    setShow(false);
    axios.post("http://localhost:3001/A/createRestaurant", newRestaurant);
  };
  const handleOwnerEdit = () => {
    setShowOwnerEdit(false);
    axios.post("http://localhost:3001/A/editRestaurantOwner", {
      restId: toEditRestaurantId,
      userId: newOwner,
    }).then((res)=>console.log(res.data)).catch((err)=>console.log(err));
  };
  let ownerName=(ownerId)=>{
    if (!ownerId) return "undefined";
    if (!restaurantOwners || Object.values(restaurantOwners).length == 0) return "";
    return (<span>{restaurantOwners[ownerId].name}</span>)
  }
  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Owner</th>
            <th>Title</th>
            <th>Description</th>
            <th>image(url)</th>
            <th>rating</th>
            <th>reviews</th>
            <th>latitude</th>
            <th>longitude</th>
            <th>Menu</th>
          </tr>
        </thead>

        {Object.values(restaurants).map((restaurant) => (
          <tbody>
            <tr>
              <td>
                {ownerName(restaurant.owner)}
                <Button
                  onClick={() => {
                    setShowOwnerEdit(true);
                    setToEditRestaurantId(restaurant._id);
                  }}
                >
                  edit
                </Button>
              </td>
              <td>{restaurant.title}</td>
              <td>{restaurant.description}</td>
              <td>{restaurant.image}</td>
              <td>{restaurant.rating}</td>
              <td>{restaurant.reviews}</td>
              <td>{restaurant.coordinatelatitude}</td>
              <td>{restaurant.coordinatelongitude}</td>
              <td>Menu</td>
            </tr>
          </tbody>
        ))}
      </Table>
      <Button onClick={() => setShow(true)}>Add Restaurant</Button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>add Restaurant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Restaurant Title</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Title"
                onChange={(e) =>
                  setNewRestaurant({ ...newRestaurant, title: e.target.value })
                }
              />
              <Form.Label>Restaurant Description</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Description"
                onChange={(e) =>
                  setNewRestaurant({
                    ...newRestaurant,
                    description: e.target.value,
                  })
                }
              />
              <Form.Label>Restaurant Image url</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="url"
                onChange={(e) =>
                  setNewRestaurant({ ...newRestaurant, image: e.target.value })
                }
              />
              <Form.Label>coordinate altitude</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="altitude"
                onChange={(e) =>
                  setNewRestaurant({
                    ...newRestaurant,
                    coordinatelatitude: e.target.value,
                  })
                }
              />
              <Form.Label>coordinate longitude</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="longitude"
                onChange={(e) =>
                  setNewRestaurant({
                    ...newRestaurant,
                    coordinatelongitude: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRestaurantAdd}>
            ADD!
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showOwnerEdit} onHide={() => setShowOwnerEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>edit owner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>select Owner</Form.Label>
              <Form.Control
                as="select"
                value={newOwner}
                onChange={(e) => setNewOwner(e.target.value)}
              >
                {Object.keys(restaurantOwners).map((key) => (
                  <option value={restaurantOwners[key]._id}>{restaurantOwners[key].name}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowOwnerEdit(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleOwnerEdit}>
            Edit!
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ManageRestaurants;
