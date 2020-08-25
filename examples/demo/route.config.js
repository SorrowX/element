const routes = { 
    path: '/demo',  
    component: () => import('./demo.vue'),
    children: [
        {
            path: 'loading',  
            component: () => import('./loading/index'),
        },
        {
            path: 'tree',  
            component: () => import('./tree/index'),
        },
        {
            path: 'scrollbar',  
            component: () => import('./scrollbar/index'),
        },
        {
            path: 'grid',  
            component: () => import('./grid/index'),
        }, 
        {
            path: 'collapse',
            component: () => import('./collapse/index')
        },
        {
            path: 'checkbox',
            component: () => import('./checkbox/index')
        }
    ]
}

export default routes