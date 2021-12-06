import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav} from 'react-bootstrap'
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import React from 'react';
import ListEmployees from './List';
import AddEmployee from './Add';
import ViewEmployee from './View';
import EditEmployee from './Edit';

function App() {
  return (
    <div style={{backgroundColor: "#88b1f2", minHeight: "100vh", color: "#FFFFFF"}}>
      <BrowserRouter>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
          <Navbar.Brand><NavLink style={{textDecoration: "none", color: '#FFFFFF'}} to="/">Employee Manager</NavLink> </Navbar.Brand>  
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavLink className="nav-link" style={{textDecoration: 'none', color: '#FFFFFF'}} to="/">Employee List</NavLink>
                <NavLink className="nav-link" style={{textDecoration: 'none', color: '#FFFFFF'}} to="/add-employee">Add Employee</NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route index path="/" element={<ListEmployees />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/view-employee/:id" element={<ViewEmployee />} />
          <Route path="/edit-employee/:id" element={<EditEmployee />} />
        </Routes>
      </BrowserRouter>
    </div>
      
  );
}

export default App;