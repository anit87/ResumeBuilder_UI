// import React, {  useState } from 'react';
// import { Paper, Box, Button, Typography, TextField } from '@mui/material';
// import { makeStyles } from '@mui/styles';
// import Layout from '../../Pages/Layout';
// import FormLabel from '@mui/material/FormLabel';
// import FormControl from '@mui/material/FormControl';
// import Switch from '@mui/material/Switch';
// import Select from 'react-select';



// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }
// ]

// const label = { inputProps: { 'aria-label': 'Switch demo' } };
// const useStyle = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     height: '100vh',
//     color: 'red',
//     display: 'flex',
//     alignItems: 'center',
//     background: theme.palette.secondary.light,
//     justifyContent: 'center',
//     zIndex: -99,
//     '& .MuiPaper-root': {
//       width: '35%',
//       height: 'max-content',
//       padding: `${theme.spacing(4)} 0`,
//       [theme.breakpoints.down('lg')]: {
//         width: '70%',
//         padding: `${theme.spacing(2)} 0`,
//       },
//     },

//   },

//   inputs: {
//     height: '100%',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     zIndex: 99,
//     '& .MuiInputLabel-root': {
//       fontSize: 15,
//       fontWeight: 500,
//     },
//     '& .MuiButton-root': {
//       color: theme.palette.secondary.light,
//     },
//     '& .css-1nrlq1o-MuiFormControl-root': {
//       width: '90%',
//       display: 'flex',
//       justifyContent: 'flex-start',
//       marginBottom: theme.spacing(2),
//       fontSize: 15,
//       fontWeight: 500,
//     },
//     '& .css-b62m3t-container':{
//       width:'90%',
//       marginBottom:15,
//       border: theme.palette.secondary.light,
//       '& .css-1s2u09g-control':{
//         padding: `${theme.spacing(1)} 5px`,
//        '& .css-319lph-ValueContainer':{
//         // padding: `${theme.spacing(1)} 5px`,
//        }
//       },
//       '& .css-14el2xx-placeholder':{
//         fontSize: 16,
//         fontWeight: 500,
//         }
  
//     },
 
//   },


// }))

// const Testing = (props) => {

//   const classes = useStyle(props)
// const [category,setCategory] = useState('')
// const [selector,setSelector] = useState('')
// const [toggle,setToggle] = useState({
//     active:true,
//     inactive:false
// })


// const handleSwitchButton = (e) =>{
//     setToggle(e.target.value)
//     let newStatus; 
//     if (e.target.value === '') {
//       newStatus = 'active';
//     } else if (e.target.value === 'active') {
//       newStatus = 'pending';
//     }
// }
 


//   return (
//     <Layout>
//       <div className={classes.root}>
//         <Paper className={classes.paper} elevation={5}>
//           <Box className={classes.inputs}>
//             <Typography variant='h5' component='h5' sx={{ marginBottom: 2 }}>
//               Add Category
//             </Typography>
           
//            <TextField type='text' id="outlined-basic" label="Category Name" variant="outlined" sx={{ width: '90%', marginBottom: 2 }} name='name' value={category} onChange={(e)=>setCategory(e.target.value)} />

//             <Select options={options} />

//             <FormControl className={classes.radionBtns} >
//               <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
//               <Switch checked={toggle} name='toggle' value={toggle} inputProps={{ 'aria-label': 'controlled' }}  onChange={(e)=>handleSwitchButton(e)}/>
//             </FormControl>
//             <Button variant='contained' className={classes.stundentBtn}>Add </Button>
//           </Box>
//         </Paper>
//       </div>
//     </Layout>
//   )
// }

// export default Testing;