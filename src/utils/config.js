export const api = "http://localhost:5000/api"
export const uploads = "http://localhost:5000/uploads"
export const qr = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="

export const requestConfig= (method, data, token = null, image = null) => {
    let config


    if(image){
        config = {
            method: method,
            body: data,
            headers: {},
        }
    }else if(method === "DELETE" || data === null){
        config = {
            method: method,
            headers: {}
        }
    }else{
        config = {
            mode: 'no-cors',
            method: method, 
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }
    }

    if(token){
        config.headers.Authorization = `Bearer ${token}`

    }

    return config

}