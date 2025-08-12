import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobsCard = props => {
  const {jobCardDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    Location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobCardDetails

  return (
    <Link to={`/jobs/${id}`} className="job-link-item">
      <li className="jobListItem">
        <div className="jobCardDetails-container">
          <div className="logo-title-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="companyLogo"
            />
            <div className="titleRating-container">
              <h1 className="title">{title}</h1>
              <div className="rating-container">
                <AiFillStar className="starIcon" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-jobType-salary-container">
            <div className="location-jobType-container">
              <div className="location-container">
                <GoLocation className="locationIcon" />
                <p className="typeDescription">{Location}</p>
              </div>
              <div className="jobType-container">
                <BsBriefcaseFill className="caseIcon" />
                <p className="typeDescription">{employmentType}</p>
              </div>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr className="break" />
          <h1 className="descriptionHeading">Description </h1>
          <p className="description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobsCard
