import React, { useEffect } from 'react'
import Review from './components/Review';
import Dashboard from './pages/Dashboard';
import { Route, Routes } from 'react-router-dom';
import About from './components/AboutUs';
import Books from './components/Books';
import Sample from './components/Sample';
import Faq from './components/Faq';
import Package from './components/Package';
import OurProcess from './components/OurProcess';
import ContantUs from './components/ContactUs';
import Admin from './components/Admin/Pages/Auth/Login'
import NavBar from './components/Admin/Components/Header/AppBar';
import Stepper from './pages/Stepper';
import Question from './components/Question';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Cart from './components/Cart';
import FaqTable from './components/Admin/Components/Faq/FaqTable';
import AddFAQ from './components/Admin/Components/Faq';
import EditFAQ from './components/Admin/Components/Faq/EditFAq';
import Chatting from './components/chatting';
import Manage_order from './components/Manage_order';
import LinkedIn from './components/Linkdin';
import AllCustomer from './components/Admin/Components/Allcustomer';
import Packages from './components/Admin/Components/Packages/Packages';
import PackageEdit from './components/Admin/Components/Packages/packageEdit';
import Addpackage from './components/Admin/Components/Packages/Addpackage';
import { useLocation } from 'react-router-dom'
import Book_purchase from './components/Books/Book_purchase';
import Checkout from './components/Checkout';
import Sample_inner from './components/Sample/Sample_inner';
import Myaccount from './components/Myaccount';
import CustomTable from './components/Admin/Components/Allcustomer/allcustomershow';
import AdminDashboard from './components/Admin/Components/Dashboard/dashboard';
import Allbooks from './components/Admin/Components/Allbooks';
import Addbooks from './components/Admin/Components/Allbooks/addbooks';
import Editbooks from './components/Admin/Components/Allbooks/editbooks';
import Alladdons from './components/Admin/Components/Alladdons';
import Addaddons from './components/Admin/Components/Alladdons/Addaddons';
import Editaddons from './components/Admin/Components/Alladdons/editAddon';
import Allorders from './components/Admin/Components/Allorders';
import Editorder from './components/Admin/Components/Allorders/editorder';
import Orderinfo from './components/Admin/Components/Allorders/Orderinfo';
import ZoomMeetingsInfo from './components/Admin/Components/zoom/ZoomMeetingsInfo';
import Paypalthankyou from './components/Checkout/Paypalthankyou';
import Orderdetails from './components/Checkout/Orderdetails';
import AdminChatting from './components/Admin/Components/Chatting/AdminChatting';
import EditSteppers from './pages/Stepper/editStepperForm';
import Questionnaire from './components/Admin/Components/Questionnaire/allquestionnaire';
import QuestionnaireId from './components/Admin/Components/Questionnaire/viewQuestinariebyId';


const App = () => {

  const location = useLocation()
  const isLogginIn = sessionStorage.getItem('credential');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location])

  if (isLogginIn === null) {
    if (((location.pathname).indexOf('/admin/')) >= 0) {
      return <Admin />
    }
  } else {
    if (location.pathname === '/admin/') {
      return <NavBar />
    }
  }

  return (
    <Routes >

      <Route path='/admin' exact element={<Admin />} />
      <Route path='admin/header' exact element={<NavBar />} />
      <Route path='admin/addfaq' exact element={<AddFAQ />} />
      <Route path='admin/allfaq' exact element={<FaqTable />} />
      <Route path='admin/editfaq/:id' exact element={<EditFAQ />} />
      <Route path='admin/allcustomer' exact element={<AllCustomer />} />
      <Route path='admin/allpackage' exact element={<Packages />} />
      <Route path='admin/editpackage/:slug' exact element={<PackageEdit />} />
      <Route path='admin/addpackage' exact element={<Addpackage />} />
      <Route path='admin/customtable' exact element={<CustomTable />} />
      <Route path='admin/dashboard' exact element={<AdminDashboard />} />
      <Route path='admin/allbooks' exact element={<Allbooks />} />
      <Route path='admin/addbooks' exact element={<Addbooks />} />
      <Route path='admin/editbooks/:id' exact element={<Editbooks />} />
      <Route path='admin/alladdons' exact element={<Alladdons />} />
      <Route path='admin/addaddons' exact element={<Addaddons />} />
      <Route path='admin/editaddon/:id' exact element={<Editaddons />} />
      <Route path='admin/order' exact element={<Allorders />} />
      <Route path='admin/editorder/:id' exact element={<Editorder />} />
      <Route path='admin/orderinfo/:id' exact element={<Orderinfo />} />
      <Route path='admin/meetings/:id' exact element={<ZoomMeetingsInfo />} />
      <Route path='admin/adminchatting/:id' exact element={<AdminChatting />} />
      <Route path='admin/questionnaire/' exact element={<Questionnaire />} />
      <Route path='admin/viewresumeform/:id' exact element={<QuestionnaireId />} />

      <Route path='/' exact element={<Dashboard />} />
      <Route path='/login' exact element={<Login />} />
      <Route path='/review' exact element={<Review />} />
      <Route path='/about' exact element={<About />} />
      <Route path='/books' exact element={<Books />} />
      <Route path='/sample' exact element={<Sample />} />
      <Route path='/faq' exact element={<Faq />} />
      <Route path='/package' exact element={<Package />} />
      <Route path='/process' exact element={<OurProcess />} />
      <Route path='/contactus' exact element={<ContantUs />} />
      <Route path='/stepperform/:id' exact element={<Stepper />} />
      <Route path='/editstepperform/:id' exact element={<EditSteppers />} />
      <Route path='/question' exact element={<Question />} />
      <Route path='/register' exact element={<Register />} />
      <Route path='/cart' exact element={<Cart />} />
      <Route path='/chatting/:id' exact element={<Chatting />} />
      <Route path='/order' exact element={<Manage_order />} />
      <Route path='/linkedin' exact element={<LinkedIn />} />
      <Route path='/buy_books/:id' exact element={< Book_purchase />} />
      <Route path='/checkout' exact element={< Checkout />} />
      <Route path='/sample_inner/:id' exact element={< Sample_inner />} />
      <Route path='/myaccount' exact element={< Myaccount />} />
      <Route path='/paypalthankyou/:id' exact element={< Paypalthankyou />} />
      <Route path='/orderdetail/:id' exact element={< Orderdetails />} />

    </Routes>

  )
}

export default App