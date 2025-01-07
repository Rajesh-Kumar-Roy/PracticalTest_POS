import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductComponent } from './pages/product/product.component';
import { PosInvoiceComponent } from './pages/pos-invoice/pos-invoice.component';

export const routes: Routes = [
  
    { path: 'pos', component: PosInvoiceComponent},
    { path: 'product', component: ProductComponent},
    { path: 'productlist', component: ProductListComponent},
    { path: '',   redirectTo: 'pos', pathMatch: 'full' }, // redirect to `first-component`
    { path: '**', component: PageNotFoundComponent},
];
