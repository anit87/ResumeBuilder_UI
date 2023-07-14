import {FaHandPointUp} from 'react-icons/fa';
import {AiTwotoneSetting} from 'react-icons/ai';
import {BiEdit} from 'react-icons/bi';
import {FaUsers,FaShuttleVan} from 'react-icons/fa'


const timeLineData = [
    {
        id:1,
        icon:<FaHandPointUp />,
        heading:'choose your service level',
        para:'Purchase the required package through our secured checkout'
    },
    {
        id:2,
        icon:<AiTwotoneSetting />,
        heading:'Personalized Service',
        para:'Each client is assigned an experienced resume writer who provides personalized support throughout the entire process'
    },
    {
        id:3,
        icon:<BiEdit />,
        heading:'Targeted Writing',
        para:'When it comes to the perfect resume, there is no “one size fits all”. We totally understand that you are your own brand and customize your resume for the job postings you are targeting. '
    },
    {
        id:4,
        icon:<FaUsers />,
        heading:'Collaboration',
        para:'We offer multiple revision stages before your final drafts. Your writer will adjust to your feedback every step of the way to ensure we create a compelling resume. '
    },
    {
        id:5,
        icon:<FaShuttleVan />,
        heading:'Final Delivery ',
        para:'We offer multiple revision stages before your final drafts. Your writer will adjust to your feedback every step of the way to ensure we create a compelling resume.'
    }
]
export default timeLineData ;