import React from "react";
import {Form,Button} from 'react-bootstrap'

function VerifForm() {
  return (
    <div>
      <Form>
        <Form.Group controlId="number">
          <Form.Label>Enter verification code</Form.Label>
          <Form.Control type="number" placeholder="code" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Verify
        </Button>
      </Form>
    </div>
  );
}

export default VerifForm;
