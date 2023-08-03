import React, { useEffect, useRef, useState } from 'react';
import './popupEditPackage.css';
import { Paper, Box, Button, Typography, TextField, Alert, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { getalladdons, updatePackage } from '../../../../redux/action/Action'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const PopupPackageEdit = props => {

    const checkboxes = useRef()
    const [packageData, setPackageData] = useState({
        product_id: '',
        product_name: '',
        product_description: '',
        product_amount: '',
        product_sale_amount: '',
        product_type_id: '1'
    });

    const [editorstate, setEditorstate] = useState({
        editor: '',
    });

    const [addons, setAddons] = useState([]);
    const [unlinkedaddons, setUnlinkedaddons] = useState([]);


    const [message, setMessage] = useState();

    const dispatch = useDispatch();

    const singalpackage = useSelector((state) => state.getIdToEditPackageReducer.packageiddatavalue)
    const addondatafromreducer = useSelector((state) => state.addondata.addondatafinal);

    const UpdateMessage = () => {
        return (
            <Stack spacing={2}>
                <Alert className='popup_updatemsg_stack_alert' severity="success">Data Updated Successfully</Alert>
            </Stack>
        )
    }

    const handleChangeDescription = (event, editor) => {
        const data = editor.getData()
        // const data = packageData.product_description
        //   console.log( 'data is', {event, editor, data});
        setPackageData((pre) => {
            return {
                ...pre,
                product_description: data
            }
        })

    }

    const checkedValue = (e) => {
        const { value, name, checked } = e.target
        if (checked) {
            setAddons((prev) => [...prev, value])
            let index1 = unlinkedaddons.indexOf(value)
            unlinkedaddons.splice(index1, 1)
            let unlincked = [...unlinkedaddons]
            setUnlinkedaddons(unlincked)
        } else {
            let index = addons.indexOf(value)
            setUnlinkedaddons((prev) => [...prev, value])
            addons.splice(index, 1)
            let unchecked = [...addons]
            setAddons(unchecked)
        }
    }

    const handlePackage = (e) => {
        setPackageData((prev) => {
            const { name, value } = e.target;
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const editorConfiguration = {
        toolbar: ['heading', '|', 'bold', 'italic'],
        heading: {
            options: [
                { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                // { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
            ]
        }
    };

    const UpdatePackageData = () => {
        let Data = { PackageData: packageData, Addons: { linked: addons, unlinked: unlinkedaddons } }

        dispatch(updatePackage(Data));
        setMessage(UpdateMessage())
    };



    useEffect(() => {
        setPackageData({
            product_id: singalpackage?.product_id,
            product_name: singalpackage?.product_name,
            product_description: singalpackage?.product_description,
            product_amount: singalpackage?.product_amount,
            product_sale_amount: singalpackage?.product_sale_amount,
            product_type_id: singalpackage?.product_type_id,
        });
    }, [singalpackage]);

    useEffect(() => {
        let addonset = []

        let initialval = document.querySelectorAll(".editcheck");
        initialval?.forEach((item) => {

            let bolean = false;
            singalpackage?.package_addons?.forEach((v) => {

                if (item.name == v.addons_name) {
                    bolean = true
                    addonset.push(v.addons_id)
                }
            })
            if (bolean == true) {
                item.checked = true;
            }
        })
        setAddons(addonset)

    }, [packageData])


    useEffect(() => {
        dispatch(getalladdons())
    }, [addons])

    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={props.handleClose}>x</span>

                <div className='popup-inputs' >
                    <Typography variant="h6" sx={{ marginBottom: 2 }} className='popup-heading' >
                        Edit Package
                    </Typography>
                    {message}
                    <TextField
                        type="text"
                        id="outlined-basic"
                        label="Name"
                        name='product_name'
                        className='test'
                        variant="outlined"
                        sx={{ width: "90%", marginBottom: 2 }}
                        value={packageData.product_name}
                        onChange={handlePackage}

                    />
                    {/* <TextareaAutosize
                        aria-label="empty textarea"
                        placeholder="Description"
                        name='product_description'
                        maxRows={5}
                        className='popup-textarea'
                        value={packageData.product_description}
                        onChange={handlePackage}
                    /> */}

                    <Typography variant="h6" component="h6"  >
                        Description
                    </Typography>

                    <CKEditor
                        editor={ClassicEditor}
                        config={editorConfiguration}
                        name='product_description'
                        data={packageData.product_description != null ? packageData.product_description : ""}
                        onChange={(e, editor, data) => handleChangeDescription(e, editor, data)}
                    />

                    <TextField
                        type="text"
                        id="outlined-basic"
                        label="Price"
                        name='product_amount'
                        variant="outlined"
                        sx={{ width: "90%", marginBottom: 2 }}
                        value={packageData.product_amount}
                        onChange={handlePackage}
                    />

                    <TextField
                        type="text"
                        id="outlined-basic"
                        label="Price"
                        name='product_sale_amount'
                        variant="outlined"
                        sx={{ width: "90%", marginBottom: 2 }}
                        value={packageData.product_sale_amount}
                        onChange={handlePackage}
                    />
                    <Box style={{ flexBasis: '30%', display: 'flex', justifyContent: 'flex-start' }}>
                        <FormGroup>
                            {addondatafromreducer.map((item) => {
                                // console.log('Items are', item)
                                return (
                                    // <FormControlLabel key={item.addons_id} control={<Checkbox />} className="editcheck"
                                    //     label={`${item.addons_name} - $${item.addons_price}`} name={item.addons_name}
                                    //     ref={checkboxes} onClick={checkedValue} value={item.addons_id}
                                    // />
                                    <label>
                                        <input name={item.addons_name} value={item.addons_id} onChange={checkedValue} className="form-check-input editcheck"
                                            type="checkbox" id="flexCheckDefault" /> {item.addons_name} - ${item.addons_price}
                                    </label>
                                )
                            })}

                        </FormGroup>

                    </Box>

                    <Button
                        variant="contained"
                        className='popup-update-btn'
                        onClick={UpdatePackageData}
                    >
                        Update Package
                    </Button>
                </div>



            </div>
        </div>
    );
};

export default PopupPackageEdit;