<template>
<div id="app" class="m-grid m-grid--hor m-grid--root m-page">
  <header class="m-grid__item m-header" data-minimize-offset="200" data-minimize-mobile-offset="200">
    <div class="m-container m-container--fluid m-container--full-height">
      <div class="m-stack m-stack--ver m-stack--desktop">
        <div class="m-stack__item m-brand m-brand--skin-dark ">
          <div class="m-stack m-stack--ver m-stack--general">
            <div class="m-stack__item m-stack__item--middle m-brand__logo">
              <a href="index.html" class="m-brand__logo-wrapper">
									<img alt="" src="static/logo_default_dark.png"/>
								</a>
            </div>
            <div class="m-stack__item m-stack__item--middle m-brand__tools">
              <!-- BEGIN: Left Aside Minimize Toggle -->
              <a href="javascript:;" id="m_aside_left_minimize_toggle" class="m-brand__icon m-brand__toggler m-brand__toggler--left m--visible-desktop-inline-block">
									<span></span>
								</a>
              <!-- END -->
              <!-- BEGIN: Responsive Aside Left Menu Toggler -->
              <a href="javascript:;" id="m_aside_left_offcanvas_toggle" class="m-brand__icon m-brand__toggler m-brand__toggler--left m--visible-tablet-and-mobile-inline-block">
									<span></span>
								</a>
              <!-- END -->
              <!-- BEGIN: Responsive Header Menu Toggler -->
              <a id="m_aside_header_menu_mobile_toggle" href="javascript:;" class="m-brand__icon m-brand__toggler m--visible-tablet-and-mobile-inline-block">
									<span></span>
								</a>
              <!-- END -->
              <!-- BEGIN: Topbar Toggler -->
              <a id="m_aside_header_topbar_mobile_toggle" href="javascript:;" class="m-brand__icon m--visible-tablet-and-mobile-inline-block">
									<i class="flaticon-more"></i>
								</a>
              <!-- BEGIN: Topbar Toggler -->
            </div>
          </div>
        </div>
        <div class="m-stack__item m-stack__item--fluid m-header-head" id="m_header_nav">
          <button class="m-aside-header-menu-mobile-close  m-aside-header-menu-mobile-close--skin-dark" id="m_aside_header_menu_mobile_close_btn">
						<i class="la la-close"></i>
					</button>

          <div id="m_header_menu" class="m-header-menu m-aside-header-menu-mobile m-aside-header-menu-mobile--offcanvas  m-header-menu--skin-light m-header-menu--submenu-skin-light m-aside-header-menu-mobile--skin-dark m-aside-header-menu-mobile--submenu-skin-dark ">
            <header-menu/>
          </div>
          <div id="m_header_topbar" class="m-topbar  m-stack m-stack--ver m-stack--general">
            <header-topbar/>
          </div>
        </div>
      </div>
    </div>
  </header>

  <div class="m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body">

    <button class="m-aside-left-close  m-aside-left-close--skin-dark" id="m_aside_left_close_btn">
				<i class="la la-close"></i>
		</button>

    <div id="m_aside_left" class="m-grid__item m-aside-left m-aside-left--skin-dark">
      <div id="m_ver_menu" class="m-aside-menu m-aside-menu--skin-dark m-aside-menu--submenu-skin-dark" data-menu-vertical="true" data-menu-scrollable="false" data-menu-dropdown-timeout="500">
        <vertical-menu/>
      </div>
    </div>

    <div class="m-grid__item m-grid__item--fluid m-wrapper">
      <div class="m-subheader ">
      </div>
      <div class="m-content">
        <router-view/>
      </div>
    </div>
  </div>

  <footer class="m-grid__item	m-footer">
    <div class="m-container m-container--fluid m-container--full-height m-page__container">
      <div class="m-stack m-stack--flex-tablet-and-mobile m-stack--ver m-stack--desktop">
        <div class="m-stack__item m-stack__item--left m-stack__item--middle m-stack__item--last">
          <span class="m-footer__copyright">
              2017 © Metronic theme by <a href="#" class="m-link">Keenthemes</a>
            </span>
        </div>
        <div class="m-stack__item m-stack__item--right m-stack__item--middle m-stack__item--first">
          <ul class="m-footer__nav m-nav m-nav--inline m--pull-right">
            <li class="m-nav__item">
              <a href="#" class="m-nav__link">
                  <span class="m-nav__link-text">About</span>
                </a>
            </li>
            <li class="m-nav__item">
              <a href="#" class="m-nav__link">
                  <span class="m-nav__link-text">Privacy</span>
                </a>
            </li>
            <li class="m-nav__item">
              <a href="#" class="m-nav__link">
                  <span class="m-nav__link-text">T&amp;C</span>
                </a>
            </li>
            <li class="m-nav__item">
              <a href="#" class="m-nav__link">
                  <span class="m-nav__link-text">Purchase</span>
                </a>
            </li>
            <li class="m-nav__item m-nav__item">
              <a href="#" class="m-nav__link" data-toggle="m-tooltip" title="" data-placement="left" data-original-title="Support Center">
                  <i class="m-nav__link-icon flaticon-info m--icon-font-size-lg3"></i>
                </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>

  <quick-sidebar/>

  <div class="m-scroll-top m-scroll-top--skin-top" data-toggle="m-scroll-top" data-scroll-offset="500" data-scroll-speed="300">
    <i class="la la-arrow-up"></i>
  </div>
</div>
</template>

<script>
import HeaderMenu from '@/components/topnav/HeaderMenu.vue'
import HeaderTopbar from '@/components/topnav/HeaderTopbar.vue'
import VerticalMenu from '@/components/sidenav/VerticalMenu.vue'
import QuickSidebar from '@/components/QuickSidebar.vue'

export default {
  name: 'app',
  components: {
    HeaderMenu,
    HeaderTopbar,
    VerticalMenu,
    QuickSidebar
  },
  mounted: () => {
    let script = document.createElement('script')
    script.setAttribute('src', 'static/scripts.bundle.js')
    document.head.appendChild(script)
  }
}
</script>

<style>

</style>
