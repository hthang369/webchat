<template>
  <div>
    <transition name="slide">
      <side-panel
        v-if="sidePanel"
        :side-panel="sidePanel"
        @sidePanelClosed="sidePanel = false"/>
    </transition>
    <nav
      id="nav"
      ref="navbar"
      :class="staticLayout ? 'navbar-static-top' : 'navbar-fixed-top'"
      class="navbar navbar-inverse  navigation-bar"
      role="navigation">
      <div class="navbar-header">
        <div class="col-md-12 profile-section">
            <div class="avatar ">
              <!-- deleted for task #44824 -->
              <!-- <img
                :src="employee.avatar ? employee.avatar : '/static/imgs/Hito_Logo.jpg'"
                class="img-circle "
                height="45px"
                width="45px"
                alt="Avatar"> -->
              <a href="/">
                <img
                  :src="'/static/imgs/Hito_Logo.jpg'"
                  class="img-circle "
                  height="45px"
                  width="45px"
                  alt="Avatar">
              </a>
            </div>
            <!-- deleted for task #44824 -->
            <!-- <div class="name">{{ employee.lastname + ' ' + employee.firstname }}</div> -->
             <div class="name"><a href="/">Hito</a></div>
             <!-- deleted for task #44824 -->
            <!-- <div class="name text-weight-bold">{{ departmentName }}</div> -->
          <div class="sidebar-menu">
            <!-- deleted for task #44824 -->
            <!-- <div class="col-md-6 col-sm-6 sidebar-menu-item">
              <a
                id="showSidePanel"
                href="#"
                @click.prevent="sidePanel = true"><i
                  class="fa fa-toggle-off"
                  aria-hidden="true"/></a></div> -->
            <div class="col-md-12 col-sm-12 sidebar-menu-item collapse-sidebar-control">
              <a
                href="#"
                @click.prevent="collapseSidebar"><i
                  class="fa fa-chevron-left"
                  aria-hidden="true"/></a></div>
          </div>
        </div>
      </div>
      <!--<div class="logo pull-left">
        <img src="/static/imgs/logo.png" alt="Logo" height="70px" width="auto">
      </div>
      <div class="search pull-left">
        <form action="#">
          <input type="text" placeholder="Search...">
        </form>
      </div>-->
      <div class="navbar-right top-nav">
        <ul class="nav">
          <li>
            <a href="">
              <i class="fa fa-bell icon-animated-bell"></i>
              <span class="badge"></span>
            </a>
          </li>
          <li>
            <a href="">
              <i class="fa fa-envelope"></i>
              <span class="badge"></span>
            </a>
          </li>
          <li>
            <language-picker/>
          </li>
          <!--<li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" @click="fullPageMenu = false">
              <i class="fa fa-cog" aria-hidden="true"></i>
            </a>
            <ul class="dropdown-menu color-dropdown preventClosing">
              <li class="col-md-6 col-sm-6 col-xs-6 setting-name">STATIC LAYOUT</li>
              <li class="col-md-6 col-sm-6 col-xs-6">
                <div class="switcher-theme">
                  <input type="checkbox" id="staticLayoutSwitcher" v-model="staticLayout"/>
                  <label for="staticLayoutSwitcher"></label>
                </div>
              </li>
            </ul>
          </li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <div class="badge dd-badge" v-text="messages.length"></div>
              <i class="fa fa-envelope"></i>
            </a>
            <ul class="dropdown-menu message-dropdown preventClosing">
              <message v-for="message in messages"
                       :name="message.name"
                       :time="message.time"
                       :image="message.image"
                       :body="message.body"
                       :key="message.id"
              ></message>
              <li class="message-footer">
                <div class="col-md-6 col-sm-6 col-xs-6 msg-footer-a"><a href="#">Mark All Read</a></div>
                <div class="col-md-6 col-sm-6 col-xs-6 msg-footer-a"><a href="#">Read All </a></div>
              </li>
            </ul>
          </li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <div class="badge dd-badge" v-text="notifications.length"></div>
              <i class="fa fa-bell"></i>
            </a>
            <ul class="dropdown-menu alert-dropdown preventClosing">
              <notification
                v-for="notification in notifications"
                :image="notification.image"
                :type="notification.type"
                :title="notification.title"
                :date="notification.date"
                :body="notification.body"
                :key="notification.id"
              ></notification>
              <li class="notification-footer">
                <a class="not-footer-a" href="#">View All</a>
              </li>
            </ul>
          </li>-->
          <li>
            <a
                    href="#"
                    class="profile-mobile">
              <i
                      class="fa fa-user"
                      aria-hidden="true"/>
            </a>
          </li>
          <li class="pull-right">
            <a
                    href="#"
                    class="navbar-toggle"
                    @click.prevent="fullPageMenu = !fullPageMenu">
              <i
                      class="fa fa-bars"
                      aria-hidden="true"/>
            </a>
          </li>
        </ul>
        <div class="nav-profile">
          <div class="pull-left text-white">
            <p>Hello, {{ employee.lastname + ' ' + employee.firstname }}</p>
            <p>{{ departmentName }}</p>
          </div>
          <div class="pull-right dropdown">
            <img
                  :src="employee.avatar ? employee.avatar : '/static/imgs/avatars/no-avatar.jpeg'"
                  class="img-circle "
                  height="45px"
                  width="45px"
                  alt="Avatar">
            <a
                    href="#"
                    class="dropdown-toggle theme-icon"
                    data-toggle="dropdown">
              <i class="fa fa-angle-down"/>
            </a>
            <div class="dropdown-menu list-group">
              <div v-if="$can('view', 'profile')" class="list-group-item">
                <router-link :to="{name: 'profile'}" exact>
                  <i class="fa fa-user"></i> <span>{{language.infoProfile}}</span>
                </router-link>
              </div>
              <div class="list-group-item">
                  <a href="javascript:;" @click="changePassword"><i class="fa fa-lock"></i> {{language.changePassword}}</a>
              </div>
              <div class="list-group-item">
                <a href=""><i class="fa fa-cog"></i> {{language.setting}}</a>
              </div>
              <div class="list-group-item color-dropdown">
                <div class="row">
                  <div class="col-md-3 col-sm-3 col-xs-3"><i
                          class="fa fa-circle-o orange-theme-ico"
                          @click="changeTheme('orange-theme', 'fa7252')"/></div>
                  <div class="col-md-3 col-sm-3 col-xs-3"><i
                          class="fa fa-circle-o red-theme-ico"
                          @click="changeTheme('red-theme', 'dc5e5a')"/></div>
                  <div class="col-md-3 col-sm-3 col-xs-3"><i
                          class="fa fa-circle-o purple-theme-ico"
                          @click="changeTheme('purple-theme', '976ad6')"/></div>
                  <div class="col-md-3 col-sm-3 col-xs-3"><i
                          class="fa fa-circle-o pink-theme-ico"
                          @click="changeTheme('pink-theme', 'ff00ff')"/></div>
                  <div class="col-md-3 col-sm-3 col-xs-3"><i
                          class="fa fa-circle-o default-theme-ico"
                          @click="changeTheme('default-theme', '4CAF50')"/></div>
                  <div class="col-md-3 col-sm-3 col-xs-3"><i
                          class="fa fa-circle-o teal-theme-ico"
                          @click="changeTheme('teal-theme', '3ab39b')"/></div>
                  <div class="col-md-3 col-sm-3 col-xs-3"><i
                          class="fa fa-circle-o blue-theme-ico"
                          @click="changeTheme('blue-theme', '65a4da')"/></div>
                  <div class="col-md-3 col-sm-3 col-xs-3"><i
                          class="fa fa-circle-o dark-blue-theme-ico"
                          @click="changeTheme('dark-blue-theme', '003762')"/></div>
                  <div class="col-md-3 col-sm-3 col-xs-3"><i
                          class="fa fa-circle-o pure-theme-ico"
                          @click="changeTheme('pure-theme', 'ff9900')"/></div>
                  <div class="col-md-3 col-sm-3 col-xs-3"><i
                          class="fa fa-circle-o brown-theme-ico"
                          @click="changeTheme('brown-theme', 'a27148')"/></div>
                  <div class="col-md-3 col-sm-3 col-xs-3"><i
                          class="fa fa-circle-o light-orange-theme-ico"
                          @click="changeTheme('light-orange-theme', 'ffe599')"/></div>
                  <div class="col-md-3 col-sm-3 col-xs-3"><i
                          class="fa fa-circle-o violet-theme-ico"
                          @click="changeTheme('violet-theme', 'a411ff')"/></div>
                </div>
              </div>
              <div class="list-group-item">
                <a href="javascript:;" @click="logout"><i class="fa fa-power-off"></i> {{language.logout}}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <app-menu :full="fullPageMenu"
      @menu-clicked="closeMenu"/>
    </nav>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import SidePanel from './SidePanel.vue'
