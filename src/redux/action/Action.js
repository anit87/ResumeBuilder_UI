import Axios from 'axios';
import { TOGGLE_ALL } from '../actionType/Types';
import { STATUSCHANGE, ADDCUSTOMERS, PACKAGEADDON } from '../actionType/Types'
import { apiURL } from '../../../src/components/Admin/Components/Api/BaseLine'


export const toggle = () => {
    return {
        type: TOGGLE_ALL,
    }
}
// Faq Action > 
// get all datas
export const allFaqData = () => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'admin/faq', { 'action': 'getallFaq' });
        dispatch({
            type: 'getallFaq',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}

//Active Faq
export const allactiveFaqData = () => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'admin/faq', { 'action': 'getActiveFaq' });
        dispatch({
            type: 'getallactiveFaq',
            payload: res.data,
        })

    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}

//add faq
export const AddFaqData = (data) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'admin/faq', { "action": "addfaq", ...data });
        dispatch({
            type: 'addfaq',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
//delete Faq
export const deleteFaq = (id) => async dispatch => {
    try {
        await Axios.post(apiURL + 'admin/faq', { "action": "deletefaq", id });
        dispatch({
            type: 'deletefaq',
        })

    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}

//Edit Faq
export const getIdToEditFAQ = (id) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'admin/faq', { "action": "getallFaqbyid", id });
        dispatch({
            type: 'getidfaq',
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
//Update Faq
export const updateFaq = (data) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'admin/faq', { "action": "updatefaq", ...data })
        dispatch({
            type: 'updatefaq',
            payload: res.data
        })

    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}

// package actions
export const allPackageData = () => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'admin/product', { 'action': 'getAllProduct' });
        dispatch({
            type: 'getPackage',
            payload: res.data,
        })

    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}

//PACKAGEADDON
export const PackageAddonData = () => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'admin/product_package_addon', { 'action': 'getAllProductPackageAddon' });
        dispatch({
            type: PACKAGEADDON,
            payload: res.data,
        })

    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}


//Add Package
export const AddPackageData = (data) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'admin/product_package_addon', { "action": "AddProductPackageAddon", ...data });
        dispatch({
            type: 'addPackage',
            payload: res.data,
        })

    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
//delete package
export const deletePackage = (id) => async dispatch => {
    try {
        await Axios.post(apiURL + 'admin/product', { "action": "DeletePackageProduct", id });
        dispatch({
            type: 'deletePackage',
        })

    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}

//delete Books
export const DeleteBooks = (id) => async dispatch => {
    try {
        await Axios.post(apiURL + 'admin/product', { "action": "DeleteBooksProduct", id });

        dispatch({
            type: 'deleteBooks',
        })

    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
//Edit Package
export const getIdToEditPackage = (id) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'admin/product_package_addon', { "action": "getProductPackageAddonByID", id });

        dispatch({
            type: 'getpackageId',
            payload: res.data,
        })

    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
//Update Package
export const updatePackage = (data) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'admin/product_package_addon', { "action": "UpdateProductPackageAddon", ...data })
        dispatch({
            type: 'updatePackage',
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}

//All Package
export const allPackagesData = (data) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'admin/package', { "action": "getAllPackage", ...data });
        dispatch({
            type: 'ALLPACKAGES',
            payload: res.data,
        })

    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}

/////All Addons action
export const getalladdons = () => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'admin/addons', { "action": "getAllAddons" })
        dispatch({
            type: "getaddonall",
            payload: res.data
        })
    }
    catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log('error messagessss is', e)
        })
    }
}

//Add Addon
export const Addaddonsaction = (data) => async dispatch => {
    try {
        console.log("Add on data", data);
        const res = await Axios.post(apiURL + 'admin/addons', { "action": "AddAddons", ...data })
        dispatch({
            type: "AddAddons",
            payload: res.data
        })
    }
    catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log('error messagessss is', e)
        })
    }
}

