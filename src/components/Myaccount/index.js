import React, {useEffect} from 'react'
import Layout from '../../Layout/Layout';
import './Myaccount.css';
import MiniNav from '../MiniNav/MiniNav';

const Myaccount = () => {
  return (
    <Layout>
    <div className="padding_div">
    <MiniNav NavData={['myaccount','My account']} />
    <div className='myacount_section'>
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-md-12 col-lg-6 p-0'>
                <div className='myacount-image'>
                    <img src='./assets/images/my-accounts.png' alt='' className='img-fluid'/>
                </div>
            </div>
            <div className='col-md-12 col-lg-6 p-0'>
                <div className='myacount-form'>
                    <div className='myaccount_heading'>
                    <h2>My Account</h2>
                    </div>
                <form>
                <div className="form-group">
                        <label htmlFor = "exampleInputEmail1">User ID <span>*</span></label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        
                    </div>
                    <div className="form-group">
                        <label htmlhtmlFor="exampleInputEmail1">Name <span>*</span></label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address <span>*</span></label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password <span>*</span></label>
                        <input type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className='myaccount_save'>
                    <button type="submit" className="btn myaccount_btn">Save</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>


    </div>
    </div>
    </div>
    </Layout>
  )
}

export default Myaccount