import AppMenu from './Menu.vue'
import Message from './components/Message.vue'
import Notification from './components/Notification.vue'
import LanguagePicker from '../../components/Common/LanguagePicker'
import modal from '../../mixins/modal'
import ChangePass from '@/pages/ChangePass'

export default {
  mixins: [modal, ChangePass],
  props: {
    originalLayout: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    staticLayout: {
      get () {
        return this.originalLayout
      },
      set (layout) {
        this.$emit('layoutChanged', layout)
      }
    },
    departmentName () {
      return this.$store.getters['property/getDetail']('department', this.employee.department_prop)
    },
    ...mapGetters('auth', ['userInfo']),
    ...mapState('auth', ['employee'])
  },
  watch: {
    fullPageMenu (val) {
      if (val) {
        document.addEventListener('click', this.closeMenuIfClickOutside, false)
      } else {
        document.removeEventListener('click', this.closeMenuIfClickOutside, false)
      }
    }
  },
  data () {
    return {
      sidePanel: false,
      fullPageMenu: false,
      language: {
          infoProfile: this.$t('common.profile.info'),
          changePassword: this.$t('common.profile.change_pass'),
          setting: this.$t('common.profile.setting'),
          logout: this.$t('common.profile.logout')
      },
      messages: [
        {
          id: 0,
          name: 'John Smith',
          image: '/static/imgs/avatars/man-1.png',
          time: '2:32 PM',
          body: 'Lorem ipsum dolor sit amet, consectetur...'
        },
        {
          id: 1,
          name: 'Jane Smith',
          image: '/static/imgs/avatars/woman.png',
          time: 'Yesterday at 12:32 PM',
          body: 'Lorem ipsum dolor sit amet, consectetur...'
        },
        {
          id: 2,
          name: 'Frank Doe',
          image: '/static/imgs/avatars/man-3.png',
          time: 'Yesterday at 12:32 PM',
          body: 'Lorem ipsum dolor sit amet, consectetur...'
        }
      ],
      notifications: [
        {
          id: 0,
          title: 'Notification 1',
          image: 'http://placehold.it/50x50',
          type: 'info',
          date: '12:21 PM',
          body: 'Lorem ipsum dolor sit amet, consectetur...'
        },
        {
          id: 1,
          title: 'Notification 2',
          image: 'http://placehold.it/50x50',
          type: 'success',
          date: 'Yesterday at 2:21 PM',
          body: 'Lorem ipsum dolor sit amet, consectetur...'
        },
        {
          id: 2,
          title: 'Notification 3',
          image: 'http://placehold.it/50x50',
          type: 'danger',
          date: 'Yesterday at 5:21 PM',
          body: 'Lorem ipsum dolor sit amet, consectetur...'
        }
      ]
    }
  },
  mounted () {
    $('.preventClosing').click(function (e) {
      e.stopPropagation()
    })
  },
  components: {
    LanguagePicker,
    SidePanel,
    AppMenu,
    Message,
    Notification
  },
  methods: {
    changeTheme (theme, color) {
      this.$emit('themeChanged', theme)
      sessionStorage.setItem('theme-color', color)
    },
    collapseSidebar () {
      this.$emit('sidebarUpdated')
    },
    closeMenuIfClickOutside (e) {
      if (!document.getElementById('app-menu').contains(e.target)) {
        this.closeMenu()
      }
    },
    closeMenu () {
      this.fullPageMenu = false
    },
    logout () {
          this.$store.dispatch('auth/logout')
          this.$router.push('/login')
    },
    changePassword () {
      this.showPageInModal(ChangePass,{},{pivotX: 0.5, width: '40%', resizable: true, adaptive: true})
    },
  }
}
</script>

