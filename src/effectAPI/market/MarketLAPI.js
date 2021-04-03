import { marketService, uploadService } from '../../service';
import { DIALOG_TYPE, MARKET_OPERATE_TYPE, ADMINISTRATION, MARKET_NEW_PROMP_TYPE } from '../../constants';
import { newMarketModule, marketNewPromptModule } from '../../moduls';
import tool from '../../common/tool';

const MarketLAPI = {
    props: null,
    isAddBtn: true,
    isQueryList: true,
    administrationArr: [0, 0, 0],
    coverList: [],
    newMarketObj: JSON.parse(JSON.stringify(newMarketModule)),
    copyMarketNewPromptModule: JSON.parse(JSON.stringify(marketNewPromptModule)),
    dialogNewHandle: function(type) {
        this.props.marketDialogAction(true);
        this.props.marketOperateTypeAction(type);
        this.props.marketDialogTypeAction(DIALOG_TYPE.pop);
    },
    dialogCloseCallback: function() {
        this.props.marketDialogAction(false);
        this.props.marketEmptyChangeAction(newMarketModule);
        this.props.commonEmptyAdministrationAction({});
        this.props.marketEmptyCoverAction([]);
    },
    dialogDetermineCallback: function (back, obj, type) {
        if(type === MARKET_OPERATE_TYPE.DELETE) {

            marketService.delete({
                id: obj._id
            }).then(data => {
                if(data.data.code === 0) {
                    back(() => {
                        this.props.marketDialogAction(false);
                    });
                    this.props.marketDeleteAction(obj._id);
                }
            })

        } else if (type === MARKET_OPERATE_TYPE.UPDATE) {

        } else if (type === MARKET_OPERATE_TYPE.NEW) {
            const newUpdateChange = this.props.marketNewUpdateChangeReducer;
            console.log(newUpdateChange);
            if(newUpdateChange.name.trim().length === 0) {
                this.copyMarketNewPromptModule.name = MARKET_NEW_PROMP_TYPE.NAME.NULL;
            } else if(newUpdateChange.name.length > 3) {
                this.copyMarketNewPromptModule.name = MARKET_NEW_PROMP_TYPE.NAME.MAX_LENGTH;
            }

            if(newUpdateChange.administration.length === 0) {
                this.copyMarketNewPromptModule.administration = MARKET_NEW_PROMP_TYPE.PROVINCE.NULL;
            }

            if(newUpdateChange.cover.length === 0) {
                this.copyMarketNewPromptModule.cover = MARKET_NEW_PROMP_TYPE.COVER.NULL;
            }

            if(newUpdateChange.summary.trim().length === 0) {
                this.copyMarketNewPromptModule.summary = MARKET_NEW_PROMP_TYPE.SUMMARY.NULL;
            }

            this.props.marketIsNewPromptAction({
                ...this.copyMarketNewPromptModule
            });
            // else if(newUpdateChange.name.length > 100) {
            //     this.props.marketIsNewPromptAction({
            //         ...marketNewPromptModule,
            //         name: MARKET_NEW_PROMP_TYPE.NAME.MAX_LENGTH
            //     });
            // }
            //
            // if(newUpdateChange.summary.trim().length === 0) {
            //     console.log('b');
            //     this.copyMarketNewPromptModule.summary = MARKET_NEW_PROMP_TYPE.SUMMARY.NULL;
            //     this.props.marketIsNewPromptAction({
            //         ...this.copyMarketNewPromptModule,
            //         summary: MARKET_NEW_PROMP_TYPE.SUMMARY.NULL
            //     });
            // }
            // console.log(this.copyMarketNewPromptModule);

            // if(this.isAddBtn) {
            //     this.isAddBtn = false;
            //     marketService.add({
            //         ...this.props.marketNewUpdateChangeReducer,
            //         administration: [
            //             this.props.administrationFilterReducer.province.value,
            //             this.props.administrationFilterReducer.city.value,
            //             this.props.administrationFilterReducer.county.value
            //         ],
            //         cover: this.props.marketCoverUploadReducer
            //         //  _id: data.data._id,
            //     }).then(data => {
            //         this.isAddBtn = true;
            //         if(data.data.code === 0) {
            //             // this.props.marketAddAction({
            //             //     ...this.props.marketNewUpdateChangeReducer,
            //             //     administration: [
            //             //         this.props.administrationFilterReducer.city.province,
            //             //         this.props.administrationFilterReducer.city.value
            //             //         this.props.administrationFilterReducer.city.county
            //             //     ],
            //             //     cover: this.props.marketCoverUploadReducer
            //             //    //  _id: data.data._id,
            //             // });
            //             //
            //             // back(() => {
            //             //     this.props.marketDialogAction(false);
            //             // });
            //             //
            //             // this.props.marketEmptyChangeAction(newMarketModule);
            //         } else {
            //
            //         }
            //     })
            // }


        }
    },
    newChange: function(v, type) {
        this.newMarketObj[type] = v.target.value;
        this.props.marketNewChangeAction({
            type: type,
            v: v.target.value
        });
    },
    cityChange: function(type,  city, option) {
        if(type === ADMINISTRATION.PROVINCE) {
            this.administrationArr[0] = option.value;
            this.props.commonSelectProvinceAction({
                code: option.value,
                name: option.children,
                city: city
            });

        } else if (type === ADMINISTRATION.CITY) {
            this.props.commonSelectCityAction({
                provinceCode: this.administrationArr[0],
                cityCode: option.value,
                name: option.children,
                county: city
            });
        } else if( type === ADMINISTRATION.COUNTY ) {
            this.props.commonSelectCountyAction({
                option
            })
        }
    },
    uploadChange: function(info) {
        const formData = new FormData();
        formData.append('market', info.file);
        uploadService.image(formData).then(data => {
            if(data.data.code === 0) {
                console.log(data.data.url)
                this.props.marketAddCoverAction(data.data.url);
            }
        })
    },
    coverDeleteHandle: function(url, index) {
        this.props.marketDeleteCoverAction(index)
    },
    deleteMarketHandle: function(item, type) {
        this.props.marketDialogAction(true);
        this.props.marketOperateTypeAction(type);
        this.props.marketDialogTypeAction(DIALOG_TYPE.prompt);
        this.props.marketListFilterAction(item);
    },
    subscribeToFriendStatus: function(marketLStatusHandle, props) {
        this.props = props;

        if(this.isQueryList) {
            marketService.query({}).then((data) => {
                props.marketListLoadingAction(false);
                this.isQueryList = false;
                if(data.data.code === 0) {
                    props.marketQueryAction(data.data.list);
                }
            });
        }

    },
    unsubscribeFromFriendStatus: function() {

    }
};

export default MarketLAPI;
