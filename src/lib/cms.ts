import CMS from 'sveltecms'
import conf from './sveltecms.config.json'
import markdownPlugin from 'sveltecms/plugins/markdown'
import defaultContent from 'sveltecms/plugins/defaultContent'
import { kenBurnsPlugin } from '.'

const cms = new CMS(conf, [
  markdownPlugin(),
  defaultContent,
  kenBurnsPlugin,
])

export default cms
