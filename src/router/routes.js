import { routes as app } from '@/app'

const home = [
  { name: 'home',
    path: '/',
    redirect: '/dashboard'
  }
]

export default [...home, ...app]
