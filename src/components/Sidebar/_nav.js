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
                    icon: 'icon-star'
                },
                {
                    name: '任务',
                    url: '/work/tasks',
                    icon: 'icon-star'
                },
                {
                    name: '任务',
                    url: '/work/tasks',
                    icon: 'icon-star'
                }
            ]
        },
        {
            name: '财务',
            url: '/finance',
            icon: 'icon-star',
            children: [
                {
                    name: 'Font Awesome',
                    url: '/finance/font-awesome',
                    icon: 'icon-star',
                    badge: {
                        variant: 'secondary',
                        text: '4.7'
                    }
                },
                {
                    name: 'Simple Line Icons',
                    url: '/finance/simple-line-icons',
                    icon: 'icon-star'
                },
                {
                    name: 'demo test',
                    url: '/finance/demotest',
                    icon: 'icon-star'
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

    ]
};
