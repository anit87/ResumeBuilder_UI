import React, { useEffect, useState } from 'react';
import { Paper, Box, Button, Typography, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Layout from '../../Pages/Layout';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';


const useStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100vh',
    color: 'red',
    display: 'flex',
    alignItems: 'center',
    background: theme.palette.secondary.light,
    justifyContent: 'center',
    zIndex: -99,
    '& .MuiPaper-root': {
      width: '35%',
      height: 'max-content',
      padding: `${theme.spacing(4)} 0`,
      [theme.breakpoints.down('lg')]:{
        width:'70%',
        padding: `${theme.spacing(2)} 0`,    
        },
    },
    
  },

  inputs: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
    '& .MuiInputLabel-root': {
      fontSize: 15,
      fontWeight: 500,
    },
    '& .MuiButton-root': {
      color: theme.palette.secondary.light,
    },
    '& .css-1nrlq1o-MuiFormControl-root': {
      width: '90%',
      display: 'flex',
      justifyContent: 'flex-start',
      marginBottom: theme.spacing(2),
      fontSize: 15,
      fontWeight: 500,
    }
  },


}))

const AddStudent = (props) => {

  const classes = useStyle(props)
  const [student, setStudent] = useState({
    name: '',
    email: '',
    phoneNo: '',
    password: '',
    active: ''
  })

  const handleStudent = (e) => {
    const { name, value } = e.target
    setStudent((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  console.log('student',student);
  return (
    <Layout>
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={5}>
          <Box className={classes.inputs}>
            <Typography variant='h5' component='h5' sx={{ marginBottom: 2 }}>
            Student
            </Typography>
            <TextField type='text' id="outlined-basic" label="Name" variant="outlined" sx={{ width: '90%', marginBottom: 2 }} name='name' value={student.name} onChange={handleStudent} />
            <TextField type="email" id="outlined-basic" label="Email" variant="outlined" sx={{ width: '90%', marginBottom: 2 }} name='email' value={student.email} onChange={handleStudent} />
            <TextField type='number' id="outlined-basic" label="Phone No" variant="outlined" sx={{ width: '90%', marginBottom: 2 }} name="phoneNo" value={student.phoneNo} onChange={handleStudent} />
            <TextField  type='password' id="outlined-basic" label="Password" variant="outlined" sx={{ width: '90%', marginBottom: 2 }} name="password" value={student.password} onChange={handleStudent} />
            <FormControl className={classes.radionBtns} >
              <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name='active'
                value={student.active}
                onChange={handleStudent} >
                <FormControlLabel value="Active" control={<Radio />} label="Active" />
                <FormControlLabel value="Inactive" control={<Radio />} label="Inactive" />
              </RadioGroup>
            </FormControl>
            <Button variant='contained' className={classes.stundentBtn}>Add Student</Button>
          </Box>
        </Paper>
      </div>
    </Layout>
  )
}

export default AddStudent