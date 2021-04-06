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
}


const tool = new Tool();
export default tool;
