import { describe, expect, it } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import StoryRow from '../StoryRow.vue'
import type { Item } from '@/types/hn'

const story: Item = {
  id: 42,
  type: 'story',
  by: 'pg',
  time: Math.floor(Date.now() / 1000) - 3 * 3600,
  title: 'A story',
  url: 'https://blog.example.com/post',
  score: 1,
  descendants: 0,
}

function render(item: Item) {
  return mount(StoryRow, {
    props: { item },
    global: { stubs: { RouterLink: RouterLinkStub } },
  })
}

describe('StoryRow', () => {
  it('renders a story item', () => {
    const text = render(story).text().replace(/\s+/g, ' ')
    expect(text).toContain('A story')
    expect(text).toContain('(example.com)')
    expect(text).toContain('1 point by pg | 0 Comments | Created 3 hours ago')
  })

  it('counts comments', () => {
    expect(render({ ...story, descendants: 12 }).text()).toContain('12 Comments')
  })

  it('links text posts to their item page', () => {
    const wrapper = render({ ...story, url: undefined })
    const title = wrapper.findAllComponents(RouterLinkStub)[0]
    expect(title.text()).toBe('A story')
    expect(title.props('to')).toEqual({ path: '/item', query: { id: 42 } })
  })

  it('shows only title, domain and age for jobs', () => {
    const text = render({ ...story, type: 'job', score: undefined, descendants: undefined }).text()
    expect(text).not.toMatch(/point|comment|undefined/i)
    expect(text).toContain('3 hours ago')
  })
})
