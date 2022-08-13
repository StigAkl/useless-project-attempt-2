import { useEffect, useState } from "react";
import { convertMsToTime } from "../helpers/utils";
import styled from 'styled-components';
import { Session } from "../types";

interface Props {
  session: Session
}

const StyledTimerText = styled.div`
  font-size: 1.2rem;
`;
const Watch = ({ session }: Props) => {

  var diffInMs = new Date().getTime() - session.startTime.getTime();
  const [diffMs, setDiffMs] = useState<number>(diffInMs);

  useEffect(() => {
    let interval: any;
    if (!session.finished) {
      interval = setInterval(() => {
        setDiffMs(prevTime => prevTime + 1000);
      }, 1000)
    } else if (session.finished) {
      clearInterval(interval);
    }
    clearInterval();
    return () => clearInterval(interval);
  }, [session]);

  return (
    !session.finished ? <StyledTimerText>{convertMsToTime(diffMs)}</StyledTimerText> : <div></div>
  )
}


export default Watch;