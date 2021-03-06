import React, { useState } from "react";
import { Alert, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";
function Application() {
  let token = localStorage.getItem("token");
  let userId = localStorage.getItem("userId");
  let userName = localStorage.getItem("userName");
  let userPhoneNumber = localStorage.getItem("userPhoneNumber");
  let accounType = localStorage.getItem("accounType");
  const [userDescription, setUserDescription] = useState("");

  const [frontId, setFrontId] = useState(null);
  const [backId, setBackId] = useState(null);

  let filledData = false;
  if (frontId !== null && backId !== null && userDescription !== "") {
    filledData = true;
  }

  const handleApply = async () => {
    if (filledData == true) {
      const frontIdData = new FormData();
      const backIdData = new FormData();
      frontIdData.append("frontId", frontId.file);
      backIdData.append("backId", backId.file);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const frontIdRes = await axios.post(
        "http://localhost:3001/C/uploadId",
        frontIdData,
        config
      );
      const backIdRes = await axios.post(
        "http://localhost:3001/C/uploadId",
        backIdData,
        config
      );
      let newApplication = {
        userName,
        userPhoneNumber,
        userDescription,
        userId,
        frontIdImg: frontIdRes.data.fileId,
        backIdImg: backIdRes.data.fileId,
      };
      axios.post("http://localhost:3001/C/deliveryApplication", newApplication);
      alert("Applied");
    } else alert("please fill all data");
  };
  const onChangeFrontId = (e) => {
    setFrontId({ file: e.target.files[0] });
  };
  const onChangeBackId = (e) => {
    setBackId({ file: e.target.files[0] });
  };

  return (
    <div>
      <Alert variant="success">Become a partenered Delivery carrier</Alert>
      <Form>
        <Form.Label>your name</Form.Label>
        <Form.Control type="text" placeholder={userName} readOnly />
        <Form.Label>your phonenumber</Form.Label>
        <Form.Control type="text" placeholder={userPhoneNumber} readOnly />
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Tell us about u</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="description about yourself"
            onChange={(e) => setUserDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>take a picture of your ID back & forth</Form.Label>
          <Form.File
            id="exampleFormControlFile1"
            name="frontId"
            label="ID Front"
            onChange={(e) => onChangeFrontId(e)}
          />
          <Form.File
            id="exampleFormControlFile1"
            name="backId"
            label="ID Back"
            onChange={(e) => onChangeBackId(e)}
          />
        </Form.Group>
        <Button onClick={handleApply}>Apply</Button>
      </Form>
    </div>
  );
}

export default Application;
