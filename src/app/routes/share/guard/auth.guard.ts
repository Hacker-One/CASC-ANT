import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from "@angular/router";

export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private _router: Router
    ) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        return true;
    }

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        console.log(this._router);

        console.log(route);
        console.log(state);
        return this.canActivate(route, state);
    }

}