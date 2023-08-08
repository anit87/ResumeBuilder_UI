import { makeStyles } from '@mui/styles';
import React, { useEffect,useState } from 'react';
import Layout from '../../Pages/Layout';
import Table from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { Paper } from '@mui/material';
import "react-data-table-component-extensions/dist/index.css";
import { useSelector,useDispatch } from 'react-redux';
import { toggle } from '../../../../redux/action/Action';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { allPackagesData,getalladdons,getIdToEditAddon, deleteAddon} from '../../../../redux/action/Action';
import Popupeditaddons from './Popupeditaddons';
import Swal from "sweetalert2";  
import { Box, Button} from '@mui/material';




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

const Alladdons = () => {
    const [data,setData] = useState([])
    const [tableData,setTableData] = useState({})  
    const [openEditPopUp, setOpenEditPopUp] = useState(false);
  
    const dispatch = useDispatch()
    const toggleState = useSelector((state)=>state.togglingReducer.togglingAll)
    const addondatafromreducer = useSelector((state)=> state.addondata.addondatafinal);
    
  
    const Navigate = useNavigate();

      const classes = useStyle()
   
      const handleEdit = (id) => {
        dispatch(getIdToEditAddon(id))
        .then(()=>Navigate(`/admin/editaddon/${id}`))
      };
  
      const handleClose = () =>{
        setOpenEditPopUp(!openEditPopUp);
        dispatch(getalladdons())
      }
  
      const handleDelete = (id) => {
        Swal.fire({  
          type: 'warning',
          icon: 'warning',   
          text: 'Are you sure you want to delete Addon?',  
          showCancelButton: true, 
          confirmButtonColor: '#507c37',  
          cancelButtonColor: '#d33',  
          confirmButtonText: 'Yes'
        }).then((result)=>{
          if (result.isConfirmed) {    
            dispatch(deleteAddon(id)).then(() =>dispatch(getalladdons())) 
          } else if (result.isDenied) {    
            Swal.fire('Changes are not saved', '', 'info')  
         }
        })
      }
  
      const columns = [
      
          {
            name:'.S.No',
            selector:row=>row['.s.no'],
            sortable: true,
            cell: (row,index) => index+1
          },
           {
             name: "Addons Name",
             selector: row => row.addons_name,
             sortable: true
           },
           {
            name: "Addons price",
            selector: row => `$${parseFloat(row.addons_price).toFixed(2)}`,
            sortable: true
          },
           {
             name : "Action",
             selector: row=>row.id,
             sortable: false,
             cell: (d) => [
              <EditIcon key='1' className={classes.edit_btn} onClick={()=>handleEdit(d.addons_id)} />,
              <DeleteIcon key='2' className={classes.delete_btn} onClick={() => handleDelete(d.addons_id)} />,
            ],
             
           }    
         ];  
  
        useEffect(()=>{
            setData(addondatafromreducer)
        },[addondatafromreducer])
         
        // useEffect(()=>{
        //   dispatch(allPackagesData())
        // },[])
  
  
        useEffect(()=>{
          setTableData((state)=>{
            return{
              ...state,
              data,
              columns
            }
          })
         },[data])

         useEffect(() => {
            dispatch(getalladdons()) 
            }, [])
  
    return (
       
      <>
      <Layout>
         <div className={classes.root} >
  
            <div className={classes.student} style={{ position: 'absolute', right: 0, left: toggleState ? 300 : 0, width:toggleState ? '70%' : '90%' ,transition: '.3s all', margin:'auto' }}>
            <Box style={{textAlign:'right',marginBottom:'20px'}}>
                <Button
                    variant="contained"
                    className={classes.stundentBtn}
                    onClick={()=> Navigate('/admin/addaddons')}
                  >
                    Add Addon
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
                      {
                        openEditPopUp&&<Popupeditaddons handleClose = {handleClose}/>
                       
                      }
            </div>
             </div> 
      </Layout>
      </>
    )
}

export default Alladdons