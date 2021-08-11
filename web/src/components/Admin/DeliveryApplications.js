import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useHistory } from "react-router-dom";

function DeliveryApplications() {
  const history = useHistory();
  const MySwal = withReactContent(Swal);
  const [ping, setPing] = useState(true);

  const [applications, setApplications] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3001/A/getDeliveryApplications")
      .then((res) => setApplications(res.data))
      .catch((err) => console.log(err));
  }, [ping]);

  const handleAccept = ({ application }) => {
    axios
      .post("http://localhost:3001/A/acceptDeliveryApplication", {
        userId: application.userId,
        applicationId: application._id,
      })
      .then(() => alert("accepted"))
      .catch((err) => console.log(err));
    MySwal.fire({
      icon: "success",
      title: `Application Accepted !`,
      showConfirmButton: false,
      timer: 1500,
    });
    setPing(!ping);
    setTimeout(() => {
      history.push("/admin");
    }, 1500);
  };
  const handleDecline = ({ application }) => {
    axios
      .post("http://localhost:3001/A/declineDeliveryApplication", {
        applicationId: application._id,
      })
      .then(() => alert("declined"))
      .catch((err) => console.log(err));
    MySwal.fire({
      icon: "danger",
      title: `Application Declined`,
      showConfirmButton: false,
      timer: 1500,
    });
    setPing(!ping);
    setTimeout(() => {
      history.push("/admin");
    }, 1500);
  };

  return (
    <div>
      {Object.keys(applications).map((key) => (
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src={`http://localhost:3001/${applications[key].frontIdImg}.png`}
          />
          <Card.Body>
            <Card.Title>{applications[key].userName}</Card.Title>
            <Card.Text>{applications[key].userPhoneNumber}</Card.Text>
            <Card.Text>{applications[key].userDescription}</Card.Text>
            <Button
              variant="primary"
              onClick={() => handleAccept({ application: applications[key] })}
            >
              accept
            </Button>
            <Button
              variant="danger"
              onClick={() => handleDecline({ application: applications[key] })}
            >
              decline
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default DeliveryApplications;
