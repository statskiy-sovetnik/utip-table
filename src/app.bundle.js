(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApiService = function () {
    function ApiService() {
        _classCallCheck(this, ApiService);
    }

    _createClass(ApiService, null, [{
        key: 'getPerson',
        value: function getPerson(id) {
            return fetch('https://swapi.dev/api/people/' + id, {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    Accept: 'application/json'
                }
            }).then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw 'Bad status code';
                }
            }).catch(function (err) {
                throw err;
            });
        }
    }]);

    return ApiService;
}();

exports.default = ApiService;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BODY_CELL_CLASS = 'data-table__body-cell';
var BODY_ROW_CLASS = 'data-table__body-row';

var DataRow = function () {
	function DataRow(id, name, height, hair_color, eye_color, birth_year, remove_row_handler) {
		_classCallCheck(this, DataRow);

		var row_element = document.createElement('tr');
		row_element.setAttribute('class', BODY_ROW_CLASS);

		var cells = [name, height, hair_color, eye_color, birth_year].map(function (content) {
			var cell = document.createElement('td');
			cell.innerHTML = content;
			cell.setAttribute('class', BODY_CELL_CLASS);
			return cell;
		});

		row_element.append.apply(row_element, [this.createRemoveRowCell(remove_row_handler)].concat(_toConsumableArray(cells)));

		Object.assign(this, {
			id: id,
			name: name,
			height: height,
			hair_color: hair_color,
			eye_color: eye_color,
			birth_year: birth_year,
			row_element: row_element
		});
	}

	_createClass(DataRow, [{
		key: 'createRemoveRowCell',
		value: function createRemoveRowCell(remove_row_handler) {
			var remove_btn_cell = document.createElement('td');
			var remove_btn = document.createElement('button');
			remove_btn.innerHTML = 'Удалить';
			remove_btn.addEventListener('click', remove_row_handler);
			remove_btn_cell.append(remove_btn);
			remove_btn_cell.setAttribute('class', BODY_CELL_CLASS);
			return remove_btn_cell;
		}
	}]);

	return DataRow;
}();

exports.default = DataRow;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ApiService = require('./ApiService');

var _ApiService2 = _interopRequireDefault(_ApiService);

var _DataRow = require('./DataRow');

