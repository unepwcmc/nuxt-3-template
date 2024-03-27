import { describe, expect, test } from 'vitest'
import { createPage } from '@nuxt/test-utils/e2e'
import { useSetup } from './setup'

// TODO: this currently fails with GetPortError - not sure why
describe('Home Page', async () => {
  await useSetup().defaultSetup()

  test('Render home page', async () => {
    const page = await createPage('/en')
    const indexPageElement = page.locator('.page-index')

    expect(await indexPageElement.innerText()).toContain('WCMC Nuxt 3 Template')
  })
})
