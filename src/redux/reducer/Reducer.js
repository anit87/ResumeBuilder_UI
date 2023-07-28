import { TOGGLE_ALL } from '../actionType/Types';
import { STATUSCHANGE, ADDCUSTOMERS, PACKAGEADDON } from '../actionType/Types'

const initialadminaddonmsg = {
    adminaddonmsg: [], IntakeFormMsg: [], WriteResumePkgData: [], userintakeformData: [], getuserintakeformData: [],
    getUserStepFormById: [], getUserStepFormUpdatedmsg: []
}
const initialadminpackagemsg = { adminpackagemsg: [] }
const initialadminchatlinkimage = { adminchatlinkimagedata: [], chatFiledata: [], chatLinkData: [] }
const initialadminchat = { adminchatdata: [], adminchatuserdata: [] }
const initialcaptcha = { captchastatus: [] }
const initialpaypal = { paypalres: [], paypalthank: [] }
const initialtoken = { zoomtokenno: [], zoomurl: [] }
const zoomRequestMeetingMessage = { message: "" }
const zoomMeetings = { meetingList: "", meetStatusMessage:"" }
const initialorder = {
    orderplace: [], orderall: [], adminorderall: [], adminorderallbyid: [], ManageOrderAll: [],
    adminQuestionnaireData: [], adminQuestionnaireDataId: [], updatedOrderStatus: []
}
const initialcart = { datacart: [], datacartlength: [], CartItemsLength: [] }
const initialfrontlogin = { frontloginmsg: [] }
const initialbooksinner = { booksdatafinalinner: [], SaveBooksMsg: [] }
const initialbooksimage = { booksdatafinalimage: [], booksIddatafinalimage: [] }
const initialbooks = { booksdatafinal: [] }
const initialpackage = { packagedatafinal: [] }
const initialaddon = { addondatafinal: [], initialaddaddon: [], initialaddonid: [] }
const inialState = { FaqAllData: [], FaqAllactiveData: [], FaqAddmsg: [] }
const updateFaqState = { updateData: [] }
const customerdetail = { customerData: [] }
const packagesdetail = { packagesData: [] }
const loginstatusvalue = { loginvaluestatus: [] }
const packageiddata = { packageiddatavalue: [] }
const packageupdatedata = { packageupdatedatavalue: [] }
const addpackagedata = { addpackagedatavalue: [], addpackagemsg: [] }
const AddData = { AddDatavalue: [] }
const GetAdminMsg = { GetAdminMsg: [] }
const initialGetCData = { GetCDatadata: [], GetFrontCNum: [], Getmsgforsavebookdata: [] }
const ReviewReducers = {
    AddReviews: [], GetReviews: [], GetReviewsSum: [], GetFiveStarReviews: [], GetFourStarReviews: [],
    GetThreeStarReviews: [], GetTwoStarReviews: [], GetOneStarReviews: []
}

// faq reducersssss
const GetFaqDataReducer = (state = inialState, action) => {
    switch (action.type) {
        case 'getallFaq':
            return {
                ...state,
                FaqAllData: action.payload,
            }
        default:
            return {
                ...state
            }
    }
}
//getallactiveFaq
const GetactiveFaqDataReducer = (state = inialState, action) => {
    switch (action.type) {
        case 'getallactiveFaq':
            return {
                ...state,
                FaqAllactiveData: action.payload,
            }
        default:
            return {
                ...state
            }
    }
}
//addfaq
const addFAQreducer = (state = inialState, action) => {
    switch (action.type) {
        case 'addfaq':
            return {
                ...state,
                FaqAddmsg: action.payload,
            }
        default:
            return {
                ...state
            }
    }
}
//deletefaq
const deleteFaqReducer = (state = inialState, action) => {
    switch (action.type) {
        case 'deletefaq':
            return {
                ...state,
                // FaqAllData:action.payload,
            }
        default:
            return {
                ...state
            }
    }
}
//getidfaq
const getIdToEditReducer = (state = inialState, action) => {
    switch (action.type) {
        case 'getidfaq':
            return {
                ...state,
                editFaq: action.payload
            }
        default:
            return {
                ...state
            }
    }
}
//updatefaq
const updateFAQreducer = (state = updateFaqState, action) => {
    switch (action.type) {
        case 'updatefaq':
            return {
                ...state,
                updateData: action.payload
            }
        default:
            return {
                ...state
            }
    }
}

