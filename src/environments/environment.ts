// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  hmr: false,
  apiURl: {
    getSysMenus: 'system/sysmenus/user',
    saveDirectory: 'system/resource/sysmenu',
    saveLink: 'system/resource/syslink',
    getMenuNohome: 'system/sysmenus/nohome',
    getAccountList: 'system/sysusers?currentNum=1&pagePerNum=100',
    getRoleList: 'system/sysroles?currentNum=1&pagePerNum=100',
    getMenuTree: 'system/syspermission',
    addRole: 'system/sysrole',
    saveUserRole: 'system/sysuser',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
