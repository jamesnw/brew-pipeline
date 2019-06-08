import App from './App'
import Edit from './components/Edit'
import EditView from './components/EditView'
import NewKeg from './components/NewKeg'
export default [
  {
    path: '',
    component: App
  },
  {
    path: '/edit',
    component: Edit,
    children: [
      {
        path: 'new',
        component: NewKeg
      },
      {
        path: ':beer',
        component: EditView
      }
    ]
  }
]
