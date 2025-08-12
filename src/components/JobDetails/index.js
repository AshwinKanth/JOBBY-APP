import Loader from 'react-loader-spinner'

import {Component} from 'react'
import Cookies from 'js-cookie'

import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FaShareSquare} from 'react-icons/fa'

import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class JobDetails extends Component {
  state = {
    jobItemData: [],
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getFormattedSimilarJobData = job => ({
    companyLogoUrl: job.company_logo_url,
    employmentType: job.employment_type,
    jobDescription: job.job_description,
    location: job.location,
    rating: job.rating,
    title: job.title,
    id: job.id,
  })

  getFormattedSkillData = skill => ({
    imageUrl: skill.image_url,
    name: skill.name,
  })

  getFormattedLifeCompanyData = life => ({
    description: life.description,
    imageUrl: life.image_url,
  })

  getFormattedData = job => ({
    companyLogoUrl: job.company_logo_url,
    employmentType: job.employment_type,
    jobDescription: job.job_description,
    location: job.location,
    packagePerAnnum: job.package_per_annum,
    rating: job.rating,
    title: job.title,
    id: job.id,
    companyWebsiteUrl: job.company_website_url,
    skills: job.skills.map(eachSkill => this.getFormattedSkillData(eachSkill)),
    lifeAtCompany: this.getFormattedLifeCompanyData(job.life_at_company),
  })

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = this.getFormattedData(fetchedData.job_details)
      const updatedSimilarJobsData = fetchedData.similar_jobs.map(
        eachSimilarJob => this.getFormattedSimilarJobData(eachSimilarJob),
      )

      this.setState({
        jobItemData: updatedData,
        similarJobsData: updatedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobItemDetails = () => {
    const {jobItemData, similarJobsData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      title,
      rating,
      location,
      packagePerAnnum,
      skills,
      lifeAtCompany,
    } = jobItemData

    return (
      <div>
        <div className="jobItemDetails-container">
          <div className="logo-jobName-container">
            <img src={companyLogoUrl} alt={title} className="companyImage" />
            <div className="jobTitle-container">
              <h1 className="jobTitle">{title}</h1>
              <div className="rating-container">
                <AiFillStar className="starIcon" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-salary-container">
            <div className="location-jobType-container">
              <div className="location-container">
                <GoLocation className="locationIcon" />
                <p className="location">{location}</p>
              </div>
              <div className="jobType-container">
                <BsBriefcaseFill className="caseIcon" />
                <p className="employmentType">{employmentType}</p>
              </div>
            </div>
            <p className="salary">{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="description-visit-container">
            <h1 className="headingDescription">Description</h1>
            <a href={companyWebsiteUrl} className="websiteUrl">
              Visit <FaShareSquare className="shareIcon" />
            </a>
          </div>
          <p className="description">{jobDescription}</p>
          <h1 className="skillsHeading">Skills</h1>
          <ul className="skills-container">
            {skills.map(eachSkill => (
              <li className="skill-item">
                <img
                  src={eachSkill.imageUrl}
                  alt={eachSkill.name}
                  className="skill-image"
                />
                <p className="skill-heading">{eachSkill.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="skillsHeading">Life at Company</h1>
          <div className="lifeAtCompany-container">
            <p className="LifeAtXCompanyDescription">
              {lifeAtCompany.description}
            </p>
            <img
              src={lifeAtCompany.imageUrl}
              alt={title}
              className="lifeAtCompanyImage"
            />
          </div>
        </div>
        <ul className="similar-jobs-container">
          {similarJobsData.map(eachSimilarJob => (
            <SimilarJobs
              similarJobDetails={eachSimilarJob}
              key={eachSimilarJob.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="no-jobs-image"
      />
      <h1 className="failureHeading">Oops! Something Went Wrong</h1>
      <p className="failureDescription">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="button" onClick={this.getJobItemDetails}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobItemDetailsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobDetails-container">
          {this.renderJobItemDetailsView()}
        </div>
      </>
    )
  }
}

export default JobDetails