//ADDCUSTOMERS
const addCustomersreducer = (state = AddData, action) => {
    switch (action.type) {
        case ADDCUSTOMERS:
            return {
                ...state,
                ADDCUSTOMERVALUE: action.payload,
            }
        default:
            return {
                ...state
            }
    }
}
// package reducers
const GetPackageDataReducer = (state = initialpackage, action) => {
    switch (action.type) {
        case 'getPackage':
            return {
                ...state,
                packagedatafinal: action.payload,
            }
        default:
            return {
                ...state
            }
    }
}
//PACKAGEADDON
const PackageAddonDataReducer = (state = initialpackage, action) => {
    switch (action.type) {
        case PACKAGEADDON:
            return {
                ...state,
                packagedatafinal: action.payload,
            }
        default:
            return {
                ...state
            }
    }
}
//Add Package
const addPackagereducer = (state = addpackagedata, action) => {
    switch (action.type) {
        case 'addPackage':
            return {
                ...state,
                addpackagemsg: action.payload,
            }
        default:
            return {
                ...state
            }
    }
}
//getpackageId
const getIdToEditPackageReducer = (state = packageiddata, action) => {
    switch (action.type) {
        case 'getpackageId':
            return {
                ...state,
                packageiddatavalue: action.payload
            }
        default:
            return {
                ...state
            }
    }
}
//updatePackage
const updatePackagereducer = (state = packageupdatedata, action) => {
    switch (action.type) {
        case 'updatePackage':
            return {
                ...state,
                packageupdatedatavalue: action.payload
            }
        default:
            return {
                ...state
            }
    }
}
//TOGGLE_ALL
const togglingReducer = (state = { togglingAll: true }, action) => {
    switch (action.type) {
        case TOGGLE_ALL:
            return {
                ...state,
                togglingAll: !state.togglingAll,
            }
        default: return {
            ...state
        }
    }
}

