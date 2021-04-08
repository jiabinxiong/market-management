export const newMarketModule = {
    name: '',
    administration: {
        province: {},
        city: {},
        county: {}
    },
    cover: [],
    address: {
        text: '',
        lnglat: ''
    },
    summary: '',
    hangOut: '',
    bus: '',
    subway: '',
    openTime: '',
    phone: '',
    http: ''
};

export const administrationFilterModule = {
    province: [],
    city: [],
    county: []
}

export const marketMapModule = {
    lnglat: ''
};

export const marketNewPromptModule = {
    name: {
        text: '',
        required: false
    },
    administration: {
        text: '',
        required: false
    },
    cover: {
        text: '',
        required: false
    },
    summary: {
        text: '',
        required: false
    },
    hangOut: {
        text: '',
        required: false
    },
    bus: {
        text: '',
        required: false
    },
    subway: {
        text: '',
        required: false
    },
    openTime: {
        text: '',
        required: false
    },
    phone: {
        text: '',
        required: false
    },
    http: {
        text: '',
        required: false
    },
    address: {
        text: '',
        required: false
    }
}
