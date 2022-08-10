import { useEffect, useState } from "react";
import { convertMsToTime } from "../helpers/utils";
import styled from 'styled-components';

interface Props {
  startDate: Date;
  finished: boolean;
}

const StyledTimerText = styled.div`
  font-size: 1.2rem;
`;
const Watch = ({ startDate, finished }: Props) => {

  var diffInMs = new Date().getTime() - startDate.getTime();
  const [diffMs, setDiffMs] = useState<number>(diffInMs);

  useEffect(() => {
    let interval: any;
    if (!finished) {
      interval = setInterval(() => {
        setDiffMs(prevTime => prevTime + 1000);
      }, 1000)
    } else if (finished) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [finished]);

  return (
    !finished ? <StyledTimerText>{convertMsToTime(diffMs)}</StyledTimerText> : <div></div>
  )
}


export default Watch;