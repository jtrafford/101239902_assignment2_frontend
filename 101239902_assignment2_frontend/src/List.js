import React, { useEffect, useState } from 'react'
import { Container, Table, Button, Modal, Spinner } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';

export default function ListEmployees() {

    const EMPLOYEES = []
    const EMPLOYEE = {
        id: undefined,
        firstName: undefined,
        lastName: undefined
    }
    const [employees, setEmployees] = useState(EMPLOYEES)
    const [isLoading, setIsLoading] = useState(true);
    const [showDelete, setShowDelete] = useState(false);
    const [deleteEmployee, setDeleteEmployee] = useState(EMPLOYEE);  
    
    let count = 1;

    const closeModal = () => setShowDelete(false);
    const confirmDelete = (employee) => {
        setShowDelete(false);
        if (deleteEmployee !== EMPLOYEE && employee.id !== undefined) {
            setIsLoading(true);
            fetch(`http://localhost:9090/api/v1/employees/${employee.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: null
            })
            .then(() => {
                setDeleteEmployee(EMPLOYEE);
                setIsLoading(false);
            })
            
        }        
    }
    const showModal = (employee) => {
        setShowDelete(true);
        setDeleteEmployee(employee);
    }

    useEffect(() => {
        fetch('http://localhost:9090/api/v1/employees')
        .then((response) => response.json())
        .then((json) => {
            setEmployees(json);
            setIsLoading(false);
        })
    }, [deleteEmployee]);

    return (
        <div>
            <Container>          
                <h1 className="text-center">List of Employees</h1>
                {   
                                    
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>
                                    First Name
                                </th>
                                <th>
                                    Last Name
                                </th>
                                <th>
                                    Email ID
                                </th>
                                <th>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {                                    
                                EMPLOYEES.map((EMPLOYEE) => 
                                    <tr key={EMPLOYEE.id}>
                                        <td>{count++}</td>
                                        <td>{EMPLOYEE.firstName}</td>
                                        <td>{EMPLOYEE.lastName}</td>
                                        <td>{EMPLOYEE.emailId}</td>
                                        <td className="col-width">
                                            <NavLink to={`view-employee/${EMPLOYEE.id}`} style={{color: "#FFFFFF", textDecoration: "none"}}><Button className="mx-2" variant="primary">View</Button></NavLink>
                                            <NavLink to={`edit-employee/${EMPLOYEE.id}`} style={{color: "#FFFFFF", textDecoration: "none"}}><Button className="mx-2" variant="secondary">Edit</Button></NavLink>
                                            <Button className="mx-2" variant="danger" onClick={() => showModal(EMPLOYEE)}>Delete</Button>
                                        </td>
                                    </tr>
                                )
                            }
                            <tr>
                                <td colSpan="5"><h5><NavLink to={"/add-employee"} style={{color: "black"}}>+ Add a new Employee</NavLink></h5></td>
                            </tr>
                        </tbody>
                    </Table>
                }
            </Container>
            <Modal show={showDelete} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{`Delete '${deleteEmployee.firstName} ${deleteEmployee.lastName}'`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this employee?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => confirmDelete(deleteEmployee)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>            
        </div>
    )
}