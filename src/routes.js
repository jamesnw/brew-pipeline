import App from './App.vue'
import Edit from './components/Edit.vue'
import SingleView from './components/SingleView.vue'
import EditView from './components/EditView.vue'
import NewKeg from './components/NewKeg.vue'
export default [
  {
    path: '',
    component: App
  },
{
      path: `/tap/:tap`,
      component: SingleView
    }
,
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
