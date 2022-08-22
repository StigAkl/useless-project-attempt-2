import { Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import firebaseService from '../firebase/firebaseService';

interface Props {
  startTime: Date;
  endTime: Date;
  sessionId: string;
  showModal: boolean;
  closeModal: any;
  setSessions: any;
}


const EditModal = ({ sessionId, startTime, endTime, showModal, closeModal, setSessions }: Props) => {

  const [show, setShow] = useState(showModal);
  const [startTimeChange, setStartTimeChange] = useState<string>(`${startTime.getHours()}:${startTime.getMinutes()}`)
  const [endTimeChange, setEndTimeChange] = useState<string>(`${endTime.getHours()}:${endTime.getMinutes()}`)

  const handleClose = () => {
    setShow(false);
    closeModal();
  }

  const handleSave = async () => {
    const startDateTime = startTime;
    const endDateTime = endTime;

    const startTimeHours = parseInt(startTimeChange.split(":")[0]);
    const startTimeMinutes = parseInt(startTimeChange.split(":")[1]);
    const endTimeHours = parseInt(endTimeChange.split(":")[0]);
    const endTimeMinutes = parseInt(endTimeChange.split(":")[1]);

    if (startTimeHours !== undefined && startTimeHours !== startTime.getHours()) startDateTime.setHours(startTimeHours);
    if (startTimeMinutes !== undefined && startTimeMinutes !== startTime.getMinutes()) { startDateTime.setMinutes(startTimeMinutes); };

    if (endTimeHours !== undefined && endTimeHours !== endTime.getHours()) endDateTime.setHours(endTimeHours);
    if (endTimeMinutes !== undefined && endTimeMinutes !== endTime.getMinutes()) endDateTime.setMinutes(endTimeMinutes);

    await firebaseService.editSession(
      startDateTime,
      endDateTime,
      sessionId
    );

    setShow(false);
    closeModal();

    setSessions((prevSessions: any[]) => {
      const newSessions = prevSessions.map(s => {
        if (s.id === sessionId) {
          return { ...s, startTime: Timestamp.fromDate(startDateTime), endTime: Timestamp.fromDate(endDateTime) }
        }
        return s;
      })
      return newSessions;
    })
  }

  return (
    <Modal
      show={show}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header>
        <Modal.Title>Edit session {sessionId}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <InputGroup className="mb-3">
            <InputGroup.Text>Start and End Date</InputGroup.Text>
            <Form.Control value={startTimeChange} aria-label="Start time" onChange={(e) => setStartTimeChange(e.target.value)} />
            <Form.Control value={endTimeChange} aria-label="End time" onChange={(e) => setEndTimeChange(e.target.value)} />
          </InputGroup>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSave}>Save changes</Button>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditModal;