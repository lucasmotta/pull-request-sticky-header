export const MARKER = '<!-- Sticky Header Marker -->'

export function addHeader(header: string, currentBody: string | null | undefined): string {
  if(!currentBody){
    return `${header}${MARKER}\n\n`
  }

  const regex = new RegExp(`(.*)(${MARKER})\\s*`)
  if (currentBody?.match(regex)) {
    return currentBody.replace(regex, `${header}${MARKER}\n\n`)
  }

  return `${header}${MARKER}\n\n${currentBody}`
}
