import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import Layout from '../../Pages/Layout';
import Table from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { Paper } from '@mui/material';
import "react-data-table-component-extensions/dist/index.css";
import { useSelector, useDispatch } from 'react-redux';
import { DeleteBooks, toggle } from '../../../../redux/action/Action';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate, useParams } from 'react-router-dom';
import { allPackagesData } from '../../../../redux/action/Action';
import { getallbooksimage, getIdToEditBooks } from '../../../../redux/action/Action'
import '../Faq/Faq.css' 
import Swal from "sweetalert2";
import { Box, Button } from '@mui/material';


const useStyle = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(20),
    width: '100%',
  },
  stundentBtn: {
    backgroundColor: '#d0989b !important'
  },
  table: {
    margin: 'auto',
  },
  edit_btn: {
    color: '#44449b',
    cursor: "pointer"
  },
  delete_btn: {
    color: '#e13d3d',
    cursor: "pointer"

  },
}))

const Allbooks = () => {
  const [data, setData] = useState([])
  const [tableData, setTableData] = useState({})
  const [openEditPopUp, setOpenEditPopUp] = useState(false);

  const dispatch = useDispatch()

  const toggleState = useSelector((state) => state.togglingReducer.togglingAll)
  const getallbooksimagedatareducer = useSelector((state) => state.booksdataimage.booksdatafinalimage) 

  const Navigate = useNavigate();

  const classes = useStyle()

  const handleEdit = (id) => {
    dispatch(getIdToEditBooks(id))
      .then(() => Navigate(`/admin/editbooks/${id}`)) 
  };

  const handleClose = () => {
    setOpenEditPopUp(!openEditPopUp);
    dispatch(allPackagesData())
  }

  const handleDelete = (id) => {
    Swal.fire({
      type: 'warning',
      icon: 'warning',
      text: 'Are you sure you want to delete Book?',
      showCancelButton: true,
      confirmButtonColor: '#507c37',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DeleteBooks(id)).then(() => dispatch(getallbooksimage()))
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  const columns = [
    {
      name: '.S.No',
      selector: row => row['.s.no'],
      sortable: true,
      cell: (row, index) => index + 1
    },
    {
      name: "Books Name",
      selector: row => row.product_name,
      sortable: true
    },
    {
      name: "Sale Price",
      selector: row => `$${parseFloat(row.product_sale_amount).toFixed(2)}`,
      sortable: true
    },
    {
      name: "Price",
      selector: row => `$${parseFloat(row.product_amount).toFixed(2)}`,
      sortable: true
    },
    {
      name: "Action",
      selector: row => row.id,
      sortable: false,
      cell: (d) => [
        <EditIcon key='1' className={classes.edit_btn} onClick={() => handleEdit(d.product_id)} />,
        <DeleteIcon key='2' className={classes.delete_btn} onClick={() => handleDelete(d.product_id)} />,
      ],
    }
  ];

  useEffect(() => {
    setData(getallbooksimagedatareducer)
  }, [getallbooksimagedatareducer])

  useEffect(() => {
    dispatch(allPackagesData())
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

  useEffect(() => {
    dispatch(getallbooksimage())
  }, [])

  return (

    <>
      <Layout>
        <div className={classes.root} >

          <div className={classes.student} style={{ position: 'absolute', right: 0, left: toggleState ? 300 : 0, width: toggleState ? '70%' : '90%', transition: '.3s all', margin: 'auto' }}>
            <Box style={{ textAlign: 'right', marginBottom: '20px' }}>
              <Button
                variant="contained"
                className={classes.stundentBtn}
                onClick={() => Navigate('/admin/addbooks')}
              >
                Add Book
              </Button>
            </Box>
            <Paper variant='outlined' className={classes.table}
            >
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

export default Allbooks