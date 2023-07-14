import React, { useState, useEffect } from 'react';
import './stepper.css'
import { HiOutlineArrowNarrowRight, HiOutlineArrowNarrowLeft } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import DoneIcon from '@mui/icons-material/Done';
import Layout from '../../Layout/Layout';
import { IoMdClose } from 'react-icons/io';
import { FiSave } from 'react-icons/fi';
import MiniNav from '../../components/MiniNav/MiniNav'
import PhoneInput from 'react-phone-input-2'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import 'react-phone-input-2/lib/style.css'
import { IntakeForm, UserIntakeForm, UserIntakeFormById } from '../../redux/action/Action';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate, useParams } from 'react-router-dom';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',

  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',

  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',

  },
}));



const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: '#27aae1',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: '#27aae1',

    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 25,
  ...(ownerState.active && {
    background: '#f25b2a',
    // border:'5px solid red',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',

  }),
  ...(ownerState.completed && {

    background: '#27aae1',
  }),

}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;
  const icons = {
    1: completed ? <DoneIcon /> : 1,
    2: completed ? <DoneIcon /> : 2,
    3: completed ? <DoneIcon /> : 3,
    4: completed ? <DoneIcon /> : 4,
    5: completed ? <DoneIcon /> : 5,
    6: completed ? <DoneIcon /> : 6,
    7: completed ? <DoneIcon /> : 7,
    8: completed ? <DoneIcon /> : 8,

  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}


