import React, { useState } from 'react'
import { Container, Form, Button, FloatingLabel, Alert } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function AddEmployee() {
    
    const [show, setShow] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        let employee = {
            firstName: event.currentTarget.firstName.value,
            lastName: event.currentTarget.lastName.value,
            emailId: event.currentTarget.emailId.value
        }                 
        fetch('http://localhost:9090/api/v1/employees', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
        })
        .then(setShow(true))
        .then(Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
        ));      
    } 

    return (
        <div>
            <Container>
                <h1 className="text-center">Add Employee</h1>  
                <Alert show={show} variant="success">
                    <Alert.Heading>Employee Added!</Alert.Heading>
                    <p>
                        Click the button on the right to see all listed employees.
                    </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                    <Button className={"mx-2"} onClick={() => setShow(false)} variant="outline-secondary">
                        Close
                    </Button>
                    <NavLink to="/" style={{color: "#FFFFFF", textDecoration: "none"}}><Button variant="outline-success">Back to Item Library</Button></NavLink>
                    </div>
                </Alert>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="firstName">
                        <Form.Text className="text-light">
                            Enter the employee's first name:
                        </Form.Text>
                        <FloatingLabel style={{color: "#2C2C2C"}} label="First Name">
                            <Form.Control type="text" placeholder="First Name" name="firstName" required/>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="lastName">
                        <Form.Text className="text-light">
                            Enter the employee's last name:
                        </Form.Text>
                        <FloatingLabel style={{color: "#2C2C2C"}} label="Last Name">
                            <Form.Control type="text" placeholder="Last Name" name="lastName" required/>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Text className="text-light">
                            Enter the employee's email in a valid format (ex. test@test.com):
                        </Form.Text>
                        <FloatingLabel style={{color: "#2C2C2C"}} label="Email Id">
                            <Form.Control type="email" placeholder="Email Id" name="emailId" required/>
                        </FloatingLabel>                        
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="submit">
                    
                    <Button variant="success" type="submit" size="lg" style={{float: 'right'}}>
                        Add Employee
                    </Button>
                    <NavLink to="/" style={{color: "#FFFFFF", textDecoration: "none"}}><Button className="mx-2" variant="danger" size="lg" style={{float: 'right'}}>Cancel</Button></NavLink>
                    </Form.Group>                    
                </Form>
            </Container>
            
        </div>
    )
}