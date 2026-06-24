import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import NotificationView from './NotificationView.vue'

describe('NotificationView.vue', () => {
  beforeEach(() => {
    // Mock localStorage for jsdom
    const store: Record<string, string> = {}
    Object.defineProperty(globalThis, 'localStorage', {
      value: {
        getItem: (key: string) => store[key] ?? null,
        setItem: (key: string, value: string) => { store[key] = value },
        removeItem: (key: string) => { delete store[key] },
        clear: () => { Object.keys(store).forEach(k => delete store[k]) },
        get length() { return Object.keys(store).length },
        key: (i: number) => Object.keys(store)[i] ?? null,
      },
      configurable: true,
    })
    setActivePinia(createPinia())
  })

  it('mounts without errors', () => {
    const wrapper = mount(NotificationView, {
      global: {
        stubs: {
          'el-card': true, 'el-table': true, 'el-table-column': true,
          'el-button': true, 'el-tag': true, 'el-badge': true,
          'el-icon': true, 'el-pagination': true
        }
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the notification center title', () => {
    const wrapper = mount(NotificationView, {
      global: {
        stubs: {
          'el-card': true, 'el-table': true, 'el-table-column': true,
          'el-button': true, 'el-tag': true, 'el-badge': true,
          'el-icon': true, 'el-pagination': true
        }
      }
    })
    expect(wrapper.text()).toContain('通知中心')
  })

  it('renders empty state "暂无通知" when no notifications', () => {
    const wrapper = mount(NotificationView, {
      global: {
        stubs: {
          'el-card': true, 'el-table': true, 'el-table-column': true,
          'el-button': true, 'el-tag': true, 'el-badge': true,
          'el-icon': true, 'el-pagination': true
        }
      }
    })
    expect(wrapper.text()).toContain('暂无通知')
  })

  it('renders notification table columns', () => {
    const wrapper = mount(NotificationView, {
      global: {
        stubs: {
          'el-card': true, 'el-table': true, 'el-table-column': true,
          'el-button': true, 'el-tag': true, 'el-badge': true,
          'el-icon': true, 'el-pagination': true
        }
      }
    })
    const text = wrapper.text()
    expect(text).toContain('类型')
    expect(text).toContain('标题')
    expect(text).toContain('内容')
    expect(text).toContain('时间')
    expect(text).toContain('操作')
  })

  it('renders the "全部已读" button', () => {
    const wrapper = mount(NotificationView, {
      global: {
        stubs: {
          'el-card': true, 'el-table': true, 'el-table-column': true,
          'el-button': true, 'el-tag': true, 'el-badge': true,
          'el-icon': true, 'el-pagination': true
        }
      }
    })
    expect(wrapper.text()).toContain('全部已读')
  })
})