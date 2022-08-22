import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import firebaseService from '../firebase/firebaseService';
import { dateToTime, timeDiffToString } from '../helpers/utils';
import { BsPencilSquare } from "react-icons/bs";
import EditModal from './EditModal';

const StyledContainer = styled.div`
    margin-top: 50px;
    width: 100%;
`;

const Items = styled.div`
display: flex;
`;

const Item = styled.div`
  flex: 1; 
  flex-wrap: nowrap;
  border-bottom: 1px solid grey;
  padding: 10px;
  line-height: 1.5;
`;

const StyledButton = styled(Button)`
  margin-bottom: 3px !important;
  line-height: 0;
`;

const StyledNoSessoinsMessage = styled.p`
  margin-top: 10px;
`;

interface Props {
  uid: string;
  newSession: boolean;
}

const LastSessions = ({ uid, newSession }: Props) => {

  const [sessions, setSessions] = useState<any[]>();
  const [editSession, setEditSession] = useState<string>("");

  const handleDeleteSession = async (id: string) => {
    try {
      // eslint-disable-next-line no-restricted-globals
      const deleteConfirm: boolean = confirm("Are you sure you want to perform this stupidity?")

      if (deleteConfirm) {
        await firebaseService.deleteSession(id);
        const filteredSessions = sessions?.filter(s => s.id !== id);
        setSessions(filteredSessions);
      }
    } catch (error) {
      console.error("Error deleting doc ", id, error);
    }
  }

  const handleEditSession = async (id: string) => {
    setEditSession(id);
  }

  const closeModal = () => {
    setEditSession("");
  }

  useEffect(() => {
    const getSessions = async () => {
      const sessions = await firebaseService.getLastSessions(uid);
      setSessions(sessions);
    }
    getSessions();
  }, [uid, newSession]);

  let sessionsList = sessions?.map((s, i) => {
    return (
      <Items key={i}>
        {s.id === editSession && <EditModal key={i} closeModal={closeModal}
          startTime={s.startTime.toDate()}
          endTime={s.endTime.toDate()}
          showModal={true}
          sessionId={s.id}
          setSessions={setSessions}
        />}
        <Item>{s.date}</Item>
        <Item>{dateToTime(s.startTime.toDate())}</Item>
        <Item>{dateToTime(s.endTime.toDate())}</Item>
        <Item>{timeDiffToString(s.startTime.toDate(), s.endTime.toDate())}</Item>
        <Item><BsPencilSquare color="blue" onClick={() => handleEditSession(s.id)} size={20} /></Item>
        <Item><StyledButton variant="link" size="sm" onClick={() => handleDeleteSession(s.id)}>X</StyledButton></Item>
      </Items>
    )
  })

  return (
    <StyledContainer>
      <hr />
      <h2>Last sessions</h2>

      {sessions &&
        sessions.length === 0 &&
        <StyledNoSessoinsMessage>No sessions :-(</StyledNoSessoinsMessage>}

      {sessions && sessions.length > 0 && (
        <>
          <Items>
            <Item>Date</Item>
            <Item>Check In</Item>
            <Item>Check Out</Item>
            <Item>Duration</Item>
            <Item>Edit</Item>
            <Item>Delete</Item>
          </Items>
          {sessionsList}
        </>
      )}

    </StyledContainer>
  )
};

export default LastSessions;