var _DataRow2 = _interopRequireDefault(_DataRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TBODY_CLASS = 'data-table__body';

var DataTable = function () {
	function DataTable(table_id, head_class) {
		_classCallCheck(this, DataTable);

		this.is_table_empty = true;
		this.table_id = table_id;
		this.table_element = document.getElementById(table_id);
		this.thead_element = this.table_element.querySelector('.' + head_class);
	}

	_createClass(DataTable, [{
		key: 'renderTableBody',
		value: async function renderTableBody() {
			var table_body = document.createElement('tbody');
			table_body.setAttribute('class', TBODY_CLASS);

			this.removeTbodyElement();

			if (this.is_table_empty) {
				var empty_row = this.createEmptyRow();
				table_body.appendChild(empty_row);
			} else {
				table_body.append.apply(table_body, _toConsumableArray(this.table_rows.map(function (row) {
					return row.row_element;
				})));
			}

			this.table_element.appendChild(table_body);
			this.tbody_element = table_body;
		}
	}, {
		key: 'updateTableRows',
		value: async function updateTableRows() {
			try {
				var people_ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
				var data = await Promise.all(people_ids.map(function (id) {
					return _ApiService2.default.getPerson(id);
				}));
				var rows = this.patchRowsFromData(data);
				this.table_rows = rows;
				this.is_table_empty = rows.length === 0;
			} catch (err) {
				this.clearTable();
				console.log(err);
			}
		}
	}, {
		key: 'removeRow',
		value: function removeRow(id) {
			this.table_rows = this.table_rows.filter(function (row) {
				return row.id !== id;
			});
			if (this.table_rows.length === 0) {
				this.clearTable();
			}

			this.renderTableBody();
		}
	}, {
		key: 'removeTbodyElement',
		value: function removeTbodyElement() {
			if (this.tbody_element != undefined) {
				this.tbody_element.remove();
			}
			this.tbody_element = null;
		}
	}, {
		key: 'clearTable',
		value: function clearTable() {
			this.removeTbodyElement();
			this.is_table_empty = true;
			this.table_rows = null;

			this.renderTableBody();
		}
	}, {
		key: 'createEmptyRow',
		value: function createEmptyRow() {
			var empty_row = document.createElement('tr');
			var empty_cell = document.createElement('td');
			empty_cell.innerHTML = 'Нет данных';
			empty_row.appendChild(empty_cell);
			return empty_row;
		}
	}, {
		key: 'patchRowsFromData',
		value: function patchRowsFromData(data) {
			var _this = this;

			return data.map(function (data_obj, i) {
				return new _DataRow2.default(i, data_obj.name, data_obj.height, data_obj.hair_color, data_obj.eye_color, data_obj.birth_year, function () {
					_this.removeRow.bind(_this)(i);
				});
			});
		}
	}]);

	return DataTable;
}();

exports.default = DataTable;

},{"./ApiService":1,"./DataRow":2}],4:[function(require,module,exports){
'use strict';

var _DataTable = require('./DataTable');

var _DataTable2 = _interopRequireDefault(_DataTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var main_table = new _DataTable2.default('main-table', 'data-table__head');
var btn_get_data = document.getElementById('get-data-btn');
var btn_clear_table = document.getElementById('clear-table-btn');

main_table.renderTableBody();

btn_get_data.addEventListener('click', async function () {
    await main_table.updateTableRows();
    main_table.renderTableBody();
});

btn_clear_table.addEventListener('click', function () {
    main_table.clearTable();
});

},{"./DataTable":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvQXBpU2VydmljZS5qcyIsInNyYy9qcy9EYXRhUm93LmpzIiwic3JjL2pzL0RhdGFUYWJsZS5qcyIsInNyYy9qcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7SUNBcUIsVTs7Ozs7OztrQ0FDSCxFLEVBQUk7QUFDcEIsbUJBQU8sTUFBTSxrQ0FBa0MsRUFBeEMsRUFBNEM7QUFDbEQseUJBQVM7QUFDUixvQ0FBZ0IsaUNBRFI7QUFFUiw0QkFBUTtBQUZBO0FBRHlDLGFBQTVDLEVBS0osSUFMSSxDQU1HLG9CQUFZO0FBQ1Isb0JBQUcsU0FBUyxFQUFaLEVBQWdCO0FBQ1osMkJBQU8sU0FBUyxJQUFULEVBQVA7QUFDSCxpQkFGRCxNQUdLO0FBQ0QsMEJBQU0saUJBQU47QUFDSDtBQUNKLGFBYkosRUFjQyxLQWRELENBY08sZUFBTztBQUNYLHNCQUFNLEdBQU47QUFDSCxhQWhCQSxDQUFQO0FBaUJBOzs7Ozs7a0JBbkJtQixVOzs7Ozs7Ozs7Ozs7Ozs7QUNBckIsSUFBTSxrQkFBa0IsdUJBQXhCO0FBQ0EsSUFBTSxpQkFBaUIsc0JBQXZCOztJQUVxQixPO0FBU3BCLGtCQUNDLEVBREQsRUFFQyxJQUZELEVBR0MsTUFIRCxFQUlDLFVBSkQsRUFLQyxTQUxELEVBTUMsVUFORCxFQU9DLGtCQVBELEVBUUU7QUFBQTs7QUFDRCxNQUFJLGNBQWMsU0FBUyxhQUFULENBQXVCLElBQXZCLENBQWxCO0FBQ0EsY0FBWSxZQUFaLENBQXlCLE9BQXpCLEVBQWtDLGNBQWxDOztBQUVBLE1BQU0sUUFBUSxDQUFDLElBQUQsRUFBTyxNQUFQLEVBQWUsVUFBZixFQUEyQixTQUEzQixFQUFzQyxVQUF0QyxFQUFrRCxHQUFsRCxDQUNiLFVBQUMsT0FBRCxFQUFhO0FBQ1osT0FBSSxPQUFPLFNBQVMsYUFBVCxDQUF1QixJQUF2QixDQUFYO0FBQ0EsUUFBSyxT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Q0FBckI7QUFDQSxJQUFNLGtCQUFrQixTQUFTLGNBQVQsQ0FBd0IsaUJBQXhCLENBQXhCOztBQUVBLFdBQVcsZUFBWDs7QUFFQSxhQUFhLGdCQUFiLENBQThCLE9BQTlCLEVBQXVDLGtCQUFZO0FBQy9DLFVBQU0sV0FBVyxlQUFYLEVBQU47QUFDQSxlQUFXLGVBQVg7QUFDSCxDQUhEOztBQUtBLGdCQUFnQixnQkFBaEIsQ0FBaUMsT0FBakMsRUFBMEMsWUFBTTtBQUM1QyxlQUFXLFVBQVg7QUFDSCxDQUZEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBpU2VydmljZSB7XG5cdHN0YXRpYyBnZXRQZXJzb24oaWQpIHtcblx0XHRyZXR1cm4gZmV0Y2goJ2h0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvJyArIGlkLCB7XG5cdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOCcsXG5cdFx0XHRcdEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxuXHRcdFx0fSxcblx0XHR9KS50aGVuKFxuICAgICAgICAgICAgcmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIGlmKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93ICdCYWQgc3RhdHVzIGNvZGUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuXHR9XG59XG4iLCJjb25zdCBCT0RZX0NFTExfQ0xBU1MgPSAnZGF0YS10YWJsZV9fYm9keS1jZWxsJztcbmNvbnN0IEJPRFlfUk9XX0NMQVNTID0gJ2RhdGEtdGFibGVfX2JvZHktcm93JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YVJvdyB7XG5cdGlkO1xuXHRuYW1lO1xuXHRoZWlnaHQ7XG5cdGhhaXJfY29sb3I7XG5cdGV5ZV9jb2xvcjtcblx0YmlydGhfeWVhcjtcblx0cm93X2VsZW1lbnQ7XG5cblx0Y29uc3RydWN0b3IoXG5cdFx0aWQsXG5cdFx0bmFtZSxcblx0XHRoZWlnaHQsXG5cdFx0aGFpcl9jb2xvcixcblx0XHRleWVfY29sb3IsXG5cdFx0YmlydGhfeWVhcixcblx0XHRyZW1vdmVfcm93X2hhbmRsZXJcblx0KSB7XG5cdFx0bGV0IHJvd19lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcblx0XHRyb3dfZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgQk9EWV9ST1dfQ0xBU1MpO1xuXG5cdFx0Y29uc3QgY2VsbHMgPSBbbmFtZSwgaGVpZ2h0LCBoYWlyX2NvbG9yLCBleWVfY29sb3IsIGJpcnRoX3llYXJdLm1hcChcblx0XHRcdChjb250ZW50KSA9PiB7XG5cdFx0XHRcdGxldCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcblx0XHRcdFx0Y2VsbC5pbm5lckhUTUwgPSBjb250ZW50O1xuXHRcdFx0XHRjZWxsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBCT0RZX0NFTExfQ0xBU1MpO1xuXHRcdFx0XHRyZXR1cm4gY2VsbDtcblx0XHRcdH1cblx0XHQpO1xuXG5cdFx0cm93X2VsZW1lbnQuYXBwZW5kKHRoaXMuY3JlYXRlUmVtb3ZlUm93Q2VsbChyZW1vdmVfcm93X2hhbmRsZXIpLCAuLi5jZWxscyk7XG5cblx0XHRPYmplY3QuYXNzaWduKHRoaXMsIHtcblx0XHRcdGlkLFxuXHRcdFx0bmFtZSxcblx0XHRcdGhlaWdodCxcblx0XHRcdGhhaXJfY29sb3IsXG5cdFx0XHRleWVfY29sb3IsXG5cdFx0XHRiaXJ0aF95ZWFyLFxuXHRcdFx0cm93X2VsZW1lbnQsXG5cdFx0fSk7XG5cdH1cblxuXHRjcmVhdGVSZW1vdmVSb3dDZWxsKHJlbW92ZV9yb3dfaGFuZGxlcikge1xuXHRcdGxldCByZW1vdmVfYnRuX2NlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuXHRcdGxldCByZW1vdmVfYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cdFx0cmVtb3ZlX2J0bi5pbm5lckhUTUwgPSAn0KPQtNCw0LvQuNGC0YwnO1xuXHRcdHJlbW92ZV9idG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZW1vdmVfcm93X2hhbmRsZXIpO1xuXHRcdHJlbW92ZV9idG5fY2VsbC5hcHBlbmQocmVtb3ZlX2J0bik7XG5cdFx0cmVtb3ZlX2J0bl9jZWxsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBCT0RZX0NFTExfQ0xBU1MpO1xuXHRcdHJldHVybiByZW1vdmVfYnRuX2NlbGw7XG5cdH1cbn1cbiIsImltcG9ydCBBcGlTZXJ2aWNlIGZyb20gJy4vQXBpU2VydmljZSc7XG5pbXBvcnQgRGF0YVJvdyBmcm9tICcuL0RhdGFSb3cnO1xuXG5jb25zdCBUQk9EWV9DTEFTUyA9ICdkYXRhLXRhYmxlX19ib2R5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YVRhYmxlIHtcblx0aXNfdGFibGVfZW1wdHk7XG5cdHRhYmxlX2lkO1xuXHR0YWJsZV9lbGVtZW50O1xuXHR0aGVhZF9lbGVtZW50O1xuXHR0Ym9keV9lbGVtZW50O1xuXHR0YWJsZV9yb3dzO1xuXG5cdGNvbnN0cnVjdG9yKHRhYmxlX2lkLCBoZWFkX2NsYXNzKSB7XG5cdFx0dGhpcy5pc190YWJsZV9lbXB0eSA9IHRydWU7XG5cdFx0dGhpcy50YWJsZV9pZCA9IHRhYmxlX2lkO1xuXHRcdHRoaXMudGFibGVfZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhYmxlX2lkKTtcblx0XHR0aGlzLnRoZWFkX2VsZW1lbnQgPSB0aGlzLnRhYmxlX2VsZW1lbnQucXVlcnlTZWxlY3RvcignLicgKyBoZWFkX2NsYXNzKTtcblx0fVxuXG5cdGFzeW5jIHJlbmRlclRhYmxlQm9keSgpIHtcblx0XHRsZXQgdGFibGVfYm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rib2R5Jyk7XG5cdFx0dGFibGVfYm9keS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgVEJPRFlfQ0xBU1MpO1xuXG5cdFx0dGhpcy5yZW1vdmVUYm9keUVsZW1lbnQoKTtcblxuXHRcdGlmICh0aGlzLmlzX3RhYmxlX2VtcHR5KSB7XG5cdFx0XHRjb25zdCBlbXB0eV9yb3cgPSB0aGlzLmNyZWF0ZUVtcHR5Um93KCk7XG5cdFx0XHR0YWJsZV9ib2R5LmFwcGVuZENoaWxkKGVtcHR5X3Jvdyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhYmxlX2JvZHkuYXBwZW5kKC4uLnRoaXMudGFibGVfcm93cy5tYXAoKHJvdykgPT4gcm93LnJvd19lbGVtZW50KSk7XG5cdFx0fVxuXG5cdFx0dGhpcy50YWJsZV9lbGVtZW50LmFwcGVuZENoaWxkKHRhYmxlX2JvZHkpO1xuXHRcdHRoaXMudGJvZHlfZWxlbWVudCA9IHRhYmxlX2JvZHk7XG5cdH1cblxuXHRhc3luYyB1cGRhdGVUYWJsZVJvd3MoKSB7XG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHBlb3BsZV9pZHMgPSBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTBdO1xuXHRcdFx0Y29uc3QgZGF0YSA9IGF3YWl0IFByb21pc2UuYWxsKFxuXHRcdFx0XHRwZW9wbGVfaWRzLm1hcCgoaWQpID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gQXBpU2VydmljZS5nZXRQZXJzb24oaWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHRcdGNvbnN0IHJvd3MgPSB0aGlzLnBhdGNoUm93c0Zyb21EYXRhKGRhdGEpO1xuXHRcdFx0dGhpcy50YWJsZV9yb3dzID0gcm93cztcblx0XHRcdHRoaXMuaXNfdGFibGVfZW1wdHkgPSByb3dzLmxlbmd0aCA9PT0gMDtcblx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdHRoaXMuY2xlYXJUYWJsZSgpO1xuXHRcdFx0Y29uc29sZS5sb2coZXJyKTtcblx0XHR9XG5cdH1cblxuXHRyZW1vdmVSb3coaWQpIHtcblx0XHR0aGlzLnRhYmxlX3Jvd3MgPSB0aGlzLnRhYmxlX3Jvd3MuZmlsdGVyKChyb3cpID0+IHtcblx0XHRcdHJldHVybiByb3cuaWQgIT09IGlkO1xuXHRcdH0pO1xuICAgICAgICBpZih0aGlzLnRhYmxlX3Jvd3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyVGFibGUoKVxuICAgICAgICB9XG5cblx0XHR0aGlzLnJlbmRlclRhYmxlQm9keSgpO1xuXHR9XG5cblx0cmVtb3ZlVGJvZHlFbGVtZW50KCkge1xuXHRcdGlmICh0aGlzLnRib2R5X2VsZW1lbnQgIT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLnRib2R5X2VsZW1lbnQucmVtb3ZlKCk7XG5cdFx0fVxuXHRcdHRoaXMudGJvZHlfZWxlbWVudCA9IG51bGw7XG5cdH1cblxuXHRjbGVhclRhYmxlKCkge1xuXHRcdHRoaXMucmVtb3ZlVGJvZHlFbGVtZW50KCk7XG5cdFx0dGhpcy5pc190YWJsZV9lbXB0eSA9IHRydWU7XG5cdFx0dGhpcy50YWJsZV9yb3dzID0gbnVsbDtcblxuXHRcdHRoaXMucmVuZGVyVGFibGVCb2R5KCk7XG5cdH1cblxuXHRjcmVhdGVFbXB0eVJvdygpIHtcblx0XHRsZXQgZW1wdHlfcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcblx0XHRsZXQgZW1wdHlfY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG5cdFx0ZW1wdHlfY2VsbC5pbm5lckhUTUwgPSAn0J3QtdGCINC00LDQvdC90YvRhSc7XG5cdFx0ZW1wdHlfcm93LmFwcGVuZENoaWxkKGVtcHR5X2NlbGwpO1xuXHRcdHJldHVybiBlbXB0eV9yb3c7XG5cdH1cblxuXHRwYXRjaFJvd3NGcm9tRGF0YShkYXRhKSB7XG5cdFx0cmV0dXJuIGRhdGEubWFwKChkYXRhX29iaiwgaSkgPT4ge1xuXHRcdFx0cmV0dXJuIG5ldyBEYXRhUm93KFxuXHRcdFx0XHRpLFxuXHRcdFx0XHRkYXRhX29iai5uYW1lLFxuXHRcdFx0XHRkYXRhX29iai5oZWlnaHQsXG5cdFx0XHRcdGRhdGFfb2JqLmhhaXJfY29sb3IsXG5cdFx0XHRcdGRhdGFfb2JqLmV5ZV9jb2xvcixcblx0XHRcdFx0ZGF0YV9vYmouYmlydGhfeWVhcixcblx0XHRcdFx0KCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMucmVtb3ZlUm93LmJpbmQodGhpcykoaSk7XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cbn1cbiIsImltcG9ydCBEYXRhVGFibGUgZnJvbSAnLi9EYXRhVGFibGUnXG5cbmNvbnN0IG1haW5fdGFibGUgPSBuZXcgRGF0YVRhYmxlKCdtYWluLXRhYmxlJywgJ2RhdGEtdGFibGVfX2hlYWQnKVxuY29uc3QgYnRuX2dldF9kYXRhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dldC1kYXRhLWJ0bicpO1xuY29uc3QgYnRuX2NsZWFyX3RhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsZWFyLXRhYmxlLWJ0bicpO1xuXG5tYWluX3RhYmxlLnJlbmRlclRhYmxlQm9keSgpXG5cbmJ0bl9nZXRfZGF0YS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBtYWluX3RhYmxlLnVwZGF0ZVRhYmxlUm93cygpXG4gICAgbWFpbl90YWJsZS5yZW5kZXJUYWJsZUJvZHkoKVxufSlcblxuYnRuX2NsZWFyX3RhYmxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIG1haW5fdGFibGUuY2xlYXJUYWJsZSgpXG59KSJdfQ==
