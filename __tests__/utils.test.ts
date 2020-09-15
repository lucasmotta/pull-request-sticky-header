import { addHeader, MARKER } from '../src/utils'

test('add a header to body without an existing marker', async () => {
  const currentBody = 'Hello world, this is a description'
  const header = '> This is a sticky header'

  const newBody = addHeader(header, currentBody)

  expect(newBody).toEqual(`> This is a sticky header${MARKER}\n${currentBody}`)
})

test('add a header to body with an existing marker', async () => {
  const currentBody = `> This is the old header${MARKER}\nHello world, this is a description`
  const header = '> This is a new sticky header'

  const newBody = addHeader(header, currentBody)

  expect(newBody).toEqual(
    `${header}${MARKER}\nHello world, this is a description`
  )
})
