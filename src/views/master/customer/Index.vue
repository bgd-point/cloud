<template>
  <div>
    <breadcrumb>
      <breadcrumb-master />
      <span class="breadcrumb-item active">{{ $t('customer') | uppercase }}</span>
    </breadcrumb>

    <tab-menu />

    <div class="row">
      <p-block>
        <div class="input-group block mb-5">
          <a
            v-if="$permission.has('create customer')"
            href="javascript:void(0)"
            class="input-group-prepend"
            title="add"
            @click="$refs.addCustomer.open()"
          >
            <span class="input-group-text">
              <i class="fa fa-plus" />
            </span>
          </a>
          <a
            v-if="$permission.has('create customer')"
            href="javascript:void(0)"
            title="import"
            class="input-group-prepend"
            @click="$router.push('/master/customer/import')"
          >
            <span class="input-group-text">
              <i class="fa fa-upload" />
            </span>

            <input
              id="file"
              ref="file"
              type="file"
              style="display:none"
              @change="onFileChange"
            >
          </a>
          <p-form-input
            id="search-text"
            ref="searchText"
            name="search-text"
            placeholder="Search"
            :value="searchText"
            class="btn-block"
            @input="filterSearch"
          />
        </div>
        <div class="text-center font-size-sm mb-10">
          <a
            href="javascript:void(0)"
            @click="isAdvanceFilter = !isAdvanceFilter"
          >
            {{ $t('advance filter') | uppercase }} <i class="fa fa-caret-down" />
          </a>
        </div>
        <div
          v-show="isAdvanceFilter"
          class="card"
          :class="{ 'fadeIn': isAdvanceFilter }"
        >
          <div class="row">
            <div class="col-sm-3 text-center">
              <p-form-row
                id="status"
                name="status"
                :label="$t('status')"
                :is-horizontal="false"
              >
                <div slot="body">
                  <span
                    class="select-link"
                    @click="$refs.status.open({ id: statusId, label: statusLabel })"
                  >
                    {{ statusLabel || $t('select') | uppercase }}
                  </span>
                </div>
              </p-form-row>
            </div>
            <div class="col-sm-3 text-center">
              <p-form-row
                id="pricing-group"
                name="pricing-group"
                :label="$t('pricing group')"
                :is-horizontal="false"
              >
                <div slot="body">
                  <span
                    class="select-link"
                    @click="$refs.pricingGroup.open()"
                  >
                    {{ pricingGroupLabel || $t('select') | uppercase }}
                  </span>
                </div>
              </p-form-row>
            </div>
            <div class="col-sm-3 text-center">
              <p-form-row
                id="group"
                name="group"
                :label="$t('group')"
                :is-horizontal="false"
              >
                <div slot="body">
                  <span
                    class="select-link"
                    @click="$refs.customerGroup.open()"
                  >
                    {{ groupLabel || $t('select') | uppercase }}
                  </span>
                </div>
              </p-form-row>
            </div>
          </div>
        </div>
        <hr>
        <div>
          <label class="css-control css-control-primary css-checkbox mr-10">
            <input
              type="checkbox"
              class="css-control-input"
              :checked="isRowsChecked(customers, checkedRow)"
              @click="toggleCheckRows()"
            >
            <span class="css-control-indicator" />
          </label>
          <span
            v-show="checkedRow.length > 0"
            class="mr-15 animated fadeIn"
          >
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary mr-5"
              @click="bulkArchiveCustomer()"
            >
              {{ $t('archive') | uppercase }}
            </button>
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary mr-5"
              @click="bulkActivateCustomer()"
            >
              {{ $t('activate') | uppercase }}
            </button>
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary"
              @click="bulkDeleteCustomer()"
            >
              {{ $t('delete') | uppercase }}
            </button>
          </span>
        </div>
        <hr>
        <p-block-inner :is-loading="isLoading">
          <point-table>
            <tr slot="p-head">
              <th width="50px">
                #
              </th>
              <th width="50px" />
              <th>
                <a
                  href="javascript:void(0)"
                  @click="sortCustomer('code')"
                >
                  Code
                  <i
                    style="margin-left : 4px"
                    :class="{
                      'fa fa-sort-asc' : flagAscending.isCodeAscending,
                      'fa fa-sort-desc' : !flagAscending.isCodeAscending,
                    }"
                  />
                </a>
              </th>
              <th>
                <a
                  href="javascript:void(0)"
                  @click="sortCustomer('name')"
                >
                  Name
                  <i
                    style="margin-left : 4px"
                    :class="{
                      'fa fa-sort-asc' : flagAscending.isNameAscending,
                      'fa fa-sort-desc' : !flagAscending.isNameAscending,
                    }"
                  />
                </a>
              </th>
              <th>
                <a
                  href="javascript:void(0)"
                  @click="sortCustomer('email')"
                >
                  Email
                  <i
                    style="margin-left : 4px"
                    :class="{
                      'fa fa-sort-asc' : flagAscending.isEmailAscending,
                      'fa fa-sort-desc' : !flagAscending.isEmailAscending,
                    }"
                  />
                </a>
              </th>
              <th>
                <a
                  href="javascript:void(0)"
                  @click="sortCustomer('address')"
                >
                  Address
                  <i
                    style="margin-left : 4px"
                    :class="{
                      'fa fa-sort-asc' : flagAscending.isAddressAscending,
                      'fa fa-sort-desc' : !flagAscending.isAddressAscending,
                    }"
                  />
                </a>
              </th>
              <th>
                <a
                  href="javascript:void(0)"
                  @click="sortCustomer('phone')"
                >
                  Phone
                  <i
                    style="margin-left : 4px"
                    :class="{
                      'fa fa-sort-asc' : flagAscending.isPhoneAscending,
                      'fa fa-sort-desc' : !flagAscending.isPhoneAscending,
                    }"
                  />
                </a>
              </th>
              <th>
                <a
                  href="javascript:void(0)"
                  @click="sortCustomer('branch')"
                >
                  Branch
                  <i
                    style="margin-left : 4px"
                    :class="{
                      'fa fa-sort-asc' : flagAscending.isBranchAscending,
                      'fa fa-sort-desc' : !flagAscending.isBranchAscending,
                    }"
                  />
                </a>
              </th>
              <th>
                <a
                  href="javascript:void(0)"
                  @click="sortCustomer('groups')"
                >
                  Group
                  <i
                    style="margin-left : 4px"
                    :class="{
                      'fa fa-sort-asc' : flagAscending.isGroupAscending,
                      'fa fa-sort-desc' : !flagAscending.isGroupAscending,
                    }"
                  />
                </a>
              </th>
              <th>
                <a
                  href="javascript:void(0)"
                  @click="sortCustomer('pricing_group')"
                >
                  Pricing Group
                  <i
                    style="margin-left : 4px"
                    :class="{
                      'fa fa-sort-asc' : flagAscending.isPricingGroupAscending,
                      'fa fa-sort-desc' : !flagAscending.isPricingGroupAscending,
                    }"
                  />
                </a>
              </th>
            </tr>
            <tr
              v-for="(customer, customerIndex) in customers"
              :key="customerIndex"
              slot="p-body"
              :class="{
                'bg-gray': customer.archived_at != null,
                'bg-primary-lighter': isRowChecked(customer.id)
              }"
            >
              <th
                :class="{
                  'bg-gray': customer.archived_at != null,
                  'bg-primary-lighter': isRowChecked(customer.id)
                }"
              >
                {{ customerIndex + 1 }}
              </th>
              <td>
                <p-form-check-box
                  id="subscibe"
                  :is-form="false"
                  name="subscibe"
                  :checked="isRowChecked(customer.id)"
                  class="text-center"
                  @click.native="toggleCheckRow(customer.id)"
                />
              </td>
              <td>
                <router-link :to="{ name: 'customer.show', params: { id: customer.id }}">
                  {{ customer.code }}
                </router-link>
              </td>
              <td>
                <router-link :to="{ name: 'customer.show', params: { id: customer.id }}">
                  {{ customer.name }}
                </router-link>
              </td>
              <td>{{ customer.email }}</td>
              <td>{{ customer.address }}</td>
              <td>{{ customer.phone }}</td>
              <td>
                <span v-if="customer.branch">
                  <!-- <span
                    class="select-link"
                    @click="$refs.branch.open()"
                  >
                    {{ customer.branch_name || $t('select')  }}
                  </span> -->
                  {{ customer.branch.name || $t('select') | uppercase }}
                </span>
              </td>
              <td>
                <template v-for="(group, index) in customer.groups">
                  {{ group.name }}<template v-if="customer.groups.length != index + 1">
                    ,
                  </template>
                </template>
              </td>
              <td>
                <span v-if="customer.pricing_group">{{ customer.pricing_group.label }}</span>
              </td>
            </tr>
          </point-table>
        </p-block-inner>
        <p-pagination
          :current-page="page"
          :last-page="lastPage"
          @updatePage="updatePage"
        />
      </p-block>
    </div>
    <m-add-customer
      ref="addCustomer"
      @added="onAdded"
    />
    <m-status
      ref="status"
      @choosen="onChoosenStatus"
    />
    <m-branch
      ref="branch"
      @choosen="onChoosenBranch"
    />
    <m-pricing-group
      ref="pricingGroup"
      @choosen="onChoosenPricingGroup"
    />
    <m-customer-group
      ref="customerGroup"
      @choosen="onChoosenGroup"
    />
  </div>
