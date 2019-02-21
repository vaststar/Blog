export default function request(method,url,body,token){
    method = method.toUpperCase(); 
    if (method === 'GET') {
        // fetch的GET不允许有body，参数只能放在url中 
        body = undefined; 
    } else { 
        body =  body && JSON.stringify(body); 
    }
    return fetch(url, {
        method,
        mode: "cors",
        headers: {
            "Content-Type": "application/json,text/plain,*/*; charset=utf-8",
            "Authorization":"JWT "+token
        },
        body
    });
}

export const get = (url) => request('GET', url, null, window.localStorage.getItem('token')); 
export const post = (url, body) => request('POST', url, body, window.localStorage.getItem('token')); 
export const put = (url, body) => request('PUT', url, body, window.localStorage.getItem('token')); 
export const del = (url, body) => request('DELETE', url, body, window.localStorage.getItem('token'));