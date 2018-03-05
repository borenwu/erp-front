export default {
    items: [
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
            children: [
                {
                    name: '任务',
                    url: '/work/tasks',
                    icon: 'icon-screen-desktop'
                },
            ]
        },
        {
            name: '财务',
            url: '/finance',
            icon: 'icon-chart',
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
            children: [
                {
                    name: 'Font Awesome',
                    url: '/icons/font-awesome',
                    icon: 'icon-star',
                    badge: {
                        variant: 'secondary',
                        text: '4.7'
                    }
                },
                {
                    name: 'Simple Line Icons',
                    url: '/icons/simple-line-icons',
                    icon: 'icon-star'
                }
            ]
        },

        {
            name: '仪表板',
            url: '/dash',
            icon: 'icon-layers',
            children: [
                {
                    name: '客户仪表板',
                    url: '/dash/AccountReceivableDash',
                    icon: 'icon-grid',
                },
            ]
        },

        {
            name: '设置',
            url: '/setting',
            icon: 'icon-compass',
            children: [
                {
                    name: '基础设置',
                    url: '/setting/Configs',
                    icon: 'icon-eyeglass',
                },
            ]
        },


    ]
};
