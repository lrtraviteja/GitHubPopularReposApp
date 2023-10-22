import {Component} from 'react'
import Loader from 'react-loader-spinner'

import RepositoryItem from '../RepositoryItem'
import LanguageFilterItem from '../LanguageFilterItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]
class GithubPopularRepos extends Component {
  state = {
    activeLanguageId: languageFiltersData[0].id,
    listOfLanguages: [],
    isLoading: true,
    isFailed: false,
  }

  componentDidMount() {
    this.getData()
  }

  changeActiveLanguage = language =>
    this.setState({activeLanguageId: language, isLoading: true}, this.getData)

  getData = async () => {
    const {activeLanguageId} = this.state
    const URL = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`

    const response = await fetch(URL)
    if (!response.ok) {
      this.setState({isFailed: true, isLoading: false})
    } else {
      const data = await response.json()
      const popularRepos = data.popular_repos
      const updatedData = popularRepos.map(each => ({
        id: each.id,
        name: each.name,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarURL: each.avatar_url,
      }))
      this.setState({listOfLanguages: updatedData, isLoading: false})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderListItems = () => {
    const {listOfLanguages} = this.state
    return (
      <ul className="repository-items-list">
        {listOfLanguages.map(each => (
          <RepositoryItem key={each.id} details={each} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        className="failure-img"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      />
    </div>
  )

  render() {
    const {activeLanguageId, isLoading, isFailed} = this.state
    return (
      <div className="app">
        <h1 className="title">Popular</h1>
        <ul className="languages-list">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              key={each.id}
              details={each}
              isActive={each.id === activeLanguageId}
              changeActiveLanguage={this.changeActiveLanguage}
            />
          ))}
        </ul>
        {isLoading && this.renderLoader()}
        {isLoading === false && this.renderListItems()}
        {isFailed && this.renderFailureView()}
      </div>
    )
  }
}

export default GithubPopularRepos
