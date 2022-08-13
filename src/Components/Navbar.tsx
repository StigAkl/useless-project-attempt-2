import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { getAuth, signOut } from "firebase/auth";
const StyledLogoutButton = styled(Button)`
  margin-left: 20px;
`;

interface Props {
  uid: string;
}
export const NavBar = ({ uid }: Props) => {

  const auth: any = getAuth();

  const signOutHandler = () => {
    signOut(auth);
  };

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Working Hours Tracker</Navbar.Brand>

        <Nav className="justify-content-end">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#logs">Logs</Nav.Link>
          <Nav.Link href="#stats">Statistics</Nav.Link>
          {uid &&
            <StyledLogoutButton variant="light" size="sm" onClick={() => signOutHandler()}>
              Sign out
            </StyledLogoutButton>}
        </Nav>
      </Container>
    </Navbar >)
}