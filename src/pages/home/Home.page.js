import React from 'react';
import { Switch, Route, Redirect,
    useRouteMatch,
    useParams,
    Link
} from 'react-router-dom';

import MarketPage from '../market/Market.page';
import UserPage from '../user/User.page';
import NoPage from '../../pages/no/No.page';
import MenuComponent from '../../components/menu/Menu.component';
import NavPage from '../nav/Nav.page';

export default function HomePage () {
    let match = useRouteMatch();

    return (
        <div className="home">
            <NavPage/>
            <div className="home-r">
                <div className="home-t">
                    <Link to={`/home/user`}>asdfas</Link>
                    <Link to={`/home/market`}>market</Link>
                </div>
                <div className="home-t-l">
                    <Switch>
                        <Route exact path={`${match.path}/market`} component={ MarketPage }/>
                        <Route path={`${match.path}/user`} component={ UserPage }/>
                        <Route paht="*" component={ NoPage } />
                    </Switch>
                </div>

            </div>
        </div>
    );
}
