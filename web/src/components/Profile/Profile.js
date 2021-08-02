import React from "react";
import { Container, Form, Alert, Col, Row, Button } from "react-bootstrap";

import { useHistory } from "react-router-dom";

function Profile() {
  const history = useHistory();
  var accountType = localStorage.getItem("accountType");
  var userName = localStorage.getItem("userName");
  var userPhoneNumber = localStorage.getItem("userPhoneNumber");

  return (
    <Container>
      <Alert variant="success">Hi {userName} welcome Back !</Alert>
      <div className="profile-inner-container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Arh-avatar.jpg"
          alt="Avatar"
          class="avatar"
        />
        <Container>
          <Form>
            <Form.Group as={Row}>
              <Col>
                <Form.Label>First name</Form.Label>
                <Form.Control type="text" value={userName} />
              </Col>
              <Col>
                <Form.Label>Last name</Form.Label>
                <Form.Control type="text" value={userName} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Phone Number{" "}
              </Form.Label>
              <Col>
                <Form.Control
                  type="phonenumber"
                  value={userPhoneNumber}
                  readOnly
                />
              </Col>
              <Form.Label column sm={2}>
                Role
              </Form.Label>
              <Col>
                <Form.Control type="text" readOnly value={accountType} />
              </Col>
            </Form.Group>
          </Form>
          <Button variant="outline-success">Update</Button>
        </Container>
        {accountType == "client" ? (
          <Button
            variant="outline-danger"
            onClick={() => history.push("/apply")}
          >
            Become a Deliverer !
          </Button>
        ) : (
          ""
        )}
      </div>
    </Container>
  );
}

export default Profile;
