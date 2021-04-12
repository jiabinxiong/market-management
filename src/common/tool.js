class Tool {
    space() {
        return {
            all: (text) => {
                if(text.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '') === '') {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
    filterObj(obj, arr) {
        const copyObj = JSON.parse(JSON.stringify(obj));
        for(let i = 0; i < arr.length; i++) {
            delete copyObj[arr[i]]
        }

        return copyObj;
    }

    filterUrl(str, url = '') {

        if(url === '') {
            const urlStr = window.location.href;
            if(urlStr.split(str + '=').length == 1) {
                return '';
            } else {
                const intercept = urlStr.split(str + '=')[1].split('&')[0];
                return intercept;
            }

        } else {
            const intercept = url.split(str + '=')[1].split('&')[0];
            return intercept;
        }
    }
    checkNullObj(obj) {
        return Object.keys(obj).length === 0;   
    }
}


const tool = new Tool();
export default tool;
