import md5 from 'md5'

function secretHeader(){
    let currentTime = new Date()
    let currentString=currentTime.getUTCFullYear().toString()+'-'+
                      ((currentTime.getUTCMonth()+1)>9?(currentTime.getUTCMonth()+1).toString():"0"+(currentTime.getUTCMonth()+1).toString())+'-'+
                      (currentTime.getUTCDate()>9?currentTime.getUTCDate().toString():"0"+currentTime.getUTCDate().toString())+" "+
                      (currentTime.getUTCHours()>9?currentTime.getUTCHours().toString():"0"+currentTime.getUTCHours().toString())+":"+
                      (currentTime.getUTCMinutes()>9?currentTime.getUTCMinutes().toString():"0"+currentTime.getUTCMinutes().toString())+
                      ":HEADER"
    return md5(currentString)
}
export default function request(method,url,body,token,detectString){
    method = method.toUpperCase(); 
    if (method === 'GET') {
        // fetch的GET不允许有body，参数只能放在url中 
        body = undefined; 
    } else { 
        body =  body && JSON.stringify(body); 
    }
    return new Promise((resolve, reject) => {
        fetch(url, {
            method,
            mode: "cors",
            headers: {
                "Content-Type": "application/json,text/plain,*/*; charset=utf-8",
                "Authorization":"JWT "+token,
                "Robot-Detect":detectString
            },
            body
        }).then(res=>{
            if (res.ok){
                return res
            }else{
                throw new Error(res.status.toString() + res.statusText);
            }
        }).then(data=>resolve(data)).catch(e=>{console.log("server error",e);reject(e)});
    });
}

export const get = (url) => request('GET', url, null, window.localStorage.getItem('token'),secretHeader()); 
export const post = (url, body) => request('POST', url, body, window.localStorage.getItem('token'),secretHeader()); 
export const put = (url, body) => request('PUT', url, body, window.localStorage.getItem('token'),secretHeader()); 
export const del = (url, body) => request('DELETE', url, body, window.localStorage.getItem('token'),secretHeader());
export const postFile = (url,file)=>{
    return new Promise((resolve, reject) => {
        fetch(url, {
            method:"POST",
            mode: "cors",
            headers: {
                "Authorization":"JWT "+window.localStorage.getItem('token'),
                "Robot-Detect":secretHeader()
            },
            body:file
        }).then(res=>{
            if (res.ok){
                return res
            }else{
                throw new Error(res.status.toString() + res.statusText);
            }
        }).then(data=>resolve(data)).catch(e=>{console.log("server error",e);reject(e)});
    });
}