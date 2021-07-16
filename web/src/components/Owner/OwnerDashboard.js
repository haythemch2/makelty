import { Alert } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import OwnerNotifications from "./OwnerNotifications";
import axios from "axios";
import OwnerManager from "./OwnerManager";
import {useDispatch,useSelector} from 'react-redux'
import {storerestaurants}from './../../Slices/RestaurantsSlice'

function OwnerDashboard() {
  const AccountType = localStorage.getItem("accountType");
  const ownerId = localStorage.getItem("userId");
  const [restaurant, setRestaurant] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    ownerId
      ? axios
          .post("http://localhost:3001/R/getMyRestaurant", { ownerId })
          .then((res) => {
            dispatch(storerestaurants(res.data))
          })
          .catch((err) => console.log(err))
      : console.log({ ownerId: ownerId });
  }, []);

 const Restaurant = useSelector(state => state.Restaurant.restaurants)

  return (
    <div>
      {AccountType !== "restaurant" ? (
        <Alert variant="danger">
          cant access please login to your owner account!
        </Alert>
      ) : (
        <>
          <OwnerManager Restaurant={Restaurant} />
          <OwnerNotifications Restaurant={Restaurant} />
        </>
      )}
    </div>
  );
}

export default OwnerDashboard;
