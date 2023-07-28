import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import Layout from '../../Pages/Layout';
import Table from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { Paper, Box } from '@mui/material';
import "react-data-table-component-extensions/dist/index.css";
import { useSelector, useDispatch } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from 'react-router-dom';
import { adminorderall, adminorderbyid } from '../../../../redux/action/Action';


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

const Allorders = () => {
  const [data, setData] = useState([])
  const [tableData, setTableData] = useState({})
  const toggleState = useSelector((state) => state.togglingReducer.togglingAll)
  const adminorderreducerdata = useSelector((state) => state.adminallorderreducer.adminorderall)
  // console.log("admin all orders list- ", adminorderreducerdata);
  
  const Navigate = useNavigate();
  const dispatch = useDispatch()


  const classes = useStyle()
  
  const columns = [

    {
      name: 'Date',
      // selector: row => row.order_date,
      selector: row => new Date(`${row.order_created_at}`).toLocaleString(),
      sortable: true,
      width: '13%',
      // cell: (row,index) => index+1
    },
    {
      name: "Order Number",
      selector: row => "FR" + row.order_number + "L",
      sortable: true,
      width: '15%',
      headerStyle: (selector, id) => {
        return { textAlign: "center" }
      },
    },
    {
      name: "Customer Name",
      selector: row => row.cust_fname + ' ' + row.cust_lname,
      sortable: true,
      width: '15%',
      headerStyle: (selector, id) => {
        return { textAlign: "center" }
      },
    },
    {
      name: "Email",
      selector: row => row.cust_email,
      sortable: true,
      width: '20%',
      headerStyle: (selector, id) => {
        return { textAlign: "center" }
      },
    },

    {
      name: "Total",
      selector: row => `$${parseFloat(row.order_subtotal).toFixed(2)}`,
      sortable: true,
      width: '12%',
      headerStyle: (selector, id) => {
        return { textAlign: "center" }
      },
    },
    {
      name: "status",
      selector: row => row.order_status,
      sortable: true,
      width: '12%',
      headerStyle: (selector, id) => {
        return { textAlign: "center" }
      },
      cell: ((row) => {
        if (row.order_status === "0") {
          return 'Pending'
        } else if (row.order_status === "1") {
          return 'Completed'
        } else if (row.order_status === "2") {
          return 'Failed'
        } else {
          return row.order_status
        }
      })

    },

    {
      name: "Action",
      selector: row => row.id,
      sortable: false,
      width: '8%',
      headerStyle: (selector, id) => {
        return { textAlign: "center" }
      },
      cell: (d) => [
        <EditIcon key='1' className={classes.edit_btn} onClick={() => handleEdit(d.order_id)} />,
        <RemoveRedEyeIcon key='2' className={classes.delete_btn} onClick={() => handleDelete(d.order_id)} />,
        <ChatIcon key='3' className={classes.chat_btn} onClick={() => handlechat(d.order_id)} />
      ],

    }

  ];

  const handlechat = (id) => {
    dispatch(adminorderbyid(id)).then(() => Navigate(`/admin/adminchatting/${id}`))
    // Navigate(`/admin/adminchatting/${id}`)
  }

  const handleEdit = (id) => {
    dispatch(adminorderbyid(id))
      // setPopUpOpen(!popUpopen)
      .then(() => Navigate(`/admin/editorder/${id}`))
  };

  const handleDelete = (id) => {
    dispatch(adminorderbyid(id))
      .then(() => Navigate(`/admin/orderinfo/${id}`))
  }

  useEffect(() => {
    setData(adminorderreducerdata)
  }, [adminorderreducerdata])

  useEffect(() => {
    dispatch(adminorderall())
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
              {/* <Button
                  variant="contained"
                  
                  onClick={()=> Navigate('/admin/addfaq')}
                >
                  Add FAQ
                </Button> */}
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

export default Allorders