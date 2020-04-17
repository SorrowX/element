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
            component: () => import('./tree'),
        }
    ]
}

export default routes