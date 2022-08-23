import { Alert } from 'react-bootstrap';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button'
import { Session } from '../types';
import { convertMsToTime, dateToTime } from '../helpers/utils';
import React, { useState } from 'react';
import Watch from '../Components/Watch';
import firebaseService from '../firebase/firebaseService';
import LastSessions from '../Components/LastSessions';
import HoursSummary from '../Components/HoursSummary';

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
  padding: 10px 30px 10px 30px;
`;

interface Props {
  session: Session;
  setSession(session: Session): void;
  uid: string;
}



const Home = ({ session, setSession, uid }: Props) => {

  const [sessionSaved, setSessionSaved] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(!session.finished);
  const [stoppedDuration, setStoppedDuration] = useState<string>("");

  const stopSessionHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    const saveSession = {
      finished: true,
      startTime: session?.startTime,
      endTime: new Date(),
      uid: uid
    };

    const diffInMillis = convertMsToTime(Math.abs(new Date().getTime() - session.startTime.getTime()));
    await firebaseService.updateActiveSession(saveSession, uid, setSession);
    setStoppedDuration(diffInMillis);
    setActive(false);
    setSessionSaved(true);
    setIsLoading(false);
  }

  const handleStartSession = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    const session = await firebaseService.newSession(uid);
    setSession(session);
    setActive(true);
    setSessionSaved(false);
    setIsLoading(false);
  }

  const heading = (
    <Alert.Heading>{active ?
      `Active session started at ${dateToTime(session.startTime)}` :
      "No active sessions"}</Alert.Heading>
  )

  const buttonVariant = active ? "success" : "primary";
  const sessionButtonText = active ? "Stop session" : "Start new session";
  return (
    <>
      <StyledDiv>
        {heading}
        <ButtonSpacingTop>
          <StyledButton disabled={isLoading} variant='danger' onClick={active ?
            stopSessionHandler :
            handleStartSession}>
            {sessionButtonText}
          </StyledButton>
        </ButtonSpacingTop>

        <div>{sessionSaved &&
          `Session saved! Duration: ${stoppedDuration}`
        }
        </div>

        {!sessionSaved && session.uid !== "" &&
          <Watch
            session={session} />}

        <HoursSummary />
      </StyledDiv>
      <LastSessions uid={uid} newSession={sessionSaved} />
    </>
  )
}

export default Home;