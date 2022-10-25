
<template>
  <th
    :class="sortClass"
    :aria-sort="ariaSortLabel"
    @click="sortList(name)"
  >
    <template>
      <svg
        width="16"
        height="16"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
      >
        <path
          fill="currentColor"
          d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"
        /></svg>
      <slot />
    </template>
  </th>
</template>

<script>
export default {
  name: 'Sorting',
  // eslint-disable-next-line vue/require-prop-types
  props: ['name', 'data'],
  data () {
    return {
      sortedbyASC: true,
      order: 0,
      ariaLabels: ['descending', 'none', 'ascending'],
      orderClasses: ['vt-desc', 'vt-sortable', 'vt-asc']
    }
  },
  computed: {
    sortClass () {
      return !this.sortedbyASC ? [this.orderClasses[this.order + 1], 'vt-sort'] : ['vt-sort']
    },
    ariaSortLabel () {
      return this.ariaLabels[this.order + 1]
    }
  },
  methods: {
    sortList (sortBy) {
      if (this.sortedbyASC) {
        this.data.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1))
        this.sortedbyASC = false
        this.order = -1
      } else {
        this.data.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1))
        this.sortedbyASC = true
        this.order = 1
      }
      this.$nextTick(() => {
        this.$emit('defaultSort')
      })
    }
  }
}
</script>

<style scoped>
  .vt-sort {
    cursor: pointer;
  }

  /* .vt-sort:before{
    font-family: FontAwesome;
    padding-right: 0.5em;
    width: 1.28571429em;
    display: inline-block;
    text-align: center;
  }

  .vt-sortable:before{
      content: "\f0dc";
  }

  .vt-asc:before{
      content: "\f160";
  }

  .vt-desc:before{
      content: "\f161";
  } */
</style>
