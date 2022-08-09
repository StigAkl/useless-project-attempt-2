import { Alert } from 'react-bootstrap';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button'
import { Session } from '../types';
import { convertMsToTime, dateToTime } from '../helpers/utils';
import React, { useState } from 'react';
import Watch from '../Components/Watch';

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  margin-top: 10%;
`;

const ButtonSpacingTop = styled.p`
  margin-top: 20px;
`;

const StyledButton = styled(Button)`
  font-size: 18px;
  padding: 10px 50px 15px 50px;
`;
interface Props {
  session: Session;
  setSession(session: Session): void;
}

const Home = ({ session, setSession }: Props) => {

  const [sessionSaved, setSessionSaved] = useState(false);

  const active = session.activeSession;

  const stopSessionHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSession({
      activeSession: false,
      started: session?.started,
      userId: session?.userId
    });

    setSessionSaved(true);
  }

  const handleStartSession = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSession({
      activeSession: true,
      started: new Date(),
      userId: session.userId
    })

    setSessionSaved(false);
  }

  const heading = (
    <Alert.Heading>{active ?
      `Active session started at ${dateToTime(session.started)}` :
      "No active sessions"}</Alert.Heading>
  )

  const buttonVariant = active ? "success" : "primary";

  return (
    <div>
      <StyledDiv>
        {heading}
        <ButtonSpacingTop>
          <StyledButton variant={buttonVariant} onClick={active ?
            stopSessionHandler :
            handleStartSession}>
            {active ? "Stop session" : "Start Session"}
          </StyledButton>
        </ButtonSpacingTop>

        <div>{sessionSaved ?
          `Session saved! Duration: ${convertMsToTime(Math.abs(new Date().getTime() - session.started.getTime()))}` :
          <Watch
            activeSession={session.activeSession}
            startDate={session.started} />}
        </div>
      </StyledDiv>
    </div>
  )
}

export default Home;