import React from 'react'
import './loading.css'
import load from '../../assets/image/dogLoader.gif'
const Loading = () => {
  return (
    <div className='container-load'>
      <img src={load} alt=""  />
    </div>
  )
}

export default Loading