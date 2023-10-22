import './index.css'

const LanguageFilterItem = props => {
  const {details, isActive, changeActiveLanguage} = props
  const {id, language} = details
  const getId = () => {
    changeActiveLanguage(id)
  }
  return (
    <li>
      <button
        onClick={getId}
        className={isActive ? 'language-btn active' : 'language-btn'}
        type="button"
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
