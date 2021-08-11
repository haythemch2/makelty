import React, { useState, useEffect } from "react";
import { Form, Button, Jumbotron, Container, Alert } from "react-bootstrap";
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

  var sectionStyle = {
    backgroundImage: `url(https://www.freepptbackgrounds.net/wp-content/uploads/2020/03/Breakfast-food-Backgrounds.jpg)`,
  };

  const Submit = () => {
    if (userPhoneNumber !== "" && userName !== "") {
      dispatch(userSignUp({ userName, userPhoneNumber, userCity }));
      props.history.push("/home");
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
    <div className="main-bg">
      <Container>
        <Alert className="sign-form" style={{ width: "50%" }}>
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
            <Button
              variant="outline-success"
              type="submit"
              onClick={Submit}
              style={{ width: "100%", marginTop: "10px" }}
            >
              Signup
            </Button>
            <Button
              variant="outline-warning"
              type="submit"
              onClick={() => props.history.push("/auth/signin")}
              style={{ width: "100%", marginTop: "10px" }}
            >
              already signedUp
            </Button>
          </Form>
        </Alert>
      </Container>
    </div>
  ) : (
    <div className="main-bg">
      <Container>
        <Alert className="sign-form" style={{ width: "50%" }}>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Group controlId="phoneNumber">
              <Form.Label>Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Phone number"
                onChange={(e) => setLoginNumber(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="outline-success"
              type="submit"
              onClick={handleLogin}
              style={{ width: "100%", marginTop: "10px" }}
            >
              Signin
            </Button>
            <Button
              variant="outline-warning"
              type="submit"
              onClick={() => props.history.push("/auth/signup")}
              style={{ width: "100%", marginTop: "10px" }}
            >
              create account
            </Button>
          </Form>
        </Alert>
      </Container>
    </div>
  );
}

export default Auth;
