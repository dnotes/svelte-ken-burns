import markdownit from 'markdown-it'
import type { PageServerLoad } from './$types'
const md = new markdownit()

export const load:PageServerLoad = async () => {
  const mprt = await import.meta.glob('../../README.md', {as:'raw', eager:true})
  return {
    html: md.render(mprt['../../README.md'])
  }
}