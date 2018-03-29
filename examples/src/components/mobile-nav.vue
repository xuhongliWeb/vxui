<template>
  <div class="mobile-nav-group">
    <div
      class="mobile-nav-group__title mobile-nav-group__basetitle"
      :class="{
        'mobile-nav-group__title--open': isOpen
      }"
      @click="isOpen = !isOpen">
      {{group.groupName}}
    </div>
    <div class="mobile-nav-group__list-wrapper" :class="{ 'mobile-nav-group__list-wrapper--open': isOpen }">
      <ul class="mobile-nav-group__list" :class="{ 'mobile-nav-group__list--open': isOpen }">
        <template v-for="navItem in group.list">
          <li
            class="mobile-nav-group__title"
            v-if="!navItem.disabled">
            <router-link
              active-class="active"
              :to="base + navItem.path">
              <p>
                {{ navItem.title }}
              </p>
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    group: {
      type: Object,
      default: () => {
        return []
      }
    },
    base: String
  },

  data() {
    return {
      isOpen: false
    }
  }
}
</script>
<style lang="scss">
.mobile-nav-group {
  border-radius: 2px;
  margin-bottom: 15px;
  background-color: #fff;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);

  .mobile-nav-group__basetitle {
    padding-left: 20px;
    transition: height 2s;
  }

  .mobile-nav-group__title {
    font-size: 16px;
    color: #333;
    line-height: 56px;
    position: relative;
    user-select: none;

    a {
      color: #333;
      display: block;
      user-select: none;
      padding-left: 20px;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

      &:active {
        background: #ececec;
      }

      > p {
        border-top: 1px solid #e5e5e5;
      }
    }
  }

  .mobile-nav-group__list-wrapper {
    height: 0;
    overflow: hidden;
    transition: height .5s ease-out;
  }
  .mobile-nav-group__list-wrapper--open {
    height: auto;
  }
  .mobile-nav-group__list {
    transform: translateY(-50%);
    transition: transform 0.2s ease-out;
  }
  .mobile-nav-group__list--open {
    transform: translateY(0);
  }
  li {
    list-style: none;
  }

  ul {
    padding: 0;
    margin: 0;
    overflow: hidden;
  }
}
.mobile-nav-group__title--open {
  color: #38f;
}
</style>

