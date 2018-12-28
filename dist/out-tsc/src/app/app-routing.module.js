var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { FilesComponent } from './pages/files/files.component';
import { AddFileComponent } from './pages/add-file/add-file.component';
import { FileCategoryComponent } from './pages/file-category/file-category.component';
import { RegisterComponent } from './pages/register/register.component';
import { UsersComponent } from './pages/users/users.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ManufacturerComponent } from './pages/manufacturer/manufacturer.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { SubCategoryComponent } from './pages/sub-category/sub-category.component';
import { UnitTypeComponent } from './pages/unit-type/unit-type.component';
import { ItemsComponent } from './pages/items/items.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { PurchaseListComponent } from './pages/purchase-list/purchase-list.component';
import { LogsComponent } from './pages/logs/logs.component';
import { RefillComponent } from './pages/refill/refill.component';
var routes = [
    { path: '', component: PurchaseComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'files', component: FilesComponent, canActivate: [AuthGuard] },
    { path: 'add-file', component: AddFileComponent, canActivate: [AuthGuard] },
    { path: 'categories', component: FileCategoryComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] },
    { path: 'manufacturer', component: ManufacturerComponent, canActivate: [AuthGuard] },
    { path: 'customer', component: CustomerComponent, canActivate: [AuthGuard] },
    { path: 'sub-category', component: SubCategoryComponent, canActivate: [AuthGuard] },
    { path: 'unit-type', component: UnitTypeComponent, canActivate: [AuthGuard] },
    { path: 'items', component: ItemsComponent, canActivate: [AuthGuard] },
    { path: 'purchase', component: PurchaseComponent, canActivate: [AuthGuard] },
    { path: 'purchase-list', component: PurchaseListComponent, canActivate: [AuthGuard] },
    { path: 'logs', component: LogsComponent, canActivate: [AuthGuard] },
    { path: 'refill', component: RefillComponent, canActivate: [AuthGuard] },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes)
            ],
            exports: [RouterModule],
            declarations: []
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map