//INPUT_DATA
const inputState = { inputDatas: [] }
const inputReducer = (state = inputState, action) => {
    switch (action.type) {
        case 'INPUT_DATA':
            return {
                ...state,
                inputDatas: action.payload
            }
        default: return {
            ...state
        }
    }
}
//All Customers
const getallcustomer = (state = customerdetail, action) => {
    switch (action.type) {
        case 'ALLCUSTOMER':
            return {
                ...state,
                customerData: action.payload
            }
        default: return {
            ...state
        }
    }
}
//STATUSCHANGE
const StatusChangecustomer = (state = customerdetail, action) => {
    switch (action.type) {
        case STATUSCHANGE:
            return {
                ...state,
                customerData: action.payload
            }
        default: return {
            ...state
        }
    }
}
//ALLPACKAGES
const getallpackages = (state = packagesdetail, action) => {
    switch (action.type) {
        case 'ALLPACKAGES':
            return {
                ...state,
                packagesData: action.payload
            }
        default: return {
            ...state
        }
    }
}
//Login   STATUS
const loginstatus = (state = loginstatusvalue, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                loginvaluestatus: action.payload
            }
        default: return {
            ...state
        }
    }
}
//////////addonsreducers//////////
const addondata = (state = initialaddon, action) => {
    switch (action.type) {
        case 'getaddonall':
            return {
                ...state,
                addondatafinal: action.payload
            }
        default: return {
            ...state
        }
    }
}
//AddAddons
const Addaddondata = (state = initialaddon, action) => {
    switch (action.type) {
        case 'AddAddons':
            return {
                ...state,
                initialaddaddon: action.payload
            }
        default: return {
            ...state
        }
    }
}
//getAddonsByID
const Addaddondatabyid = (state = initialaddon, action) => {
    switch (action.type) {
        case 'getAddonsByID':
            return {
                ...state,
                initialaddonid: action.payload
            }
        default: return {
            ...state
        }
    }
}
////////////books reducer
const packagedata = (state = initialbooks, action) => {
    switch (action.type) {
        case 'getpackagesall':
            return {
                ...state,
                booksdatafinal: action.payload
            }
        default: return {
            ...state
        }
    }
}
////////////booksimage reducer
const booksdataimage = (state = initialbooksimage, action) => {
    switch (action.type) {
        case 'getbooksallimage':
            return {
                ...state,
                booksdatafinalimage: action.payload
            }
        default: return {
            ...state
        }
    }
}
//getBooksProductByID
const booksIddataimage = (state = initialbooksimage, action) => {
    switch (action.type) {
        case 'getBooksProductByID':
            return {
                ...state,
                booksIddatafinalimage: action.payload
            }
        default: return {
            ...state
        }
    }
}
////////////booksinner reducer
const booksinnerreducer = (state = initialbooksinner, action) => {
    switch (action.type) {
        case 'getBooksByID':
            return {
                ...state,
                booksdatafinalinner: action.payload
            }
        default: return {
            ...state
        }
    }
}
////////////////////////Add Books Reducer Message/////////////////////////////////////////
const SaveBooksReducer = (state = initialbooksinner, action) => {
    switch (action.type) {
        case 'AddProduct':
            return {
                ...state,
                SaveBooksMsg: action.payload
            }
        default: return {
            ...state
        }
    }
}
/////////frontend login reducer
const frontendloginreducer = (state = initialfrontlogin, action) => {
    switch (action.type) {
        case 'FRONTLOGIN':
            return {
                ...state,
                frontloginmsg: action.payload
            }
        default: return {
            ...state
        }
    }
}
/////////cart reducer
const cartreducer = (state = initialcart, action) => {
    switch (action.type) {
        case 'CART':
            return {
                ...state,
                datacart: action.payload
            }
        default: return {
            ...state
        }
    }
}
//cart Length
const lengthcartreducer = (state = initialcart, action) => {
    switch (action.type) {
        case 'lengthCart':
            return {
                ...state,
                datacartlength: action.payload
            }
        default: return {
            ...state
        }
    }
}
///////////////////////////cart items length///////////////////
const CartItemsLengthReducer = (state = initialcart, action) => {
    switch (action.type) {
        case 'CartItems':
            return {
                ...state,
                CartItemsLength: action.payload
            }
        default: return {
            ...state
        }
    }
}

