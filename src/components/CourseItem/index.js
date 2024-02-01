import {Link} from 'react-router-dom'

import './index.css'

const CourseItem = props => {
  const {courseDetails} = props
  const {id, name, logoUrl} = courseDetails

  return (
    <Link className="course-item-link" to={`/courses/${id}`}>
      <li className="course-item">
        <img src={logoUrl} alt={name} className="course-logo" />
        <p className="course-name">{name}</p>
      </li>
    </Link>
  )
}

export default CourseItem
