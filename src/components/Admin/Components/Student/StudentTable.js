import { makeStyles } from '@mui/styles';
import React, { useEffect,useState,useCallback } from 'react';
import Layout from '../../Pages/Layout';
import Table from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import "react-data-table-component-extensions/dist/index.css";
import { useSelector,useDispatch } from 'react-redux';
import { toggle } from '../../../../redux/action/Action';



const useStyle = makeStyles((theme)=>({
   root:{
     paddingTop:theme.spacing(20),
     width:'100%',
   },
   table:{
     
    //  width:'90%',
     margin:'auto',
   
   }
}))
const StudentTable = () => {
  const [data,setData] = useState([])
  const [tableData,setTableData] = useState({})
  const dispatch = useDispatch()
  const toggleState = useSelector((state)=>state.togglingReducer.togglingAll)

  
  // const handleState = useCallback(()=>{
  //   console.log('toggleState',toggleState);
  // },[toggleState])

    const classes = useStyle()
    const student= [
   {id:1,name:'rohit', email:'rohit122@gmail.com',password:12345},
   {id:2,name:'virat', email:'virat122@gmail.com',password:12345},
   {id:3,name:'pant', email:'pant122@gmail.com',password:12345},
   {id:4,name:'dhawan', email:'dhawan122@gmail.com',password:12345},
   {id:5,name:'jadeja', email:'jadeja122@gmail.com',password:12345}
    ]

    const columns = [
        {
          name:'.S.No',
          selector:'.s.no',
          sortable: true,
          cell: (row,index) => index+1
        }
         , {
           name: "Name",
           selector: "name",
           sortable: true
         },
         {
           name: "Email",
           selector: "email",
           sortable: true
         },
         {
           name: "Password",
           selector: "password",
           sortable: true
         },
       ];


       useEffect(()=>{
        setData(student)
       dispatch(toggle())
       },[])
       


       useEffect(()=>{
        setTableData((state)=>{
          return{
            ...state,
            data,
            columns
          }
        })
       },[data])
  return (
     
    <>
    <Layout>
       <div className={classes.root} >

          <div className={classes.student}>
              <Paper variant='outlined' className={classes.table}
               style={{ position: 'absolute', right: 0, left: toggleState ? 300 : 0, width:toggleState ? '80%' : '90%' ,transition: '.3s all', }}>
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

export default StudentTable