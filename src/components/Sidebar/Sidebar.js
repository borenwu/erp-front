import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Badge, Nav, NavItem, NavLink as RsNavLink} from 'reactstrap';
import classNames from 'classnames';
import SidebarFooter from './../SidebarFooter';
import SidebarForm from './../SidebarForm';
import SidebarHeader from './../SidebarHeader';
import SidebarMinimizer from './../SidebarMinimizer';

class Sidebar extends Component {

  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }

  activeRoute(routeName, props) {
    // return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
    return props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';

  }

  // todo Sidebar nav secondLevel
  // secondLevelActive(routeName) {
  //   return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
  // }


  render() {

    const props = this.props;
    const activeRoute = this.activeRoute;
    const handleClick = this.handleClick;

    const items = [
          {
              name: '主 页',
              url: '/dashboard',
              icon: 'icon-speedometer',
              // badge: {
              //   variant: 'info',
              //   text: 'NEW'
              // }
          },
          {
              title: true,
              name: '工 作',
              wrapper: {            // optional wrapper object
                  element: '',        // required valid HTML5 element tag
                  attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
              },
              class: ''             // optional class names space delimited list for title item ex: "text-center"
          },
          {
              name: '生产',
              url: '/work',
              icon: 'icon-star',
              disabled:this.props.auth.work,
              children: [
                  {
                      name: '任务',
                      url: '/work/tasks',
                      icon: 'icon-screen-desktop'
                  },
                  {
                      name: '领料退库',
                      url: '/work/itemops',
                      icon: 'icon-drawer'
                  },
              ]
          },
          {
              name: '财务',
              url: '/finance',
              icon: 'icon-chart',
              disabled:this.props.auth.finance,
              children: [
                  {
                      name:'销售日报表',
                      url:'/finance/SalesRecord',
                      icon: 'icon-notebook'
                  },
                  {
                      name:'销售统计',
                      url:'/finance/SalesStatistics',
                      icon: 'icon-screen-tablet'
                  }
              ]
          },
          {
              name: '仓储',
              url: '/warehouse',
              icon: 'icon-star',
              disabled:this.props.auth.warehouse,
              children: [
                  {
                      name: '领料退库审核',
                      url: '/warehouse/ItemCheck',
                      icon: 'icon-map',
                  },
              ]
          },

          {
              name: '仪表板',
              url: '/views',
              icon: 'icon-layers',
              disabled:this.props.auth.views,
              children: [
                  {
                      name: '客户仪表板',
                      url: '/views/AccountReceivableDash',
                      icon: 'icon-grid',
                  },
              ],
          },

          {
              name: '设置',
              url: '/setting',
              icon: 'icon-compass',
              disabled:this.props.auth.setting,
              children: [
                  {
                      name: '基础设置',
                      url: '/setting/Configs',
                      icon: 'icon-eyeglass',
                  },
              ]
          },


      ]

    // badge addon to NavItem
    const badge = (badge) => {
      if (badge) {
        const classes = classNames( badge.class );
        return (<Badge className={ classes } color={ badge.variant }>{ badge.text }</Badge>)
      }
    };

    // simple wrapper for nav-title item
    const wrapper = item => { return (item.wrapper && item.wrapper.element ? (React.createElement(item.wrapper.element, item.wrapper.attributes, item.name)): item.name ) };

    // nav list section title
    const title =  (title, key) => {
      const classes = classNames( 'nav-title', title.class);
      return (<li key={key} className={ classes }>{wrapper(title)} </li>);
    };

    // nav list divider
    const divider = (divider, key) => {
      const classes = classNames( 'divider', divider.class);
      return (<li key={key} className={ classes }></li>);
    };

    // nav item with nav link
    const navItem = (item, key) => {
      const classes = {
        item: classNames( item.class) ,
        link: classNames( 'nav-link', item.variant ? `nav-link-${item.variant}` : ''),
        icon: classNames( item.icon )
      };
      return (
        navLink(item, key, classes)
      )
    };

    // nav link
    const navLink = (item, key, classes) => {
      const url = item.url ? item.url : '';
      return (
        <NavItem key={key} className={classes.item}>
          { isExternal(url) ?
            <RsNavLink href={url} className={classes.link} active>
              <i className={classes.icon}></i>{item.name}{badge(item.badge)}
            </RsNavLink>
            :
            <NavLink to={url} className={classes.link} activeClassName="active">
              <i className={classes.icon}></i>{item.name}{badge(item.badge)}
            </NavLink>
          }
        </NavItem>
      )
    };

    // nav dropdown
    const navDropdown = (item, key) => {
      return (
        <li key={key} className={activeRoute(item.url, props)}>
          <a className="nav-link nav-dropdown-toggle" disabled={item.disabled} href="#" onClick={handleClick.bind(this)}><i className={item.icon}></i>{item.name}</a>
          <ul className="nav-dropdown-items">
            {navList(item.children)}
          </ul>
        </li>)
    };

    // nav type
    const navType = (item, idx) =>
      item.title ? title(item, idx) :
      item.divider ? divider(item, idx) :
      item.children ? navDropdown(item, idx)
                    : navItem(item, idx) ;

    // nav list
    const navList = (items) => {
      return items.map( (item, index) => navType(item, index) );
    };

    const isExternal = (url) => {
      const link = url ? url.substring(0, 4) : '';
      return link === 'http';
    };

    // sidebar-nav root
    return (
      <div className="sidebar">
        <SidebarHeader/>
        <SidebarForm/>
        <nav className="sidebar-nav">
          <Nav>
            {navList(items)}
          </Nav>
        </nav>
        <SidebarFooter/>
        <SidebarMinimizer/>
      </div>
    )
  }
}

export default Sidebar;
