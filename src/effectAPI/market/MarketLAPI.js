import { marketService, uploadService } from '../../service';
import {
    DIALOG_TYPE, MARKET_OPERATE_TYPE, MARKET_CHANGE_TYPE,
    ADMINISTRATION, MARKET_NEW_PROMP_TYPE, MARKET_DIALOG_TYPE
} from '../../constants';
import { newMarketModule, marketNewPromptModule } from '../../moduls';
import tool from '../../common/tool';

const MarketLAPI = {
    props: null,
    isQueryList: true,
    iptVerify: function() {
        // console.log(this.props.marketNewIptReducer);
        const marketNewIptReducer = this.props.marketNewIptReducer;
        const marketNewPromptReducer = this.props.marketNewPromptReducer;
        if(tool.space().all(marketNewIptReducer.name) || marketNewIptReducer.name.length === 0) {
            this.props.marketIsNewPromptAction({
                name: MARKET_NEW_PROMP_TYPE.NAME.NULL
            });
        } else if(marketNewIptReducer.name.length > 100) {
            this.props.marketIsNewPromptAction({
                name: MARKET_NEW_PROMP_TYPE.NAME.MAX_LENGTH
            });
        }

        if(marketNewIptReducer.administration.province.code === undefined) {
            this.props.marketIsNewPromptAction({
                administration: MARKET_NEW_PROMP_TYPE.PROVINCE.NULL
            });
        } else if(marketNewIptReducer.administration.city.code === undefined) {
            this.props.marketIsNewPromptAction({
                administration: MARKET_NEW_PROMP_TYPE.PROVINCE.CITY_NULL
            });
        } else if(marketNewIptReducer.administration.county.code === undefined) {
            this.props.marketIsNewPromptAction({
                administration: MARKET_NEW_PROMP_TYPE.PROVINCE.COUNTY_NULL
            });
        }

        if(marketNewIptReducer.cover.length === 0) {
            this.props.marketIsNewPromptAction({
                cover: MARKET_NEW_PROMP_TYPE.COVER.NULL
            })
        } else if(marketNewIptReducer.cover.length > 2) {
            this.props.marketIsNewPromptAction({
                cover: MARKET_NEW_PROMP_TYPE.COVER.MAX_LENGTH
            })
        }

        if(tool.space().all(marketNewIptReducer.summary) || marketNewIptReducer.summary.length === 0) {
            this.props.marketIsNewPromptAction({
                summary: MARKET_NEW_PROMP_TYPE.SUMMARY.NULL
            })
        } else {

        }

        // return isVerifyArr.filter((data, index) => data === false).length === 0 ? true : false;
    },
    dialogOpenHandle: function() {
        this.props.addMarketDialogAction(true);
        this.props.marketDialogTypeAction(MARKET_DIALOG_TYPE.NEW);
    },

    dialogCloseCallback: function() {
        this.props.addMarketDialogAction(false);
        this.props.marketEmptyChangeAction();
    },

    dialogDeleteOpenHandle: function() {

    },

    dialogDeleteCloseCallback: function() {

    },

    dialogUpdateHandle: function(item) {
        this.props.addMarketDialogAction(true);
        this.props.marketDialogTypeAction(MARKET_DIALOG_TYPE.UPDATE);

        // this.props.marketUploadChangeAction(tool.filterObj(item, ['_id', '__v']));
        this.props.marketUploadChangeAction(item);
    },

    intChange: function(v, type) {
        this.props.marketNewIptAction({
            v: v.target.value,
            type: type
        });

        this.props.marketIsNewPromptAction({
            [type]: ''
        })
    },

    cityChange: function(type, obj, option) {
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
        } else if (type === ADMINISTRATION.CITY) {
            this.props.selectCityAction({
                obj,
                option,
                provinceCode: this.props.marketNewIptReducer.administration.province.code
            });
        } else if( type === ADMINISTRATION.COUNTY ) {

            // this.props.selectCountyAction({
            //
            // });
        }

    },

    uploadChange: function(info, type) {
        this.props.marketIsNewPromptAction({
            [type]: ''
        })

        const formData = new FormData();
        formData.append('market', info.file);
        uploadService.image(formData).then(data => {
            if(data.data.code === 0) {
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

    determineCallback: function(back) {
        // this.iptVerify();

        if(this.props.marketDialogTypeReducer === MARKET_DIALOG_TYPE.NEW) {
            marketService.add(this.props.marketNewIptReducer).then(data => {
                if(data.data.code === 0) {
                    back(() => {
                        this.props.marketListAddAction({
                            ...this.props.marketNewIptReducer,
                            _id: data.data._id
                        });
                        this.props.addMarketDialogAction(false);
                        this.props.marketEmptyChangeAction();
                    })
                }
            })
        } else if (this.props.marketDialogTypeReducer === MARKET_DIALOG_TYPE.UPDATE) {
            marketService.update(
                tool.filterObj(this.props.marketNewIptReducer, ['__v'])
            ).then(data => {
                if(data.data.code === 0) {
                    back(() => {
                        this.props.marketListUpdateAction(tool.filterObj(this.props.marketNewIptReducer, ['__v']));
                        this.props.addMarketDialogAction(false);
                        this.props.marketEmptyChangeAction();
                    })
                }
            })
        }


        // console.log(this.props.marketNewIptReducer);
    },

    dialogDeleteDetermineCallback: function() {

    },

    subscribeToFriendStatus: function(marketLStatusHandle, props) {
        this.props = props;
        if(props.marketListReducer.length === 0) {
            marketService.query({}).then((data) => {
                props.marketListLoadingAction(false);

                if(data.data.code === 0) {
                    props.marketListQueryAction(data.data.list);
                }
            });
        }
    },
    unsubscribeFromFriendStatus: function() {
        this.props = null;
        this.isQueryList = true;
    }
};

// const MarketLAPI = {
//     props: null,
//     isAddBtn: true,
//     isQueryList: true,
//     administrationArr: [0, 0, 0],
//     coverList: [],
//     newMarketObj: JSON.parse(JSON.stringify(newMarketModule)),
//     copyMarketNewPromptModule: JSON.parse(JSON.stringify(marketNewPromptModule)),
//     iptVerify: function() {
//         let isVerifyArr = [false, false, false, false];
//         const newUpdateChange = this.props.marketNewUpdateChangeReducer;
//         const administrationFilter = this.props.administrationFilterReducer;
//         const coverUpload = this.props.marketCoverUploadReducer;
//
//         if(tool.space().all(newUpdateChange.name) || newUpdateChange.name.length === 0 ) {
//             this.copyMarketNewPromptModule.name = MARKET_NEW_PROMP_TYPE.NAME.NULL;
//             isVerifyArr[0] = false;
//         } else if(newUpdateChange.name.length > 100) {
//             this.copyMarketNewPromptModule.name = MARKET_NEW_PROMP_TYPE.NAME.MAX_LENGTH;
//             isVerifyArr[0] = false;
//         } else {
//             isVerifyArr[0] = true;
//         }
//
//         if(administrationFilter.province.value.code === '') {
//             this.copyMarketNewPromptModule.administration = MARKET_NEW_PROMP_TYPE.PROVINCE.NULL;
//             isVerifyArr[1] = false;
//         } else if (administrationFilter.city.value.code === '') {
//             this.copyMarketNewPromptModule.administration = MARKET_NEW_PROMP_TYPE.PROVINCE.CITY_NULL;
//             isVerifyArr[1] = false;
//         } else if (administrationFilter.county.value.code === '') {
//             this.copyMarketNewPromptModule.administration = MARKET_NEW_PROMP_TYPE.PROVINCE.COUNTY_NULL;
//             isVerifyArr[1] = false;
//         } else {
//             isVerifyArr[1] = true;
//         }
//
//         if(coverUpload.length === 0) {
//             this.copyMarketNewPromptModule.cover = MARKET_NEW_PROMP_TYPE.COVER.NULL;
//             isVerifyArr[2] = false;
//         } else if(coverUpload.length > 2) {
//             this.copyMarketNewPromptModule.cover = MARKET_NEW_PROMP_TYPE.COVER.MAX_LENGTH;
//             isVerifyArr[2] = false;
//         } else {
//             isVerifyArr[2] = true;
//         }
//
//         if(tool.space().all(newUpdateChange.summary) || newUpdateChange.summary.length === 0) {
//             this.copyMarketNewPromptModule.summary = MARKET_NEW_PROMP_TYPE.SUMMARY.NULL;
//             isVerifyArr[3] = false;
//         } else {
//             isVerifyArr[3] = true;
//         }
//
//         this.props.marketIsNewPromptAction({
//             ...this.copyMarketNewPromptModule
//         });
//
//         return isVerifyArr.filter((data, index) => data === false).length === 0 ? true : false;
//     },
//     emptyFun: function() {
//         this.props.marketEmptyChangeAction(newMarketModule);
//         this.props.commonEmptyAdministrationAction({});
//         this.props.marketEmptyCoverAction([]);
//         this.props.marketIsNewPromptAction({
//             ...marketNewPromptModule
//         });
//     },
//     dialogNewFun: function(type) {
//         this.props.marketDialogAction(true);
//         this.props.marketOperateTypeAction(type);
//         this.props.marketDialogTypeAction(DIALOG_TYPE.pop);
//     },
//     dialogNewHandle: function(type) {
//         this.dialogNewFun(type);
//     },
//     dialogUpdateHandle: function(item, type) {
//         this.dialogNewFun(type);
//
//         // this.props.marketAddCoverAction([data.data.url]);
//         this.props.marketUpdateChangeAction({
//             ...item
//         });
//     },
//     dialogCloseCallback: function() {
//         this.props.marketDialogAction(false);
//         this.emptyFun();
//     },
//     dialogDetermineCallback: function (back, obj, type) {
//         if(type === MARKET_OPERATE_TYPE.DELETE) {
//
//             marketService.delete({
//                 id: obj._id
//             }).then(data => {
//                 if(data.data.code === 0) {
//                     back(() => {
//                         this.props.marketDialogAction(false);
//                     });
//                     this.props.marketDeleteAction(obj._id);
//                 }
//             })
//
//         } else if (type === MARKET_OPERATE_TYPE.UPDATE) {
//             console.log('xxx');
//         } else if (type === MARKET_OPERATE_TYPE.NEW) {
//             if(this.iptVerify()) {
//                 if(this.isAddBtn) {
//                     const reqData = {
//                         ...this.props.marketNewUpdateChangeReducer,
//                         administration: [
//                             this.props.administrationFilterReducer.province.value,
//                             this.props.administrationFilterReducer.city.value,
//                             this.props.administrationFilterReducer.county.value
//                         ],
//                         cover: this.props.marketCoverUploadReducer
//                     }
//                     this.isAddBtn = false;
//                     marketService.add({
//                         ...reqData
//                     }).then(data => {
//                         this.isAddBtn = true;
//                         if(data.data.code === 0) {
//                             this.props.marketAddAction({
//                                 ...reqData,
//                                 _id: data.data._id
//                             });
//                             back(() => {
//                                 this.props.marketDialogAction(false);
//                             });
//                             this.emptyFun();
//
//                         } else {
//
//                         }
//                     })
//                 }
//             }
//         }
//     },
//     newChange: function(v, type) {
//         this.newMarketObj[type] = v.target.value;
//
//         this.copyMarketNewPromptModule[type] = '';
//         this.props.marketIsNewPromptAction({
//             ...this.copyMarketNewPromptModule
//         });
//
//         this.props.marketNewChangeAction({
//             type: type,
//             v: v.target.value
//         });
//     },
//     cityChange: function(type,  city, option) {
//         if(type === ADMINISTRATION.PROVINCE) {
//             this.administrationArr[0] = option.value;
//             this.props.commonSelectProvinceAction({
//                 code: option.value,
//                 name: option.children,
//                 city: city
//             });
//
//         } else if (type === ADMINISTRATION.CITY) {
//             this.props.commonSelectCityAction({
//                 provinceCode: this.administrationArr[0],
//                 cityCode: option.value,
//                 name: option.children,
//                 county: city
//             });
//         } else if( type === ADMINISTRATION.COUNTY ) {
//             this.props.commonSelectCountyAction({
//                 option
//             })
//         }
//
//         this.copyMarketNewPromptModule.administration = '';
//         this.props.marketIsNewPromptAction({
//             ...this.copyMarketNewPromptModule
//         });
//     },
//     uploadChange: function(info) {
//         const formData = new FormData();
//         formData.append('market', info.file);
//         uploadService.image(formData).then(data => {
//             if(data.data.code === 0) {
//                 this.props.marketAddCoverAction([data.data.url]);
//             }
//         })
//
//         this.copyMarketNewPromptModule.cover = '';
//         this.props.marketIsNewPromptAction({
//             ...this.copyMarketNewPromptModule
//         });
//     },
//     coverDeleteHandle: function(url, index) {
//         this.props.marketDeleteCoverAction(index)
//     },
//     deleteMarketHandle: function(item, type) {
//         this.props.marketDialogAction(true);
//         this.props.marketOperateTypeAction(type);
//         this.props.marketDialogTypeAction(DIALOG_TYPE.prompt);
//         this.props.marketListFilterAction(item);
//     },
//     subscribeToFriendStatus: function(marketLStatusHandle, props) {
//         this.props = props;
//
//         if(this.isQueryList) {
//             marketService.query({}).then((data) => {
//                 props.marketListLoadingAction(false);
//                 this.isQueryList = false;
//                 if(data.data.code === 0) {
//                     props.marketQueryAction(data.data.list);
//                 }
//             });
//         }
//
//     },
//     unsubscribeFromFriendStatus: function() {
//
//     }
// };

export default MarketLAPI;
