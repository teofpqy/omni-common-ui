'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorPage = undefined;

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _Icon = require('./../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ErrorPage = exports.ErrorPage = function ErrorPage(props) {
  var config = props.config;


  return _react2.default.createElement(
    'div',
    { className: _style2.default.ErrorPage },
    _react2.default.createElement(
      'div',
      { className: _style2.default.ErrorPage_content },
      _react2.default.createElement(_Icon2.default, { className: _style2.default.ErrorPage_image, id: renderIcon() }),
      _react2.default.createElement(
        'div',
        { className: _style2.default.ErrorPage_text },
        renderMessage()
      )
    )
  );

  function renderIcon() {
    if (_is_js2.default.not.object(config) || _is_js2.default.not.function(config.icon)) {
      return 'warning';
    }

    return config.icon(props);
  }

  function renderMessage() {
    if (_is_js2.default.not.object(config) || _is_js2.default.not.function(config.message)) {
      return 'Omni could not load this page.';
    }

    return config.message(props);
  }
};

ErrorPage.propTypes = {
  replace: _propTypes2.default.func.isRequired,
  location: _propTypes2.default.shape({
    pathname: _propTypes2.default.string.isRequired
  }).isRequired,
  config: _propTypes2.default.shape({
    icon: _propTypes2.default.func,
    message: _propTypes2.default.func
  })
};

exports.default = (0, _recompose.pure)(ErrorPage);
//# sourceMappingURL=index.js.map