import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import LoanView from './LoanView.vue';
describe('LoanView.vue', () => {
    beforeEach(() => {
        // Mock localStorage for jsdom
        const store = {};
        Object.defineProperty(globalThis, 'localStorage', {
            value: {
                getItem: (key) => store[key] ?? null,
                setItem: (key, value) => { store[key] = value; },
                removeItem: (key) => { delete store[key]; },
                clear: () => { Object.keys(store).forEach(k => delete store[k]); },
                get length() { return Object.keys(store).length; },
                key: (i) => Object.keys(store)[i] ?? null,
            },
            configurable: true,
        });
        setActivePinia(createPinia());
    });
    it('mounts without errors', () => {
        const wrapper = mount(LoanView, {
            global: {
                stubs: {
                    'el-card': true, 'el-table': true, 'el-table-column': true,
                    'el-button': true, 'el-tag': true, 'el-dialog': true,
                    'el-form': true, 'el-form-item': true, 'el-input': true,
                    'el-select': true, 'el-option': true, 'el-input-number': true
                }
            }
        });
        expect(wrapper.exists()).toBe(true);
    });
    it('renders the loan view header with default title', () => {
        const wrapper = mount(LoanView, {
            global: {
                stubs: {
                    'el-card': true, 'el-table': true, 'el-table-column': true,
                    'el-button': true, 'el-tag': true, 'el-dialog': true,
                    'el-form': true, 'el-form-item': true, 'el-input': true,
                    'el-select': true, 'el-option': true, 'el-input-number': true
                }
            }
        });
        expect(wrapper.text()).toContain('我的贷款');
    });
    it('renders empty state text when no loans', () => {
        const wrapper = mount(LoanView, {
            global: {
                stubs: {
                    'el-card': true, 'el-table': true, 'el-table-column': true,
                    'el-button': true, 'el-tag': true, 'el-dialog': true,
                    'el-form': true, 'el-form-item': true, 'el-input': true,
                    'el-select': true, 'el-option': true, 'el-input-number': true
                }
            }
        });
        expect(wrapper.text()).toContain('暂无数据');
    });
    it('renders loan table columns', () => {
        const wrapper = mount(LoanView, {
            global: {
                stubs: {
                    'el-card': true, 'el-table': true, 'el-table-column': true,
                    'el-button': true, 'el-tag': true, 'el-dialog': true,
                    'el-form': true, 'el-form-item': true, 'el-input': true,
                    'el-select': true, 'el-option': true, 'el-input-number': true
                }
            }
        });
        const text = wrapper.text();
        expect(text).toContain('申请编号');
        expect(text).toContain('企业/姓名');
        expect(text).toContain('金额');
        expect(text).toContain('期限');
        expect(text).toContain('用途');
        expect(text).toContain('还款方式');
        expect(text).toContain('状态');
    });
});
