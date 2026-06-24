import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import SmeDashboard from './SmeDashboard.vue'

describe('SmeDashboard.vue', () => {
  beforeEach(() => {
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
    const wrapper = mount(SmeDashboard, {
      global: {
        stubs: {
          'el-card': false, 'el-row': { template: '<div><slot /></div>' },
          'el-col': { template: '<div><slot /></div>' },
          'el-avatar': true, 'el-table': { template: '<div><slot /></div>' },
          'el-table-column': { template: '<div><slot /></div>' },
          'el-button': { template: '<button><slot /></button>' },
          'el-tag': { template: '<span><slot /></span>' }
        }
      }
    })
    console.log('HTML:', wrapper.html().substring(0, 500))
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the enterprise dashboard title', () => {
    const wrapper = mount(SmeDashboard, {
      global: {
        stubs: {
          'el-card': false, 'el-row': { template: '<div><slot /></div>' },
          'el-col': { template: '<div><slot /></div>' },
          'el-avatar': true, 'el-table': { template: '<div><slot /></div>' },
          'el-table-column': { template: '<div><slot /></div>' },
          'el-button': { template: '<button><slot /></button>' },
          'el-tag': { template: '<span><slot /></span>' }
        }
      }
    })
    console.log('TEXT:', JSON.stringify(wrapper.text()))
    expect(wrapper.text()).toContain('企业服务控制台')
  })
})