//Edit Addon
export const getIdToEditAddon = (id) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'admin/addons', { "action": "getAddonsByID", id })

        dispatch({
            type: "getAddonsByID",
            payload: res.data
        })
    }
    catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log('error messagessss is', e)
        })
    }
}
//Update Addon
export const updateAddon = (data) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'admin/addons', { "action": "UpdateAddons", ...data })
        dispatch({
            type: "UpdateAddons",
            payload: res.data
        })
    }
    catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log('error messagessss is', e)
        })
    }
}
//delete Addons
export const deleteAddon = (id) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'admin/addons', { "action": "DeleteAddons", id })

        dispatch({
            type: "DeleteAddons",
            payload: res.data
        })
    }
    catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log('error messagessss is', e)
        })
    }
}
/////books action
export const getallpackage = () => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'admin/product_package_addon', { "action": "getAllProductPackageAddon" })
        dispatch({
            type: "getpackagesall",
            payload: res.data
        })
    }
    catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log('error messagessss is', e)
        })
    }
}
/////books action where id = 2 
export const getallbooksimage = () => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'admin/product', { "action": "getAllBooks" })
        dispatch({
            type: "getbooksallimage",
            payload: res.data
        })
    }
    catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log('error messagessss is', e)
        })
    }
}
//edit Books
export const getIdToEditBooks = (id) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'admin/product', { "action": "getBooksProductByID", id })
        dispatch({
            type: "getBooksProductByID",
            payload: res.data
        })
    }
    catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log('error messagessss is', e)
        })
    }
}
//Add Books
export const savebooks = (booksData) => async dispatch => {
    
    let formdata = new FormData();
    for (let i = 0; i < booksData.product_images.length; i++) {
        formdata.append(`file[]`, booksData.product_images[i]);
    }
    formdata.append('product_name', booksData.product_name)
    formdata.append('product_description', booksData.product_description)
    formdata.append('product_amount', booksData.product_amount)
    formdata.append('product_sale_amount', booksData.product_sale_amount)
    formdata.append('product_type_id', booksData.product_type_id)
    formdata.append('product_book_author', booksData.product_book_author)
    formdata.append('product_book_review', booksData.product_book_review)
    formdata.append('product_book_title', booksData.product_book_title)
    formdata.append('action', 'AddProduct')
    try {
        // console.log("dfsdfsd",Object.fromEntries(formdata))
        const res = await Axios.post(apiURL + 'admin/product_image', formdata)
        dispatch({
            type: "AddProduct",
            payload: res.data
        })
    }
    catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log('error messagessss is', e)
        })
    }
}
//Update Books
export const updatebooks = (booksData) => async dispatch => {
    console.log("booksData", booksData.booksData);
    let formdata = new FormData();
    for (let i = 0; i < booksData?.linkedimages?.length; i++) {
        formdata.append(`file[]`, booksData?.linkedimages[i]);
    }
    booksData?.unlinkedimages?.map((v) => {
        formdata.append('unlinkedimages[]', v.pd_img_id)
    })
    formdata.append('product_name', booksData.booksData.product_name)
    formdata.append('product_description', booksData.booksData.product_description)
    formdata.append('product_amount', booksData.booksData.product_amount)
    formdata.append('product_id', booksData.booksData.product_id)
    formdata.append('product_sale_amount', booksData.booksData.product_sale_amount)
    formdata.append('product_type_id', booksData.booksData.product_type_id)
    formdata.append('product_book_author', booksData.booksData.product_book_author)
    formdata.append('product_book_review', booksData.booksData.product_book_review)
    formdata.append('product_book_title', booksData.booksData.product_book_title)
    formdata.append('product_bookstock', booksData.booksData.product_bookstock)
    formdata.append('action', 'UpdateProductImage')
    // console.log("checking22",formdata.getAll("unlinkedimages[]"))
    // console.log("FormData Entries Are",Object.fromEntries(formdata))
    try {
        const res = await Axios.post(apiURL + 'admin/product_image', formdata)
        dispatch({
            type: "savebookmsgsction",
            payload: res.data
        })
    }
    catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log('error messagessss is', e)
        })
    }
}

