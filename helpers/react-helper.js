import cx from 'classnames'


export default function inlineClassNames(classNames) {
  if (Array.isArray(classNames))
    return classNames.join(' ')

  if (classnames instanceof Object)
    for (let key in classnames) {
      classnames[key] = inlineClassNames(classnames[key])
    }
    return cx(classNames)
}
