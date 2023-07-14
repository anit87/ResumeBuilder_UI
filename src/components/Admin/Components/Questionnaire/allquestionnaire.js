import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import Layout from '../../Pages/Layout';
import Table from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { Paper, Box } from '@mui/material';
import "react-data-table-component-extensions/dist/index.css";
import { useSelector, useDispatch } from 'react-redux';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from 'react-router-dom';
import {  adminQuestionnaire, adminQuestionnaireById } from '../../../../redux/action/Action';
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';

const useStyle = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(20),
    width: '100%',
  },
  table: {
    margin: 'auto',
  },
  edit_btn: {
    color: '#44449b',
    cursor: 'pointer'
  },
  delete_btn: {
    color: '#d0989b',
    marginLeft: '10px',
    cursor: 'pointer'

  },
  chat_btn: {
    color: '#d0989b',
    marginLeft: '10px',
    cursor: 'pointer'
  },
}))

const Questionnaire  = () => {
  const [data, setData] = useState([])
  const [tableData, setTableData] = useState({})
  const toggleState = useSelector((state) => state.togglingReducer.togglingAll)
  const adminorderreducerdata = useSelector((state) => state.AdminQuestionnaireReducer.adminQuestionnaireData)

  const Navigate = useNavigate();
  const dispatch = useDispatch()


  const classes = useStyle()

  const columns = [

    {
      name: 'Order Date',
      selector: row => row.order_date,
      sortable: true,
      width: '20%',
    },
    {
      name: "Order Number",
      selector: row => row.order_number,
      sortable: true,
      width: '20%',
      headerStyle: (selector, id) => {
        return { textAlign: "center" }
      },
    }
    , {
      name: "Customer Name",
      selector: row => row.cust_fname + ' ' + row.cust_lname,
      sortable: true,
      width: '20%',
      headerStyle: (selector, id) => {
        return { textAlign: "center" }
      },
    },
    {
      name: "Customer Email",
      selector: row => row.cust_email,
      sortable: true,
      width: '20%',
      headerStyle: (selector, id) => {
        return { textAlign: "center" }
      },
    },
    {
      name: "Action",
      selector: row => row.id,
      sortable: false,
      width: '20%',
      headerStyle: (selector, id) => {
        return { textAlign: "center" }
      },
      cell: (d) => [
        <PreviewOutlinedIcon key='2' className={classes.delete_btn} onClick={() => handleView(d.order_number, d.order_id)} />,
      ],

    }

  ];


  const handleView = (order_number, order_id) => {
    dispatch(adminQuestionnaireById(order_number))
      .then(() => Navigate(`/admin/viewresumeform/${order_number}%2F${order_id}`))
  }

  useEffect(() => {
    setData(adminorderreducerdata)
  }, [adminorderreducerdata])

  useEffect(() => {
    dispatch(adminQuestionnaire())
  }, [])


  useEffect(() => {
    setTableData((state) => {
      return {
        ...state,
        data,
        columns
      }
    })
  }, [data])


  return (
    <>
      <Layout>
        <div className={classes.root} >

          <div style={{ position: 'absolute', right: 0, left: toggleState ? 300 : 0, width: toggleState ? '70%' : '90%', transition: '.3s all', margin: 'auto' }}>
            <Box style={{ textAlign: 'right', marginBottom: '20px' }}>
            </Box>

            <Paper variant='outlined' className={classes.table}
            >
              <DataTableExtensions {...tableData} >
                <Table
                  columns={columns}
                  data={data}
                  noHeader
                  defaultSortField="order_id"
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

export default Questionnaire 