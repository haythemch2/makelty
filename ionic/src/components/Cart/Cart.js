import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteitem } from "./../../Slices/CartSlice.js";
import { addOrder } from "./../../Slices/ClientSlice";
import _ from "lodash";
import axios from "axios";
import { IonItem, IonLabel, IonList, IonIcon,IonInput, IonButton,useIonToast } from "@ionic/react";
import { remove, trash } from "ionicons/icons";

function Cart() {

  
  const [present, dismiss] = useIonToast();
  let items = useSelector((state) => state.Cart.cart);
  const dispatch = useDispatch();
  const handleremove = (id) => {
    dispatch(deleteitem({ id }));
  };
  let prices = [0];
  items.forEach((item) => (prices = [...prices, item.price * item.qt]));
  let Total = 0;
  prices !== []
    ? (Total = prices.reduce((total, acc) => total + acc))
    : (Total = 0);
  const [note, setNote] = useState("");

  let arrangedItems = _.groupBy(items, "from");
  let orderItems = {};
  Object.keys(arrangedItems).forEach((key) => {
    orderItems[key] = {
      items: arrangedItems[key],
      ready: false,
      confirmed: false,
      from: arrangedItems[key][0].from,
      to: arrangedItems[key][0].to,
    };
  });
  let orderprint = { ready: false, confirmed: false, note: note, orderItems };

  const handleOrder = () => {
    present('Order Placed ! awaiting confirmation', 3000)
    dispatch(addOrder(orderprint));
    axios.post("http://localhost:3001/C/pushorder", orderprint);
    console.log(orderprint);
  };
  return (
    <IonList>
      {items.map((item) => (
        <IonItem>
          <IonLabel>
            {item.qt}*{item.name} |{item.qt} x {item.price}dt{" "}
          </IonLabel>
          <IonIcon
            slot="end"
            icon={trash}
            onClick={() => handleremove(item.id)}
          ></IonIcon>
        </IonItem>
      ))}
      <IonItem>Food value : {Total}Dt</IonItem>
      <IonItem>Delivery cost : 2.5 Dt</IonItem>
      <IonItem>Total price : {Total + 2.5}Dt</IonItem>
      <IonItem>
            <IonLabel position="floating">Note</IonLabel>
            <IonInput value={note} onIonChange={(e) => setNote(e.target.value)}></IonInput>
          </IonItem>
          <IonButton expand="block" color="success" fill="solid" onClick={handleOrder}>Order !</IonButton>
    </IonList>
  );
}

export default Cart;