////////////////////////////order reducers
const orderplacereducer = (state = initialorder, action) => {
    switch (action.type) {
        case 'order_details':
            return {
                ...state,
                orderplace: action.payload
            }
        default: return {
            ...state
        }
    }
}
//All OrderReducer
const allorderreducer = (state = initialorder, action) => {
    switch (action.type) {
        case 'ManageOrder':
            return {
                ...state,
                orderall: action.payload
            }
        default: return {
            ...state
        }
    }
}
// llManageOrder
const AllManageOrderReducer = (state = initialorder, action) => {
    switch (action.type) {
        case 'AllManageOrder':
            return {
                ...state,
                ManageOrderAll: action.payload
            }
        default: return {
            ...state
        }
    }
}
/////////////////////////////admin order reducer///////////////
const adminallorderreducer = (state = initialorder, action) => {
    switch (action.type) {
        case 'adminallorder':
            return {
                ...state,
                adminorderall: action.payload
            }
        default: return {
            ...state
        }
    }
}
//adminallorderbyid
const adminallorderbyidreducer = (state = initialorder, action) => {
    switch (action.type) {
        case 'adminallorderbyid':
            return {
                ...state,
                adminorderallbyid: action.payload
            }
        case 'adminUpdateOrderStatus':
            return {
                ...state,
                updatedOrderStatus: action.payload
            }
        default: return {
            ...state
        }
    }
}
//adminQuestionnaire
const AdminQuestionnaireReducer = (state = initialorder, action) => {
    switch (action.type) {
        case 'adminQuestionnaire':
            return {
                ...state,
                adminQuestionnaireData: action.payload
            }
        default: return {
            ...state
        }
    }
}
//adminQuestionnaireId
const AdminQuestionnaireIdReducer = (state = initialorder, action) => {
    switch (action.type) {
        case 'adminQuestionnaireId':
            return {
                ...state,
                adminQuestionnaireDataId: action.payload
            }
        default: return {
            ...state
        }
    }
}
////////////////////////zoom reducer//////
const zoomtoken = (state = initialtoken, action) => {
    switch (action.type) {
        case 'zoomtoken':
            return {
                ...state,
                zoomtokenno: action.payload
            }
        default: return {
            ...state
        }
    }
}
//zoomapi meeting
const zoommeetingurl = (state = initialtoken, action) => {
    switch (action.type) {
        case 'zoomapi':
            return {
                ...state,
                zoomurl: action.payload
            }
        default: return {
            ...state
        }
    }
}
const zoomMeetinReq = (state = zoomRequestMeetingMessage, action) => {
    switch (action.type) {
        case 'zoomMeetingReq':
            return {
                ...state,
                message: action.payload
            }
        default: return {
            ...state
        }
    }
}
const zoomMeeting = (state = zoomMeetings, action) => {
    switch (action.type) {
        case 'getAllMeetsById':
            return {
                ...state,
                meetingList : action.payload
            }
        case 'approveStatus':
            return {
                ...state,
                meetStatusMessage : action.payload
            }
        
        default: return {
            ...state
        }
    }
}
//paypalstatus
const paypalorderreducer = (state = initialpaypal, action) => {
    switch (action.type) {
        case 'paypalstatus':
            return {
                ...state,
                paypalres: action.payload
            }
        default: return {
            ...state
        }
    }
}
//paypalthanks
const paypalthanyouidreducer = (state = initialpaypal, action) => {
    switch (action.type) {
        case 'paypalthanks':
            return {
                ...state,
                paypalthank: action.payload
            }
        default: return {
            ...state
        }
    }
}
//recpatchadata
const recaptchareducer = (state = initialcaptcha, action) => {
    switch (action.type) {
        case 'recpatchadata':
            return {
                ...state,
                captchastatus: action.payload
            }
        default: return {
            ...state
        }
    }
}
//Adminchat
const Adminchatreducer = (state = initialadminchat, action) => {
    switch (action.type) {
        case 'Adminchat':
            return {
                ...state,
                adminchatdata: action.payload
            }
        default: return {
            ...state
        }
    }
}
//GetAdminMsg
const GetAdminMsgReducer = (state = GetAdminMsg, action) => {
    switch (action.type) {
        case 'GetAdminMsg':
            return {
                ...state,
                GetAdminMsg: action.payload
            }
        default: return {
            ...state
        }
    }
}
//Adminchatuser
const Adminchatuserreducer = (state = initialadminchat, action) => {
    switch (action.type) {
        case 'Adminchatuser':
            return {
                ...state,
                adminchatuserdata: action.payload
            }
        default: return {
            ...state
        }
    }
}
///get alll links and images files of chat
const Adminchatlinkimagereducer = (state = initialadminchatlinkimage, action) => {
    switch (action.type) {
        case 'Getchatlinkimgae':
            return {
                ...state,
                adminchatlinkimagedata: action.payload
            }
        default: return {
            ...state
        }
    }
}
///get alll  images, files of chat
const ChatFilereducer = (state = initialadminchatlinkimage, action) => {
    switch (action.type) {
        case 'GetchatFiles':
            return {
                ...state,
                chatFiledata: action.payload
            }
        default: return {
            ...state
        }
    }
}
///get alll  images, files of chat
const ChatLinksReducer = (state = initialadminchatlinkimage, action) => {
    switch (action.type) {
        case 'GetchatLinks':
            return {
                ...state,
                chatLinkData: action.payload
            }
        default: return {
            ...state
        }
    }
}
/// Add Review
const AddReviewsReducer = (state = ReviewReducers, action) => {
    switch (action.type) {
        case 'AddReview':
            return {
                ...state,
                AddReviews: action.payload
            }
        default: return {
            ...state
        }
    }
}
/// Get Review of Product 
const GetProductsReviewsReducer = (state = ReviewReducers, action) => {
    switch (action.type) {
        case 'GetProductReview':
            return {
                ...state,
                GetReviews: action.payload
            }
        default: return {
            ...state
        }
    }
}
/// Get Sum of  Review of Product 
const GetProductsReviewsSumReducer = (state = ReviewReducers, action) => {
    switch (action.type) {
        case 'SumProductReview':
            return {
                ...state,
                GetReviewsSum: action.payload
            }
        default: return {
            ...state
        }
    }
}
/// Get 5 Star  Review of Product 
const GetFiveStarProductsReviewsReducer = (state = ReviewReducers, action) => {
    switch (action.type) {
        case 'FiveStarProductReview':
            return {
                ...state,
                GetFiveStarReviews: action.payload
            }
        default: return {
            ...state
        }
    }
}
/// Get 4 Star  Review of Product 
const GetFourStarProductsReviewsReducer = (state = ReviewReducers, action) => {
    switch (action.type) {
        case 'FourStarProductReview':
            return {
                ...state,
                GetFourStarReviews: action.payload
            }
        default: return {
            ...state
        }
    }
}
/// Get 3 Star  Review of Product 
const GetThreeStarProductsReviewsReducer = (state = ReviewReducers, action) => {
    switch (action.type) {
        case 'ThreeStarProductReview':
            return {
                ...state,
                GetThreeStarReviews: action.payload
            }
        default: return {
            ...state
        }
    }
}
/// Get 2 Star  Review of Product 
const GetTwoStarProductsReviewsReducer = (state = ReviewReducers, action) => {
    switch (action.type) {
        case 'TwoStarProductReview':
            return {
                ...state,
                GetTwoStarReviews: action.payload
            }
        default: return {
            ...state
        }
    }
}
/// Get 1 Star  Review of Product 
const GetOneStarProductsReviewsReducer = (state = ReviewReducers, action) => {
    switch (action.type) {
        case 'OneStarProductReview':
            return {
                ...state,
                GetOneStarReviews: action.payload
            }
        default: return {
            ...state
        }
    }
}
//send data from adminSendMessage to AdminChatData
const GetCDatareducer = (state = initialGetCData, action) => {
    switch (action.type) {
        case 'GetCData':
            return {
                ...state,
                GetCDatadata: action.payload
            }
        default: return {
            ...state
        }
    }
}
//send data from adminSendMessage to AdminChatData
const GetFrontChatNumReducer = (state = initialGetCData, action) => {
    switch (action.type) {
        case 'GetFrontChatNum':
            return {
                ...state,
                GetFrontCNum: action.payload
            }
        default: return {
            ...state
        }
    }
}
//savebookmsgsction
const Getmsgforsavebook = (state = initialGetCData, action) => {
    switch (action.type) {
        case 'savebookmsgsction':
            return {
                ...state,
                Getmsgforsavebookdata: action.payload
            }
        default: return {
            ...state
        }
    }
}
//updatePackage
const Getmsgforpackageupdate = (state = initialadminpackagemsg, action) => {
    switch (action.type) {
        case 'updatePackage':
            return {
                ...state,
                adminpackagemsg: action.payload
            }
        default: return {
            ...state
        }
    }
}
//UpdateAddons
const Getmsgforaddonupdate = (state = initialadminaddonmsg, action) => {
    switch (action.type) {
        case 'UpdateAddons':
            return {
                ...state,
                adminaddonmsg: action.payload
            }
        default: return {
            ...state
        }
    }
}

