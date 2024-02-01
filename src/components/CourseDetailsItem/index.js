import './index.css'

const CourseDetailsItem = props => {
  const {courseItemDetails} = props

  const {name, description, imageUrl} = courseItemDetails

  return (
    <li className="course-details-item">
      <div className="course-details-container">
        <img className="course-details-img" src={imageUrl} alt={name} />
        <div className="course-details-info-container">
          <h1 className="course-details-info-heading">{name}</h1>
          <p className="course-details-info-description">{description}</p>
        </div>
      </div>
    </li>
  )
}

export default CourseDetailsItem
