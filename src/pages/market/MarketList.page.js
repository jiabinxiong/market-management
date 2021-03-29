import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PerfectScrollbar from "react-perfect-scrollbar";

import { marketAction } from '../../redux/actions';
import { marketService } from '../../service';

import { LoadingComponent } from '../../components';

function MarketListPage(props) {
    const [ marketLoading, setMarketLoading ] = useState(true);
    useEffect(() => {
        marketService.query({}).then((data) => {
            console.log(data.data);
            setMarketLoading(false);
            props.marketQueryAction(data.data.list);
        });
    }, [marketLoading])

    console.log(props.marketReducer);
    return (
        <>
            {
                marketLoading ? <LoadingComponent/> : null
            }
            {
                props.marketReducer.length > 0 ? <PerfectScrollbar>
                    <ul className="market-list-ul">
                        {
                            props.marketReducer.map((item, index) => <li className="li" key={index}>
                                    <div className="l">
                                        <div className="img"></div>
                                    </div>
                                    <div className="r">
                                        <h3 className="sub-title">李克强总理出席记者会并回答中外记者提问</h3>
                                        <p className="detail-text">3月11日，国务院总理李克强在北京人民中心的分会场采访。新</p>
                                    </div>
                                </li>
                            )
                        }
                    </ul>
                </PerfectScrollbar> : null
            }
            {
                props.marketReducer.length === 0 && !marketLoading ? <div className="market-list-none">
                    还没有市场，<span
                    className="new-btn">去创建吧!</span>
                </div> : null
            }
        </>
    );
}

export default connect(
    data => ({
        marketReducer: data.marketReducer
    }), {
        marketQueryAction: marketAction.query,
        marketAddAction: marketAction.add,
        marketDeleteAction: marketAction.delete,
        marketUpdateAction: marketAction.update
    }
)(MarketListPage);
