import { describe, expect, it } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import CommentItem from '../CommentItem.vue'
import type { Item } from '@/types/hn'

const comment: Item = {
  id: 7,
  type: 'comment',
  by: 'dang',
  time: Math.floor(Date.now() / 1000) - 120,
  text: 'Hello <b>world</b><script>alert(1)</script>',
}

function render(item: Item, slot = '') {
  return mount(CommentItem, {
    props: { item, op: 'dang' },
    slots: { default: slot },
    global: { stubs: { RouterLink: RouterLinkStub } },
  })
}

describe('CommentItem', () => {
  it('renders sanitized comment HTML', () => {
    const html = render(comment).find('.text').html()
    expect(html).toContain('<b>world</b>')
    expect(html).not.toContain('<script>')
  })

  it('hides the comment and its replies, showing the count, and shows them again', async () => {
    const wrapper = render(comment, '<div class="comment"></div><div class="comment"></div>')
    const toggle = wrapper.find('button.toggle')
    expect(toggle.text()).toBe('Hide')

    await toggle.trigger('click')
    expect(toggle.text()).toBe('Show (3)')
    expect(wrapper.find('.text').exists()).toBe(false)

    await toggle.trigger('click')
    expect(wrapper.find('.text').exists()).toBe(true)
  })

  it('shows [deleted] in place of deleted comments', () => {
    const wrapper = render({ id: 8, type: 'comment', time: comment.time, deleted: true })
    expect(wrapper.text()).toContain('[deleted]')
    expect(wrapper.find('.text').exists()).toBe(false)
  })

  it('highlights the original poster', () => {
    expect(render(comment).find('a.op').exists()).toBe(true)
  })
})
