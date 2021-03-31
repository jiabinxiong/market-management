// import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
// import PerfectScrollbar from "react-perfect-scrollbar";
//
// import { MarketListAPI } from '../../effectAPI';
// import { marketAction } from '../../redux/actions';
// import { marketService } from '../../service';
//
// import { LoadingComponent } from '../../components';
//
// function MarketListPage(props) {
//     const [ marketLoading, setMarketLoading ] = useState(true);
//     function marketListStatusHandle(status) {
//         setMarketLoading(status.marketLoading);
//     }
//
//     useEffect(() => {
//         MarketListAPI.subscribeToFriendStatus(
//             marketListStatusHandle,
//             props
//         );
//
//         return () => {
//             MarketListAPI.unsubscribeFromFriendStatus(
//                 marketListStatusHandle
//             );
//         }
//     }, [])
//
//     return (
//         <>
//             {
//                 marketLoading ? <LoadingComponent/> : null
//             }
//             {
//                 props.marketReducer.length > 0 ? <PerfectScrollbar>
//                     <ul className="market-list-ul">
//                         {
//                             props.marketReducer.map((item, index) => {
//                                 return <li className="li" key={item._id}>
//                                     <div className="r">
//                                         <div
//                                             onClick={ () => MarketListAPI.deleteMarketHandle(item._id) }
//                                             className="delete-btn btn">
//                                             删除
//                                         </div>
//                                         <div className="update-btn btn">修改</div>
//                                     </div>
//                                     <div className="l">
//                                         <h3 className="sub-title">
//                                             {item.name}
//                                         </h3>
//                                         <p className="detail-text">3月11日，国务院总理李克强在北京人民中心的分会场采访。新</p>
//                                     </div>
//
//                                 </li>
//                             })
//                         }
//                     </ul>
//                 </PerfectScrollbar> : null
//             }
//             {
//                 props.marketReducer.length === 0 && !marketLoading ? <div className="market-list-none">
//                     还没有市场，<span
//                     className="new-btn">去创建吧!</span>
//                 </div> : null
//             }
//         </>
//     );
// }
//
// export default connect(
//     data => ({
//         marketReducer: data.marketReducer
//     }), {
//         marketQueryAction: marketAction.query,
//         marketAddAction: marketAction.add,
//         marketDeleteAction: marketAction.delete,
//         marketUpdateAction: marketAction.update
//     }
// )(MarketListPage);
