import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import CourseItem from '../CourseItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    courseList: [],
  }

  componentDidMount() {
    this.getCourses()
  }

  getCourses = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const coursesUrl = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }

    const response = await fetch(coursesUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.courses.map(eachCourse => ({
        id: eachCourse.id,
        name: eachCourse.name,
        logoUrl: eachCourse.logo_url,
      }))
      this.setState({
        courseList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickRetry = () => {
    this.getCourses()
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

  renderAllCoursesSuccessView = () => {
    const {courseList} = this.state
    return (
      <div className="success-view-container">
        <h1 className="success-view-heading">Courses</h1>
        <ul className="success-view-list-container">
          {courseList.map(eachCourse => (
            <CourseItem key={eachCourse.id} courseDetails={eachCourse} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#000BFFF" height={50} width={50} />
    </div>
  )

  renderAllCourses = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderAllCoursesSuccessView()
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
      <div className="app-container">
        <Header />
        {this.renderAllCourses()}
      </div>
    )
  }
}

export default Home
