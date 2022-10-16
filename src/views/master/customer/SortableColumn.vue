<template>
  <th
    style="cursor:pointer"
    @click="onClick(newSort)"
  >
    <slot />
    <span
      v-if="sortSplit().sortProp === column"
      class="p-1 bg-light rounded ml-1 text-secondary"
    >
      <i
        class="fa fa-chevron-down"
        :style="sortSplit().desc ? 'transform:rotate(180deg)' : null"
      />
    </span>
  </th>
</template>

<script>
export default {
  props: {
    sort: {
      type: String,
      required: false,
      default: ''
    },
    column: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      newSort: ''
    }
  },
  methods: {
    onClick (keySort) {
      if (this.sortSplit().sortProp !== this.column) {
        this.newSort = this.column
      } else if (keySort === this.sort && !this.sortSplit().desc) {
        this.newSort = `${this.sort}:desc`
      } else {
        this.newSort = null
      }

      this.$emit('click', this.newSort)
    },
    sortSplit () {
      const [sortProp, desc] = this.sort !== null ? this.sort.split(':') : []
      return {
        sortProp,
        desc
      }
    }
  }
}
</script>
