const levenshtein = require('fast-levenshtein')

const levenshteinFilter = (source = [], minimum = 3) => {
  const result = {}
  let _source = source
  console.log(source)
  if (source.length === 0) return
  let prefixLength = minimum
  let prev = _source[0].substr(0, prefixLength - 1)
  let current = _source[0].substr(0, prefixLength)
  let count = 0

  while (_source.length > 0) {
    count++
    const found = _source.filter(text => text.indexOf(current) === 0)
    console.log({ current, prev, found: found.length })
    console.log(count)
    if (found.length === 1 || current === _source[0]) {
      const prevFound = _source.filter(text => (text.indexOf(prev) === 0))
      result[(prevFound.length === 1) ? found[0] : prev] = prevFound

      _source = _source.filter(text => !(text.indexOf(prev) === 0))
      if (_source.length > 0) {
        prefixLength = minimum
        prev = _source[0].substr(0, prefixLength)
        current = _source[0].substr(0, prefixLength)
        console.log('SISA LENGTH : ', _source.length)
      }
    } else {
      if (_source.length > 0) {
        prev = current
        current = _source[0].substr(0, ++prefixLength)
      }
    }

    if (count === 1000) return
  }
  return result
}

export default levenshteinFilter
