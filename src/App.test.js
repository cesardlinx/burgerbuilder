import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Route } from 'react-router-dom';
import { App } from './App';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';


configure({ adapter: new Adapter() });

describe('<App />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App onAuthCheckState={() => {}}/>);
  });

  it('should return the <BurgerBuilder /> component on route "/" ', () => {
    const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
      const routeProps = route.props();
      pathMap[routeProps.path] = routeProps.component;
      return pathMap;
    }, {});

    expect(pathMap['/']).toBe(BurgerBuilder);
  });

  it('should render <Logout />, <Checkout /> and <Orders /> only when authenticated', () => {

    expect(wrapper.find({ path: '/logout' })).toHaveLength(0);
    expect(wrapper.find({ path: '/checkout' })).toHaveLength(0);
    expect(wrapper.find({ path: '/orders' })).toHaveLength(0);

    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find({ path: '/logout' })).toHaveLength(1);
    expect(wrapper.find({ path: '/checkout' })).toHaveLength(1);
    expect(wrapper.find({ path: '/orders' })).toHaveLength(1);

  });

});
