import React from 'react'
import { Link } from 'react-router-dom'
const LandingPage = () => {
  return (
    <div>
        <h1>eatime</h1>
        <Link to="/recipes">
            <button>GO</button>
        </Link>
    </div>
  )
}

export default LandingPage