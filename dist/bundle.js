(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["PDFFile"] = factory();
	else
		root["PDFFile"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 966:
/***/ ((module) => {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PDFFile = /*#__PURE__*/function () {
  function PDFFile(_ref) {
    var _ref$data = _ref.data,
        data = _ref$data === void 0 ? {} : _ref$data,
        config = _ref.config,
        wrapper = _ref.wrapper;

    _classCallCheck(this, PDFFile);

    this.data = data;
    this.config = config;
    this.wrapper = wrapper;
  }

  _createClass(PDFFile, [{
    key: "render",
    value: function render() {
      this.wrapper = document.createElement('div');
      this.wrapper.addEventListener('dragover', this.handleDragOver.bind(this));
      this.wrapper.addEventListener('drop', this.handleInputChange.bind(this));
      this.wrapper.addEventListener('paste', this.handlePaste.bind(this));

      if (this.data && this.data.url) {
        var objectElement = this.createPDFObjectElement(this.data.url);
        this.wrapper.innerHTML = '';
        this.wrapper.appendChild(objectElement);
      } else {
        var input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'application/pdf');
        input.addEventListener('input', this.handleInputChange.bind(this));
        this.wrapper.appendChild(input);
      }

      return this.wrapper;
    }
  }, {
    key: "handlePaste",
    value: function handlePaste(event) {
      var items = (event.clipboardData || event.originalEvent.clipboardData).items;
      var fileItem = Array.from(items).find(function (item) {
        return item.kind === 'file' && item.type === 'application/pdf';
      });

      if (!fileItem) {
        return;
      }

      var file = fileItem.getAsFile();
      this.uploadFile(file);
    }
  }, {
    key: "handleDragOver",
    value: function handleDragOver(event) {
      event.preventDefault();
    }
  }, {
    key: "handleInputChange",
    value: function handleInputChange(event) {
      var file = event.target.files[0];

      if (!file) {
        return;
      }

      this.uploadFile(file);
    }
  }, {
    key: "uploadFile",
    value: function () {
      var _uploadFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(file) {
        var formData, response, data, objectElement;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                formData = new FormData();
                formData.append('file', file);
                _context.prev = 2;
                _context.next = 5;
                return fetch(this.config.uploadEndpoint, {
                  method: 'POST',
                  body: formData
                });

              case 5:
                response = _context.sent;

                if (!response.ok) {
                  _context.next = 16;
                  break;
                }

                _context.next = 9;
                return response.json();

              case 9:
                data = _context.sent;
                this.data = {
                  url: data.file.url
                };
                objectElement = this.createPDFObjectElement(data.file.url);
                this.wrapper.innerHTML = '';
                this.wrapper.appendChild(objectElement);
                _context.next = 17;
                break;

              case 16:
                throw new Error('La carga del archivo ha fallado.');

              case 17:
                _context.next = 24;
                break;

              case 19:
                _context.prev = 19;
                _context.t0 = _context["catch"](2);
                console.error(_context.t0);
                alert('No se pudo cargar el archivo PDF.');
                this.wrapper.innerHTML = '';

              case 24:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 19]]);
      }));

      function uploadFile(_x) {
        return _uploadFile.apply(this, arguments);
      }

      return uploadFile;
    }()
  }, {
    key: "createPDFObjectElement",
    value: function createPDFObjectElement(url) {
      var objectElement = document.createElement('object');
      objectElement.setAttribute('data', url + '#toolbar=0');
      objectElement.setAttribute('type', 'application/pdf');
      objectElement.setAttribute('width', '100%');
      objectElement.setAttribute('height', '600px');
      var pElement = document.createElement('p');
      pElement.innerText = 'Este navegador no soporta mostrar archivos PDF. : ';
      var aElement = document.createElement('a');
      aElement.setAttribute('href', url + '#pagemode=none&toolbar=0&statusbar=0&messages=0&navpanes=0');
      aElement.innerText = 'Descárgalo para poder verlo.';
      pElement.appendChild(aElement);
      objectElement.appendChild(pElement);
      return objectElement;
    }
  }, {
    key: "save",
    value: function save() {
      return this.data;
    }
  }], [{
    key: "toolbox",
    get: function get() {
      return {
        title: 'PDF',
        icon: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21.75 18.75V3.25H8.983V9h-4.5V21.75h14.25v-3zm-2.25 2.25H10.483V10.5h9V21zm-5.25-5.25V13.5h2.25v2.25h2.25v2.25h-4.5zM5.983 8.5h2.25V6.25h-2.25v2.25zm4.5 10.5v-3h4.5v3h-4.5z" fill="currentColor"/></svg>'
      };
    }
  }, {
    key: "isReadOnlySupported",
    get: function get() {
      return true;
    }
  }]);

  return PDFFile;
}();

module.exports = PDFFile;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(966);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bundle.js.map