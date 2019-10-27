import React from 'react';
import {configure,shallow} from 'enzyme';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';
configure({adapter:new Adapter()});
import Adapter from 'enzyme-adapter-react-16';
describe('<NavigationItems/>', () => {
    it('should render tow <NavigationItems/> elements if not authentication',()=>{
     const wrapper = shallow(<NavigationItems/>);
     expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
})
