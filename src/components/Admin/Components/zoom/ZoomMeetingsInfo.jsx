import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import Layout from '../../Pages/Layout';
import { Paper, Box, Typography } from '@mui/material';
import "react-data-table-component-extensions/dist/index.css";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import './adminMeetings.css'
import { getAllMeets, approveStatus } from '../../../../redux/action/Action';
import Table from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import Alert from '../../../basicComponents/Alert';
import DateAndTime from '../../../inputs/DateAndTimePicker';
import dayjs from 'dayjs';

const useStyle = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(15),
        width: '100%',
    },
    table: {
        margin: 'auto',
    },
    edit_btn: {
        color: '#44449b',
        cursor: "pointer"
    },
    delete_btn: {
        color: '#d0989b',
        cursor: "pointer"
    },
    chat: {
        backgroundColor: '#d0989b',
        color: '#fff',
        outline: 'none',
        border: '1px solid #d0989b',
        fontSize: '17px',
        textTransform: 'capitalize',
        padding: '5px 10px'

    },
}))

const Orderinfo = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch()
    const userid = useParams()
    const classes = useStyle()

    const [alert, setAlert] = useState(false);

    const toggleState = useSelector((state) => state.togglingReducer.togglingAll)
    const zoomMeetinList = useSelector((state) => state.zoomMeeting.meetingList)
    const meetStatusMessage = useSelector((state) => state.zoomMeeting.meetStatusMessage)

    const [newMeetingDate, setNewMeetingDate] = useState("")

    useEffect(() => {
        dispatch(getAllMeets(userid.id))
    }, [])
    useEffect(() => {
        alertfn()
        dispatch(getAllMeets(userid.id))
    }, [meetStatusMessage])

    const alertfn = () => {
        setTimeout(() => setAlert(true), 100);
    }


    const columns = [
        {
            name: 'S.No',
            selector: row => row['.s.no'],
            sortable: true,
            cell: (row, index) => index + 1
        },
        {
            name: "Topic",
            selector: row => row.topic,
            sortable: true
        },
        {
            name: "Agenda",
            selector: row => row.agenda,
            sortable: true
        },
        {
            name: "Schedule Time",
            // selector: row => new Date(`${row.meetingTime}`).toLocaleString(),
            // selector: row => <DateAndTime value = {row.meetingTime} onChange={(meetingDate) =>setNewMeetingDate(meetingDate)} />,
            selector: row => row.approvedStatus === 1 ?
                new Date(`${row.meetingTime}`).toLocaleString() :
                <DateAndTime value={row.meetingTime} onChange={(meetingDate) => setNewMeetingDate(meetingDate)} />,
            sortable: true
        },
        {
            name: "Action",
            selector: row => row.meeting_id,
            sortable: false,
            cell: (d) => d.approvedStatus === 1 ? <>
                <button className={`${classes.chat} btn mx-2`} onClick={()=>window.open(`${d.start_url}`, '_blank', 'noopener,noreferrer')} >Join</button>
                
            </> :
                [
                    <DoneIcon key='1' className={classes.edit_btn} onClick={() => dispatch(approveStatus({
                        id: d.meeting_id,
                        meetingTime: newMeetingDate ? newMeetingDate : d.meetingTime,
                        custEmail: zoomMeetinList?.data[0]?.cust_email,
                        topic: d.topic,
                        duration: "15"
                    }))} />
                ],
        }
    ];

    const tableData = {
        columns,
        data: zoomMeetinList.status ? zoomMeetinList.data : [],
    };

    return (
        <>
            <Layout>
                <div className={classes.root} >
                    {meetStatusMessage &&
                        <Alert
                            open={alert}
                            type={meetStatusMessage.status ? "info" : "error"}
                            msg={meetStatusMessage.message}
                            onClose={() => setAlert(false)}
                        />}

                    <div style={{ position: 'absolute', right: 0, left: toggleState ? 300 : 0, width: toggleState ? '70%' : '90%', transition: '.3s all', margin: 'auto' }}>
                        <Box sx={{ marginBottom: '40px' }}>
                            <Typography variant="h5" component="h5" sx={{ marginBottom: '5px !important', fontSize: '25px', }}>
                                Meetings Detail
                            </Typography>
                        </Box>
                        <Box style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h5" component="h5" sx={{ marginBottom: '5px !important', fontSize: '19px' }}>
                                Order Number : {zoomMeetinList.status ? `FR${zoomMeetinList.data[0]?.order_number}L` : null}
                            </Typography>
                            <Typography variant="h5" component="h5" sx={{ marginBottom: '20px !important', fontSize: '19px' }}>
                                Order Date : {zoomMeetinList.status ? new Date(`${zoomMeetinList.data[0]?.order_created_at}`).toLocaleString() : null}
                            </Typography>
                        </Box>

                        <Box style={{ marginBottom: '20px' }}>
                            <Typography variant="h6" component="h6" sx={{ marginBottom: '20px !important' }}>
                                Customer Details
                            </Typography>
                            <Typography variant="h6" component="h6" sx={{ marginBottom: '20px !important', fontSize: '18px !important' }}>
                                Name : {zoomMeetinList.status ? zoomMeetinList.data[0]?.cust_fname + ' ' + zoomMeetinList.data[0]?.cust_lname : null}
                            </Typography>
                            <Typography variant="h6" component="h6" sx={{ marginBottom: '20px !important', fontSize: '18px !important' }}>
                                Email : {zoomMeetinList.status ? zoomMeetinList.data[0]?.cust_email : null}
                            </Typography>
                        </Box>

                        <Paper variant='outlined' className={classes.table}
                        >
                            <DataTableExtensions {...tableData} >
                                <Table
                                    columns={columns}
                                    data={zoomMeetinList.data}
                                    noHeader
                                    defaultSortField="id"
                                    defaultSortAsc={false}
                                    pagination
                                    highlightOnHover
                                />
                            </DataTableExtensions>
                        </Paper>


                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Orderinfo