//IntakeForm
const GetmsgforIntakeForm = (state = initialadminaddonmsg, action) => {
    switch (action.type) {
        case 'IntakeForm':
            return {
                ...state,
                IntakeFormMsg: action.payload
            }
        default: return {
            ...state
        }
    }
}

//WriteResumePkg
const GetmsgforWriteResume = (state = initialadminaddonmsg, action) => {
    switch (action.type) {
        case 'WriteResumePkg':
            return {
                ...state,
                WriteResumePkgData: action.payload
            }
        default: return {
            ...state
        }
    }
}
//userintakeform
const GetmsgforuserIntakeForm = (state = initialadminaddonmsg, action) => {
    switch (action.type) {
        case 'userintakeform':
            return {
                ...state,
                userintakeformData: action.payload
            }
        default: return {
            ...state
        }
    }
}
//userintakeformdata
const GetUserIntakeFormData = (state = initialadminaddonmsg, action) => {
    switch (action.type) {
        case 'userintakeformdata':
            return {
                ...state,
                getuserintakeformData: action.payload
            }
        default: return {
            ...state
        }
    }
}
//UserIntakeFormById
const GetUserIntakeFormById = (state = initialadminaddonmsg, action) => {
    switch (action.type) {
        case 'UserIntakeFormById':
            return {
                ...state,
                getUserStepFormById: action.payload
            }
        default: return {
            ...state
        }
    }
}
//UserIntakeFormUpdate
const GetUserIntakeFormUpdated = (state = initialadminaddonmsg, action) => {
    switch (action.type) {
        case 'UserIntakeFormUpdate':
            return {
                ...state,
                getUserStepFormUpdatedmsg: action.payload
            }
        default: return {
            ...state
        }
    }
}

