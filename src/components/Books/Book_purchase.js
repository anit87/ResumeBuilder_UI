import React, { useState, useRef, useEffect } from 'react';
import Slider from "react-slick";
import Layout from '../../Layout/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { MdNavigateNext } from 'react-icons/md';
import { GrFormPrevious } from 'react-icons/gr';
import ReactStars from "react-rating-stars-component";
import MiniNav from '../MiniNav/MiniNav';
import { apiURL } from '../../../src/components/Admin/Components/Api/BaseLine'
import Cartpopup from './Cartpopup';
import {
    innerbookaction, innerbook, getallbooksimage, AddReviews, GetProductReviews, GetProductReviewsSum, GetFiveStarProductReview,
    GetFourStarProductReview, GetThreeStarProductReview, GetTwoStarProductReview, GetOneStarProductReview
} from '../../redux/action/Action';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { CgDanger } from 'react-icons/cg';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';
import Loadingspinner from './Loadingspinner';
import { GetFourStarProductsReviewsReducer } from '../../redux/reducer/Reducer';

const Book_purchase = () => {

    const [counterState, setCounterState] = useState(1);
    const [writereviewStar, setWritereviewStar] = useState(0);
    const [changeClassReview, setChangeClassReview] = useState("write_review");
    const [review, setReview] = useState({
        review_name: '',
        review_body: ''
    });
    const [mainimage, setMainimage] = useState();
    const [openloginpopup, setOpenloginpopup] = useState(false);
    const [showmsg, setShowmsg] = useState(false);
    const [reviewRatingData, setReviewRatingData] = useState('');
    const [reviewStars, setReviewStars] = useState({
        reviewStarOne: ''
    });
    const [reviewSubmitMessage, setReviewSubmitMessage] = useState(false);
    const [reviewUserMessage, setReviewUseMessage] = useState(false);
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userid = useParams()
    const feact1 = userid.id;
    const feact = feact1.replace("Y2F0ZWdvcnk9d", "")
    const feact2 = feact.trim() / 45;

    const class_name_change_book = useRef();

    let userEmail = localStorage.getItem("frontemail")
    const getallbooksinnerdatareducer = useSelector((state) => state.booksinnerreducer.booksdatafinalinner);
    const getallbooksimagedatareducer = useSelector((state) => state.booksdataimage.booksdatafinalimage);
    const GetAddReviewMessage = useSelector((state) => state.AddReviewsReducer.AddReviews);
    const GetPrdctReviewMessage = useSelector((state) => state.GetProductsReviewsReducer.GetReviews);
    const GetPrdctReviewAllSum = useSelector((state) => state.GetProductsReviewsSumReducer.GetReviewsSum);

    const GetFiveStarPrdctReviews = useSelector((state) => state.GetFiveStarProductsReviewsReducer.GetFiveStarReviews);
    const GetFourStarPrdctReviews = useSelector((state) => state.GetFourStarProductsReviewsReducer.GetFourStarReviews);
    const GetThreeStarPrdctReviews = useSelector((state) => state.GetThreeStarProductsReviewsReducer.GetThreeStarReviews);
    const GetTwoStarPrdctReviews = useSelector((state) => state.GetTwoStarProductsReviewsReducer.GetTwoStarReviews);
    const GetOneStarPrdctReviews = useSelector((state) => state.GetOneStarProductsReviewsReducer.GetOneStarReviews);

    let Reviewslength = typeof (GetPrdctReviewMessage) == 'object' ? GetPrdctReviewMessage?.length : '0';
    let FiveStarLength = typeof (GetFiveStarPrdctReviews) == 'object' ? GetFiveStarPrdctReviews?.length : '0';
    let FourStarLength = typeof (GetFourStarPrdctReviews) == 'object' ? GetFourStarPrdctReviews?.length : '0';
    let ThreeStarLength = typeof (GetThreeStarPrdctReviews) == 'object' ? GetThreeStarPrdctReviews?.length : '0';
    let TwoStarLength = typeof (GetTwoStarPrdctReviews) == 'object' ? GetTwoStarPrdctReviews?.length : '0';
    let OneStarLength = typeof (GetOneStarPrdctReviews) == 'object' ? GetOneStarPrdctReviews?.length : '0';


    const writereviewratingChanged = (newRating) => {
        setWritereviewStar(newRating)
    };

    const hideWriteDiv = () => {
        if (class_name_change_book.current.className == "write_review") {
            setChangeClassReview("write_review_change")
        }
        else {
            setChangeClassReview("write_review")
        }
    }

    const ReviewChange = (e) => {
        let { name, value } = e.target;
        setReview((Old) => {
            return {
                ...Old,
                [name]: value
            }
        })
    }

    const ReviewSubmit = (e) => {
        e.preventDefault();
        let product_id = getallbooksinnerdatareducer.product_id;
        let userId = localStorage.getItem("frontuserid")
        let Data = { "reviews": review, "customer_id": userId, "product_id": product_id, "review_rating": writereviewStar }

        if (review.review_name && review.review_body && writereviewStar != '' && userEmail != null) {
            dispatch(AddReviews(Data))
            setReviewSubmitMessage(true)
            setReview({
                review_name: '',
                review_body: ''
            })
            setWritereviewStar(0)
        } else {
            console.log('Fill All Data')
            setShowmsg(true);
        }
    }

    function SampleNextArrow(props) {
        return (
            <button {...props} className='next_button'  >
                <span className="icon icon-chevron-with-circle-right"><MdNavigateNext className='next_arrow_btn' /></span>
            </button>
        );
    }
    function SamplePrevArrow(props) {
        return (
            <button {...props} className='prev_button' >
                <span className="icon icon-chevron-with-circle-right"><GrFormPrevious className='prev_arrow_btn' /></span>
            </button>
        );
    }

    function SampleNextArrow1(props) {
        return (
            <button {...props} className='next_button related_craousel_nextbutton'  >
                <span className="icon icon-chevron-with-circle-right"><MdNavigateNext className='next_arrow_btn related_next_arrow_btn' /></span>
            </button>
        );
    }
    function SamplePrevArrow1(props) {
        return (
            <button {...props} className='prev_button related_craousel_prevbutton' >
                <span className="icon icon-chevron-with-circle-right"><GrFormPrevious className='prev_arrow_btn related_prev_arrow_btn' /></span>
            </button>
        );
    }

    const popupclose = () => {
        setOpenloginpopup(false)
    }

    const allbooksfun = (e, item) => {
        dispatch(innerbook(item)).then(() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }))
    }

    let Product_id = getallbooksinnerdatareducer.product_id
    let Cart_price = getallbooksinnerdatareducer.product_sale_amount
    let Cart_qty = counterState
    let Customer_id = localStorage.getItem("frontuserid")

    const cartfun = () => {
        if (localStorage.getItem("frontuserid") == null) {
            setOpenloginpopup(true)
        }
        else {
            dispatch(innerbookaction({
                product_id: getallbooksinnerdatareducer.product_id,
                cart_price: getallbooksinnerdatareducer.product_sale_amount,
                cart_qty: counterState,
                customer_id: localStorage.getItem("frontuserid")
            }))
            navigate('/cart')
        }
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: getallbooksinnerdatareducer?.image?.length == 2 ? 2 : 3,
        arrows: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    const settings_related = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        arrows: true,
        dotsClass: "slick-dots slick-thumb",
        nextArrow: <SampleNextArrow1 />,
        prevArrow: <SamplePrevArrow1 />
    };

    const changesrc = (data) => {
        setMainimage(`${apiURL}${data}`)
    }

    useEffect(() => {
        if (getallbooksinnerdatareducer.length != 0) {
            // setMainimage(`${apiURL}${getallbooksinnerdatareducer?.pd_img_feature_image}`)
            setMainimage(`${apiURL}${getallbooksinnerdatareducer?.image[0]?.pd_img_feature_image}`)
        }
        // setMainimage(`${apiURL}${getallbooksinnerdatareducer?.image[0]?.pd_img_feature_image}`)  


    }, [getallbooksinnerdatareducer])




    useEffect(() => {
        dispatch(innerbook(feact2))
    }, [])

    useEffect(() => {
        dispatch(getallbooksimage())
    }, [])

    useEffect(() => {
        if (showmsg == true) {
            let timeId = setTimeout(() => {
                setShowmsg(false);
            }, 5000)
            return () => {
                clearTimeout(timeId)
            }
        }
    }, [showmsg])
    useEffect(() => {
        if (reviewSubmitMessage == true) {
            let timeId = setTimeout(() => {
                setReviewSubmitMessage(false);
            }, 5000)
            return () => {
                clearTimeout(timeId)
            }
        }
    }, [reviewSubmitMessage])

    useEffect(() => {
        // let timeId= setTimeout(()=>{
        dispatch(GetProductReviews(getallbooksinnerdatareducer?.product_id))
        dispatch(GetProductReviewsSum(getallbooksinnerdatareducer?.product_id))
        dispatch(GetFiveStarProductReview(getallbooksinnerdatareducer?.product_id))
        dispatch(GetFourStarProductReview(getallbooksinnerdatareducer?.product_id))
        dispatch(GetThreeStarProductReview(getallbooksinnerdatareducer?.product_id))
        dispatch(GetTwoStarProductReview(getallbooksinnerdatareducer?.product_id))
        dispatch(GetOneStarProductReview(getallbooksinnerdatareducer?.product_id))

        // },2000)
        // return ()=>{clearTimeout(timeId)}

    }, [getallbooksinnerdatareducer.product_id])

    // useEffect(() => {
    //     let review_rating;
    //     let timeId = setTimeout(() => {
    //         if (typeof (GetPrdctReviewAllSum) == 'object') {
    //             GetPrdctReviewAllSum?.map((items) => {
    //                 review_rating = (parseInt(items.review_rating) / Reviewslength).toFixed(1)
    //                 if (isNaN(review_rating)) {
    //                     setReviewRatingData('0')
    //                 } else {
    //                     setReviewRatingData(review_rating)

    //                 }
    //             })
    //         }
    //     }, 2000)
    //     return () => { clearTimeout(timeId) }
    // }, [GetPrdctReviewAllSum, reviewRatingData])

    useEffect(() => {
        let sumOfRatings = 0;

        if (typeof GetPrdctReviewAllSum === 'object') {
            GetPrdctReviewAllSum.forEach((item) => {
                const rating = parseFloat(item.review_rating);
                if (!isNaN(rating)) {
                    sumOfRatings += rating;
                }
            });

            const averageRating = (sumOfRatings / GetPrdctReviewAllSum.length).toFixed(1);

            setReviewRatingData(averageRating);
        }
    }, [GetPrdctReviewAllSum, reviewRatingData]);

    useEffect(() => {
        let ReviewStarData = setTimeout(() => {
            const RevieweStarIs =
                <ReactStars
                    count={5}
                    size={24}
                    activeColor="#ffd700"
                    isHalf={true}
                    value={(+reviewRatingData)}
                    edit={false}
                />
            setReviewStars((prev) => {
                return {
                    ...prev,
                    reviewStarOne: RevieweStarIs
                }
            })
        }, 5000)
        return () => { clearTimeout(ReviewStarData) }
    }, [reviewRatingData])

    useEffect(() => {
        let ReviewTimeId = setTimeout(() => [
            setReviewUseMessage(true)
        ], 4000)
        return () => { clearTimeout(ReviewTimeId) }
    }, [reviewUserMessage])

    useEffect(() => {
        if (getallbooksinnerdatareducer.length !== 0) {
            setLoading(false)
        }
        else {
            setLoading(true)
        }
    }, [getallbooksinnerdatareducer])

    return (
        <Layout>
            <div className="padding_div">
                <MiniNav NavData={['books', 'Books']} />
                {loading ? <Loadingspinner /> :
                    <div>
                        <div className="buy_book">
                            <div className="container">
                                <div className="buy_book_parent ">

                                    <div className="row">
                                        <div className="col-lg-5 col-md-12 buy_book_left" >
                                            <div className="big_img_buy">
                                                <img src={mainimage} alt="buy_book_big" />
                                            </div>

                                            <div className="books_buy_slider">
                                                {!getallbooksinnerdatareducer ? <div className='hidden-div-inner-book'></div> :
                                                    <Slider {...settings}>
                                                        {
                                                            getallbooksinnerdatareducer?.image?.map((elems, i) => {
                                                                return (
                                                                    <button key={i} className='btn-for-click' onClick={() => changesrc(elems?.pd_img_feature_image)}>
                                                                        <div className="books_imgs books_images">
                                                                            <img src={`${apiURL}${elems?.pd_img_feature_image}`} alt={elems?.product_name} className='img-fluid  ' />
                                                                        </div>
                                                                    </button>
                                                                )
                                                            })}
                                                    </Slider>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-lg-7 col-md-12">

                                            <div className="buy_book_right ">
                                                <div className="d-flex justify-content-between align-items-center buy_book_heading_wrap">
                                                    <div className="buy_book_heading">
                                                        <h2>{getallbooksinnerdatareducer.product_name}</h2>
                                                    </div>
                                                    <div className="buy_book_heading">
                                                        <h5>Author: {getallbooksinnerdatareducer.product_book_author}</h5>
                                                    </div>
                                                </div>
                                                <div className="buy_book_content ">
                                                    <div className="tips_heading mt-3">
                                                        <h3>{getallbooksinnerdatareducer?.product_book_title}</h3>
                                                    </div>
                                                    <div className='div-after-dev' dangerouslySetInnerHTML={{ __html: getallbooksinnerdatareducer?.product_description }}></div>
                                                    <div className="buy_book_text">

                                                        <div className='product-price-div'>
                                                            {getallbooksinnerdatareducer?.product_book_sold_out == 0 ?
                                                                <>
                                                                    <h4 className='prize mt-2 mb-3'>{`$${getallbooksinnerdatareducer?.product_sale_amount}`}</h4>
                                                                    {getallbooksinnerdatareducer?.product_sale_amount != getallbooksinnerdatareducer?.product_amount ?
                                                                        <h4 className='prize mt-2 mb-3 product-amount-cut'>{`$${getallbooksinnerdatareducer?.product_amount}`}</h4>
                                                                        :
                                                                        null
                                                                    }
                                                                </>
                                                                : <h4 className='prize mt-2 mb-3'>Out of Stock</h4>

                                                            }
                                                        </div>


                                                        <div className="d-flex align-items-center book-inner-review-status">
                                                            {reviewStars.reviewStarOne}
                                                            <span className='mx-3'>({Reviewslength} {Reviewslength <= '1' ? 'Review' : 'Reviews'})</span> </div>

                                                        {getallbooksinnerdatareducer?.product_book_sold_out == 0 ?
                                                            <div className="qty d-flex align-items-center mt-3 book-inner-review-status-star">
                                                                <p style={{ fontSize: 18 }}>Qty</p>
                                                                <div className="d-flex align-items-center number_of_qty mx-3 ">
                                                                    <span onClick={() => counterState > 0 ? setCounterState(counterState - 1) : setCounterState(0)} className='span_user_select' >-</span>
                                                                    <p className='mx-1'>{counterState}</p>
                                                                    {/*  */}
                                                                    <span onClick={() => setCounterState(counterState + 1)} className='span_user_select' >+</span>
                                                                </div>
                                                                <div className=" btn__buy book-inner-button">
                                                                    <button className="btn for_btn_buy" type="submit" onClick={cartfun}>Add to Cart</button>
                                                                </div>
                                                            </div>
                                                            : null
                                                        }
                                                        {/* <div className="social_media_links d-flex align-items-center  mt-4">
                                                    <p style={{ fontSize: 18 }}>Share : </p>
                                                    <div className="facebook">
                                                        <FaFacebookF size={15} color={'#fff'} />
                                                    </div>
                                                    <div className="twitter">
                                                        <AiOutlineTwitter size={20} color={'#fff'} />
                                                    </div>
                                                    <div className="google_plus">
                                                        <TiSocialGooglePlus size={20} color={'#fff'} />
                                                    </div>
                                                    <div className="youtube">
                                                        <FaYoutube size={20} color={'#fff'} />
                                                    </div>
                                                    <div className="share">
                                                        <FaShareAlt size={25} />
                                                    </div>
                                                </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="review_section">
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <div className='review_heading'>
                                            <h2>Customer reviews :</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <div className='row'>
                                    <div className='col-md-5'>
                                        <div className='customer_review'>

                                            <div className='star_rating' >
                                                {reviewStars.reviewStarOne}
                                                <div className='review_star'>{reviewRatingData} out of 5</div>
                                            </div>

                                            <div className="review_progress">
                                                <div className='Review_progress_div'>
                                                    <span className='review_star_rating'>5 star</span>
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar" style={{ width: FiveStarLength != 0 ? ((FiveStarLength / Reviewslength) * 100 + "%") : '0' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                                        </div>
                                                    </div>
                                                    <span className='review_percentage'>{FiveStarLength != 0 ? ((FiveStarLength / Reviewslength) * 100).toFixed() : 0}%</span>
                                                </div>
                                                <div className='Review_progress_div'>
                                                    <span className='review_star_rating'>4 star</span>
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar" style={{ width: FourStarLength != 0 ? ((FourStarLength / Reviewslength) * 100) + "%" : '0' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                                        </div>
                                                    </div>
                                                    <span className='review_percentage'>{FourStarLength != 0 ? ((FourStarLength / Reviewslength) * 100).toFixed() : 0}%</span>
                                                </div>

                                                <div className='Review_progress_div'>
                                                    <span className='review_star_rating'>3 star</span>
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar" style={{ width: ThreeStarLength != 0 ? ((ThreeStarLength / Reviewslength) * 100) + "%" : '0' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                                        </div>
                                                    </div>
                                                    <span className='review_percentage'>{ThreeStarLength != 0 ? ((ThreeStarLength / Reviewslength) * 100).toFixed() : 0}%</span>
                                                </div>
                                                <div className='Review_progress_div'>
                                                    <span className='review_star_rating'>2 star</span>
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar" style={{ width: TwoStarLength != 0 ? ((TwoStarLength / Reviewslength) * 100 + "%") : '0' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                                        </div>
                                                    </div>
                                                    <span className='review_percentage'>{TwoStarLength != 0 ? ((TwoStarLength / Reviewslength) * 100).toFixed() : 0}%</span>
                                                </div>

                                                <div className='Review_progress_div'>
                                                    <span className='review_star_rating'>1 star</span>
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar" style={{ width: OneStarLength != 0 ? ((OneStarLength / Reviewslength) * 100) + "%" : '0' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                                        </div>
                                                    </div>
                                                    <span className='review_percentage'>{OneStarLength != 0 ? ((OneStarLength / Reviewslength) * 100).toFixed() : 0}%</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-7'>
                                        <div className='review_text_maindiv'>
                                            <div className='review_text'>
                                                <div className='review_text_image'>
                                                    <img src={mainimage} alt="buy_book_big" />
                                                </div>
                                                <div className='review_text_content'>
                                                    {/* <h4><span>All The Tips to get your Resume Noticed by</span> {getallbooksinnerdatareducer.product_book_author} </h4> */}
                                                    <h4>
                                                        <span className='review_book_title'>{getallbooksinnerdatareducer?.product_book_title} </span>
                                                        <span className='review_auth_seprator'>{`by `}</span>
                                                        {getallbooksinnerdatareducer.product_book_author}
                                                    </h4>
                                                </div>
                                            </div>
                                            <div className='before_write_button'>
                                                <h3>Customer Reviews</h3>
                                                {reviewStars.reviewStarOne}
                                                <p>Based on  {Reviewslength} {Reviewslength <= '1' ? 'Review' : 'Reviews'}</p>
                                            </div>
                                            {userEmail && <div className='review_btn_div'>
                                                <button type="button" className="btn review_btn" onClick={hideWriteDiv}>Write a review</button>
                                            </div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="write_riview_id" className={changeClassReview} ref={class_name_change_book}>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <div className='review_form'>
                                            <div className='review_heading review_form_heading'>
                                                <h2>Write a Review</h2>
                                            </div>
                                            <div className='review_form_div'>
                                                <form onSubmit={ReviewSubmit}>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputName">Name</label>
                                                        <input type="text" className="form-control" name='review_name' value={review.review_name}
                                                            id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your Name"
                                                            onChange={ReviewChange} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail">Email</label>
                                                        <input type="email" className="form-control" id="exampleInputPassword1" value={userEmail}
                                                            disabled />
                                                    </div>
                                                    <div className="form-group custom_label">
                                                        <label htmlFor="exampleInputEmail">Rating</label>
                                                        <div className='reviews_form_star'>
                                                            <ReactStars
                                                                count={5}
                                                                onChange={writereviewratingChanged}
                                                                size={24}
                                                                activeColor="#ffd700"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputReviewTitle">Body of Review(1500)</label>
                                                        <textarea className="form-control" name='review_body' value={review.review_body}
                                                            id="exampleFormControlTextarea1" rows="8" placeholder="Write Your Comment Here"
                                                            onChange={ReviewChange} ></textarea>
                                                    </div>
                                                    <div className='submit_div'>
                                                        <div className='review-cancel-div'>
                                                            <button onClick={hideWriteDiv} type="button" name='cancel' className="btn btn-primary" >Cancel</button>
                                                            <div className='error-main-div'>
                                                                {showmsg && <div className="alert alert-danger" role="alert">
                                                                    <div className='review-err-message'>
                                                                        <CgDanger /> <p>Fill All Fields</p>
                                                                    </div>
                                                                </div>}
                                                                {GetAddReviewMessage.Status == '200' && reviewSubmitMessage &&
                                                                    <div className="alert alert-success" role="alert">
                                                                        <div className='review-success-message'>
                                                                            <IoIosCheckmarkCircleOutline /> <p>{GetAddReviewMessage.message}</p>
                                                                        </div>
                                                                    </div>}
                                                                <button type="submit" name='submit' className="btn btn-primary" >Submit Review</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>
                        <div className='interview_section'>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <div className='interview_div'>
                                            {Reviewslength == 0 ? null : <div className='interview_heading review_heading'>
                                                {/* <h2>{`${getallbooksinnerdatareducer.product_name}`}</h2> */}
                                                <h2>Reviews:</h2>

                                            </div>}
                                            {/* <div className='interview_list'><h4>{getallbooksinnerdatareducer?.product_book_title}</h4></div> */}
                                            {/* <div className='interview_list'><h4>Reviews:</h4></div> */}
                                            {/* <div className='interview_list' dangerouslySetInnerHTML={{ __html: getallbooksinnerdatareducer.product_review }}> */}
                                            {typeof (GetPrdctReviewMessage) == 'object' ? GetPrdctReviewMessage?.map((items, i) => {
                                                return (
                                                    <div className='interview_list newinterview_list' key={i}>
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <FaUserCircle size={35} style={{ color: '#9f9f9f', marginRight: '8px' }} />
                                                            <h3>{items.review_name}</h3>
                                                        </div>
                                                        {reviewUserMessage == true ? <ReactStars
                                                            count={5}
                                                            size={24}
                                                            activeColor="#ffd700"
                                                            edit={false}
                                                            value={parseInt(items.review_rating)}
                                                        /> : null}
                                                        <p>{items.review_body}</p>

                                                    </div>
                                                )
                                            }) : ''}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='related_books_section'>
                            <div className='container'>
                                <div className='row'>
                                    <div className='related_book_heading'>
                                        <h2>RELATED BOOKS</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='related_carousel_section'>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-md-12 guttter-space'>
                                        <div className='related_carousel_div'>
                                            <Slider {...settings_related}>
                                                {getallbooksimagedatareducer.map((item, i) => {
                                                    return (
                                                        <div className="books_imgs books_images related_books" key={i}>
                                                            <button onClick={(e) => allbooksfun(e, item.product_id)}>
                                                                <img src={`${apiURL}${item.image[0].pd_img_feature_image}`} alt="book1" className='img-fluid' />
                                                            </button>
                                                        </div>
                                                    )
                                                })
                                                }
                                            </Slider>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                        {openloginpopup && <Cartpopup popupclose={popupclose} product_id={Product_id} cart_price={Cart_price} cart_qty={Cart_qty}
                            customer_id={Customer_id} />}
                    </div>
                }
            </div>
        </Layout>
    )
}

export default Book_purchase