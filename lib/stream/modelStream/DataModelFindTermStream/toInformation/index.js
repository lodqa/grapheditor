import findTerm from './findTerm'

export default function(model, texts, target, findTermUrl, dictionaryUrl) {
  const newValue = findTerm(
    findTermUrl,
    dictionaryUrl,
    texts
  )

  return {
    model,
    newValue,
    target
  }
}