export {
    GetFaqDataReducer, addFAQreducer, deleteFaqReducer, togglingReducer, getIdToEditReducer, updateFAQreducer,
    GetCDatareducer, inputReducer,
    getallcustomer, loginstatus, getallpackages, getIdToEditPackageReducer, updatePackagereducer, addPackagereducer, StatusChangecustomer,
    addCustomersreducer, GetactiveFaqDataReducer, addondata, GetPackageDataReducer, packagedata, booksdataimage, Addaddondata,
    Addaddondatabyid, PackageAddonDataReducer, booksinnerreducer, ChatFilereducer, booksIddataimage, frontendloginreducer, cartreducer,
    lengthcartreducer, orderplacereducer, allorderreducer, adminallorderreducer, adminallorderbyidreducer,
    zoomtoken, zoommeetingurl, zoomMeetinReq,zoomMeeting,
    paypalorderreducer, paypalthanyouidreducer, recaptchareducer, Adminchatreducer, Adminchatuserreducer, GetAdminMsgReducer,
    Adminchatlinkimagereducer, ChatLinksReducer, GetFrontChatNumReducer, AddReviewsReducer, GetProductsReviewsReducer,
    GetProductsReviewsSumReducer, GetFiveStarProductsReviewsReducer, GetFourStarProductsReviewsReducer, GetThreeStarProductsReviewsReducer,
    GetTwoStarProductsReviewsReducer, GetOneStarProductsReviewsReducer, Getmsgforsavebook, Getmsgforpackageupdate, CartItemsLengthReducer,
    Getmsgforaddonupdate, SaveBooksReducer, GetmsgforIntakeForm, GetmsgforWriteResume, GetmsgforuserIntakeForm, GetUserIntakeFormData,
    AllManageOrderReducer, GetUserIntakeFormById, GetUserIntakeFormUpdated, AdminQuestionnaireReducer, AdminQuestionnaireIdReducer
};


