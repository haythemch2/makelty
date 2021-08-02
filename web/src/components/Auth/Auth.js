import React, { useState, useEffect } from "react";
import { Form, Button, Jumbotron, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import axios from "axios";
import { userSignUp, userSignIn } from "../../actions";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Auth(props) {
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  let sign = props.match.params.action;
  const [userName, setUserName] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userCity, setUserCity] = useState("");

  const Submit = () => {
    if (userPhoneNumber !== "" && userName !== "") {
      dispatch(userSignUp({ userName, userPhoneNumber, userCity }));
      props.history.push("/verify");
    } else
      MySwal.fire({
        icon: "error",
        title: `please fill your cordentials`,
        showConfirmButton: false,
        timer: 1500,
      });
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
  return sign === "signup" ? (
    <Container style={{ marginTop: "5rem" }}>
      <Jumbotron>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="full name"
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="phoneNumber">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Phone Number"
              onChange={(e) => setUserPhoneNumber(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>City</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setUserCity(e.target.value)}
            >
              <option>Tunis</option>
              <option>Nabeul</option>
              <option>hammamet</option>
              <option>Sousse</option>
              <option>Monastir</option>
              <option>Mehdia</option>
              <option>Sfax</option>
              <option>gabes</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={Submit}>
            Signup
          </Button>
          <Button
            variant="secondary"
            type="submit"
            onClick={() => props.history.push("/auth/signin")}
          >
            already signedUp
          </Button>
        </Form>
      </Jumbotron>
    </Container>
  ) : (
    <Container style={{ marginTop: "5rem" }}>
      <Jumbotron>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group controlId="phoneNumber">
            <Form.Label>Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Phone number"
              onChange={(e) => setLoginNumber(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleLogin}>
            Signin
          </Button>
          <Button
            variant="secondary"
            type="submit"
            onClick={() => props.history.push("/auth/signup")}
          >
            create account
          </Button>
        </Form>
      </Jumbotron>
    </Container>
  );
}

export default Auth;
