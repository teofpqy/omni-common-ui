import React from 'react';
import { mount } from 'enzyme';
import Config from 'domain/Config';
import IdleTimeoutHandler from './IdleTimeoutHandler';

jest.mock('data/SingleSignOn', () => {  // eslint-disable-line
  const userManager = {
    signInRedirectWithValidation: jest.fn(),
    signInRedirect: jest.fn(),
    signOutRedirect: jest.fn(),
    forceSignOutRedirect: jest.fn(),
  };
  return {
    createUserManager: () => userManager,
  };
});

const mountComponent = () => mount(<IdleTimeoutHandler><div id="inner" /></IdleTimeoutHandler>);

beforeEach(() => {
  jest.resetAllMocks();
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
});

describe('when autoSignOutTimeout is false', () => {
  beforeEach(() => {
    Config.merge({ autoSignOutTimeout: false });
  });

  test('does not call userManager.forceSignOutRedirect()', () => {
    const createUserManager = require('data/SingleSignOn').createUserManager;
    mountComponent();
    jest.runAllTimers();
    expect(createUserManager().forceSignOutRedirect).not.toHaveBeenCalled();
  });

  test('renders its children', () => {
    const wrapper = mountComponent();
    expect(wrapper.find('#inner')).toHaveLength(1);
  });
});

describe('when autoSignOutTimeout is a number', () => {
  const autoSignOutTimeout = 1;
  beforeEach(() => {
    Config.merge({ autoSignOutTimeout });
  });

  test('calls userManager.forceSignOutRedirect() after the seconds set in autoSignOutTimeout', () => {
    const createUserManager = require('data/SingleSignOn').createUserManager;
    mountComponent();
    jest.runAllTimers();
    expect(createUserManager().forceSignOutRedirect).toHaveBeenCalled();
  });

  test('does not call userManager.forceSignOutRedirect() after the seconds set in autoSignOutTimeout ' +
      'if there are some user interactions happening', () => {
    const createUserManager = require('data/SingleSignOn').createUserManager;
    const halfTimeoutTime = (autoSignOutTimeout * 1000) / 2;
    mountComponent();
    jest.runTimersToTime(halfTimeoutTime);
    window.document.dispatchEvent(new Event('click'));
    jest.runTimersToTime(halfTimeoutTime);
    expect(createUserManager().forceSignOutRedirect).not.toHaveBeenCalled();
  });

  test('renders its children', () => {
    const wrapper = mountComponent();
    expect(wrapper.find('#inner')).toHaveLength(1);
  });
});
