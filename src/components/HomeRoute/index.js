import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const HomeRoute = () => (
  <div className="home-container">
    <Header />
    <div className="app-container">
      <h1 className="homeHeading">Find the Job That Fits Your Life</h1>
      <p className="homeDescription">
        Millions of people are searching for jobs, salary, information, company
        reviews. Find the job that fit your abilities and potential.
      </p>
      <Link to="/jobs">
        <button className="findJobsButton" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default HomeRoute
