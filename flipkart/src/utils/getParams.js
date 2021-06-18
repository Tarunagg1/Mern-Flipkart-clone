export default (q) => {
    if(q){
        const quertString = q.split("?")[1];
        const paramsObj = {};
        if(quertString.length > 0){
            const params = quertString.split("&");
            params.forEach((param) => {
                const keyValue = param.split("=");
                paramsObj[keyValue[0]] = keyValue[1];
            });
            return paramsObj;
        }
        return paramsObj;
    }
}