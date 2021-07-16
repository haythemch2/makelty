import React,{useEffect, useState} from 'react'
import {Card,Button} from 'react-bootstrap'
import axios from 'axios'
function DeliveryApplications() {

    const [applications, setApplications] = useState({})

useEffect(() => {
    axios.get('http://localhost:3001/A/getDeliveryApplications')
.then((res)=>setApplications(res.data))
.catch((err)=>console.log(err))
}, [])

const handleAccept=({application})=>{
  axios.post('http://localhost:3001/A/acceptDeliveryApplication',{userId:application.userId,applicationId:application._id})
  .then(()=>alert('accepted'))
  .catch((err)=>console.log(err))
}
const handleDecline=({application})=>{
    axios.post('http://localhost:3001/A/declineDeliveryApplication',{applicationId:application._id})
    .then(()=>alert('declined'))
    .catch((err)=>console.log(err))
  }

    return (
        <div>
            {Object.keys(applications).map((key)=>(
                <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={`http://localhost:3001/${applications[key].frontIdImg}.png`} />
                <Card.Body>
                  <Card.Title>{applications[key].userName}</Card.Title>
                  <Card.Text>{applications[key].userPhoneNumber}</Card.Text>
                  <Card.Text>{applications[key].userDescription}</Card.Text>
                  <Button variant="primary" onClick={()=>handleAccept({application:applications[key]})}>accept</Button>
                  <Button variant="danger"onClick={()=>handleDecline({application:applications[key]})}>decline</Button>
                </Card.Body>
              </Card>)
            )}
        </div>
    )
}

export default DeliveryApplications
