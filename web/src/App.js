import "./App.css";
import "./components/styles.css";
import Itemlist from "./components/Restaurants/Itemlist";
import Navbars from "./components/Navbar";
import FoodMenu from "./components/Menu/FoodMenu";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Gmaps from "./components/Restaurants/Gmaps";
import Cart from "./components/Cart/Cart";
import Testing from "./components/Testing";
import Auth from "./components/Auth/Auth";
import VerifForm from "./components/Auth/VerifForm";
import Application from "./components/DeliveryApplication/Application";
import AdminDashboard from "./components/Admin/AdminDashboard";
import { RealtimeClientComponent } from "./realtime";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { restoreSession } from "./Slices/ClientSlice";
import { useHistory } from "react-router-dom";
import OwnerDashboard from "./components/Owner/OwnerDashboard";
import DeliveryDashboard from "./components/Delivery/DeliveryDashboard";
import Authen from "./components/Auth/Authen";
import HomePage from "./components/Home/HomePage";

function ForceLogin() {
  const token = useSelector((state) => state.Client.client?.token);
  const dispatch = useDispatch();
  const history = useHistory();
  let storedToken = localStorage.getItem("token");
  useEffect(() => {
    if (!storedToken) {
      history.push("/auth/signin");
    } else {
      if (!token) {
        dispatch(restoreSession({ token: storedToken }));
        history.push("/");
      }
    }
  }, [storedToken]);
  return <></>;
}

function App() {
  const token = useSelector((state) => state.Client.client?.token);

  return (
    <BrowserRouter>
      <ForceLogin />
      <div className="App">
        <RealtimeClientComponent
          ENDPOINT={"http://localhost:3001"}
          token={token}
          /* realtimeLib={(lib)=>{
            lib.subscribe("newOrder",{"restaurantId" : "312132QSD"},({orderId})=>{
              alert("newOrder of id : " + orderId)
            },token)
         }}*/
        />

        <Switch>
          <Route exact path="/">
            <Navbars />
            <HomePage />
          </Route>
          <Route path="/home">
            <Navbars />
            <Gmaps />
            <Itemlist />
          </Route>
          <Route path="/menu/:id">
            <Navbars />
            <FoodMenu />
          </Route>
          <Route path="/cart">
            <Navbars />
            <Cart />
          </Route>

          <Route path="/auth/:action" component={Auth}></Route>
          <Route path="/verify">
            <VerifForm />
          </Route>
          <Route path="/apply">
            <Navbars />
            <Application />
          </Route>
          <Route path="/admin">
            <Navbars />
            <AdminDashboard />
          </Route>
          <Route path="/owner">
            <Navbars />
            <OwnerDashboard />
          </Route>
          <Route path="/delivery">
            <Navbars />
            <DeliveryDashboard />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
