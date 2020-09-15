export const MARKER = '<!-- Sticky Header Marker -->'

export function addHeader(header: string, currentBody: string): string {
  const regex = new RegExp(`(.*)(${MARKER})\\s*`)

  if (currentBody.match(regex)) {
    return currentBody.replace(regex, `${header}${MARKER}\n`)
  }

  return `${header}${MARKER}\n${currentBody}`
}