const Steppers = () => {

  const [stepData, setSteps] = useState(0)
  const [newState, setNewState] = useState(1)
  const [animation, setAnimation] = useState(false)
  const [isAllfieldFilled, setIsAllfieldFilled] = useState(false)
  const [transformMsg, setTransformMsg] = useState('message_not_success')
  const [statusIs, setStatusIs] = useState(false)

  let Email = localStorage?.getItem("frontemail");
  let userId = localStorage?.getItem("frontuserid");

  const userid = useParams()
  const feact1 = userid.id;
  let navigate = useNavigate()
  let new_id = feact1.split("/");

  const url_auth = new_id[1] * 45 + 'Y2F0ZWdvcnk9d';

  const [getInputData, SetGetInputData] = useState({
    cust_id: userId,
    order_id: new_id[0],
    name: '',
    lName: '',
    address: '',
    email: Email,
    appartment: '',
    city: '',
    postal_code: '',
    country: '',
    phone: '',
    linkeDin: '',
    institude: '',
    location: '',
    degree: '',
    concentration: '',
    startDate: '',
    toEnd: '',
    graduation: '',
    graduation_date: '',
    company_name: '',
    company_address: '',
    date_of_form: '',
    ToEmployment: '',
    job_title: '',
    direct_report: '',
    description: '',
    techinical_skill: '',
    other_info: ''
  })

  const [editorstate, setEditorstate] = useState({
    editorAchievements: '',
    editorTechnicalSkills: '',
    editorOtherInfo: '',
  });

  const dispatch = useDispatch();

  const steps = [
    {
      id: 1,
      name: 'Name'
    },
    {
      id: 2,
      name: 'Address'
    },
    {
      id: 3,
      name: 'Phone'
    },
    {
      id: 4,
      name: 'Lindedin'
    },
    {
      id: 5,
      name: 'Education'
    },
    {
      id: 6,
      name: 'Employer'
    },
    {
      id: 7,
      name: 'Technical Skills'
    },
    {
      id: 8,
      name: 'Other information'
    },

  ]

  const IntakeSubmitMessage = useSelector((state) => state.GetmsgforuserIntakeForm.userintakeformData);
  const GetIntakeFrmDataId = useSelector((state) => state.GetUserIntakeFormById.getUserStepFormById)

  const handleNavigate = (data) => {
    if (data === 'next') {
      if (getInputData.name && getInputData.lName) {
        setNewState(newState + 1)
        setAnimation(true)
        setSteps(newState)
        setIsAllfieldFilled(true)
      }
      else {
        return (
          <p></p>
        )
      }

    } else if (data === 'prev') {
      setNewState(newState - 1)
      setSteps(newState - 2)
      setAnimation(false)
    }

  }
  const handleAddressNavigate = (data) => {
    if (data === 'next') {
      if (getInputData.address && getInputData.city && getInputData.postal_code && getInputData.country) {
        setNewState(newState + 1)
        setAnimation(true)
        setSteps(newState)
        setIsAllfieldFilled(true)
      }
      else {
        return (
          <>sorry</>
        )
      }
    } else if (data === 'prev') {
      setNewState(newState - 1)
      setSteps(newState - 2)
      setAnimation(false)
    }
  }

  const handlePhoneNavigate = (data) => {
    if (data === 'next') {
      if (getInputData.phone) {
        setNewState(newState + 1)
        setAnimation(true)
        setSteps(newState)
        setIsAllfieldFilled(true)
      }
      else {
        return (
          <>sorry</>
        )
      }
    } else if (data === 'prev') {
      setNewState(newState - 1)
      setSteps(newState - 2)
      setAnimation(false)
    }
  }
  const handleEducationNavigate = (data) => {
    if (data === 'next') {
      if (getInputData.linkeDin) {
        setNewState(newState + 1)
        setAnimation(true)
        setSteps(newState)
        setIsAllfieldFilled(true)
      }
      else {
        return (
          <>sorry</>
        )
      }
    } else if (data === 'prev') {
      setNewState(newState - 1)
      setSteps(newState - 2)
      setAnimation(false)
    }
  }

  const handleStepperForm = (e) => {
    let { name, value } = e.target;
    SetGetInputData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  const handlePhone = (value) => {
    SetGetInputData((prev) => {
      return {
        ...prev,
        phone: value
      }
    })
  }

  const handleGratuation = (e) => {
    let { name, value } = e.target;
    if (value == 'Yes') {
      SetGetInputData((prev) => {
        return {
          ...prev,
          graduation: value
        }
      })
    }
    else {
      SetGetInputData((prev) => {
        return {
          ...prev,
          graduation: value,
          graduation_date: "0000-00-00"
        }
      })
    }
  }

  const handleSave = (data) => {
    if (data == 'save') {
      // dispatch(UserIntakeForm(getInputData))
      dispatch(UserIntakeForm(getInputData)).then(() => { navigate(`/orderdetail/${url_auth}`) })
      // dispatch(IntakeForm(getInputData)) 
    }
  }

  const editorConfiguration = {
    toolbar: ['heading', '|',
      'fontfamily', 'fontsize', '|',
      'alignment', '|',
      'fontColor', 'fontBackgroundColor', '|',
      'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
      'link', '|',
      'outdent', 'indent', '|',
      'bulletedList', 'numberedList', 'todoList', '|',
      'code', 'codeBlock', '|',
      '|',
      'undo', 'redo']
  };

  const handleChangeDescriptionAchievements = (event, editor) => {
    const data = editor.getData()
    SetGetInputData((pre) => {
      return {
        ...pre,
        description: data
      }
    })

  }

  const handleChangeTechnicalSkills = (event, editor) => {
    const data = editor.getData()
    SetGetInputData((pre) => {
      return {
        ...pre,
        techinical_skill: data
      }
    })

  }

  const handleChangeOtherInfo = (event, editor) => {
    const data = editor.getData()
    SetGetInputData((pre) => {
      return {
        ...pre,
        other_info: data
      }
    })

  }


  useEffect(() => {
    const editor =
      <CKEditor
        editor={ClassicEditor}
        config={editorConfiguration}
        onChange={(e, editor, data) => handleChangeDescriptionAchievements(e, editor, data)}
        data={getInputData?.description}
      />
    const TechnicalEditor =
      <CKEditor
        editor={ClassicEditor}
        config={editorConfiguration}
        onChange={(e, editor, data) => handleChangeTechnicalSkills(e, editor, data)}
        data={getInputData?.techinical_skill}
      />
    const OtherInfoEditor =
      <CKEditor
        editor={ClassicEditor}
        config={editorConfiguration}
        onChange={(e, editor, data) => handleChangeOtherInfo(e, editor, data)}
        data={getInputData?.other_info}
      />
    setEditorstate((prev) => {
      return {
        ...prev,
        editorAchievements: editor,
        editorTechnicalSkills: TechnicalEditor,
        editorOtherInfo: OtherInfoEditor,
      }
    })
  }, [getInputData?.description, getInputData?.techinical_skill, getInputData?.other_info])

  const IntakeFormById = (order_ids) => {
    dispatch(UserIntakeFormById(order_ids)).then(() => navigate(`/editstepperform/${order_ids}`))
  }

  useEffect(() => {
    if (IntakeSubmitMessage?.Status == '200' && statusIs == true) {
      setTransformMsg("message_success")
    }
    let messageTime = setTimeout(() => {
      setTransformMsg("message_not_success")
      setStatusIs(true)
    }, 5000)

    return () => {
      clearTimeout(messageTime)
    }
  }, [IntakeSubmitMessage])

  useEffect(() => {
    dispatch(UserIntakeFormById(new_id[0]))
  }, [new_id[0]])

  const Stepps = () => {
    return (
      <Stack sx={{ width: '100%' }} spacing={4}>
        <Stepper alternativeLabel activeStep={newState - 1} connector={<ColorlibConnector />}>
          {steps.map((items, index) => (
            <Step key={index} >
              <StepLabel StepIconComponent={ColorlibStepIcon}>{items.name}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Stack>
    )
  }

  const Names = () => {
    return (
      <>
        <div className={animation ? "row animated bounceInRight" : "row animated bounceInLeft"}>
          <div className="mb-3 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <label htmlFor="exampleFormControlInput1" className="form-label">First Name</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="First Name" name='name' value={getInputData.name} onChange={(e) => handleStepperForm(e)} required />
          </div>
          <div className="mb-3  col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Last Name</label>
            <input type="text" className="form-control" id="exampleFormControlInput" placeholder="Last Name" name='lName' value={getInputData.lName} onChange={(e) => handleStepperForm(e)} required />
          </div>
          <div className="mb-3  col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Email</label>
            <input type="text" className="form-control" id="exampleFormControlInput" placeholder={Email} name='email' value={getInputData.email} onChange={(e) => handleStepperForm(e)} disabled />
          </div>
        </div>
        <button className="btn stepper_next me-3" type="submit" onClick={() => handleNavigate('next')}>Next <HiOutlineArrowNarrowRight size={20} className='stepIcon' /></button>
      </>
    )
  }
  const Address = () => {
    return (
      <>
        <div className={animation ? "row animated bounceInRight" : "row animated bounceInLeft"}>
          <div className="mb-4 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <label htmlFor="exampleFormControlInput1" className="form-label">Address</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" name='address' placeholder="Address" value={getInputData.address} onChange={(e) => handleStepperForm(e)} required />
          </div>
          <div className="mb-4  col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Appartment , suite, etc. (optional)</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Appartment , suite, etc" name='appartment' value={getInputData.appartment} onChange={(e) => handleStepperForm(e)} />
          </div>
          <div className="mb-4 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <label htmlFor="exampleFormControlInput1" className="form-label">City</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="City" name='city' value={getInputData.city} onChange={(e) => handleStepperForm(e)} required />
          </div>
          <div className="mb-4  col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Postal Code</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Postal Code" name='postal_code' value={getInputData.postal_code} onChange={(e) => handleStepperForm(e)} required />
          </div>
          <div className="mb-4  col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Country</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Country" name='country' value={getInputData.country} onChange={(e) => handleStepperForm(e)} required />
          </div>
        </div>
        <button className="btn stepper_back  me-3" type="submit" onClick={() => handleNavigate('prev')}><HiOutlineArrowNarrowLeft size={20} className='stepIcon' /> Back</button>
        <button className="btn stepper_next me-3" type="submit" onClick={() => handleAddressNavigate('next')}>Next <HiOutlineArrowNarrowRight size={20} className='stepIcon' /></button>
      </>
    )
  }
  const Phone = () => {
    return (
      <>
        <div className="row ">
          <PhoneInput
            className='col-md-12 col-lg-12 col-xl-12 mb-4'
            name='phone'
            value={getInputData.phone}
            onChange={(e) => handlePhone(e)}
            country={'us'}
            inputProps={{
              name: 'phone',
              required: true,
              autoFocus: true
            }}
          />
        </div>
        <button className="btn stepper_back  me-3" type="submit" onClick={() => handleNavigate('prev')}><HiOutlineArrowNarrowLeft size={20} className='stepIcon' /> Back</button>
        <button className="btn stepper_next me-3" type="submit" onClick={() => handlePhoneNavigate('next')}>Next <HiOutlineArrowNarrowRight size={20} className='stepIcon' /></button>
      </>
    )
  }
  const Linkedin = () => {
    return (
      <>
        <div className={animation ? "row animated bounceInRight" : "row animated bounceInLeft"}>
          <div className="mb-4  col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Linkedin</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Linkedin url" name='linkeDin' value={getInputData.linkeDin} onChange={(e) => handleStepperForm(e)} />
          </div>
        </div>
        <button className="btn stepper_back  me-3" type="submit" onClick={() => handleNavigate('prev')}><HiOutlineArrowNarrowLeft size={20} className='stepIcon' /> Back</button>
        <button className="btn stepper_next me-3" type="submit" onClick={() => handleNavigate('next')}>Next <HiOutlineArrowNarrowRight size={20} className='stepIcon' /></button>
      </>
    )
  }
  const Education = () => {
    return (
      <>
        <div className={animation ? "row animated bounceInRight" : "row animated bounceInLeft"}>
          <div className="mb-4 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <label htmlFor="exampleFormControlInput1" className="form-label">Institution Name</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Institution Name" name='institude' value={getInputData.institude} onChange={(e) => handleStepperForm(e)} />
          </div>
          <div className="mb-4  col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Location</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Location" name='location' value={getInputData.location} onChange={(e) => handleStepperForm(e)} />
          </div>
          <div className="mb-4 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <label htmlFor="exampleFormControlInput1" className="form-label">Degree</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Degree" name='degree' value={getInputData.degree} onChange={(e) => handleStepperForm(e)} />
          </div>
          <div className="mb-4  col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Concentration</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Concentration" name='concentration' value={getInputData.concentration} onChange={(e) => handleStepperForm(e)} />
          </div>
          <div className="mb-4 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <label htmlFor="exampleFormControlInput1" className="form-label">Start Date</label>
            <input type="date" className="form-control" id="exampleFormControlInput1" placeholder="Start Date" name='startDate' value={getInputData.startDate} onChange={(e) => handleStepperForm(e)} />
          </div>
          <div className="mb-4  col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">To</label>
            <input type="Date" className="form-control" id="exampleFormControlInput1" placeholder="End Date" name='toEnd' value={getInputData.toEnd} onChange={(e) => handleStepperForm(e)} />
          </div>
          <div className="mb-4  col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <label htmlFor="exampleFormControlInput1" className="form-label">Did You Graduate</label>
            <select className="form-select" aria-label="Default select example" name='graduation' value={getInputData.graduation} onChange={(e) => handleGratuation(e)}>
              <option defaultValue>Yes/No</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="mb-4  col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Graduation Date</label>
            <input type="Date" className="form-control" id="exampleFormControlInput1" placeholder="Graduation Date" name='graduation_date'
              value={getInputData.graduation == 'Yes' ? getInputData.graduation_date : "0000-00-00"} onChange={(e) => handleStepperForm(e)} disabled={getInputData.graduation === "Yes" ? 0 : 1} />
          </div>
        </div>
        <button className="btn stepper_back  me-3" type="submit" onClick={() => handleNavigate('prev')}><HiOutlineArrowNarrowLeft size={20} className='stepIcon' /> Back</button>
        <button className="btn stepper_next me-3" type="submit" onClick={() => handleNavigate('next')}>Next <HiOutlineArrowNarrowRight size={20} className='stepIcon' /></button>
      </>
    )
  }
  const company = () => {
    return (
      <>
        <div className={animation ? "row animated bounceInRight" : "row animated bounceInLeft"}>
          <div className="mb-4 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <label htmlFor="exampleFormControlInput1" className="form-label">Company Name</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Company Name" name='company_name' value={getInputData.company_name} onChange={(e) => handleStepperForm(e)} />
          </div>
          <div className="mb-4  col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Company's Address</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Company's Address" name='company_address' value={getInputData.company_address} onChange={(e) => handleStepperForm(e)} />
          </div>
          <div className="mb-4 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <label htmlFor="exampleFormControlInput1" className="form-label">Dates of Employment: From</label>
            <input type="date" className="form-control" id="exampleFormControlInput1" placeholder="Dates of Employment" name='date_of_form' value={getInputData.date_of_form} onChange={(e) => handleStepperForm(e)} />
          </div>
          <div className="mb-4  col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">To</label>
            <input type="date" className="form-control" id="exampleFormControlInput1" placeholder="Dates of Employment" name='ToEmployment' value={getInputData.ToEmployment} onChange={(e) => handleStepperForm(e)} />
          </div>
          <div className="mb-4 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <label htmlFor="exampleFormControlInput1" className="form-label">Job title</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Job title" name='job_title' value={getInputData.job_title} onChange={(e) => handleStepperForm(e)} />
          </div>
          <div className="mb-4  col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Direct Report</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Your Direct Report" name='direct_report' value={getInputData.direct_report} onChange={(e) => handleStepperForm(e)} />
          </div>
          <div className="mb-4 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Description of duties and achievements</label>
            <div className='achievements'>
              {editorstate.editorAchievements}
            </div>
          </div>
        </div>
        <button className="btn stepper_back  me-3" type="submit" onClick={() => handleNavigate('prev')}><HiOutlineArrowNarrowLeft size={20} className='stepIcon' /> Back</button>
        <button className="btn stepper_next me-3" type="submit" onClick={() => handleAddressNavigate('next')}>Next <HiOutlineArrowNarrowRight size={20} className='stepIcon' /></button>
      </>
    )
  }
  const TechnicalSkills = () => {
    return (
      <>
        <div className={animation ? "row animated bounceInRight" : "row animated bounceInLeft"}>
          <div className="mb-4 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Technical Skills</label>
            <div className='achievements'>
              {editorstate.editorTechnicalSkills}
            </div>
          </div>
        </div>
        <button className="btn stepper_back  me-3" type="submit" onClick={() => handleNavigate('prev')}><HiOutlineArrowNarrowLeft size={20} className='stepIcon' /> Back</button>
        <button className="btn stepper_next me-3" type="submit" onClick={() => handleAddressNavigate('next')}>Next <HiOutlineArrowNarrowRight size={20} className='stepIcon' /></button>
      </>
    )
  }
  const OtherInfo = () => {
    return (
      <>
        <div className={animation ? "row animated bounceInRight" : "row animated bounceInLeft"}>
          <div className="mb-4 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Any other infomation you would like to include?</label>
            <div className='achievements'>
              {editorstate.editorOtherInfo}
            </div>
          </div>
        </div>
        <button className="btn stepper_back  me-3" type="submit" onClick={() => handleNavigate('prev')}><HiOutlineArrowNarrowLeft size={20} className='stepIcon' /> Back</button>
      </>
    )
  }
  const stepperButton = () => {
    return (
      <>
        {steps[steps.length - 1].id === newState && <button className="btn stepper_cancel me-3" type="submit" onClick={() => handleSave('cancel')}>Cancel <IoMdClose size={20} className='stepIcon' /> </button>}
        {steps[steps.length - 1].id === newState && <button className="btn stepper_save me-3" type="submit" onClick={() => handleSave('save')}>
          Submit<FiSave size={20} className='stepIcon' /> </button>}
        <div className="show_success_msg">
          <div className={transformMsg}><p><CheckCircleOutlineIcon />{IntakeSubmitMessage?.message}</p></div>
        </div>
      </>
    )
  }
  return (
    <Layout>
      <div className='padding_div hiding_mininav_stepper stepper-main-container'>
        <div className="hiding_mini_order"> <MiniNav NavData={['', '']} /></div>
        {
          GetIntakeFrmDataId != '' ?
            <div className='order-stepper'>
              <h3>You have already filled Questionnaire Form </h3>
              <div >
                <button className='btn chatdivchat' onClick={() => IntakeFormById(new_id[0])}>Edit Questionnaire Form</button>
              </div>
            </div> :
            <div className="steppers">
              <div className="container custom-overflow">
                {Stepps()}
                <div className="form_content p-4">
                  <div className="form_inputs ">
                    {newState === 1 && Names()}
                    {newState === 2 && Address()}

                    {newState === 3 && Phone()}
                    {newState === 4 && Linkedin()}
                    {newState === 5 && Education()}
                    {newState === 6 && company()}
                    {newState === 7 && TechnicalSkills()}
                    {newState === 8 && OtherInfo()}
                    {stepperButton()}
                  </div>
                </div>
              </div>
            </div>
        }

      </div>
    </Layout>
  )
}

export default Steppers;


