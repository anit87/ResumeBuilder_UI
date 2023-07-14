import { makeStyles } from '@mui/styles';
import React, { useEffect,useState } from 'react';
import Layout from '../../Pages/Layout';
import Table from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { Paper,Box, Button } from '@mui/material';
import "react-data-table-component-extensions/dist/index.css";
import { useSelector,useDispatch } from 'react-redux';
import { toggle } from '../../../../redux/action/Action';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate, useParams } from 'react-router-dom';
import { allFaqData } from '../../../../redux/action/Action';
import {deleteFaq} from '../../../../redux/action/Action'
import {getIdToEditFAQ} from '../../../../redux/action/Action'
import Swal from "sweetalert2";  
import './Faq.css'





const useStyle = makeStyles((theme)=>({
   root:{
     paddingTop:theme.spacing(20),
     width:'100%',
   },
   stundentBtn:{
    backgroundColor:'#d0989b !important'
   },
   table:{
     margin:'auto',
   },
   edit_btn :{
    color: '#44449b',
    cursor: "pointer"
  },
  delete_btn:{
    color: '#e13d3d',
    cursor: "pointer"

  },
}))

const FaqTable = () => {

  const [data, setData] = useState([])
  const [tableData, setTableData] = useState({})


  const [popUpopen, setPopUpOpen] = useState(false);

  const dispatch = useDispatch()
  const toggleState = useSelector((state) => state.togglingReducer.togglingAll)


  const getFaqAllData = useSelector((state) => state.GetFaqDataReducer.FaqAllData)

  const Navigate = useNavigate();

  if (getFaqAllData === undefined) {
    dispatch(allFaqData())
  }
  const classes = useStyle()

  const handleEdit = (id) => {
    dispatch(getIdToEditFAQ(id))
      .then(() => Navigate(`/admin/editfaq/${id}`))
  };
  const handleClose = () => {
    setPopUpOpen(!popUpopen);
    dispatch(allFaqData())
  };

  const handleDelete = (id) => {
    Swal.fire({
      type: 'warning',
      icon: 'warning',
      text: 'Are you sure you want to delete Faq?',
      showCancelButton: true,
      confirmButtonColor: '#507c37',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteFaq(id)).then(() => dispatch(allFaqData()))
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved')
      }
    })
  }

  const columns = [

    {
      name: '.S.No',
      selector: row=>row['.s.no'],
      sortable: true,
      width: '10%',
      cell: (row, index) => index + 1
    }
    , {
      name: "Questions",
      selector: row => row.faq_title,
      sortable: true,
      width: '70%',
      headerStyle: (selector, id) => {
        return { textAlign: "center" }
      },
    },
    // {
    //   name: "Answers",
    //   // selector: row => row.faq_description,
    //   selector: row => <div dangerouslySetInnerHTML={{ __html: row.faq_description }}></div>,
    //   sortable: true,
    //   width: '50%',
    //   headerStyle: (selector, id) => {
    //     return { textAlign: "center" }
    //   },
    // },
    {
      name: "status",
      selector: row => row.faq_status,
      sortable: true,
      width: '10%',
      headerStyle: (selector, id) => {
        return { textAlign: "center" }
      },
      cell: ((row) => {
        if (row.faq_status === "0") {
          return 'inactive'
        } else if (row.faq_status === "1") {
          return 'active'
        } else {
          return row.faq_status
        }
      })
    },
    {
      name: "Action",
      selector: row=> row.id,
      sortable: false,
      width: '10%',
      headerStyle: (selector, id) => {
        return { textAlign: "center" }
      },
      cell: (d) => [
        <EditIcon key='1' className={classes.edit_btn} onClick={() => handleEdit(d.faq_id)} />,
        <DeleteIcon key='2' className={classes.delete_btn} onClick={() => handleDelete(d.faq_id)} />,
      ],
    }
  ];

  useEffect(() => {
    setData(getFaqAllData)
  }, [getFaqAllData])

  useEffect(() => {
    dispatch(allFaqData())
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

          <div className={classes.student} style={{ position: 'absolute', right: 0, left: toggleState ? 300 : 0, 
                                                    width: toggleState ? '70%' : '90%', transition: '.3s all', margin: 'auto' }}>
            <Box style={{ textAlign: 'right', marginBottom: '20px' }}>
              <Button
                variant="contained"
                className={classes.stundentBtn}
                onClick={() => Navigate('/admin/addfaq')}
              >
                Add FAQ
              </Button>
            </Box>
            <Paper variant='outlined' className={classes.table}>
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

export default FaqTable