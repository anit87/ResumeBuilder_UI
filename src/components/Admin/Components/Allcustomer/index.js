import { makeStyles } from '@mui/styles';
import React, { useEffect, useState, useRef } from 'react';
import Layout from '../../Pages/Layout';
import Table from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { Paper, Box, Button, Typography, TextField } from '@mui/material';
import "react-data-table-component-extensions/dist/index.css";
import { useSelector, useDispatch } from 'react-redux';
import { toggle } from '../../../../redux/action/Action';
import { useNavigate } from 'react-router-dom';
import { allFaqData } from '../../../../redux/action/Action';
import { Allcustomer, StatusChange } from '../../../../redux/action/Action'
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import '../Faq/Faq.css'



const useStyle = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(20),
    width: '100%',
  },
  table: {

    //  width:'90%',
    margin: 'auto',

  },
  statusDiv: {
    display: 'flex',
    alignItems: 'center',
  },
  active: {
    // fontSize: '17px!important',
    //   fontWeight: '500!important',
    color: 'green',
    // marginBottom:2
  },
  inactive: {
    // fontSize: '17px!important',
    // fontWeight: '500!important',
    color: 'red',
    // marginBottom:2
  },
  ' & .active': {
    color: 'green',
  }
}))



const AllCustomer = () => {

  const classes = useStyle();

  const [customerStatus, setCustomerStatus] = useState({
    status: '0',
    statusApi: false
  });

  const [userStatus, setUserStatus] = useState({
    active: '1',
    inactive: '0'
  })

  const [activeClass, setActiveClass] = useState(false);

  const [data, setData] = useState([])
  const [tableData, setTableData] = useState({})
  const [deleteSuccess, setDeleteSuccess] = useState('')


  const dispatch = useDispatch()
  const toggleState = useSelector((state) => state.togglingReducer.togglingAll)

  const getallcustomer = useSelector((state) => state.getallcustomer.customerData)

  const Navigate = useNavigate();
  const inputSwitch = useRef('')
  const label = { inputProps: { 'aria-label': 'Switch demo' } }


  const handlerStatus = (e, id) => {
    let { name, value } = e.target;
    if (customerStatus.statusApi) {
      setCustomerStatus((prev) => {
        return {
          ...prev,
          [name]: false,
          status: "0",
        }
      })
      let data = { "action": "CustomersStatusChange", "id": parseInt(id), "status": customerStatus.status }
      dispatch(StatusChange(data))
    } else {
      setCustomerStatus((prev) => {
        return {
          ...prev,
          [name]: true,
          status: "1",
        }
      })
      let data = { "action": "CustomersStatusChange", "id": parseInt(id), "status": customerStatus.status }
      dispatch(StatusChange(data))
    }

  }

  const ActiveCustomer = (id) => {
    setActiveClass(true)
    let data = { "action": "CustomersStatusChange", "id": parseInt(id), "status": userStatus.active }
    dispatch(StatusChange(data)).then(dispatch(Allcustomer()))
  }

  const InActiveCustomer = (id) => {
    let data = { "action": "CustomersStatusChange", "id": parseInt(id), "status": userStatus.inactive }
    dispatch(StatusChange(data)).then(dispatch(Allcustomer()))
  }


  const columns = [

    // {
    //   name:'Id',
    //   selector:row => row.id,
    //   sortable: true,
    //   cell: (row,index) => index+1
    // }
    , {
      name: "Firstname",
      selector: row => row.cust_fname,
      sortable: true
    },
    {
      name: "Lastname",
      selector: row => row.cust_lname,
      sortable: true
    },
    {
      name: "Email",
      selector: row => row.cust_email,
      sortable: true,
    },
    {

      name: "Status",
      // selector: row => row.customer_status,
      sortable: true,
      cell: (d) => (
        // <FormGroup>
        //   <Switch name="statusApi"  value={customerStatus.status} onClick={(e)=>handlerStatus(e, d.id)}   />
        // </FormGroup>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={d.cust_status}
            name="radio-buttons-group"
            style={{ display: 'flex', flexDirection: 'row' }}
          >
            <FormControlLabel value={userStatus.active} control={<Radio />} label="Active" onClick={() => ActiveCustomer(d.cust_id)} />
            <FormControlLabel value={userStatus.inactive} control={<Radio />} label="InActive" onClick={() => InActiveCustomer(d.cust_id)} />
          </RadioGroup>
        </FormControl>
      )
    },

  ];


  useEffect(() => {
    setData(getallcustomer)
  }, [getallcustomer])

  useEffect(() => {
    dispatch(allFaqData())
  }, [])

  useEffect(() => {
    let isApiData = true;
    if (isApiData) {
      dispatch(Allcustomer());
    }
    return () => {
      isApiData = false;
    }
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
          <div className={classes.student}>
            <Paper variant='outlined' className={classes.table}
              style={{ position: 'absolute', right: 0, left: toggleState ? 300 : 0, width: toggleState ? '70%' : '90%', transition: '.3s all', }}>
              <DataTableExtensions {...tableData} >
                <Table
                  columns={columns}
                  data={data}
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

export default AllCustomer