<style lang="css" scoped>
  .fadeOutLeft {
    -webkit-animation-name: slideOutLeft;
    animation-name: slideOutLeft;
    -webkit-animation-duration: 500ms;
    animation-duration: 500ms;
  }

  .fadeInLeft {
    -webkit-animation-name: slideInLeft;
    animation-name: slideInLeft;
    -webkit-animation-duration: 500ms;
    animation-duration: 500ms;
  }
  .text-white {
    color: #fff;
  }

  .sidebar-collapsed .profile-section, .profile-section {
      padding-top : 10px;
  }

  .name a {
        color: #fff;
    }
  .icon-animated-bell {
    display: inline-block;
    -moz-animation: ringing 2s 5 ease 1s;
    -webkit-animation: ringing 2s 5 ease 1s;
    -o-animation: ringing 2s 5 ease 1s;
    -ms-animation: ringing 2s 5 ease 1s;
    animation: ringing 2s 5 ease 1s;
    -moz-transform-origin: 50% 0;
    -webkit-transform-origin: 50% 0;
    -o-transform-origin: 50% 0;
    -ms-transform-origin: 50% 0;
    transform-origin: 50% 0;
  }
  @-moz-keyframes ringing {
    0% {
      -moz-transform:rotate(-15deg);
    }
    2% {
      -moz-transform:rotate(15deg);
    }
    12%,
    4% {
      -moz-transform:rotate(-18deg);
    }
    14%,
    6% {
      -moz-transform:rotate(18deg);
    }
    8% {
      -moz-transform:rotate(-22deg);
    }
    10% {
      -moz-transform:rotate(22deg);
    }
    16% {
      -moz-transform:rotate(-12deg);
    }
    18% {
      -moz-transform:rotate(12deg);
    }
    20% {
      -moz-transform:rotate(0);
    }
  }
  @-webkit-keyframes ringing {
    0% {
      -webkit-transform:rotate(-15deg);
    }
    2% {
      -webkit-transform:rotate(15deg);
    }
    12%,
    4% {
      -webkit-transform:rotate(-18deg);
    }
    14%,
    6% {
      -webkit-transform:rotate(18deg);
    }
    8% {
      -webkit-transform:rotate(-22deg);
    }
    10% {
      -webkit-transform:rotate(22deg);
    }
    16% {
      -webkit-transform:rotate(-12deg);
    }
    18% {
      -webkit-transform:rotate(12deg);
    }
    20% {
      -webkit-transform:rotate(0);
    }
  }
  @-ms-keyframes ringing {
    0% {
      -ms-transform:rotate(-15deg);
    }
    2% {
      -ms-transform:rotate(15deg);
    }
    12%,
    4% {
      -ms-transform:rotate(-18deg);
    }
    14%,
    6% {
      -ms-transform:rotate(18deg);
    }
    8% {
      -ms-transform:rotate(-22deg);
    }
    10% {
      -ms-transform:rotate(22deg);
    }
    16% {
      -ms-transform:rotate(-12deg);
    }
    18% {
      -ms-transform:rotate(12deg);
    }
    20% {
      -ms-transform:rotate(0);
    }
  }
  @keyframes ringing {
    0% {
      transform:rotate(-15deg);
    }
    2% {
      transform:rotate(15deg);
    }
    12%,
    4% {
      transform:rotate(-18deg);
    }
    14%,
    6% {
      transform:rotate(18deg);
    }
    8% {
      transform:rotate(-22deg);
    }
    10% {
      transform:rotate(22deg);
    }
    16% {
      transform:rotate(-12deg);
    }
    18% {
      transform:rotate(12deg);
    }
    20% {
      transform:rotate(0);
    }
  }
</style>
