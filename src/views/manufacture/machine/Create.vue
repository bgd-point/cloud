<template>
  <div>
    <breadcrumb>
      <breadcrumb-manufacture/>
      <router-link to="/manufacture/machine" class="breadcrumb-item">{{ $t('machine') | uppercase }}</router-link>
      <span class="breadcrumb-item active">{{ $t('create') | uppercase }}</span>
    </breadcrumb>

    <manufacture-menu/>

    <form class="row" @submit.prevent="onSubmit">
      <p-block :title="$t('create') + ' ' + $t('machine')" :header="true">
        <p-block-inner :is-loading="isLoading">
          <p-form-row
            id="code"
            name="code"
            :label="$t('code')"
            v-model="form.code"
            :disabled="true"
            :errors="form.errors.get('code')"
            @errors="form.errors.set('code', null)"/>

          <p-form-row
            id="name"
            name="name"
            :label="$t('name')"
            v-model="form.name"
            :disabled="isSaving"
            :errors="form.errors.get('name')"
            @errors="form.errors.set('name', null)"/>

          <p-form-row
            id="notes"
            name="notes"
            :label="$t('notes')"
            v-model="form.notes"
            :disabled="isSaving"
            :errors="form.errors.get('notes')"
            @errors="form.errors.set('notes', null)"/>

          <hr>

          <button type="submit" class="btn btn-sm btn-primary" :disabled="isSaving">
            <i v-show="isSaving" class="fa fa-asterisk fa-spin"/> Save
          </button>
        </p-block-inner>
      </p-block>
    </form>
  </div>
</template>

<script>
import ManufactureMenu from '../Menu'
import Breadcrumb from '@/views/Breadcrumb'
import BreadcrumbManufacture from '@/views/manufacture/Breadcrumb'
import Form from '@/utils/Form'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    ManufactureMenu,
    Breadcrumb,
    BreadcrumbManufacture
  },
  data () {
    return {
      isLoading: false,
      isSaving: false,
      form: new Form({
        code: null,
        name: null,
        note: null
      })
    }
  },
  computed: {
    ...mapGetters('manufactureMachine', ['machines', 'nextId'])
  },
  methods: {
    ...mapActions('manufactureMachine', ['create', 'get']),
    getMachines () {
      this.isLoading = true
      this.get()
        .then(response => {
          this.isLoading = false
          this.form.code = 'MC-' + this.nextId
        }).catch(error => {
          this.isLoading = false
          this.$notification.error(error.message)
        })
    },
    onSubmit () {
      this.isSaving = true
      this.create(this.form)
        .then(response => {
          this.isSaving = false
          this.$notification.success('create success')
          Object.assign(this.$data, this.$options.data.call(this))
          this.$router.push('/manufacture/machine/' + response.data.id)
        }).catch(error => {
          this.getMachines()
          this.isSaving = false
          this.$notification.error(error.message)
          this.form.errors.record(error.errors)
        })
    }
  },
  created () {
    this.getMachines()
  }
}
</script>