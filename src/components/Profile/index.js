import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const apiStatusConstant = {
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'Failure',
  initial: 'INITIAL',
}

class Profile extends Component {
  state = {profileData: {}, apiStatus: apiStatusConstant.initial}

  componentDidMount() {
    this.getProfile()
  }

  getFormattedData = data => ({
    profileImageUrl: data.profile_image_url,
    shortBio: data.short_bio,
  })

  getProfile = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const profileUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(profileUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = this.getFormattedData(data.profile_details)

      this.setState({
        profileData: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderProfileDetails = () => {
    const {profileData} = this.state
    const {profileImageUrl, shortBio} = profileData

    return (
      <div>
        <img src={profileImageUrl} alt="name" className="profileImage" />
        <h1 className="profileName">Ashwin kanth Marapally</h1>
        <p className="profileBio">{shortBio}</p>
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" width="50" height="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="no-jobs-container">
      <button className="button" onClick={this.getProfile} type="button">
        Retry
      </button>
    </div>
  )

  renderProfileViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderProfileDetails()
      case apiStatusConstant.inProgress:
        return this.renderLoaderView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return <div className="profile-container">{this.renderProfileViews()}</div>
  }
}

export default Profile
