import { expect } from 'chai'
// import { mount, shallowMount } from '@vue/test-utils'
import Customer from '../../src/views/master/customer/Index.vue'

describe('Customer test', () => {
  it('check function sort', () => {
    expect(Customer.methods.sort).to.be.a('function')
  })
  it('check function sortedFunc', () => {
    expect(Customer.methods.sortedFunc).to.be.a('function')
  })
})
