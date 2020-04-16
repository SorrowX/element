const routes = { 
    path: '/demo',  
    component: () => import('./demo.vue'),
    children: [
        {
            path: 'loading',  
            component: () => import('./loading'),
        },
        {
            path: 'tree',  
            component: () => import('./tree'),
        }
    ]
}

export default routes