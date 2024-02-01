import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './index.css'

import Header from '../Header'
import CourseDetailsItem from '../CourseDetailsItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    courseDetailsList: [],
  }

  componentDidMount() {
    this.getCourseDetails()
  }

  onClickRetry = () => {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = [fetchedData.course_details].map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
        description: each.description,
      }))
      this.setState({
        courseDetailsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        className="failure-view-img"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-view-heading">Oops! Something went wrong</h1>
      <p className="failure-view-info">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="retry-button"
        type="button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderCourseDetailsSuccessView = () => {
    const {courseDetailsList} = this.state

    console.log(courseDetailsList)

    return (
      <ul className="course-details-container">
        {courseDetailsList.map(eachItem => (
          <CourseDetailsItem key={eachItem.id} courseItemDetails={eachItem} />
        ))}
      </ul>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderAllCourseDetailsView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCourseDetailsSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
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
        {this.renderAllCourseDetailsView()}
      </>
    )
  }
}

export default CourseDetails
