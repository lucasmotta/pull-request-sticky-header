export const MARKER = '<!-- Sticky Header Marker -->'

export function addHeader(header: string, currentBody: string): string {
  const regex = new RegExp(`(.*)(${MARKER})\\s*`)

  console.log({ header, currentBody })

  if (currentBody.match(regex)) {
    return currentBody.replace(regex, `${header}${MARKER}\n\n`)
  }

  return `${header}${MARKER}\n\n${currentBody}`
}
