import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, Box } from '@mui/system';
import Modal from '@mui/base/Modal';
import DateAndTime from '../inputs/DateAndTimePicker';
import { useDispatch } from 'react-redux';
import { zoomRequestForMeeting } from '../../redux/action/Action';
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';

export default function ModalUnstyled(props) {
    console.log(props);
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [values, setValues] = useState({
        topic: "",
        agenda: "",
        meetingTime: dayjs(),
        order_id: props.order_id,
        approvedStatus: 0
    })



    const onChangeHandle = (e) => {
        let { name, value } = e.target;
        setValues((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }

    const handleSubmit = () => {
        const data = {
            cust_id: window.localStorage.getItem("frontuserid"),
            ...values
        }
        dispatch(zoomRequestForMeeting(data))
        handleClose()
    }

    return (
        <div>
            <TriggerButton id='ScheduleMeeting' type="button" onClick={handleOpen}>
                <BsFillCameraVideoFill className='connectIcon' size={13} />
            </TriggerButton>
            <StyledModal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={handleClose}
                slots={{ backdrop: StyledBackdrop }}
            >
                <Box sx={style}>
                    <h2 id="unstyled-modal-title">Schedule Meeting</h2>
                    <p id="unstyled-modal-description">{" "}</p>
                    <div className="mb-3 contact_input">
                        <input type="text"
                            className="form-control contact_form"
                            id="exampleFormControlInput1"
                            name='topic' placeholder="Topic"
                            onChange={onChangeHandle}
                            value={values.topic}
                        />
                    </div>
                    <div className="mb-3 contact_input">
                        <input type="text"
                            className="form-control contact_form"
                            id="exampleFormControlInput2"
                            name='agenda'
                            placeholder="Agenda for Meeting"
                            onChange={onChangeHandle}
                            value={values.agenda}
                        />
                    </div>

                    <DateAndTime label="Date & Time" value={values.meetingTime} onChange={(meetingDate) => setValues({ ...values, meetingTime: meetingDate.$d })} />

                    <div className="d-flex btn__buy contact_btn pt-2">
                        <button className="btn" onClick={handleSubmit} >Schedule Meeting</button>
                    </div>
                </Box>
            </StyledModal>
        </div>
    );
}

const Backdrop = React.forwardRef((props, ref) => {
    const { open, className, ...other } = props;
    return (
        <div
            className={clsx({ 'MuiBackdrop-open': open }, className)}
            ref={ref}
            {...other}
        />
    );
});

Backdrop.propTypes = {
    className: PropTypes.string.isRequired,
    open: PropTypes.bool,
};

const blue = {
    200: '#99CCF3',
    400: '#3399FF',
    500: '#007FFF',
};

const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
};

const StyledModal = styled(Modal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = (theme) => ({
    width: 400,
    borderRadius: '12px',
    padding: '16px 32px 24px 32px',
    backgroundColor: theme.palette.mode === 'dark' ? '#0A1929' : 'white',
    boxShadow: `0px 2px 24px ${theme.palette.mode === 'dark' ? '#000' : '#383838'}`,
});

const TriggerButton = styled('button')(
    ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  border-radius: 12px;
  padding: 6px 12px;
  line-height: 1.5;
  background: transparent;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[100] : grey[900]};

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &:focus-visible {
    border-color: ${blue[400]};
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }
  `,
);