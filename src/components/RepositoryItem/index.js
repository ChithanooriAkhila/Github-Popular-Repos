// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    name,
    issuesCount,
    forksCount,
    starsCount,
    avatarUrl,
  } = repositoryDetails

  return (
    <li>
      <div>
        <img src={avatarUrl} alt={name} className="avatar-url-img" />
        <h1>{name}</h1>
        <div className="count-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="icon"
          />
          <p>{starsCount}</p>
          <p>stars</p>
        </div>
        <div className="count-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="icon"
          />
          <p>{forksCount}</p>
          <p>forks</p>
        </div>
        <div className="count-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="icon"
          />
          <p>{issuesCount}</p>
          <p>open issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
