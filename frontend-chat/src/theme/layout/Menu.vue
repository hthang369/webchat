<template>
  <div
    id="app-menu"
    :class="{'full-page': full}"
    class="collapse navbar-collapse menu">
    <div class="sidebar-wrapper side-nav">
      <div>
        <div
          v-if="showSearch"
          class="menu-search">
          <form action="#">
            <input
              type="text"
              placeholder="Search...">
          </form>
        </div>
      </div>
      <div class="sidebar-group">
        <!--<h5 class="center-block">PAGES</h5>-->
        <ul class="nav navbar-nav " @click="$emit('menu-clicked')">
          <li v-for="menu in menuLists"  v-if="checkHide(menu)" >
            <router-link v-if="!menu.childrens"
              :to="{name: menu.link,params: getParams(menu)}"
              exact>
              <i v-if="menu.icon" :class="getElementClass(menu)" /> <span>{{ $t(menu.text) }}</span>
            </router-link>
            <a v-if="menu.childrens" href="#" data-toggle="collapse" :data-target="getElementTarget(menu)" class="collapsed">
              <i :class="getElementClass(menu)"/> <span>{{ $t(menu.text) }}</span>
              <i class="fa fa-fw fa-angle-down pull-right dropdown-arrow"></i>
            </a>
            <ul v-if="menu.childrens" :id="getElementID(menu)" class="collapse" aria-expanded="false">
              <li v-for="children in menu.childrens" v-if="$can('view',children.sectionCode)">
                <router-link :to="{name: children.link}"
                             exact>
                  <i v-if="children.icon" :class="getElementClass(children)" /> <span>{{ $t(children.text) }}</span>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    import 'jquery-mousewheel'
    import 'malihu-custom-scrollbar-plugin'
    import {i18n} from '@/language'
    import {canFn} from '@/plugins/permissions'
    import getMenu from '@/menu'

    export default {
        props: {
            full: {
                default: false
            }
        },
        data () {
            return {
                showSearch: false,
                childrenCount: 0,
                parentStatus: true,
                // childrensStatus: [],
                parentSectionCode: 0,
                menuLists: getMenu()
            }
        },
        mounted () {
            this.checkSearch()
            window.addEventListener('resize', this.checkSearch)
            // Custom scrollbar for menu
            $('.side-nav').mCustomScrollbar({
                theme: 'minimal',
                scrollInertia: 300
            })
        },
        methods: {
            checkSearch () {
                this.showSearch = document.documentElement.clientWidth <= 767
            },
            getElementClass(menu) {
                return "fa fa-fw " + menu.icon
            },
            getElementID(menu) {
                return menu.menuID
            },
            getElementTarget(menu) {
                return '#' + this.getElementID(menu)
            },
            getParams(menu){
                return menu.params ? menu.params : {}
            },
            checkHide(menu) {
                let count = 0
                if(menu.hasOwnProperty('childrens')){
                    for(let child in menu.childrens){
                        if(canFn('view',menu.childrens[child].sectionCode) == false){
                            count += 1
                            if(count == menu.childrens.length){
                                return false
                            }
                        }
                        else{
                            return true
                        }
                    }
                }
                return this.$can('view', menu.sectionCode)
            }
        }
    }
</script>

<style lang="scss">
  @import "~malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar";
</style>
