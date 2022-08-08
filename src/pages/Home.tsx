import { Alert } from 'react-bootstrap';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button'
import { Session } from '../types';
import { convertMsToTime, dateToTime } from '../helpers/utils';
import React, { useEffect, useState } from 'react';

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

const StyledParagraph = styled.p`
  &:empty&:after {
    content: "";
    display: inline-block;
  } 
`;

interface Props {
  session: Session;
  setSession(session: Session): void;
}

const Home = ({ session, setSession }: Props) => {
  var diffInMs = new Date().getTime() - session.started.getTime();

  const [sessionSaved, setSessionSaved] = useState(false);
  const [diffTime, setDiffTime] = useState<number>(diffInMs);

  useEffect(() => {
    let interval: any;
    if (session.activeSession) {
      interval = setInterval(() => {
        setDiffTime(prevTime => prevTime + 1000);
      }, 1000)
    } else if (!session.activeSession) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [session.activeSession]);

  const active = session.activeSession;

  const stopSessionHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (session) {
      setSession({
        activeSession: false,
        started: session?.started,
        userId: session?.userId
      });

      setSessionSaved(true);
      setDiffTime(0);
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

          <StyledParagraph>{sessionSaved ? 'Session saved!' : convertMsToTime(diffTime)}</StyledParagraph>
        </StyledDiv>
      </Alert>
    </>
  )
}

export default Home;