// Write your code here
const LanguageFilterItem = props => {
  const {languageFilterDetails, whenClicked} = props
  const {id, language} = languageFilterDetails

  const whenClickedLanguage = () => {
    whenClicked(id)
  }

  return (
    <li>
      <button type="button" onClick={whenClickedLanguage}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
