import Vue from 'vue'
import PointFilter from '@/components/point-filter'
import PointDate from '@/components/point-date'
import PrintStockCorrection from '../../src/views/inventory/correction/PrintStockCorrection'
import { mount, shallowMount, flushPromises } from '@vue/test-utils'
import Vuetify from 'vuetify'
import SweetModal from 'sweet-modal-vue/src/plugin.js'
import VueCookie from 'vue-cookie'
import axiosNode from '@/axiosNode'

Vue.use(PointFilter)
Vue.use(PointDate)
Vue.use(SweetModal)
Vue.use(VueCookie)

describe('PrintStockCorrection', () => {

  global.localStorage = {
    state: {
      'access-token': 'superHashedString'
    },
    setItem (key, item) {
      this.state[key] = item
    },
    getItem (key) { 
      return this.state[key]
    }
  }

  global.localStorage.setItem("tenantAddress", "null")
  global.localStorage.setItem("tenantPhone", "null")

  const $t = () => {}
  const vuetify = new Vuetify()
  const getSettingEndNote = () => {}
  jest.doMock('@/axiosNode');
  
  it('show watermark when status rejected', async () => {
    axiosNode.get = jest.fn()
    const wrapper = mount(PrintStockCorrection, {
      propsData: {
        stockCorrection: {
          form: {
            approvalStatus: -1,
            createdByUser: {
                fullName: "-"
            },
            requestApprovalToUser: {
                fullName: "-"
            }
          },
          warehouse: {
            name: "-",
            adress: "-"
          }
        }
      },
      mocks:{ $t, getSettingEndNote },
      vuetify,
    })
    wrapper.vm.onClose()
    wrapper.vm.open()
    wrapper.vm.clear()
    expect(wrapper.find('.watermark').exists()).toBe(true)
  })

  it('not show watermark when status approved', () => {
    axiosNode.get = jest.fn().mockReturnValue({ data: { data: "Test" } })
    const wrapper = mount(PrintStockCorrection, {
      propsData: {
        stockCorrection: {
          form: {
            approvalStatus: 1,
            createdByUser: {
                fullName: "-"
            },
            requestApprovalToUser: {
                fullName: "-"
            }
          },
          warehouse: {
            name: "-",
            adress: "-"
          }
        }
      },
      mocks:{ $t, getSettingEndNote },
      vuetify,
    })
    expect(wrapper.find('.watermark').exists()).toBe(false)
  })
})
