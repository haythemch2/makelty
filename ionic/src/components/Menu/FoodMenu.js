import {useState,useEffect}from "react";
import { withRouter,Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import FoodItem from "./FoodItem";
import axios from 'axios';
import { IonList } from "@ionic/react";

function FoodMenu(props) {
    let dispatch=useDispatch();
  
  
    const [show, setShow] = useState(false);
    const list = useSelector((state) => Object.values(state.Restaurant.restaurants));
    const items = useSelector((state) => state.Cart.cart);
    
    useEffect(() => {
      setShow(true)
    }, [items])
  
    let restaurant = list.find((el) => el._id == props.match.params.id);
    let prices=[0]
    items.forEach((item)=>prices=[...prices,item.price])
    let Total=0;
    (prices!==[])?Total=prices.reduce((total,acc)=>total+acc):Total=0

    return (
        <IonList>
            {restaurant.menu.map((menuItemId) => (
        <FoodItem menuItemId={menuItemId} restaurantId={restaurant._id} />
      ))}
        </IonList>
    )
}

export default withRouter(FoodMenu)
