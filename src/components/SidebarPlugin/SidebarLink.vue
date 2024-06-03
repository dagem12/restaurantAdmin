<template>
  <li :class="{'md-list-item': true, 'collapsed': !isExpanded}">
    <router-link
      class="md-list-item-router md-list-item-container md-button-clean"
      @click="hideSidebar"
      v-bind="$attrs"
    >
      <div class="md-list-item-content md-ripple">
        <slot>
          <md-icon>{{ link.icon }}</md-icon>
          <p>{{ link.name }}</p>
        </slot>
      </div>
    </router-link>
  </li>
</template>
<script>
export default {
  inject: {
    autoClose: {
      default: true,
    },
  },
  props: {
    link: {
      type: [String, Object],
      default: () => {
        return {
          name: "",
          path: "",
          icon: "",
        };
      },
    },
    tag: {
      type: String,
      default: "router-link",
    }
  },
  data() {
    return {
      isExpanded:true
    }
  },
  watch: {
    '$sidebar.isExpanded': function(newVal) {
      this.isExpanded = newVal;
    }
  },
  methods: {
    hideSidebar() {
      if (
        this.autoClose &&
        this.$sidebar &&
        this.$sidebar.showSidebar === true
      ) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
};
</script>
<style>
.md-list-item.collapsed{
  /* Styles when isExpanded is true */
  width:90px;
  padding: 5px;
}</style>
