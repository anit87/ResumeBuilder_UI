import React from 'react'

const CopyRight = () => {
  const time = new Date().getFullYear()
  return (
    <div className="copyright">
      <div className="container">
        <div className="copyright_content">
       <p>copyright © {time } flawless resume. all rights reserved.</p>
       <p>terms of use  &nbsp; | &nbsp;privacy policy </p> 
       <p>design by: &nbsp; <span ><a href="https://businesswebsoft.com"  target="_blank" style={{color:'var(--orange)'}}> business websoft pvt.ltd</a></span></p>
      </div>
      </div>
    </div>
  )
}

export default CopyRight