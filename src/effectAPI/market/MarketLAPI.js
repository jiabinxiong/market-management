import { marketService, uploadService, mapService } from '../../service';
import {
    DIALOG_TYPE, MARKET_OPERATE_TYPE, MARKET_CHANGE_TYPE,
    ADMINISTRATION, MARKET_NEW_PROMP_TYPE, MARKET_DIALOG_TYPE,
} from '../../constants';
import { newMarketModule, marketNewPromptModule } from '../../moduls';
import tool from '../../common/tool';

const MarketLAPI = {
    props: null,
    isQueryList: true,
    isNewBtn: true,
    isUpdateBtn: true,
    isDeleteBtn: true,
    iptVerify: function() {
        const marketNewIptReducer = this.props.marketNewIptReducer;
        const copyMarketNewPromptModule = JSON.parse(JSON.stringify(marketNewPromptModule));

        if(tool.space().all(marketNewIptReducer.name) || marketNewIptReducer.name.length === 0) {
            copyMarketNewPromptModule.name = {
                text: MARKET_NEW_PROMP_TYPE.NAME.NULL,
                required: true
            }
        } else if(marketNewIptReducer.name.length > 100) {
            copyMarketNewPromptModule.name = {
                text: MARKET_NEW_PROMP_TYPE.NAME.MAX_LENGTH,
                required: true
            }
        } else {
            copyMarketNewPromptModule.name = {
                text: '',
                required: false
            }
        }

        if(marketNewIptReducer.administration.province.code === undefined) {
            copyMarketNewPromptModule.administration = {
                text: MARKET_NEW_PROMP_TYPE.PROVINCE.NULL,
                required: true
            }
        } else if(marketNewIptReducer.administration.city.code === undefined) {
            copyMarketNewPromptModule.administration = {
                text: MARKET_NEW_PROMP_TYPE.PROVINCE.CITY_NULL,
                required: true
            }
        } else if(marketNewIptReducer.administration.county.code === undefined) {
            copyMarketNewPromptModule.administration = {
                text: MARKET_NEW_PROMP_TYPE.PROVINCE.COUNTY_NULL,
                required: true
            }
        } else {
            copyMarketNewPromptModule.administration = {
                text: '',
                required: false
            }
        }

        if(marketNewIptReducer.cover.length === 0) {
            copyMarketNewPromptModule.cover = {
                text: MARKET_NEW_PROMP_TYPE.COVER.NULL,
                required: true
            }
        } else if(marketNewIptReducer.cover.length > 2) {
            copyMarketNewPromptModule.cover = {
                text: MARKET_NEW_PROMP_TYPE.COVER.MAX_LENGTH,
                required: true
            }
        } else {
            copyMarketNewPromptModule.cover = {
                text: '',
                required: false
            }
        }

        if(tool.space().all(marketNewIptReducer.summary) || marketNewIptReducer.summary.length === 0) {
            copyMarketNewPromptModule.summary = {
                text: MARKET_NEW_PROMP_TYPE.SUMMARY.NULL,
                required: true
            }
        } else {
            copyMarketNewPromptModule.summary = {
                text: '',
                required: false
            }
        }

        if(tool.space().all(marketNewIptReducer.address.text) || marketNewIptReducer.address.text.length === 0) {
            copyMarketNewPromptModule.address = {
                text: MARKET_NEW_PROMP_TYPE.ADDRESS.NULL,
                required: true
            }
        } else if (marketNewIptReducer.address.lnglat === '') {
            copyMarketNewPromptModule.address = {
                text: MARKET_NEW_PROMP_TYPE.ADDRESS.PROMP,
                required: true
            }
        } else if (marketNewIptReducer.address.lnglat === 'no') {
            copyMarketNewPromptModule.address = {
                text: MARKET_NEW_PROMP_TYPE.ADDRESS.SEARCH_NULL,
                required: true
            }
        } else {
            copyMarketNewPromptModule.address = {
                text: '',
                required: false
            }
        }

        this.props.marketIsNewPromptAction({
            ...copyMarketNewPromptModule
        });

        let isReturn = true;
        for(const i in copyMarketNewPromptModule ) {
            if( copyMarketNewPromptModule[i].required) {
                isReturn = true;
                break;
            } else {
                isReturn = false;
            }
        }


        return isReturn;
    },
    dialogOpenHandle: function() {
        this.props.addMarketDialogAction(true);
        this.props.marketDialogTypeAction(MARKET_DIALOG_TYPE.NEW);
    },

    dialogCloseCallback: function() {
        this.props.addMarketDialogAction(false);
        this.props.marketEmptyChangeAction();
    },

    dialogUpdateHandle: function(item, type, cityObj, countyObj, e) {
        e.stopPropagation();
        this.props.addMarketDialogAction(true);
        this.props.marketDialogTypeAction(MARKET_DIALOG_TYPE.UPDATE);

        this.props.marketUploadChangeAction(item);

        this.props.selectCityUpdateAction({
            item,
            cityObj, countyObj
        });
    },

    marketListHandle: function(e, item) {
        this.props.marketListHandleAction(item);
    },

    marketLogoHandle: function(data, code) {
        console.log(data);
        console.log(code);
    },

    intChange: function(v, type) {
        this.props.marketNewIptAction({
            v: v.target.value,
            type: type
        });

        this.props.marketIsNewPromptAction({
            [type]: {
                text: '',
                required: false
            }
        })
    },

    cityChange: function(type, obj, option) {
        const copyMarketNewPromptReducer = JSON.parse(JSON.stringify(this.props.marketNewPromptReducer));
        this.props.marketNewIptAction({
            v: option,
            type: type
        });
        this.props.marketIsNewPromptAction({
            administration: ''
        })
        if(type === ADMINISTRATION.PROVINCE) {
            this.props.selectProvinceAction({
                obj,
                option
            });

            this.props.marketNewIptAction({
                v: ['', 'no'],
                type: MARKET_CHANGE_TYPE.ADDRESS
            });
        } else if (type === ADMINISTRATION.CITY) {
            this.props.selectCityAction({
                obj,
                option,
                provinceCode: this.props.marketNewIptReducer.administration.province.code
            });

            this.props.marketNewIptAction({
                v: ['', 'no'],
                type: MARKET_CHANGE_TYPE.ADDRESS
            });
        } else if( type === ADMINISTRATION.COUNTY ) {
            const administrationObj = this.props.marketNewIptReducer.administration;

            mapService.transcoding({
                address: administrationObj.province.name + administrationObj.city.name + option.children
            }).then(data => {
                if(data.data.infocode === '10000') {
                    if(data.data.count === '1') {
                        copyMarketNewPromptReducer.address = {
                            text: '',
                            required: false
                        }
                        this.props.marketNewIptAction({
                            v: [
                                administrationObj.province.name + administrationObj.city.name + option.children,
                                data.data.geocodes[0].location
                            ],
                            type: MARKET_CHANGE_TYPE.ADDRESS
                        });
                    }

                    this.props.marketIsNewPromptAction({
                        ...copyMarketNewPromptReducer
                    });
                }
            })
        }

    },

    uploadChange: function(info, back, type) {
        this.props.marketIsNewPromptAction({
            [type]: ''
        })

        const formData = new FormData();
        formData.append('market', info, 'example.jpeg' );
        uploadService.image(formData).then(data => {
            if(data.data.code === 0) {
                back(true);
                this.props.marketNewIptAction({
                    v: data.data.url,
                    type: type
                });
            }
        })
    },

    coverDeleteHandle: function(data, index, type) {
        const copyCover = [...this.props.marketNewIptReducer.cover];
        copyCover.splice(index, 1);
        this.props.marketNewIptAction({
            v: copyCover,
            type: type
        });
    },

    lnglatStrNumber: function(v) {
        if(v === 'no') {
            return [];
        } else {
            const lnglatArr = v.split(',');
            return [parseFloat(lnglatArr[0]), parseFloat(lnglatArr[1])];
        }
    },

    mapClickHandle: function(event) {
        // lng: 0, lat: 0 // lng经度 lat 纬度
        const copyMarketNewPromptReducer = JSON.parse(JSON.stringify(this.props.marketNewPromptReducer));

        mapService.tranName({
            location: `${event.lnglat.lng},${event.lnglat.lat}`
        }).then(data => {
            const regeocode = data.data.regeocode.addressComponent;
            const cityType = Object.prototype.toString.call(regeocode.city);

            if(data.data.infocode === '10000') {
                copyMarketNewPromptReducer.address = {
                    text: '',
                    required: false
                }

                this.props.marketIsNewPromptAction({
                    ...copyMarketNewPromptReducer
                });

                this.props.marketNewIptAction({
                    v: [
                        `${regeocode.province}${cityType === '[object Array]' ? '' : regeocode.city}${regeocode.district}${regeocode.township}${regeocode.streetNumber.street}${regeocode.streetNumber.number}`,
                        `${event.lnglat.lng},${event.lnglat.lat}`
                    ],
                    type: MARKET_CHANGE_TYPE.ADDRESS
                });
            }
        })
    },

    mapSearchAddressHandle: function(value) {
        const marketNewIptReducer = this.props.marketNewIptReducer;
        const copyMarketNewPromptReducer = JSON.parse(JSON.stringify(this.props.marketNewPromptReducer));
        if(tool.space().all(marketNewIptReducer.address.text) || marketNewIptReducer.address.text.length === 0) {
            copyMarketNewPromptReducer.address = {
                text: MARKET_NEW_PROMP_TYPE.ADDRESS.NULL,
                required: true
            }
            this.props.marketIsNewPromptAction({
                ...copyMarketNewPromptReducer
            });
        } else {
            mapService.transcoding({
                address: value
            }).then(data => {
                if(data.data.infocode === '10000') {
                    if(data.data.count === '1') {
                        copyMarketNewPromptReducer.address = {
                            text: '',
                            required: false
                        }
                        this.props.marketNewIptAction({
                            v: [
                                value,
                                data.data.geocodes[0].location
                            ],
                            type: MARKET_CHANGE_TYPE.ADDRESS
                        });
                    } else if (data.data.count === '0') {
                        copyMarketNewPromptReducer.address = {
                            text: MARKET_NEW_PROMP_TYPE.ADDRESS.SEARCH_NULL,
                            required: true
                        }

                        this.props.marketNewIptAction({
                            v: [value, 'no'],
                            type: MARKET_CHANGE_TYPE.ADDRESS
                        });
                    }

                    this.props.marketIsNewPromptAction({
                        ...copyMarketNewPromptReducer
                    });
                }
            })
        }

    },

    determineCallback: function(back) {
        // let isUpdateBtn = true;

        if(this.props.marketDialogTypeReducer === MARKET_DIALOG_TYPE.NEW) {

           if(!this.iptVerify()) {
               if(this.isNewBtn) {
                   this.isNewBtn = false;
                   marketService.add(this.props.marketNewIptReducer).then(data => {
                       if(data.data.code === 0) {
                           back(() => {
                               this.props.marketListAddAction({
                                   ...this.props.marketNewIptReducer,
                                   _id: data.data._id
                               });
                               this.props.addMarketDialogAction(false);
                               this.props.marketEmptyChangeAction();

                               this.isNewBtn = true;
                           })
                       }
                   })
               }

           }
        } else if (this.props.marketDialogTypeReducer === MARKET_DIALOG_TYPE.UPDATE) {
            if(!this.iptVerify()) {
                if(this.isUpdateBtn) {
                    this.isUpdateBtn = false;

                    marketService.update(
                        tool.filterObj(this.props.marketNewIptReducer, ['__v'])
                    ).then(data => {

                        if(data.data.code === 0) {
                            back(() => {
                                this.props.marketListUpdateAction(tool.filterObj(this.props.marketNewIptReducer, ['__v']));
                                this.props.addMarketDialogAction(false);
                                this.props.marketEmptyChangeAction();
                                this.props.marketListHandleAction(this.props.marketNewIptReducer);

                                this.isUpdateBtn = true;
                            })
                        }
                    })
                }
            }
        } else if (this.props.marketDialogTypeReducer === MARKET_DIALOG_TYPE.DELETE) {
            if(this.isDeleteBtn) {
                this.isDeleteBtn = false;
                marketService.delete({
                    id: this.props.marketNewIptReducer._id
                }).then(data => {
                    if(data.data.code === 0) {
                        back(() => {
                            this.props.addMarketDialogAction(false);
                            this.props.marketEmptyChangeAction();
                            this.props.marketListDeleteAction(this.props.marketNewIptReducer._id);

                            this.isDeleteBtn = true;
                        });
                    }
                })
            }

        }
    },

    deleteMarketHandle: function (item, obj , index, e) {
        e.stopPropagation();
        this.props.addMarketDialogAction(true);
        this.props.marketDialogTypeAction(MARKET_DIALOG_TYPE.DELETE);
        this.props.marketDeleteChangeAction(item);
    },

    subscribeToFriendStatus: function(marketLStatusHandle, props) {
        this.props = props;
        if(this.isQueryList) {
            marketService.query({}).then((data) => {
                props.marketListLoadingAction(false);
                this.isQueryList = false;
                if(data.data.code === 0) {
                    props.marketListQueryAction(data.data.list);
                    // props.marketListHandleAction(data.data.list[0]);
                }
            });
        }
    },
    unsubscribeFromFriendStatus: function() {
        this.props = null;
        this.isUpdateBtn = true;
    }
};

export default MarketLAPI;
