// localstorage constants
export const CONSTANTS = {
    userInfo: 'userInfo',   // 用户信息
    authorityBtnList: 'authorityBtnList'    // 权限按钮数组
}

// 不同应用域信息
export const APPEXTIDMAPPING = {
    portal: '7012984',
    flow: 'qloudflow'
}

export interface USER {
    id: string;
    name: string;
    email: string;
    photo: string;
    phoneNumber: string;
    address: string;
    displayName: string;
    timezone: string;
    externalId: string;
    title: string;
    locale: string;
    ims: string;
    password: string;
    expired: string;
    createTime: string;
    disabled: string;
    userType: string;
}

export const AUTHORITYBTNMAPPING = {
    addRole: 'ADDROLE',
    editRole: 'EDITROLE',
    addDirectory: 'ADDDIRECTORY',
    editDirectory: 'EDITDIRECTORY',
    addLink: 'ADDLINK',
    editLink: 'EDITLINK',
    addButton: 'ADDBUTTON',
    editButton: 'EDITBUTTON',
    addLibrary: 'ADDLIBRARY',
    editAccount: 'EDITACCOUNT',
    addRelease: 'ADDRELEASE',
    editRelease: 'EDITRELEASE',
    editColumn: 'EDITCOLUMN',
    addColumn: 'ADDCOLUMN',
}