"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var router = _express["default"].Router();

router.get('/', function (req, res, next) {
  return res.json({
    route: 'index'
  });
});
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=index.js.map