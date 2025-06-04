/* eslint-env jest */

import { shallowMount } from '@vue/test-utils'
import Produtos from '../../views/Produtos.vue'

jest.mock('@/plugins/firebase', () => ({
  db: {
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        delete: jest.fn(),
      })),
      get: jest.fn(),
      add: jest.fn(),
      where: jest.fn(() => ({
        get: jest.fn(),
      })),
    })),
  },
  auth: {
    currentUser: {
      uid: 'test-user-id',
    },
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
  },
  produtosCollection: {
    where: jest.fn(() => ({
      get: jest.fn(() => Promise.resolve({ docs: [] })),
    })),
  },
  classeCollection: {
    where: jest.fn(() => ({
      get: jest.fn(() => Promise.resolve({ docs: [] })),
    })),
  },
}))

describe('Produtos.vue', () => {
  it('componente deve ser renderizado', () => {
    const wrapper = shallowMount(Produtos, {
      stubs: ['v-btn', 'v-spacer', 'v-snackbar', 'v-card', 'v-dialog', 'v-text-field',
        'v-card-actions','v-checkbox', 'v-form', 
        'v-card-text', 'v-alert', 'v-divider', 'v-icon', 'v-card-title', 'v-select', 'v-col', 'v-row', 'v-container', 'v-simple-table', 
      'v-data-table', 'v-tooltip', 'v-app']
    })
    expect(wrapper.exists()).toBe(true)
  })
})
