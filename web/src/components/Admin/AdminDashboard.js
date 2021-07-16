import React,{useState} from "react";
import ManageRestaurants from "./ManageRestaurants";
import {Tabs,Tab} from 'react-bootstrap'
import DeliveryApplications from "./DeliveryApplications";
import AddRestaurantOwner from "./AddRestaurantOwner";
import OrderHistory from "./OrderHistory";




function AdminDashboard() {
    const [key, setKey] = useState('Home');
  return (
    <div>
      <Tabs defaultActiveKey="Home" id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}>
        <Tab eventKey="Home" title="Restaurants">
        <ManageRestaurants/>
        </Tab>
        <Tab eventKey='userUpgrade' title="add Restaurant Owner">
        <AddRestaurantOwner/>
        </Tab>
        <Tab eventKey="Delivery" title="Delivery">
        <DeliveryApplications/>
        </Tab>
        <Tab eventKey="History" title="History" >
        <OrderHistory/>
        </Tab>
      </Tabs>
    </div>
  );
}

export default AdminDashboard;
