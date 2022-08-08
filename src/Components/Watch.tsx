import { useEffect, useState } from "react";
import { convertMsToTime } from "../helpers/utils";

interface Props {
  startDate: Date;
  activeSession: boolean;
}

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
    <>
      <span>{convertMsToTime(diffMs)}</span>
    </>)
}


export default Watch;