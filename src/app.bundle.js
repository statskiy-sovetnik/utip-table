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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BODY_CELL_CLASS = 'data-table__body-cell';

var DataRow = function DataRow(name, height, hair_color, eye_color, birth_year) {
	_classCallCheck(this, DataRow);

	var row_element = document.createElement('tr');

	var cells = [name, height, hair_color, eye_color, birth_year].map(function (content) {
		var cell = document.createElement('td');
		cell.innerHTML = content;
		cell.setAttribute('class', BODY_CELL_CLASS);
		return cell;
	});

	row_element.append.apply(row_element, _toConsumableArray(cells));

	Object.assign(this, {
		name: name,
		height: height,
		hair_color: hair_color,
		eye_color: eye_color,
		birth_year: birth_year,
		row_element: row_element
	});
};

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
			return data.map(function (data_obj) {
				return new _DataRow2.default(data_obj.name, data_obj.height, data_obj.hair_color, data_obj.eye_color, data_obj.birth_year);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvQXBpU2VydmljZS5qcyIsInNyYy9qcy9EYXRhUm93LmpzIiwic3JjL2pzL0RhdGFUYWJsZS5qcyIsInNyYy9qcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7SUNBcUIsVTs7Ozs7OztrQ0FDSCxFLEVBQUk7QUFDcEIsbUJBQU8sTUFBTSxrQ0FBa0MsRUFBeEMsRUFBNEM7QUFDbEQseUJBQVM7QUFDUixvQ0FBZ0IsaUNBRFI7QUFFUiw0QkFBUTtBQUZBO0FBRHlDLGFBQTVDLEVBS0osSUFMSSxDQU1HLG9CQUFZO0FBQ1Isb0JBQUcsU0FBUyxFQUFaLEVBQWdCO0FBQ1osMkJBQU8sU0FBUyxJQUFULEVBQVA7QUFDSCxpQkFGRCxNQUdLO0FBQ0QsMEJBQU0saUJBQU47QUFDSDtBQUNKLGFBYkosRUFjQyxLQWRELENBY08sZUFBTztBQUNYLHNCQUFNLEdBQU47QUFDSCxhQWhCQSxDQUFQO0FBaUJBOzs7Ozs7a0JBbkJtQixVOzs7Ozs7Ozs7Ozs7O0FDQXJCLElBQU0sa0JBQWtCLHVCQUF4Qjs7SUFFcUIsTyxHQVFwQixpQkFBWSxJQUFaLEVBQWtCLE1BQWxCLEVBQTBCLFVBQTFCLEVBQXNDLFNBQXRDLEVBQWlELFVBQWpELEVBQTZEO0FBQUE7O0FBQzVELEtBQUksY0FBYyxTQUFTLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBbEI7O0FBRUEsS0FBTSxRQUFRLENBQUMsSUFBRCxFQUFPLE1BQVAsRUFBZSxVQUFmLEVBQTJCLFNBQTNCLEVBQXNDLFVBQXRDLEVBQWtELEdBQWxELENBQ2IsbUJBQVc7QUFDRSxNQUFJLE9BQU8sU0FBUyxhQUFULENBQXVCLElBQXZCLENBQVg7QUFDQSxPQUFLLFNBQUwsR0FBaUIsT0FBakI7QUFDQSxPQUFLLFlBQUwsQ0FBa0IsT0FBbEIsRUFBMkIsZUFBM0I7QUFDQSxTQUFPLElBQVA7QUFDSCxFQU5HLENBQWQ7O0FBU0EsYUFBWSxNQUFaLHVDQUFzQixLQUF0Qjs7QUFFQSxRQUFPLE1BQVAsQ0FBYyxJQUFkLEVBQW9CO0FBQ25CLFlBRG1CO0FBRVYsZ0JBRlU7QUFHVix3QkFIVTtBQUlWLHNCQUpVO0FBS1Ysd0JBTFU7QUFNbkI7QUFObUIsRUFBcEI7QUFRQSxDOztrQkE5Qm1CLE87Ozs7Ozs7Ozs7O0FDRnJCOzs7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQSxJQUFNLGNBQWMsa0JBQXBCOztJQUVxQixTO0FBUXBCLG9CQUFZLFFBQVosRUFBc0IsVUFBdEIsRUFBa0M7QUFBQTs7QUFDakMsT0FBSyxjQUFMLEdBQXNCLElBQXRCO0FBQ0EsT0FBSyxRQUFMLEdBQWdCLFFBQWhCO0FBQ0EsT0FBSyxhQUFMLEdBQXFCLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQUFyQjtBQUNBLE9BQUssYUFBTCxHQUFxQixLQUFLLGFBQUwsQ0FBbUIsYUFBbkIsQ0FBaUMsTUFBTSxVQUF2QyxDQUFyQjtBQUNBOzs7OzBDQUV1QjtBQUN2QixPQUFJLGFBQWEsU0FBUyxhQUFULENBQXVCLE9BQXZCLENBQWpCO0FBQ0EsY0FBVyxZQUFYLENBQXdCLE9BQXhCLEVBQWlDLFdBQWpDOztBQUVBLFFBQUssa0JBQUw7O0FBRUEsT0FBSSxLQUFLLGNBQVQsRUFBeUI7QUFDeEIsUUFBTSxZQUFZLEtBQUssY0FBTCxFQUFsQjtBQUNBLGVBQVcsV0FBWCxDQUF1QixTQUF2QjtBQUNBLElBSEQsTUFHTztBQUNOLGVBQVcsTUFBWCxzQ0FBcUIsS0FBSyxVQUFMLENBQWdCLEdBQWhCLENBQW9CLFVBQUMsR0FBRDtBQUFBLFlBQVMsSUFBSSxXQUFiO0FBQUEsS0FBcEIsQ0FBckI7QUFDQTs7QUFFRCxRQUFLLGFBQUwsQ0FBbUIsV0FBbkIsQ0FBK0IsVUFBL0I7QUFDQSxRQUFLLGFBQUwsR0FBcUIsVUFBckI7QUFDQTs7OzBDQUV1QjtBQUN2QixPQUFJO0FBQ0gsUUFBTSxhQUFhLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsRUFBNUIsQ0FBbkI7QUFDQSxRQUFNLE9BQU8sTUFBTSxRQUFRLEdBQVIsQ0FDbEIsV0FBVyxHQUFYLENBQWUsVUFBQyxFQUFELEVBQVE7QUFDdEIsWUFBTyxxQkFBVyxTQUFYLENBQXFCLEVBQXJCLENBQVA7QUFDQSxLQUZELENBRGtCLENBQW5CO0FBS0EsUUFBTSxPQUFPLEtBQUssaUJBQUwsQ0FBdUIsSUFBdkIsQ0FBYjtBQUNBLFNBQUssVUFBTCxHQUFrQixJQUFsQjtBQUNBLFNBQUssY0FBTCxHQUFzQixLQUFLLE1BQUwsS0FBZ0IsQ0FBdEM7QUFDQSxJQVZELENBVUUsT0FBTyxHQUFQLEVBQVk7QUFDYixTQUFLLFVBQUw7QUFDQSxZQUFRLEdBQVIsQ0FBWSxHQUFaO0FBQ0E7QUFDRDs7O3VDQUVvQjtBQUNwQixPQUFJLEtBQUssYUFBTCxJQUFzQixTQUExQixFQUFxQztBQUNwQyxTQUFLLGFBQUwsQ0FBbUIsTUFBbkI7QUFDQTtBQUNELFFBQUssYUFBTCxHQUFxQixJQUFyQjtBQUNBOzs7K0JBRVk7QUFDWixRQUFLLGtCQUFMO0FBQ0EsUUFBSyxjQUFMLEdBQXNCLElBQXRCO0FBQ0EsUUFBSyxVQUFMLEdBQWtCLElBQWxCOztBQUVBLFFBQUssZUFBTDtBQUNBOzs7bUNBRWdCO0FBQ2hCLE9BQUksWUFBWSxTQUFTLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBaEI7QUFDQSxPQUFJLGFBQWEsU0FBUyxhQUFULENBQXVCLElBQXZCLENBQWpCO0FBQ0EsY0FBVyxTQUFYLEdBQXVCLFlBQXZCO0FBQ0EsYUFBVSxXQUFWLENBQXNCLFVBQXRCO0FBQ0EsVUFBTyxTQUFQO0FBQ0E7OztvQ0FFaUIsSSxFQUFNO0FBQ3ZCLFVBQU8sS0FBSyxHQUFMLENBQVMsVUFBQyxRQUFELEVBQWM7QUFDN0IsV0FBTyxJQUFJLGlCQUFKLENBQ04sU0FBUyxJQURILEVBRU4sU0FBUyxNQUZILEVBR04sU0FBUyxVQUhILEVBSU4sU0FBUyxTQUpILEVBS04sU0FBUyxVQUxILENBQVA7QUFPQSxJQVJNLENBQVA7QUFTQTs7Ozs7O2tCQWxGbUIsUzs7Ozs7QUNMckI7Ozs7OztBQUVBLElBQU0sYUFBYSxJQUFJLG1CQUFKLENBQWMsWUFBZCxFQUE0QixrQkFBNUIsQ0FBbkI7QUFDQSxJQUFNLGVBQWUsU0FBUyxjQUFULENBQXdCLGNBQXhCLENBQXJCO0FBQ0EsSUFBTSxrQkFBa0IsU0FBUyxjQUFULENBQXdCLGlCQUF4QixDQUF4Qjs7QUFFQSxXQUFXLGVBQVg7O0FBRUEsYUFBYSxnQkFBYixDQUE4QixPQUE5QixFQUF1QyxrQkFBWTtBQUMvQyxVQUFNLFdBQVcsZUFBWCxFQUFOO0FBQ0EsZUFBVyxlQUFYO0FBQ0gsQ0FIRDs7QUFLQSxnQkFBZ0IsZ0JBQWhCLENBQWlDLE9BQWpDLEVBQTBDLFlBQU07QUFDNUMsZUFBVyxVQUFYO0FBQ0gsQ0FGRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwaVNlcnZpY2Uge1xuXHRzdGF0aWMgZ2V0UGVyc29uKGlkKSB7XG5cdFx0cmV0dXJuIGZldGNoKCdodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLycgKyBpZCwge1xuXHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLTgnLFxuXHRcdFx0XHRBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcblx0XHRcdH0sXG5cdFx0fSkudGhlbihcbiAgICAgICAgICAgIHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICBpZihyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyAnQmFkIHN0YXR1cyBjb2RlJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgKS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcblx0fVxufVxuIiwiY29uc3QgQk9EWV9DRUxMX0NMQVNTID0gJ2RhdGEtdGFibGVfX2JvZHktY2VsbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGFSb3cge1xuXHRuYW1lO1xuXHRoZWlnaHQ7XG5cdGhhaXJfY29sb3I7XG5cdGV5ZV9jb2xvcjtcblx0YmlydGhfeWVhcjtcblx0cm93X2VsZW1lbnQ7XG5cblx0Y29uc3RydWN0b3IobmFtZSwgaGVpZ2h0LCBoYWlyX2NvbG9yLCBleWVfY29sb3IsIGJpcnRoX3llYXIpIHtcblx0XHRsZXQgcm93X2VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuXG5cdFx0Y29uc3QgY2VsbHMgPSBbbmFtZSwgaGVpZ2h0LCBoYWlyX2NvbG9yLCBleWVfY29sb3IsIGJpcnRoX3llYXJdLm1hcChcblx0XHRcdGNvbnRlbnQgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKVxuICAgICAgICAgICAgICAgIGNlbGwuaW5uZXJIVE1MID0gY29udGVudFxuICAgICAgICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCdjbGFzcycsIEJPRFlfQ0VMTF9DTEFTUylcbiAgICAgICAgICAgICAgICByZXR1cm4gY2VsbFxuICAgICAgICAgICAgfVxuXHRcdCk7XG5cblx0XHRyb3dfZWxlbWVudC5hcHBlbmQoLi4uY2VsbHMpO1xuXG5cdFx0T2JqZWN0LmFzc2lnbih0aGlzLCB7XG5cdFx0XHRuYW1lLFxuICAgICAgICAgICAgaGVpZ2h0LFxuICAgICAgICAgICAgaGFpcl9jb2xvcixcbiAgICAgICAgICAgIGV5ZV9jb2xvcixcbiAgICAgICAgICAgIGJpcnRoX3llYXIsXG5cdFx0XHRyb3dfZWxlbWVudCxcblx0XHR9KTtcblx0fVxufVxuIiwiaW1wb3J0IEFwaVNlcnZpY2UgZnJvbSAnLi9BcGlTZXJ2aWNlJztcbmltcG9ydCBEYXRhUm93IGZyb20gJy4vRGF0YVJvdyc7XG5cbmNvbnN0IFRCT0RZX0NMQVNTID0gJ2RhdGEtdGFibGVfX2JvZHknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRhVGFibGUge1xuXHRpc190YWJsZV9lbXB0eTtcblx0dGFibGVfaWQ7XG5cdHRhYmxlX2VsZW1lbnQ7XG5cdHRoZWFkX2VsZW1lbnQ7XG5cdHRib2R5X2VsZW1lbnQ7XG5cdHRhYmxlX3Jvd3M7XG5cblx0Y29uc3RydWN0b3IodGFibGVfaWQsIGhlYWRfY2xhc3MpIHtcblx0XHR0aGlzLmlzX3RhYmxlX2VtcHR5ID0gdHJ1ZTtcblx0XHR0aGlzLnRhYmxlX2lkID0gdGFibGVfaWQ7XG5cdFx0dGhpcy50YWJsZV9lbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFibGVfaWQpO1xuXHRcdHRoaXMudGhlYWRfZWxlbWVudCA9IHRoaXMudGFibGVfZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuJyArIGhlYWRfY2xhc3MpO1xuXHR9XG5cblx0YXN5bmMgcmVuZGVyVGFibGVCb2R5KCkge1xuXHRcdGxldCB0YWJsZV9ib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGJvZHknKTtcblx0XHR0YWJsZV9ib2R5LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBUQk9EWV9DTEFTUyk7XG5cblx0XHR0aGlzLnJlbW92ZVRib2R5RWxlbWVudCgpO1xuXG5cdFx0aWYgKHRoaXMuaXNfdGFibGVfZW1wdHkpIHtcblx0XHRcdGNvbnN0IGVtcHR5X3JvdyA9IHRoaXMuY3JlYXRlRW1wdHlSb3coKTtcblx0XHRcdHRhYmxlX2JvZHkuYXBwZW5kQ2hpbGQoZW1wdHlfcm93KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFibGVfYm9keS5hcHBlbmQoLi4udGhpcy50YWJsZV9yb3dzLm1hcCgocm93KSA9PiByb3cucm93X2VsZW1lbnQpKTtcblx0XHR9XG5cblx0XHR0aGlzLnRhYmxlX2VsZW1lbnQuYXBwZW5kQ2hpbGQodGFibGVfYm9keSk7XG5cdFx0dGhpcy50Ym9keV9lbGVtZW50ID0gdGFibGVfYm9keTtcblx0fVxuXG5cdGFzeW5jIHVwZGF0ZVRhYmxlUm93cygpIHtcblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcGVvcGxlX2lkcyA9IFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMF07XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgUHJvbWlzZS5hbGwoXG5cdFx0XHRcdHBlb3BsZV9pZHMubWFwKChpZCkgPT4ge1xuXHRcdFx0XHRcdHJldHVybiBBcGlTZXJ2aWNlLmdldFBlcnNvbihpZCk7XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdFx0Y29uc3Qgcm93cyA9IHRoaXMucGF0Y2hSb3dzRnJvbURhdGEoZGF0YSk7XG5cdFx0XHR0aGlzLnRhYmxlX3Jvd3MgPSByb3dzO1xuXHRcdFx0dGhpcy5pc190YWJsZV9lbXB0eSA9IHJvd3MubGVuZ3RoID09PSAwO1xuXHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0dGhpcy5jbGVhclRhYmxlKCk7XG5cdFx0XHRjb25zb2xlLmxvZyhlcnIpO1xuXHRcdH1cblx0fVxuXG5cdHJlbW92ZVRib2R5RWxlbWVudCgpIHtcblx0XHRpZiAodGhpcy50Ym9keV9lbGVtZW50ICE9IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhpcy50Ym9keV9lbGVtZW50LnJlbW92ZSgpO1xuXHRcdH1cblx0XHR0aGlzLnRib2R5X2VsZW1lbnQgPSBudWxsO1xuXHR9XG5cblx0Y2xlYXJUYWJsZSgpIHtcblx0XHR0aGlzLnJlbW92ZVRib2R5RWxlbWVudCgpO1xuXHRcdHRoaXMuaXNfdGFibGVfZW1wdHkgPSB0cnVlO1xuXHRcdHRoaXMudGFibGVfcm93cyA9IG51bGw7XG5cblx0XHR0aGlzLnJlbmRlclRhYmxlQm9keSgpO1xuXHR9XG5cblx0Y3JlYXRlRW1wdHlSb3coKSB7XG5cdFx0bGV0IGVtcHR5X3JvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG5cdFx0bGV0IGVtcHR5X2NlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuXHRcdGVtcHR5X2NlbGwuaW5uZXJIVE1MID0gJ9Cd0LXRgiDQtNCw0L3QvdGL0YUnO1xuXHRcdGVtcHR5X3Jvdy5hcHBlbmRDaGlsZChlbXB0eV9jZWxsKTtcblx0XHRyZXR1cm4gZW1wdHlfcm93O1xuXHR9XG5cblx0cGF0Y2hSb3dzRnJvbURhdGEoZGF0YSkge1xuXHRcdHJldHVybiBkYXRhLm1hcCgoZGF0YV9vYmopID0+IHtcblx0XHRcdHJldHVybiBuZXcgRGF0YVJvdyhcblx0XHRcdFx0ZGF0YV9vYmoubmFtZSxcblx0XHRcdFx0ZGF0YV9vYmouaGVpZ2h0LFxuXHRcdFx0XHRkYXRhX29iai5oYWlyX2NvbG9yLFxuXHRcdFx0XHRkYXRhX29iai5leWVfY29sb3IsXG5cdFx0XHRcdGRhdGFfb2JqLmJpcnRoX3llYXJcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cbn1cbiIsImltcG9ydCBEYXRhVGFibGUgZnJvbSAnLi9EYXRhVGFibGUnXG5cbmNvbnN0IG1haW5fdGFibGUgPSBuZXcgRGF0YVRhYmxlKCdtYWluLXRhYmxlJywgJ2RhdGEtdGFibGVfX2hlYWQnKVxuY29uc3QgYnRuX2dldF9kYXRhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dldC1kYXRhLWJ0bicpO1xuY29uc3QgYnRuX2NsZWFyX3RhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsZWFyLXRhYmxlLWJ0bicpO1xuXG5tYWluX3RhYmxlLnJlbmRlclRhYmxlQm9keSgpXG5cbmJ0bl9nZXRfZGF0YS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBtYWluX3RhYmxlLnVwZGF0ZVRhYmxlUm93cygpXG4gICAgbWFpbl90YWJsZS5yZW5kZXJUYWJsZUJvZHkoKVxufSlcblxuYnRuX2NsZWFyX3RhYmxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIG1haW5fdGFibGUuY2xlYXJUYWJsZSgpXG59KSJdfQ==
