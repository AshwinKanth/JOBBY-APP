import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import {Component} from 'react'
import Header from '../Header'
import Profile from '../Profile'
import JobsCard from '../JobsCard'
import Filters from '../Filters'
import './index.css'

const employmentTypesList = [
  {label: 'Full Time', employmentTypeId: 'FULLTIME'},
  {label: 'Part Time', employmentTypeId: 'PARTTIME'},
  {label: 'Freelance', employmentTypeId: 'FREELANCE'},
  {label: 'Internship', employmentTypeId: 'INTERNSHIP'},
]

const salaryRangesList = [
  {salaryRangeId: '1000000', label: '10 LPA and above'},
  {salaryRangeId: '2000000', label: '20 LPA and above'},
  {salaryRangeId: '3000000', label: '30 LPA and above'},
  {salaryRangeId: '4000000', label: '40 LPA and above'},
]

const locationsList = [
  {label: 'Hyderabad', locationId: 'HYDERABAD'},
  {label: 'Bangalore', locationId: 'BANGALORE'},
  {label: 'Chennai', locationId: 'CHENNAI'},
  {label: 'Delhi', locationId: 'DELHI'},
  {label: 'Mumbai', locationId: 'MUMBAI'},
]

const apiStatusConstant = {
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class JobsRoute extends Component {
  state = {
    searchInput: '',
    jobsData: [],
    filters: {
      employmentTypes: [],
      locations: [],
      minSalary: '',
    },
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const {searchInput, filters} = this.state

    const url = `https://apis.ccbp.in/jobs?search=${searchInput}&employment_type=${filters.employmentTypes.join(
      ',',
    )}&minimum_package=${filters.minSalary}&location=${filters.locations.join(
      ',',
    )}`

    const options = {
      method: 'GET',
      headers: {authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const updatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        Location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
        id: each.id,
      }))
      this.setState({
        jobsData: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  handleKeyDown = event => {
    if (event.key === 'Enter') {
      this.onSearchButton()
    }
  }

  onSearchButton = () => {
    this.getJobs()
  }

  updateEmploymentFilter = typeId => {
    this.setState(prevState => {
      const {employmentTypes} = prevState.filters
      const updatedList = employmentTypes.includes(typeId)
        ? employmentTypes.filter(id => id !== typeId)
        : [...employmentTypes, typeId]

      return {filters: {...prevState.filters, employmentTypes: updatedList}}
    }, this.getJobs)
  }

  updateSalaryFilter = salaryId => {
    this.setState(
      prevState => ({
        filters: {...prevState.filters, minSalary: salaryId},
      }),
      this.getJobs,
    )
  }

  updateLocationFilter = locationId => {
    this.setState(prevState => {
      const {locations} = prevState.filters
      const updatedList = locations.includes(locationId)
        ? locations.filter(id => id !== locationId)
        : [...locations, locationId]

      return {filters: {...prevState.filters, locations: updatedList}}
    }, this.getJobs)
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

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
      <button type="button" className="button" onClick={this.getJobs}>
        Retry
      </button>
    </div>
  )

  renderJobs = () => {
    const {jobsData} = this.state
    return jobsData.length > 0 ? (
      <ul className="jobs-container">
        {jobsData.map(eachJob => (
          <JobsCard jobCardDetails={eachJob} key={eachJob.id} />
        ))}
      </ul>
    ) : (
      <div className="noJobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="noJobs-image"
        />
        <h1 className="noJobs-heading">No Jobs Found</h1>
        <p className="noJobs-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderSearchContainer = () => {
    const {searchInput} = this.state

    return (
      <div className="search-container">
        <input
          type="text"
          className="searchInput"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
          onKeyDown={this.handleKeyDown}
          value={searchInput}
        />
        <button
          aria-label="Search jobs"
          data-testid="searchButton"
          type="button"
          className="search-button"
          onClick={this.onSearchButton}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderJobsViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderJobs()
      case apiStatusConstant.inProgress:
        return this.renderLoadingView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobs-container">
        <Header />
        <div className="jobsPage">
          <div className="profile_filters_container">
            <Profile />
            <Filters
              employmentTypesList={employmentTypesList}
              locationsList={locationsList}
              salaryRangesList={salaryRangesList}
              updateEmployee={this.updateEmploymentFilter}
              updateSalary={this.updateSalaryFilter}
              updateSelectedLocations={this.updateLocationFilter}
            />
          </div>
          <div className="search_jobDetails-container">
            {this.renderSearchContainer()}
            {this.renderJobsViews()}
          </div>
        </div>
      </div>
    )
  }
}

export default JobsRoute
