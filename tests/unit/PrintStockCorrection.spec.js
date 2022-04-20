import Vue from 'vue'
import PointFilter from '@/components/point-filter'
import PointDate from '@/components/point-date'
import PrintStockCorrection from '../../src/views/inventory/correction/PrintStockCorrection'
import { mount, shallowMount, flushPromises } from '@vue/test-utils'
import Vuetify from 'vuetify'
import SweetModal from 'sweet-modal-vue/src/plugin.js'
import VueCookie from 'vue-cookie'
import axios from "axios";

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
  const getSettingEndNote = jest.fn()

  it('show watermark when status rejected', async () => {
    const mockAxios = jest.genMockFromModule('axios')
    mockAxios.create = jest.fn(() => mockAxios)
    jest.spyOn(axios, 'get').mockResolvedValue({ data: "testLogo" })

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
      methods: {
        getSettingEndNote: getSettingEndNote
      },
      mocks:{ $t },
      vuetify,
    })
    wrapper.vm.onClose()
    wrapper.vm.open()
    wrapper.vm.clear()
    await wrapper.vm.getSettingLogo()
    expect(wrapper.find('.watermark').exists()).toBe(true)
  })

  it('not show watermark when status approved', () => {
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
      methods: {
        getSettingEndNote: getSettingEndNote
      },
      mocks:{ $t },
      vuetify,
    })
    expect(wrapper.find('.watermark').exists()).toBe(false)
  })
})
