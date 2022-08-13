import { Alert } from 'react-bootstrap';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button'
import { Session } from '../types';
import { convertMsToTime, dateToTime } from '../helpers/utils';
import React, { useState } from 'react';
import Watch from '../Components/Watch';
import { updateSession } from '../firebase/firebaseService';

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
  uid: string;
}



const Home = ({ session, setSession, uid }: Props) => {

  const [sessionSaved, setSessionSaved] = useState(false);
  const active = !session.finished;

  const stopSessionHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const saveSession = {
      finished: true,
      startTime: session?.startTime,
      endTime: new Date(),
      uid: uid
    };

    await updateSession(saveSession, uid, setSession);
    setSessionSaved(true);
  }

  const handleStartSession = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSession({
      finished: false,
      startTime: new Date(),
      uid: session.uid,
      endTime: undefined
    })

    setSessionSaved(false);
  }

  const heading = (
    <Alert.Heading>{active ?
      `Active session started at ${dateToTime(session.startTime)}` :
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

        <div>{sessionSaved &&
          `Session saved! Duration: ${convertMsToTime(Math.abs(new Date().getTime() - session.startTime.getTime()))}`
        }
        </div>

        {!sessionSaved && session.uid !== "" &&
          <Watch
            session={session} />}
      </StyledDiv>
    </div>
  )
}

export default Home;