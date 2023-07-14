import React, { useEffect,useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Layout from '../../Layout/Layout';
import MiniNav from '../MiniNav/MiniNav';
import './books.css';
import { useNavigate, NavLink } from 'react-router-dom';
import { apiURL} from '../../../src/components/Admin/Components/Api/BaseLine'
import {getallbooksimage,innerbook} from '../../redux/action/Action'
import Loadingspinner from './Loadingspinner';

const Books = () => {

    const [loading,setLoading] = useState(true)
    const dispatch = useDispatch()
    const Navigate = useNavigate();
    const getallbooksimagedatareducer = useSelector((state) => state.booksdataimage.booksdatafinalimage);
    const getallbooksinnerdatareducer = useSelector((state) => state.booksinnerreducer.booksdatafinalinner);


    const allbooksfun = (e, item) => { 
        const checkuserid = item*45+'Y2F0ZWdvcnk9d'
        dispatch(innerbook(item)).then(() => Navigate(`/buy_books/${checkuserid}`))
    }
    useEffect(() => {
        dispatch(getallbooksimage())
    }, [])

    useEffect(()=>{
        if(getallbooksimagedatareducer.length!=0){
            setLoading(false)
        }
        else{
            setLoading(true)
        }
    },[getallbooksimagedatareducer])

    return (
        <Layout >
            <div className="padding_div">
                {loading ? <Loadingspinner /> 
                : 
                <div className="flewless bg-light">
                    <div className="row">
                        <div className="about_content">

                            <MiniNav NavData={['books', 'Books']} />
                            <div className="review_main_heading book_heading">


                                <div className="books_imgs  ">
                                    <div className="container">
                                        <div className="row books_content">
                                            {getallbooksimagedatareducer?.map((item, i) => {
                                                return (
                                                    <div className="imgs  col-12 col-sm-4 col-md-4 col-lg-4 " key={i} >
                                                       
                                                        <button onClick={(e) => allbooksfun(e, item.product_id)}>
                                                            <img src={`${apiURL}${item.image[0].pd_img_feature_image}`} alt="book1" className='img-fluid w-100' />
                                                        </button>
                                                    </div>
                                                )

                                            })

                                            }
                                            {/* <div className="imgs  col-12 col-sm-4 col-md-4 col-lg-4 ">
                                        <NavLink to="/buy_books">
                                        <img src="./assets/images/Book_image_2.png" alt="book1" className='img-fluid w-100'/>
                                        </NavLink>
                                            
                                        </div>

                                        <div className="imgs col-10 col-sm-4 col-md-4 col-lg-4 ">
                                        <NavLink to="/buy_books">
                                        <img src="./assets/images/Book_image_3.png" alt="book1" className='img-fluid w-100'/>
                                        </NavLink>
                                           
                                        </div>
                                        <div className="imgs col-10 col-sm-4 col-md-4 col-lg-4 ">
                                        <NavLink to="/buy_books">
                                        <img src="./assets/images/Book_image_1 .png" alt="book1" className='img-fluid w-100'/>
                                        </NavLink>
                                        </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                }
                
            </div>
        </Layout>
    )
}

export default Books