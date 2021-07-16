import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { userSignUp, userSignIn } from "../../actions";
import { withRouter } from "react-router";
import { IonList, IonItem, IonLabel, IonInput,IonSelect,IonSelectOption,IonButton  } from "@ionic/react";

function Auth(props) {
  const dispatch = useDispatch();
  let sign = props.match.params.action;
  const [userName, setUserName] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userCity, setUserCity] = useState("");

  const Submit = () => {
    if (userPhoneNumber !== "" && userName !== "") {
      dispatch(userSignUp({ userName, userPhoneNumber, userCity }));
      props.history.push("/verify");
    } else alert("please type your cordentials");
  };
  //////////////////Login/////////////////
  const [loginNumber, setLoginNumber] = useState();
  const [token, setToken] = useState(null);
  const handleLogin = () => {
    dispatch(userSignIn({ loginNumber }));
    setToken(localStorage.getItem("token"));
  };
  useEffect(() => {
    if (token !== null) props.history.push("/home");
  }, [token]);
  return (sign=='signup')?(
    <IonList>
      <IonItem>
        <IonLabel position="floating">full name</IonLabel>
        <IonInput onIonChange={(e) => setUserName(e.target.value)}></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Phone number</IonLabel>
        <IonInput onIonChange={(e) => setUserPhoneNumber(e.target.value)}></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel position="floating">City</IonLabel>
        <IonSelect onIonChange={(e) => setUserCity(e.target.value)}>
            <IonSelectOption value="gabes">gabes</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonButton expand="block" onClick={Submit}>SignUp</IonButton>
      <IonButton expand="block" fill='outline' onClick={()=>props.history.push('/auth/signin')}>SignIn</IonButton>
     
    </IonList>)
    :(
     <IonList>
       <IonItem>
        <IonLabel position="floating">Phone number</IonLabel>
        <IonInput onIonChange={(e) => setUserPhoneNumber(e.target.value)}></IonInput>
      </IonItem>
      <IonButton expand="block" onClick={handleLogin}>SignIn</IonButton>
      <IonButton expand="block" fill='outline' onClick={()=>props.history.push('/auth/signup')}>create account</IonButton>
     </IonList>
     
    )
  
}

export default withRouter(Auth);
