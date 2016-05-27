import React from 'react';
import Sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import ExpandedView from './';

describe('Table', () => {
  describe('Expandable', () => {
    describe('ExpandedView', () => {
      it('renders its children', () => {
        const wrapper = shallow(<ExpandedView><div id="innerContent" /></ExpandedView>);
        expect(wrapper.contains(<div id="innerContent" />)).to.be.true;
      });

      describe('when onHeightChanged is not provided', () => {
        it('does not check for any resizing', () => {
          const wrapper = mount(<ExpandedView />);
          expect(wrapper.instance().resizeSensor).to.be.undefined;
        });
      });

      describe('when onHeightChanged is provided', () => {
        it('calls onHeightChanged after mounting', () => {
          const onHeightChanged = Sinon.spy();
          mount(<ExpandedView onHeightChanged={onHeightChanged} />);
          expect(onHeightChanged.called).to.be.true;
        });

        it('sets up ResizeSensor after mounting', () => {
          const wrapper = mount(<ExpandedView onHeightChanged={() => {}} />);
          expect(wrapper.instance().resizeSensor).to.be.an('object');
        });

        it('cleans up resizing sensors when unmounted', () => {
          const wrapper = mount(<ExpandedView onHeightChanged={() => {}} />);
          const resizeSensor = wrapper.instance().resizeSensor;
          resizeSensor.detach = Sinon.spy();
          wrapper.unmount();
          expect(resizeSensor.detach.called).to.be.true;
        });
      });
    });
  });
});
