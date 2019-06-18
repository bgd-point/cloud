import api from '@/api'

const url = '/human-resource/employee/job-locations'

const state = {
  jobLocation: {
    name: '',
    base_salary: null,
    multiplier_kpi: null
  },
  jobLocations: [],
  jobLocationList: [],
  pagination: {
    current_page: null,
    from: null,
    to: null,
    path: null,
    last_page: null,
    per_page: null,
    total: null
  }
}

const getters = {
  jobLocation: state => {
    return state.jobLocation
  },
  jobLocations: state => {
    return state.jobLocations
  },
  jobLocationList: state => {
    return state.jobLocationList
  },
  pagination: state => {
    return state.pagination
  }
}

const mutations = {
  'FETCH_ARRAY' (state, payload) {
    state.jobLocations = payload.data
    state.pagination.current_page = payload.meta.current_page
    state.pagination.from = payload.meta.from
    state.pagination.to = payload.meta.to
    state.pagination.path = payload.meta.path
    state.pagination.last_page = payload.meta.last_page
    state.pagination.per_page = payload.meta.per_page
    state.pagination.total = payload.meta.total
  },
  'FETCH_SELECT_LIST' (state, payload) {
    let array = []
    payload.forEach(element => {
      array.push({
        id: element.id,
        label: element.name
      })
    })
    state.jobLocationList = array
  },
  'FETCH_OBJECT' (state, payload) {
    state.jobLocation = payload.data
  },
  'CREATE' (state, payload) {
    state.jobLocation = payload
  },
  'UPDATE' (state, payload) {
    state.jobLocation = payload
  },
  'DELETE' (state, payload) {
    state.jobLocation = {}
  }
}

const actions = {
  get ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api.get(url, payload)
        .then(
          (response) => {
            commit('FETCH_ARRAY', response)
            commit('FETCH_SELECT_LIST', response.data)
            resolve(response)
          },
          (error) => {
            reject(error)
          })
    })
  },
  find ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api.get(url + '/' + payload.id)
        .then(
          (response) => {
            commit('FETCH_OBJECT', response)
            resolve(response)
          },
          (error) => {
            reject(error)
          })
    })
  },
  create (context, payload) {
    return new Promise((resolve, reject) => {
      api.post(url, payload)
        .then(
          (response) => {
            resolve(response)
          },
          (error) => {
            reject(error)
          })
    })
  },
  update (context, payload) {
    return new Promise((resolve, reject) => {
      api.patch(url + '/' + payload.id, payload)
        .then(
          (response) => {
            resolve(response)
          },
          (error) => {
            reject(error)
          })
    })
  },
  delete (context, payload) {
    return new Promise((resolve, reject) => {
      api.delete(url + '/' + payload.id, payload)
        .then(
          (response) => {
            resolve(response)
          },
          (error) => {
            reject(error)
          })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}