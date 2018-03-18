const local=window.localStorage
const ipConfig = local.getItem("ipConfig");
// export const rootUrl = 'http://192.168.0.108:1337'
export const rootUrl = ipConfig
// export const rootUrl = 'http://192.168.0.117:1337';
// export const rootUrl = 'http://192.168.1.104:1337'