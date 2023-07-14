import React, { useEffect, useState } from 'react';
import '../Packages/popupEditPackage.css';
import { Paper, Box, Button, Typography, TextField, Alert, Stack   } from '@mui/material';
import { useDispatch ,useSelector} from 'react-redux';
import {updateAddon} from '../../../../redux/action/Action'

const Popupeditaddons = (props) => {
    const [addonData, setAddonData] = useState({
        id: '',
        name: '',
        price: '',
    });

    const [message, setMessage] = useState();

    const dispatch = useDispatch();

    const singaladdon = useSelector((state) => state.Addaddondatabyid.initialaddonid)
    console.log("singaladdon", singaladdon)

    const UpdateMessage = () =>{
        return(
           <Stack  spacing={2}>
             <Alert className='popup_updatemsg_stack_alert' severity="success">Data Updated Successfully</Alert>
           </Stack>
        )
    }

    const handleAddon = (e) => {
        setAddonData((prev) => {
            const { name, value } = e.target;
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const UpdateAddonData = () => {
        dispatch(updateAddon(addonData));
        setMessage(UpdateMessage())
    };


    useEffect(() => {
        setAddonData({
            id: singaladdon[0]?.addons_id,
            name: singaladdon[0]?.addons_name,
            price: singaladdon[0]?.addons_price,

        });
    }, [singaladdon]);

    


    return (
    <div className="popup-box">
    <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>

        <div className='popup-inputs' >
            <Typography variant="h6" sx={{ marginBottom: 2 }} className='popup-heading' >
                Edit Addon  
            </Typography>
                {message}
            <TextField
                type="text"
                id="outlined-basic"
                label="Name"
                name='name'
                className='test'
                variant="outlined"
                sx={{ width: "90%", marginBottom: 2 }}
                value={addonData.name}
                onChange={handleAddon}

            />

            <TextField
                type="text"
                id="outlined-basic"
                label="Price"
                name='price'
                variant="outlined"
                sx={{ width: "90%", marginBottom: 2 }}
                value={addonData.price}
                onChange={handleAddon}
            />

            <Button
                variant="contained"
                className='popup-update-btn'
                onClick={UpdateAddonData}
            >
                Update Addon
            </Button>
        </div>



    </div>
</div>
);
}

export default Popupeditaddons