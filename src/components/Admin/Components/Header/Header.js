import React from 'react'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SideBar from '../SideBar';
import { Box } from '@mui/material';
import {makeStyles} from '@mui/styles'
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';


const useStyle = makeStyles((theme)=>({
   root:{
    height:'100vh',
     position: 'absolute',
     top:0,
     left:-300,
     width:300 ,
     background:'#fff',
     zIndex:999,
    transition:'1s all'
   },
   image:{
       textAlign:'center',
      marginBottom:theme.spacing(1),
      marginTop:theme.spacing(2),
   }
}))


const schoolData = [
    { id: 7, name: 'Orders', pathName:'admin/order', icon: <AddShoppingCartIcon />, package: [{ id:7, text: 'All Orders',  state: true, data: 'false', pathName:'admin/order' }] },
    { id: 8, name: 'Questionnaire', pathName:'admin/questionnaire', icon: <QuestionAnswerOutlinedIcon />, package: [{ id:8, text: 'Questionnaire',  state: true, data: 'false', pathName:'admin/questionnaire' }] },
    { id: 1, name: 'FAQ', pathName:'admin/allfaq', icon: <QuizOutlinedIcon />, package: [{ id:1, text: 'All FAQ' ,pathName:'admin/allfaq' }] },
    { id: 2, name: 'Packages', icon: <CategoryOutlinedIcon />, package: [{ id:2, text: 'All Packages', text2: 'All Addons', pathName2: 'admin/alladdons' ,pathName:'admin/allpackage'}] },
    // { id: 3, name: 'Fields', icon: <ArticleIcon />, package: [{ id:3, text: 'All Field',text2: 'Add New Field', pathName2: 'admin/addfield', pathName: 'admin/fieldtable' }] },
    // { id: 4, name: 'Categories', icon: <CategoryIcon />, package: [{ id:4, text: 'All Category', text2: 'Add New Category',state: true, data: 'false', pathName2: 'admin/addcategory', pathName:'admin/categorytable' }] },
    { id: 6, name: 'Books', pathName:'admin/allbooks', icon: <LibraryBooksOutlinedIcon />, package: [{ id:6, text: 'All Books',  state: true, data: 'false', pathName:'admin/allbooks' }] },
    { id: 5, name: 'All Customer', pathName:'admin/allcustomer', icon: <PeopleAltOutlinedIcon />, package: [{ id:5, text: 'Show All Customer',state: true, data: 'false', pathName:'admin/allcustomer' }] },


    

    // { id: 4, name: 'Questions', icon: <QuestionAnswerIcon />, package: [{ text: 'All Question', text2: 'Add New Question', pathName2: 'addquestion'}] },
   

]
const MainSidebar = () => {
    
    const classes = useStyle();
    return (
            <Box className={classes.root}  >
                <Box className={classes.image}>
              
              </Box>
              {schoolData.map((elem, i) =>{
                    return(
                        <Box key={i}>
                        <SideBar key={elem.id} sidebarData={elem} />
                        </Box>
                    )
                } 
                )}
            </Box>
    )
}

export default MainSidebar