import React, {useEffect} from 'react'
import FlewLessResume from '../../components/FlawLessResume'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import HelpResume from '../../components/helpResume'
import HowItWork from '../../components/HowItWork';
import Nav from '../../components/Navbar/Nav'
import Progress_bar from '../../components/ProgressBar'
import ResumeInfo from '../../components/ResumeInfo'

const Dashboard = () => {
  return (
    <>
       <Nav />
       <Header />
       <FlewLessResume />
       <HelpResume />
       <HowItWork />
       <ResumeInfo />
       {/* <Progress_bar /> */}
       <Footer />

    </>
  )
}

export default Dashboard