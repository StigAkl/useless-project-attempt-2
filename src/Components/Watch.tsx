import { useEffect, useState } from "react";
import { convertMsToTime } from "../helpers/utils";
import styled from 'styled-components';

interface Props {
  startDate: Date;
  activeSession: boolean;
}

const StyledTimerText = styled.div`
  font-size: 1.2rem;
`;
const Watch = ({ startDate, activeSession }: Props) => {

  var diffInMs = new Date().getTime() - startDate.getTime();
  const [diffMs, setDiffMs] = useState<number>(diffInMs);

  useEffect(() => {
    let interval: any;
    if (activeSession) {
      interval = setInterval(() => {
        setDiffMs(prevTime => prevTime + 1000);
      }, 1000)
    } else if (!activeSession) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [activeSession]);

  return (
    <StyledTimerText>{convertMsToTime(diffMs)}</StyledTimerText>
  )
}


export default Watch;