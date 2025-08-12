import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobs = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    jobDescription,
  } = similarJobDetails

  return (
    <li className="similar-job-item">
      <div className="logo-container">
        <img src={companyLogoUrl} alt="company logo" className="company-logo" />
        <div className="title-rating-container">
          <h1 className="cardTitle">{title}</h1>
          <div className="star-container">
            <AiFillStar className="starIcon" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="description-heading">Description</h1>
      <p className="jobDescription">{jobDescription}</p>
      <div className="location-job-type-salary-container">
        <div className="location-type-container">
          <div className="location-container">
            <GoLocation className="locationIcon" />
            <p className="location">{location}</p>
          </div>
          <div className="job-type-container">
            <BsBriefcaseFill className="caseIcon" />
            <p className="employmentType">{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobs
