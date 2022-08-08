import { Alert } from 'react-bootstrap';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button'
import { Session } from '../types';
import { dateToTime } from '../helpers/utils';
import React, { useState } from 'react';

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  padding-top: 10px;
`;

const ButtonSpacingTop = styled.p`
  margin-top: 20px;
`;

interface Props {
  session: Session | undefined;
  setSession(session: Session): void;
}

const Home = ({ session, setSession }: Props) => {

  const [sessionSaved, setSessionSaved] = useState(false);
  const active = session?.activeSession;

  const stopSessionHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();


    if (session) {
      setSession({
        activeSession: false,
        started: session?.started,
        userId: session?.userId
      });

      setSessionSaved(true);
    }
  }

  const handleStartSession = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (session) {
      setSession({
        activeSession: true,
        started: new Date(),
        userId: session?.userId
      })
    }

    setSessionSaved(false);
  }

  const heading = (
    <Alert.Heading>{active ?
      `Active session started at ${dateToTime(session.started)}` :
      "No active sessions"}</Alert.Heading>
  )


  const variant = active ? "success" : "primary";

  return (
    <>
      <Alert variant={variant}>
        <StyledDiv>
          {heading}
          <ButtonSpacingTop>
            <Button variant={variant} onClick={active ?
              stopSessionHandler :
              handleStartSession}>
              {active ? "Stop session" : "Start Session"}
            </Button>
          </ButtonSpacingTop>

          {sessionSaved && 'Session saved!'}
        </StyledDiv>
      </Alert>
    </>
  )
}

export default Home;