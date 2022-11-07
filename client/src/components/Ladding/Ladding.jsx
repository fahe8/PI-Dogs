import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import Loading from '../Loading/Loading'
import './ladding.css'
const Ladding = () => {
  let dogs = useSelector(state => state.dogs)
  return (
<div className="container-ladding">
      {dogs.length?<div className="slideshow-image">
        <div className="content">
          <h1>DOGS</h1>
          <h2>Sign in and see your favorites</h2>
        </div>
        <Link to="/home">
          <button className="btn">Continue</button>
        </Link>
      </div>:<Loading></Loading>}
    </div>
  )
}

export default Ladding