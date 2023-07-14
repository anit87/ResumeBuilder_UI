import React, { useEffect } from 'react'
import { useState } from 'react'

const Innersamplepopup = ({InnerDataisdata,categoryID,imgaesID}) => {
    const[imagesdata,setImagesdata] = useState([])
// console.log("InnerDataisdata insidee",InnerDataisdata)
useEffect(() => {
    InnerDataisdata.map((item)=>{
        if(item.id==categoryID){
            item.resume.map((v)=>{
                if(v.id==imgaesID){
                    setImagesdata(v.images)
                }
            })
        }
    })

  
}, [categoryID,imgaesID])

// console.log("imagesdata",imagesdata)

  return (
    <>
   {imagesdata.map((items,index)=>{
    return(
    <div key={index}>
         <img src={items} alt='sample_inner' className='img-fluid' />
    </div>
    )
   })} 
            
    
    
            </>
  )
}

export default Innersamplepopup