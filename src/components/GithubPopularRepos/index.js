import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  LOADING: 'LOADING',
  FAILED: 'FAILED',
  SUCCESS: 'SUCCESS',
  INITIAL: 'INITIAL',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    repos: [],
    id: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.INITIAL,
  }

  componentDidMount() {
    this.getRepos()
  }

  getRepos = async () => {
    this.setState({apiStatus: apiStatusConstants.LOADING})

    const {id} = this.state
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${id}`,
    )
    if (response.ok) {
      const res = await response.json()
      const data = await res.popular_repos
      const updatedData = data.map(repo => ({
        name: repo.name,
        id: repo.id,
        issuesCount: repo.issues_count,
        forksCount: repo.forks_count,
        starsCount: repo.stars_count,
        avatarUrl: repo.avatar_url,
      }))
      this.setState({repos: updatedData, apiStatus: apiStatusConstants.SUCCESS})
    } else if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.FAILED})
    }
  }

  whenClicked = id => {
    this.setState({id}, this.getRepos)
  }

  loadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  successView = () => {
    const {repos} = this.state
    return (
      <ul>
        {repos.map(repository => (
          <RepositoryItem key={repository.id} repositoryDetails={repository} />
        ))}
      </ul>
    )
  }

  failureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderRepos = () => {
    const {apiStatus} = this.state
    // eslint-disable-next-line default-case
    switch (apiStatus) {
      case apiStatusConstants.LOADING:
        return this.loadingView()
      case apiStatusConstants.SUCCESS:
        return this.successView()
      case apiStatusConstants.FAILED:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <h1>Popular</h1>
        <div>
          <ul>
            {languageFiltersData.map(languageFilter => (
              <LanguageFilterItem
                key={languageFilter.id}
                languageFilterDetails={languageFilter}
                whenClicked={this.whenClicked}
              />
            ))}
          </ul>
        </div>
        {this.renderRepos()}
      </div>
    )
  }
}

export default GithubPopularRepos
