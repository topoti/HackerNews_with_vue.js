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

function render(item: Item, rank?: number) {
  return mount(StoryRow, {
    props: { item, rank },
    global: { stubs: { RouterLink: RouterLinkStub } },
  })
}

describe('StoryRow', () => {
  it('renders an HN story row', () => {
    const text = render(story, 31).text()
    expect(text).toContain('31.')
    expect(text).toContain('A story')
    expect(text).toContain('(example.com)')
    expect(text).toContain('1 point by pg 3 hours ago | discuss')
  })

  it('counts comments once there are some', () => {
    expect(render({ ...story, descendants: 12 }).text()).toContain('12 comments')
  })

  it('links text posts to their item page', () => {
    const wrapper = render({ ...story, url: undefined })
    const title = wrapper.findAllComponents(RouterLinkStub)[0]
    expect(title.text()).toBe('A story')
    expect(title.props('to')).toEqual({ path: '/item', query: { id: 42 } })
  })

  it('shows only title, domain and age for jobs', () => {
    const text = render({ ...story, type: 'job', score: undefined, descendants: undefined }).text()
    expect(text).not.toMatch(/point|comment|discuss|undefined/)
    expect(text).toContain('3 hours ago')
  })
})
