import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export const NavBar = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Working Hours Tracker</Navbar.Brand>

        <Nav className="justify-content-end">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#logs">Logs</Nav.Link>
          <Nav.Link href="#stats">Statistics</Nav.Link>
        </Nav>
      </Container>
    </Navbar >)
}