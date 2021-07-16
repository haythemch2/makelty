import React,{useState} from 'react'
import { useDispatch } from "react-redux";
import { additem } from "../../Slices/CartSlice";
import { useSelector } from "react-redux";
import { IonItem, IonItemDivider, IonLabel,IonIcon,useIonToast } from '@ionic/react';
import { add, addCircle, fastFood, remove, trash } from 'ionicons/icons';

function FoodItem({ menuItemId, restaurantId }) {
  
  const [present, dismiss] = useIonToast();
    const items = useSelector((state) => state.Cart.cart);
    const MenuItems = useSelector((state) => state.Restaurant.menu);
    let MenuItem = MenuItems.filter((item) => item._id == menuItemId)[0];
    let userId = localStorage.getItem("userId");
    const dispatch = useDispatch();
    const [qt, setQt] = useState(1);
    const handleadd = (event) => {
      present('Added item', 3000)
      dispatch(
        additem({
          name: MenuItem.name,
          price: MenuItem.price,
          qt: qt,
          from: restaurantId,
          to: userId,
          id:menuItemId+Math.random()
        })
      );
      console.log("item added");
      console.log(items);
    };

    return (
        <IonItem>
            <IonIcon icon={fastFood} slot="start"></IonIcon>
            <IonLabel>{qt}  |  {MenuItem.name}</IonLabel>
            <IonIcon onClick={() => setQt(qt + 1)} icon={add} slot="start"></IonIcon>
            <IonIcon onClick={() =>((qt>1)?setQt : ()=>null)(qt - 1)} icon={remove} slot="start"></IonIcon>
            <IonIcon onClick={handleadd}  icon={addCircle} slot="end"></IonIcon>
        </IonItem>
    )
}

export default FoodItem
