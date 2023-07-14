import React,{useEffect,useState,useRef} from 'react';
import './review.css'
import Layout from '../../Layout/Layout';
import testimonialData from '../api/Testimonials'
import MiniNav from '../MiniNav/MiniNav';
import Slider from "react-slick";
import ReactStars from "react-rating-stars-component";



const Review = () => {
  const class_name_change = useRef();

  const [isDesktop, setIsDesktop] = useState(false);
  const [changeClassReview1,setChangeClassReview1] = useState("write_review");
  const [writereviewStar1, setWritereviewStar1] = useState(0);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 767px)');
    const listener = () => setIsDesktop(media.matches);
    listener();
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [isDesktop]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isDesktop ? 2 : 1,
    arrows:true,
    dotsClass: "slick-dots slick-thumb_review",
  };

  const writereviewratingChanged1 = (newRating) => {
    setWritereviewStar1(newRating)
  };

  const hideWriteDiv1 = () => {
        // console.log("checking333",class_name_change.current.className)
        if(class_name_change.current.className=="write_review"){
          setChangeClassReview1("write_review_change")
        }
        else{
          setChangeClassReview1("write_review")
        }
  }
// console.log("testdata",testimonialData)
  return (
    <Layout >
      <div className="padding_div">
    <div className="flewless bg-light">
      <div className="row">
        <div className="about_content review-slider-button">

        <MiniNav NavData={['review','Review']} />
          <div className="review_main_heading review_color">
            {/* <p>our mission is to help out clients reach their career goals. we are all about seeing out clients win - by landing their dream job . we are excited to hear about your experience and look forward to hearing your success story</p> */}
            <h3>client success stories</h3>
          </div>
          <div className="container">
            <div className="row justify-content-center">
            <div className="slider">
              <Slider {...settings}>
              {testimonialData.map((elems, i)=>{
                return(
                     <div className="child_client" key={i}>
                  <div className="client_cmt">
                    <div className="client_content my-client_content">
                      {/* {elems.clientImg!==null?
                    <img src={elems.clientImg} alt="client" className='img-fluid '/>
                    : 
                    <i className="fas fa-user-circle"></i> 
                    } */}
                      <h3>{elems.name}</h3>
             
                    </div>
                    <div className="client_msg">
                      <p>{elems.msg}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
        </Slider>
      </div>
              {/* <Swiper
                slidesPerView={isDesktop ? 2 : 1}
                spaceBetween={20}
                pagination={{
                  clickable: true,
                }}
                // navigation={true}
                modules={[Pagination,Autoplay]}
                className="mySwiper"
              >
              {testimonialData.map((elems)=>{
                return(
                  <SwiperSlide className='sliders'>
                     <div className="child_client">
                  <div className="client_cmt">
                   

           
                    <div className="client_content">
                    <img src={elems.clientImg} alt="client" />
                      <h3>{elems.name}</h3>
                    </div>
                    <div className="client_msg">
                      <p>{elems.msg}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                )
              })}
              
              </Swiper> */}
            </div>
          </div>
          <div className='write_main_div'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='review_form_main_div'>
                {/* <div className='review_writing_button'>
                <button type="button" className="btn review_btn" onClick={hideWriteDiv1}>Write a review</button>
                </div> */}
                <div  id="write_riview_id" className={changeClassReview1} ref={class_name_change}>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <div className='review_form'>
                                    <div className='review_heading review_form_heading'>
                                        <h2>Write a review</h2>
                                    </div>
                                    <div className='review_form_div'>
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputName">Name</label>
                                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your Name"/>
                                        
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail">Email</label>
                                            <input type="email" className="form-control" id="exampleInputPassword1" placeholder="john.smith@example.com"/>
                                        </div>
                                        <div className="form-group custom_label">
                                            <label htmlFor="exampleInputEmail">Rating</label>
                                            <div className='reviews_form_star'>
                                            <ReactStars
                                            count={5}
                                            onChange={writereviewratingChanged1}
                                            size={24}
                                            activeColor="#ffd700"
                                        /> 
                                            </div>
                                            
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleInputReviewTitle">Review Title</label>
                                            <input type="email" className="form-control" id="exampleInputPassword1" placeholder="Give Your Review a Title"/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleInputReviewTitle">Body of Review(1500)</label>
                                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="8" placeholder="Write Your Comment Here" ></textarea>
                                        </div>
                                        <div className='submit_div'>
                                        <button type="submit" className="btn btn-primary">Submit Review</button>
                                        </div>
                                        
                                    </form>
                                    </div>
                                
                                </div>

                            </div>

                        </div>

                    </div>
                </div>

                </div>
                
              </div>

            </div>

          </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </Layout>
  )
}

export default Review

