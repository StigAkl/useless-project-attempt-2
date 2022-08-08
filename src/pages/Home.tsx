import { Alert } from 'react-bootstrap';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button'
import { Session } from '../types';
const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  margin-top: 20px;
`;

interface Props {
  session: Session | undefined;
}

const ButtonDescription = styled.p`
  margin-top: 5px;
`;

const Home = ({ session }: Props) => {

  const active = session?.activeSession;

  const heading = (
    <Alert.Heading>{active ? `Active session started at ${session.started}` : "Start session"}</Alert.Heading>
  )

  const description = active ?
    "To stop your session click the button" : "Click button to start session";

  const variant = active ? "success" : "primary";

  return (
    <>
      <Alert variant={variant}>
        <StyledDiv>
          {heading}
          <ButtonDescription>
            {description}
          </ButtonDescription>

          <p>
            <Button variant={variant}>{active ? "Stop session" : "Start Session"}</Button>
          </p>
        </StyledDiv>
      </Alert>
    </>
  )
}

export default Home;