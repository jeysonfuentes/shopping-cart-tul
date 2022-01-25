import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersDetailComponent } from './orders-detail/orders-detail.component';
import { OrdersComponent } from './orders.component';

const routes: Routes = [
  {
    path: '',

    children: [
      {
        path: '',
        component: OrdersComponent,
      },
      {
        path: 'detail/:id',
        component: OrdersDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
