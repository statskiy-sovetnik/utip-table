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
        key: 'getData',
        value: function getData() {
            return new Promise(function (resolve) {
                resolve([{
                    id: 0,
                    name: 'Suka',
                    surname: 'Buka',
                    nick: 'Dodopizza',
                    cock: 'big'
                }, {
                    id: 1,
                    name: 'Mam',
                    surname: 'LFC',
                    nick: 'Random',
                    cock: 'small'
                }]);
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BODY_CELL_CLASS = 'data-table__body-cell';

var DataRow = function DataRow(id, name, surname, nick, cock) {
						_classCallCheck(this, DataRow);

						var row_element = document.createElement('tr');

						var i = document.createElement('td');
						i.innerHTML = id;
						i.setAttribute('class', BODY_CELL_CLASS);

						var n = document.createElement('td');
						n.innerHTML = name;
						n.setAttribute('class', BODY_CELL_CLASS);

						var s = document.createElement('td');
						s.innerHTML = surname;
						s.setAttribute('class', BODY_CELL_CLASS);

						var ni = document.createElement('td');
						ni.innerHTML = nick;
						ni.setAttribute('class', BODY_CELL_CLASS);

						var co = document.createElement('td');
						co.innerHTML = cock;
						co.setAttribute('class', BODY_CELL_CLASS);

						row_element.append(i, n, s, ni, co);

						Object.assign(this, {
												i: i,
												n: n,
												s: s,
												ni: ni,
												co: co,
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
			var data = await _ApiService2.default.getData();
			var rows = this.patchRowsFromData(data);
			this.table_rows = rows;
			this.is_table_empty = rows.length === 0;
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
				return new _DataRow2.default(data_obj.id, data_obj.name, data_obj.surname, data_obj.nick, data_obj.cock);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvQXBpU2VydmljZS5qcyIsInNyYy9qcy9EYXRhUm93LmpzIiwic3JjL2pzL0RhdGFUYWJsZS5qcyIsInNyYy9qcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7SUNBcUIsVTs7Ozs7OztrQ0FDQTtBQUNiLG1CQUFPLElBQUksT0FBSixDQUFZLG1CQUFXO0FBQzFCLHdCQUFRLENBQ0o7QUFDSSx3QkFBSSxDQURSO0FBRUksMEJBQU0sTUFGVjtBQUdJLDZCQUFTLE1BSGI7QUFJSSwwQkFBTSxXQUpWO0FBS0ksMEJBQU07QUFMVixpQkFESSxFQVFKO0FBQ0ksd0JBQUksQ0FEUjtBQUVJLDBCQUFNLEtBRlY7QUFHSSw2QkFBUyxLQUhiO0FBSUksMEJBQU0sUUFKVjtBQUtJLDBCQUFNO0FBTFYsaUJBUkksQ0FBUjtBQWdCSCxhQWpCTSxDQUFQO0FBa0JIOzs7Ozs7a0JBcEJnQixVOzs7Ozs7Ozs7OztBQ0FyQixJQUFNLGtCQUFrQix1QkFBeEI7O0lBRXFCLE8sR0FRcEIsaUJBQVksRUFBWixFQUFnQixJQUFoQixFQUFzQixPQUF0QixFQUErQixJQUEvQixFQUFxQyxJQUFyQyxFQUEyQztBQUFBOztBQUMxQyxVQUFJLGNBQWMsU0FBUyxhQUFULENBQXVCLElBQXZCLENBQWxCOztBQUVBLFVBQU0sSUFBSSxTQUFTLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBVjtBQUNBLFFBQUUsU0FBRixHQUFjLEVBQWQ7QUFDTSxRQUFFLFlBQUYsQ0FBZSxPQUFmLEVBQXdCLGVBQXhCOztBQUVOLFVBQU0sSUFBSSxTQUFTLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBVjtBQUNBLFFBQUUsU0FBRixHQUFjLElBQWQ7QUFDTSxRQUFFLFlBQUYsQ0FBZSxPQUFmLEVBQXdCLGVBQXhCOztBQUVOLFVBQU0sSUFBSSxTQUFTLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBVjtBQUNBLFFB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QUdOLFNBQVMsT0FISCxFQUlOLFNBQVMsSUFKSCxFQUtOLFNBQVMsSUFMSCxDQUFQO0FBT0EsSUFSTSxDQUFQO0FBU0E7Ozs7OztrQkF4RW1CLFM7Ozs7O0FDTHJCOzs7Ozs7QUFFQSxJQUFNLGFBQWEsSUFBSSxtQkFBSixDQUFjLFlBQWQsRUFBNEIsa0JBQTVCLENBQW5CO0FBQ0EsSUFBTSxlQUFlLFNBQVMsY0FBVCxDQUF3QixjQUF4QixDQUFyQjtBQUNBLElBQU0sa0JBQWtCLFNBQVMsY0FBVCxDQUF3QixpQkFBeEIsQ0FBeEI7O0FBRUEsV0FBVyxlQUFYOztBQUVBLGFBQWEsZ0JBQWIsQ0FBOEIsT0FBOUIsRUFBdUMsa0JBQVk7QUFDL0MsVUFBTSxXQUFXLGVBQVgsRUFBTjtBQUNBLGVBQVcsZUFBWDtBQUNILENBSEQ7O0FBS0EsZ0JBQWdCLGdCQUFoQixDQUFpQyxPQUFqQyxFQUEwQyxZQUFNO0FBQzVDLGVBQVcsVUFBWDtBQUNILENBRkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBBcGlTZXJ2aWNlIHtcbiAgICBzdGF0aWMgZ2V0RGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogMCxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ1N1a2EnLCBcbiAgICAgICAgICAgICAgICAgICAgc3VybmFtZTogJ0J1a2EnLCBcbiAgICAgICAgICAgICAgICAgICAgbmljazogJ0RvZG9waXp6YScsIFxuICAgICAgICAgICAgICAgICAgICBjb2NrOiAnYmlnJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogMSxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ01hbScsIFxuICAgICAgICAgICAgICAgICAgICBzdXJuYW1lOiAnTEZDJywgXG4gICAgICAgICAgICAgICAgICAgIG5pY2s6ICdSYW5kb20nLCBcbiAgICAgICAgICAgICAgICAgICAgY29jazogJ3NtYWxsJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdKVxuICAgICAgICB9KSAgICBcbiAgICB9XG59IiwiY29uc3QgQk9EWV9DRUxMX0NMQVNTID0gJ2RhdGEtdGFibGVfX2JvZHktY2VsbCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YVJvdyB7XG5cdGlkO1xuXHRuYW1lO1xuXHRzdXJuYW1lO1xuXHRuaWNrO1xuXHRjb2NrO1xuXHRyb3dfZWxlbWVudDtcblxuXHRjb25zdHJ1Y3RvcihpZCwgbmFtZSwgc3VybmFtZSwgbmljaywgY29jaykge1xuXHRcdGxldCByb3dfZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG5cblx0XHRjb25zdCBpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKVxuXHRcdGkuaW5uZXJIVE1MID0gaWRcbiAgICAgICAgaS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgQk9EWV9DRUxMX0NMQVNTKVxuXG5cdFx0Y29uc3QgbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJylcblx0XHRuLmlubmVySFRNTCA9IG5hbWVcbiAgICAgICAgbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgQk9EWV9DRUxMX0NMQVNTKVxuXG5cdFx0Y29uc3QgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJylcblx0XHRzLmlubmVySFRNTCA9IHN1cm5hbWVcbiAgICAgICAgcy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgQk9EWV9DRUxMX0NMQVNTKVxuXG5cdFx0Y29uc3QgbmkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpXG5cdFx0bmkuaW5uZXJIVE1MID0gbmlja1xuICAgICAgICBuaS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgQk9EWV9DRUxMX0NMQVNTKVxuXG5cdFx0Y29uc3QgY28gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuXHRcdGNvLmlubmVySFRNTCA9IGNvY2s7XG4gICAgICAgIGNvLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBCT0RZX0NFTExfQ0xBU1MpXG5cblx0XHRyb3dfZWxlbWVudC5hcHBlbmQoaSwgbiwgcywgbmksIGNvKTtcblxuXHRcdE9iamVjdC5hc3NpZ24odGhpcywge1xuXHRcdFx0aSxcblx0XHRcdG4sXG5cdFx0XHRzLFxuXHRcdFx0bmksXG5cdFx0XHRjbyxcblx0XHRcdHJvd19lbGVtZW50LFxuXHRcdH0pO1xuXHR9XG59XG4iLCJpbXBvcnQgQXBpU2VydmljZSBmcm9tICcuL0FwaVNlcnZpY2UnO1xuaW1wb3J0IERhdGFSb3cgZnJvbSAnLi9EYXRhUm93JztcblxuY29uc3QgVEJPRFlfQ0xBU1MgPSAnZGF0YS10YWJsZV9fYm9keSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGFUYWJsZSB7XG5cdGlzX3RhYmxlX2VtcHR5O1xuXHR0YWJsZV9pZDtcblx0dGFibGVfZWxlbWVudDtcblx0dGhlYWRfZWxlbWVudDtcbiAgICB0Ym9keV9lbGVtZW50O1xuXHR0YWJsZV9yb3dzO1xuXG5cdGNvbnN0cnVjdG9yKHRhYmxlX2lkLCBoZWFkX2NsYXNzKSB7XG5cdFx0dGhpcy5pc190YWJsZV9lbXB0eSA9IHRydWU7XG5cdFx0dGhpcy50YWJsZV9pZCA9IHRhYmxlX2lkO1xuXHRcdHRoaXMudGFibGVfZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhYmxlX2lkKTtcblx0XHR0aGlzLnRoZWFkX2VsZW1lbnQgPSB0aGlzLnRhYmxlX2VsZW1lbnQucXVlcnlTZWxlY3RvcignLicgKyBoZWFkX2NsYXNzKTtcblx0fVxuXG5cdGFzeW5jIHJlbmRlclRhYmxlQm9keSgpIHtcblx0XHRsZXQgdGFibGVfYm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rib2R5Jyk7XG5cdFx0dGFibGVfYm9keS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgVEJPRFlfQ0xBU1MpO1xuXG4gICAgICAgIHRoaXMucmVtb3ZlVGJvZHlFbGVtZW50KClcblxuXHRcdGlmICh0aGlzLmlzX3RhYmxlX2VtcHR5KSB7XG5cdFx0XHRjb25zdCBlbXB0eV9yb3cgPSB0aGlzLmNyZWF0ZUVtcHR5Um93KCk7XG5cdFx0XHR0YWJsZV9ib2R5LmFwcGVuZENoaWxkKGVtcHR5X3Jvdyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhYmxlX2JvZHkuYXBwZW5kKC4uLnRoaXMudGFibGVfcm93cy5tYXAoKHJvdykgPT4gcm93LnJvd19lbGVtZW50KSk7XG5cdFx0fVxuXG5cdFx0dGhpcy50YWJsZV9lbGVtZW50LmFwcGVuZENoaWxkKHRhYmxlX2JvZHkpO1xuICAgICAgICB0aGlzLnRib2R5X2VsZW1lbnQgPSB0YWJsZV9ib2R5O1xuXHR9XG5cblx0YXN5bmMgdXBkYXRlVGFibGVSb3dzKCkge1xuXHRcdGNvbnN0IGRhdGEgPSBhd2FpdCBBcGlTZXJ2aWNlLmdldERhdGEoKTtcblx0XHRjb25zdCByb3dzID0gdGhpcy5wYXRjaFJvd3NGcm9tRGF0YShkYXRhKTtcblx0XHR0aGlzLnRhYmxlX3Jvd3MgPSByb3dzO1xuXHRcdHRoaXMuaXNfdGFibGVfZW1wdHkgPSByb3dzLmxlbmd0aCA9PT0gMDtcblx0fVxuXG4gICAgcmVtb3ZlVGJvZHlFbGVtZW50KCkge1xuICAgICAgICBpZih0aGlzLnRib2R5X2VsZW1lbnQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnRib2R5X2VsZW1lbnQucmVtb3ZlKClcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRib2R5X2VsZW1lbnQgPSBudWxsO1xuICAgIH1cblxuICAgIGNsZWFyVGFibGUoKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlVGJvZHlFbGVtZW50KClcbiAgICAgICAgdGhpcy5pc190YWJsZV9lbXB0eSA9IHRydWVcbiAgICAgICAgdGhpcy50YWJsZV9yb3dzID0gbnVsbFxuXG4gICAgICAgIHRoaXMucmVuZGVyVGFibGVCb2R5KClcbiAgICB9XG5cblx0Y3JlYXRlRW1wdHlSb3coKSB7XG5cdFx0bGV0IGVtcHR5X3JvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG5cdFx0bGV0IGVtcHR5X2NlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuXHRcdGVtcHR5X2NlbGwuaW5uZXJIVE1MID0gJ9Cd0LXRgiDQtNCw0L3QvdGL0YUnO1xuXHRcdGVtcHR5X3Jvdy5hcHBlbmRDaGlsZChlbXB0eV9jZWxsKTtcblx0XHRyZXR1cm4gZW1wdHlfcm93O1xuXHR9XG5cblx0cGF0Y2hSb3dzRnJvbURhdGEoZGF0YSkge1xuXHRcdHJldHVybiBkYXRhLm1hcCgoZGF0YV9vYmopID0+IHtcblx0XHRcdHJldHVybiBuZXcgRGF0YVJvdyhcblx0XHRcdFx0ZGF0YV9vYmouaWQsXG5cdFx0XHRcdGRhdGFfb2JqLm5hbWUsXG5cdFx0XHRcdGRhdGFfb2JqLnN1cm5hbWUsXG5cdFx0XHRcdGRhdGFfb2JqLm5pY2ssXG5cdFx0XHRcdGRhdGFfb2JqLmNvY2tcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cbn1cbiIsImltcG9ydCBEYXRhVGFibGUgZnJvbSAnLi9EYXRhVGFibGUnXG5cbmNvbnN0IG1haW5fdGFibGUgPSBuZXcgRGF0YVRhYmxlKCdtYWluLXRhYmxlJywgJ2RhdGEtdGFibGVfX2hlYWQnKVxuY29uc3QgYnRuX2dldF9kYXRhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dldC1kYXRhLWJ0bicpO1xuY29uc3QgYnRuX2NsZWFyX3RhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsZWFyLXRhYmxlLWJ0bicpO1xuXG5tYWluX3RhYmxlLnJlbmRlclRhYmxlQm9keSgpXG5cbmJ0bl9nZXRfZGF0YS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBtYWluX3RhYmxlLnVwZGF0ZVRhYmxlUm93cygpXG4gICAgbWFpbl90YWJsZS5yZW5kZXJUYWJsZUJvZHkoKVxufSlcblxuYnRuX2NsZWFyX3RhYmxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIG1haW5fdGFibGUuY2xlYXJUYWJsZSgpXG59KSJdfQ==
