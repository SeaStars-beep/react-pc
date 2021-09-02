import './style.styl';
import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import { ScreenStackContext } from '@src/cpts/screens/context';
import useViewModel from './view.model';
import { observer } from 'mobx-react';

import ScreenHome from '@src/cpts/screens/ScreenHome';

export const App = observer(() => {
  const {
    pushScreen,
    popScreen,
    screenStack,
    cleanScreen,
    loading,
  } = useViewModel();
  return loading ? (
    <div className="spinner">
      <div className="rect1"></div>
      <div className="rect2"></div>
      <div className="rect3"></div>
      <div className="rect4"></div>
      <div className="rect5"></div>
    </div>
  ) : (
    <ScreenStackContext.Provider value={{ pushScreen, popScreen, cleanScreen }}>
      <Router>
        <Switch>
          <Route path={'/'} exact>
            <ScreenHome.Screen />
          </Route>
        </Switch>
      </Router>

      {screenStack.map(({ config, args }, idx) => (
        <div
          className={`screen-stack-fragment ${
            config.hideDefaultNavBar ? 'hide-default-navbar' : ''
          }`}
          key={idx}
          style={{ zIndex: idx + 1 }}
        >
          {!config.hideDefaultNavBar && (
            <NavBar
              icon={<Icon type="left" />}
              onLeftClick={popScreen}
              style={{
                color: config.titleFG,
                background: config.titleBG,
              }}
            >
              {config.Icon ? <config.Icon /> : null}
              {config.title}
            </NavBar>
          )}

          <div className={'screen-wrapper'}>
            <config.Screen {...{ ...args, inStack: true }} />
          </div>
        </div>
      ))}
    </ScreenStackContext.Provider>
  );
});