///////innerbook action////
export const innerbook = (id) => async dispatch => {
    try {
        console.log("innerbook ", id);
        const res = await Axios.post(apiURL + 'admin/product', { "action": "getBooksProductByID", id })
        dispatch({
            type: "getBooksByID",
            payload: res.data
        })
    }
    catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log('error messagessss is', e)
        })
    }
}
//ADDCUSTOMERS
export const AddCustomersData = (data) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'customers', { "action": "AddNewCustomers", ...data });
        dispatch({
            type: ADDCUSTOMERS,
            payload: res.data,
        })

    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log('error messagessss is', e)
        })
    }
}
//Input Data
export const CollectInputData = (data) => {
    try {
        return {
            type: 'INPUT_DATA',
            payload: data,
        }
    } catch (e) {
        console.log(e)
    }
}

//All customers
export const Allcustomer = (data) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'admin/customers', { "action": "getAllCustomers", ...data });
        dispatch({
            type: 'ALLCUSTOMER',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}

//STATUSCHANGE
export const StatusChange = (data) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'admin/customers', { ...data });
        dispatch({
            type: STATUSCHANGE,
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}

//Login
export const loginfun = (data) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'login', { ...data });
        dispatch({
            type: 'LOGIN',
            payload: res.data.status,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
//////////////////frontend login action 
export const loginaction = (data) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'customers', { "action": "loginCustomers", ...data });
        dispatch({
            type: 'FRONTLOGIN',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
/////////////////////////innerbooksfun action
export const innerbookaction = (data) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'cart', { "action": "AddCart", ...data });
        dispatch({
            type: 'INNERBOOK',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
/////////////////////cart action
export const cartaction = (customer_id) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'cart', { "action": "getCartDetail", customer_id });
        dispatch({
            type: 'CART',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
//Delete Cart Data
export const deletecartaction = (cart_id) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'cart', { "action": "DeleteCart", cart_id });
        dispatch({
            type: 'DELETECART',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
//Update Cart
export const updatecartaction = (update_qty) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'cart', { "action": "UpdateCart", update_qty });
        dispatch({
            type: 'UpdateCart',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
//total cart length
export const lengthcartaction = (customer_id) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'cart', { "action": "getAllCart", customer_id });
        dispatch({
            type: 'lengthCart',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
/////////////shipping action
export const shippingaction = (data) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'cart/customer_address_chekout', { "action": "AddCustomerAddress", ...data });
        dispatch({
            type: 'UpdateCart',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
////////////order action
export const orderdetailaction = (data) => async dispatch => {
    try {
        console.log("AddOrder", data)
        const res = await Axios.post(apiURL + 'cart/order_table', { "action": "AddOrder", ...data });
        dispatch({
            type: 'order_details',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
//Manage order
export const customerallorderaction = (customer_id) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'order_table.php', { "action": "ManageOrder", customer_id });
        dispatch({
            type: 'ManageOrder',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
//Manage order with product type id 
export const AllOrderManageAction = (customer_id) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'cart/order_table', { "action": "AllOrdersManage", customer_id });
        dispatch({
            type: 'AllManageOrder',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
///////////////////admin order action///////////////////////////
export const adminorderall = () => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'admin/order_table', { "action": "AdminOrder" });
        dispatch({
            type: 'adminallorder',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
///////////////////admin order action Questionnaire  ///////////////////////////
export const adminQuestionnaire = () => async dispatch => {
    try {
        // const res = await Axios.post(apiURL + 'user_stepper_form_db.php', { "action": "getAdminStepForm" });
        const res = await Axios.post(apiURL + 'admin/order_table', { "action": "AdminOrder" });
        dispatch({
            type: 'adminQuestionnaire',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
///////////////////admin order action Questionnaire seeby Id  ///////////////////////////
export const adminQuestionnaireById = (order_id) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'cart/user_stepper_form_db', { "action": "getStepFormByID", order_id });
        // const res = await Axios.post(apiURL + 'admin/order_table', { "action": "AdminOrderInnerData", order_id });
        dispatch({
            type: 'adminQuestionnaireId',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
//admin order id
export const adminorderbyid = (order_id) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'admin/order_table', { "action": "AdminOrderInnerData", order_id });
        dispatch({
            type: 'adminallorderbyid',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
//admin can update order status with order id
export const updateOrderStatus = (data) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'admin/order_table', { "action": "UpdateOrderStatus", id: data.id, order_status: data.order_status });
        dispatch({
            type: 'adminUpdateOrderStatus',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
///////////////////zoom action//////////////
export const zoomaction = (id) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'zoom', {});
        dispatch({
            type: 'zoomtoken',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}

export const zoomapiaction = (token) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'newmeeting', { token }); 
        dispatch({
            type: 'zoomapi',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
/////////////paypal action
export const paypalsave = (data) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'cart/order_table', { "action": "UpdatePaypalOrder", ...data });
        dispatch({
            type: 'paypalstatus',
            payload: res.data.orderId,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}

/////////////thankyou action
export const paypalthankyouidaction = (paypalorderid) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'cart/order_table', { "action": "PayPalSuccessData", paypalorderid });
        dispatch({
            type: 'paypalthanks',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
////////////////package addons save to cart action
export const packagesaveaddon = (data) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'cart', { "action": "AddCartAddons", ...data });
        dispatch({
            type: 'packagesave',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
//////////////////////////////////////Get ALL Cart Items/////////////////////////////////
export const AllCartCustItems = (customer_id) => async dispatch => { 
    try {
        const res = await Axios.post(apiURL + 'cart', { "action": "getCartItems", customer_id });
        dispatch({
            type: 'CartItems',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
////////////////recaptcha action
export const recaptchaaction = (id) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'recaptcha', { id });
        dispatch({
            type: 'recpatchadata',
            payload: res.data,
        })

    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
///////////////////////contact us mail action
export const ContactUs = (data) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'mailData', { ...data });
        dispatch({
            type: 'ContactUs',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}

///////////////Intake Form Submit
export const IntakeForm = (data) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'userIntakeForm.php', { ...data });
        dispatch({
            type: 'IntakeForm',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
//////Chatting Actions //////
export const UserChat = (userChatData) => async dispatch => {
    let formdata = new FormData();
    for (let i = 0; i < userChatData.attachFileData.length; i++) {
        formdata.append(`file[]`, userChatData.attachFileData[i]);
    }
    formdata.append('order_id', userChatData.order_id)
    formdata.append('chatting_from_user', userChatData.chatting_from_user)
    formdata.append('chatting_to_user', userChatData.chatting_to_user)
    formdata.append('customer_id', userChatData.customer_id)
    formdata.append('chatting_msg', userChatData.chatting_msg)
    formdata.append('action', 'AddUserChat')
    try {
        const res = await Axios.post(apiURL + 'chatting/addChat', formdata)
        // console.log("dfsdfsd",Object.fromEntries(formdata))
        dispatch({
            type: "AddUserChat",
            payload: res.data
        })
    }
    catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log('error messagessss is', e)
        })
    }
}
//add user
export const AddUserChat = (data) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'chatting', { "action": "UserChat", ...data });
        dispatch({
            type: 'ContactUs',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
///////////////adminchat action
export const Adminchataction = (data) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'chatting', { "action": "getChatByAdmin", ...data });
        dispatch({
            type: 'Adminchat',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
//Admin Chat
export const Adminchatuseraction = (data) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'chatting', { "action": "CombineChats", ...data });
        dispatch({
            type: 'Adminchatuser',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
////////////////////////////////////////////////////////////////////////
//GetAdminMsg
export const GetAdminMsg = (data) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'chatting', { "action": "getChatByAdmin", ...data });
        dispatch({
            type: 'GetAdminMsg',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
//Getchatstatus read
export const Getchatstatusread = (data) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'chatting', { "action": "OpenChat", ...data });
        dispatch({
            type: 'Getchatstatus',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
//------------------------------------------To add Reviews--------------------------------------------------
export const AddReviews = (data) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'review', { "action": "AddNewReview", ...data });
        dispatch({
            type: 'AddReview',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
//------------------------------------------To get Reviews--------------------------------------------------
export const GetProductReviews = (product_id) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'review', { "action": "getReviewProductByID", product_id });
        dispatch({
            type: 'GetProductReview',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
//------------------------------------------To get Reviews Sum--------------------------------------------------
export const GetProductReviewsSum = (product_id) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'review', { "action": "SumOftReviewProduct", product_id });
        dispatch({
            type: 'SumProductReview',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
//------------------------------------------To get Total 5 star Reviews--------------------------------------------------
export const GetFiveStarProductReview = (product_id) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'review', { "action": "getFiveStarReviewProduct", product_id });
        dispatch({
            type: 'FiveStarProductReview',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
//------------------------------------------To get Total 4 star Reviews--------------------------------------------------
export const GetFourStarProductReview = (product_id) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'review', { "action": "getFourStarReviewProduct", product_id }); 
        dispatch({
            type: 'FourStarProductReview',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
//------------------------------------------To get 3Star Reviews--------------------------------------------------
export const GetThreeStarProductReview = (product_id) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'review', { "action": "getThreeStarReviewProduct", product_id });
        dispatch({
            type: 'ThreeStarProductReview',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
//------------------------------------------To get 2Star Reviews--------------------------------------------------
export const GetTwoStarProductReview = (product_id) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'review', { "action": "getTwoStarReviewProduct", product_id });
        dispatch({
            type: 'TwoStarProductReview',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
//------------------------------------------To get 1Star Reviews--------------------------------------------------
export const GetOneStarProductReview = (product_id) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'review', { "action": "getOneStarReviewProduct", product_id });
        dispatch({
            type: 'OneStarProductReview',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
///get alll links and images files of chat
export const Getchatlinkimagesfile = (order_id) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'chatting', { "action": "getAllChatting", order_id });
        dispatch({
            type: 'Getchatlinkimgae',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
///get  images files of chat
export const GetchatFile = (order_id) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'chatting', { "action": "getAllFiles", order_id });

        dispatch({
            type: 'GetchatFiles',
            payload: res.data,
        })

    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
///get  Links of chat
export const GetchatLink = (order_id) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'chatting', { "action": "getAllLinks", order_id });
        dispatch({
            type: 'GetchatLinks',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
//--------------------To send data from child to parents using redux------------------------
export const GetCData = (data) => async dispatch => {
    try {
        const res = await data;
        dispatch({
            type: 'GetCData',
            payload: res,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
//--------------------To send data from frontEnd to BackEnd For Scroll using redux------------------------
export const GetFrontChatNum = (data) => async dispatch => {
    try {
        const res = await data;
        dispatch({
            type: 'GetFrontChatNum',
            payload: res,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}

//--------------------Api to write resume when buy package in order detail------------------------
export const WriteResumePkg = (order_id) => async dispatch => {
    try {
        const res = await Axios.post(apiURL + 'cart/order_table', { "action": "WriteResume", order_id });
        dispatch({
            type: 'WriteResumePkg',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}

//--------------------Api to dispatch userIntakeForm in DB------------------------
export const UserIntakeForm = (data) => async dispatch => {
    // console.log("data is:", data)
    try {
        const res = await Axios.post(apiURL + 'cart/user_stepper_form_db', { "action": "NewStepFormUser", ...data });
        dispatch({
            type: 'userintakeform',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
//--------------------Api to show dispatch userIntakeFormById in DB------------------------
export const UserIntakeFormById = (order_id) => async dispatch => {
    // console.log("data is:", order_id)
    try {
        const res = await Axios.post(apiURL + 'cart/user_stepper_form_db', { "action": "getStepFormByID", order_id });
        dispatch({
            type: 'UserIntakeFormById',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}
//--------------------Api to show dispatch UserIntakeFormUpdate in DB------------------------
export const UserIntakeFormUpdate = (data) => async dispatch => {
    // console.log("data is:", data)
    try {
        const res = await Axios.post(apiURL + 'cart/user_stepper_form_db', { "action": "UpdateStepForm", ...data });
        dispatch({
            type: 'UserIntakeFormUpdate',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}

//--------------------Api to get userIntakeForm in data by orderno DB------------------------
export const UserIntakeFormData = (data) => async dispatch => {
    // console.log("data is:", data)
    try {
        const res = await Axios.post(apiURL + 'cart/user_stepper_form_db', { "action": "getAllStepForm", ...data });
        dispatch({
            type: 'userintakeformdata',
            payload: res.data,
        })
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: console.log(e)
        })
    }
}