</template>

<script>
import TabMenu from './TabMenu'
import Breadcrumb from '@/views/Breadcrumb'
import BreadcrumbMaster from '@/views/master/Breadcrumb'
import PointTable from 'point-table-vue'
import debounce from 'lodash/debounce'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import axios from '@/axios'
export default {
  components: {
    TabMenu,
    Breadcrumb,
    BreadcrumbMaster,
    PointTable
  },
  data () {
    return {
      isLoading: true,
      searchText: this.$route.query.search,
      page: this.$route.query.page * 1 || 1,
      limit: 10,
      lastPage: 1,
      isAdvanceFilter: false,
      checkedRow: [],
      groupId: this.$route.query.groupId,
      pricingGroupId: this.$route.query.pricingGroupId,
      statusId: this.$route.query.statusId,
      statusLabel: null,
      pricingGroupLabel: null,
      groupLabel: null,
      flagAscending: {
        isCodeAscending: true,
        isNameAscending: true,
        isEmailAscending: true,
        isAddressAscending: true,
        isPhoneAscending: true,
        isBranchAscending: true,
        isGroupAscending: true,
        isPricingGroupAscending: true
      }
    }
  },
  computed: {
    ...mapGetters('masterCustomer', ['customers', 'pagination'])
  },
  created () {
    this.getCustomerRequest()
    this.$nextTick(() => {
      this.$refs.searchText.setFocus()
    })
  },
  updated () {
    this.lastPage = this.pagination.last_page
  },
  methods: {
    ...mapActions('masterCustomer', ['get', 'bulkArchive', 'bulkActivate', 'bulkDelete']),
    ...mapMutations('masterCustomer', ['SORT_CUSTOMERS']),
    onChoosenBranch (branch) {

    },
    addFiles () {
      this.$refs.file.click()
    },
    onFileChange (e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        console.log('no files')
      }

      const data = new FormData()
      data.append('file', files[0])
      var self = this
      self.isLoading = true
      axios.post('/master/customers/import', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response, data) {
        self.isLoading = false
        self.getCustomerRequest()
        console.log('Responded')
      }).catch(function (error) {
        self.isLoading = false
        console.log(error)
      })
    },
    toggleCheckRow (id) {
      if (!this.isRowChecked(id)) {
        this.checkedRow.push({ id })
      } else {
        this.checkedRow.splice(this.checkedRow.map((o) => o.id).indexOf(id), 1)
      }
    },
    toggleCheckRows () {
      if (!this.isRowsChecked(this.customers, this.checkedRow)) {
        this.customers.forEach(element => {
          if (!this.isRowChecked(element.id)) {
            const id = element.id
            this.checkedRow.push({ id })
          }
        })
      } else {
        this.customers.forEach(element => {
          this.checkedRow.splice(this.checkedRow.map((o) => o.id).indexOf(element.id), 1)
        })
      }
    },
    isRowChecked (id) {
      return this.checkedRow.some(element => {
        return element.id == id
      })
    },
    isRowsChecked (haystack, needles) {
      if (needles.length == 0) {
        return false
      }
      for (let i = 0; i < haystack.length; i++) {
        const found = needles.some(element => {
          return element.id == haystack[i].id
        })
        if (!found) {
          return false
        }
      }
      return true
    },
    bulkArchiveCustomer () {
      this.$alert.confirm(this.$t('archive'), this.$t('confirmation archive message')).then(response => {
        this.bulkArchive({
          customers: this.checkedRow
        }).then(response => {
          this.checkedRow = []
          this.getCustomerRequest()
        })
      })
    },
    bulkActivateCustomer () {
      this.$alert.confirm(this.$t('activate'), this.$t('confirmation activate message')).then(response => {
        this.bulkActivate({
          customers: this.checkedRow
        }).then(response => {
          this.checkedRow = []
          this.getCustomerRequest()
        })
      })
    },
    bulkDeleteCustomer () {
      this.$alert.confirm(this.$t('delete'), this.$t('confirmation delete message')).then(response => {
        this.bulkDelete({
          customers: this.checkedRow
        }).then(response => {
          this.checkedRow = []
          this.getCustomerRequest()
        })
      })
    },
    onChoosenGroup (option) {
      this.groupId = option.id
      this.groupLabel = option.label
      this.$router.push({
        query: {
          search: this.searchText,
          statusId: this.statusId,
          groupId: this.groupId,
          pricingGroupId: this.pricingGroupId
        }
      })
      this.getCustomerRequest()
    },
    onChoosenPricingGroup (option) {
      this.pricingGroupId = option.id
      this.pricingGroupLabel = option.label
      this.$router.push({
        query: {
          search: this.searchText,
          statusId: this.statusId,
          groupId: this.groupId,
          pricingGroupId: this.pricingGroupId
        }
      })
      this.getCustomerRequest()
    },
    onChoosenStatus (option) {
      this.statusId = option.id
      this.statusLabel = option.label
      this.$router.push({
        query: {
          search: this.searchText,
          statusId: this.statusId,
          groupId: this.groupId,
          pricingGroupId: this.pricingGroupId
        }
      })
      this.getCustomerRequest()
    },
    updatePage (value) {
      this.page = value
      this.getCustomerRequest()
    },
    getCustomerRequest () {
      this.isLoading = true
      this.get({
        params: {
          fields: 'customer.*',
          join: 'address,phone,email',
          sort_by: 'customer.name',
          filter_like: {
            'customer.code': this.searchText,
            'customer.name': this.searchText,
            'customer.address': this.searchText,
            'customer.email': this.searchText,
            'customer.phone': this.searchText
          },
          filter_equal: {
            pricing_group_id: this.pricingGroupId,
            'customer_group.id': this.groupId
          },
          is_archived: this.statusId,
          includes: 'groups;pricingGroup;branch',
          limit: this.limit,
          page: this.page
        }
      }).then(response => {
        this.isLoading = false
      }).catch(error => {
        this.isLoading = false
      })
    },
    filterSearch: debounce(function (value) {
      this.$router.push({
        query: {
          search: value,
          statusId: this.statusId,
          groupId: this.groupId,
          pricingGroupId: this.pricingGroupId
        }
      })
      this.searchText = value
      this.page = 1
      this.getCustomerRequest()
    }, 300),
    onAdded () {
      this.getCustomerRequest()
    },
    // Helper sort
    compare (a, b, sortKey, ascending, deepKey = '', isKeyArray) {
      if (isKeyArray) {
        if (ascending) {
          for (let i = 0; i < a[sortKey].length; i++) {
            if (a[sortKey][0][deepKey] < b[sortKey][0][deepKey]) {
              return -1
            }
            if (a[sortKey][0][deepKey] > b[sortKey][0][deepKey]) {
              return 1
            }
          }
          return 0
        }
        for (let i = 0; i < a[sortKey].length; i++) {
          if (a[sortKey][0][deepKey] > b[sortKey][0][deepKey]) {
            return -1
          }
          if (a[sortKey][0][deepKey] < b[sortKey][0][deepKey]) {
            return 1
          }
        }

        return 0
      }
      if (typeof a[sortKey] === 'object') {
        if (ascending) {
          if (a[sortKey][deepKey] < b[sortKey][deepKey]) {
            return -1
          }
          if (a[sortKey][deepKey] > b[sortKey][deepKey]) {
            return 1
          }
          return 0
        }
        if (a[sortKey][deepKey] > b[sortKey][deepKey]) {
          return -1
        }
        if (a[sortKey][deepKey] < b[sortKey][deepKey]) {
          return 1
        }

        return 0
      }
      if (ascending) {
        if (a[sortKey] < b[sortKey]) {
          return -1
        }
        if (a[sortKey] > b[sortKey]) {
          return 1
        }
        return 0
      }
      if (a[sortKey] > b[sortKey]) {
        return -1
      }
      if (a[sortKey] < b[sortKey]) {
        return 1
      }

      return 0
    },
    setDefaultState () {
      this.flagAscending.isNameAscending = true
      this.flagAscending.isEmailAscending = true
      this.flagAscending.isAddressAscending = true
      this.flagAscending.isPhoneAscending = true
      this.flagAscending.isBranchAscending = true
      this.flagAscending.isGroupAscending = true
      this.flagAscending.isPricingGroupAscending = true
      this.flagAscending.isCodeAscending = true
    },
    sortCustomer (key) {
      this.setDefaultState()
      let tempSortedData = []
      if (key === 'code') {
        this.flagAscending.isCodeAscending = !this.flagAscending.isCodeAscending
        tempSortedData = this.customers.sort((a, b) => this.compare(a, b, key, this.flagAscending.isCodeAscending))
      } else if (key === 'name') {
        this.flagAscending.isNameAscending = !this.flagAscending.isNameAscending
        tempSortedData = this.customers.sort((a, b) => this.compare(a, b, key, this.flagAscending.isNameAscending))
      } else if (key === 'email') {
        this.flagAscending.isEmailAscending = !this.flagAscending.isEmailAscending
        tempSortedData = this.customers.sort((a, b) => this.compare(a, b, key, this.flagAscending.isEmailAscending))
      } else if (key === 'address') {
        this.flagAscending.isAddressAscending = !this.flagAscending.isAddressAscending
        tempSortedData = this.customers.sort((a, b) => this.compare(a, b, key, this.flagAscending.isAddressAscending))
      } else if (key === 'phone') {
        this.flagAscending.isPhoneAscending = !this.flagAscending.isPhoneAscending
        tempSortedData = this.customers.sort((a, b) => this.compare(a, b, key, this.flagAscending.isPhoneAscending))
      } else if (key === 'branch') {
        this.flagAscending.isBranchAscending = !this.flagAscending.isBranchAscending
        tempSortedData = this.customers.sort((a, b) => this.compare(a, b, key, this.flagAscending.isBranchAscending, 'name'))
      } else if (key === 'groups') {
        this.flagAscending.isGroupAscending = !this.flagAscending.isGroupAscending
        tempSortedData = this.customers.sort((a, b) => this.compare(a, b, key, this.flagAscending.isGroupAscending, 'name', true))
      } else {
        this.flagAscending.isPricingGroupAscending = !this.flagAscending.isPricingGroupAscending
        tempSortedData = this.customers.sort((a, b) => this.compare(a, b, key, this.flagAscending.isPricingGroupAscending, 'label'))
      }

      this.SORT_CUSTOMERS(tempSortedData)
    }
  }
}
</script>

<style scooped>
  a {
    color: inherit;
  }
</style>
