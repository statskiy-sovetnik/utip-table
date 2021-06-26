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
			remove_btn_cell.setAttribute('class', BODY_CELL_CLASS + ' body-cell_remove-row');
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
var HEAD_CELL_CLASS = 'data-table__head-cell';
var SORT_ICON_REL_PATH = 'src/assets/arrow_top.svg';
var SORT_ICON_CLASS = 'data-table__sort-icon';

var DataTable = function () {
	// DESC | ASC
	function DataTable(table_id, head_class) {
		_classCallCheck(this, DataTable);

		this.table_id = table_id;
		this.table_element = document.getElementById(table_id);
		this.thead_element = this.table_element.querySelector('.' + head_class);
		this.is_data_loading = false;

		this.table_rows = this.getTableRowsFromStorage();
		this.is_table_empty = this.table_rows.length === 0;
	} // name | height | hair_color | eye_color | birth_year


	_createClass(DataTable, [{
		key: 'renderTableBody',
		value: async function renderTableBody() {
			var table_body = document.createElement('tbody');
			table_body.setAttribute('class', TBODY_CLASS);

			this.removeTbodyElement();

			if (this.is_data_loading) {
				var loading_row = this.createLoadingRow();
				table_body.appendChild(loading_row);
			} else if (this.is_table_empty) {
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
				this.saveTableRowsToStorage();
			} catch (err) {
				this.clearTable();
				console.log(err);
			}

			this.renderTableBody();
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

			this.saveTableRowsToStorage();
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
			this.do_sort = false;
			this.sort_type = null;
			this.sort_direction = null;
			this.is_data_loading = false;
			this.displaySortIcon();

			localStorage.removeItem('table-data');

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
		key: 'createLoadingRow',
		value: function createLoadingRow() {
			var empty_row = document.createElement('tr');
			var empty_cell = document.createElement('td');
			empty_cell.innerHTML = 'Загрузка...';
			empty_row.appendChild(empty_cell);
			return empty_row;
		}
	}, {
		key: 'setHeadSortHandlers',
		value: function setHeadSortHandlers() {
			var _this = this;

			var data_targets = ['name', 'height', 'hair_color', 'eye_color', 'birth_year'];
			var head_data_cells = this.thead_element.querySelectorAll('.' + HEAD_CELL_CLASS);

			head_data_cells.forEach(function (th, i) {
				th.setAttribute('data-target', data_targets[i - 1]);

				th.addEventListener('click', function () {
					_this.handleHeadCellClick(data_targets[i - 1]);
				});
			});
		}
	}, {
		key: 'handleHeadCellClick',
		value: function handleHeadCellClick(data_target) {
			if (data_target == undefined) {
				return;
			}

			if (this.sort_type !== data_target) {
				this.do_sort = true;
				this.sort_direction = 'ASC';
			} else {
				if (this.sort_direction == null) {
					this.do_sort = true;
					this.sort_direction = 'ASC';
				} else if (this.sort_direction === 'DESC') {
					this.do_sort = false;
					this.sort_direction = null;
				} else if (this.sort_direction === 'ASC') {
					this.do_sort = true;
					this.sort_direction = 'DESC';
				} else {
					this.sort_direction = null;
					this.do_sort = false;
				}
			}

			this.sort_type = data_target;
			this.displaySortIcon();
			this.sortTableRows();
			this.renderTableBody();
		}
	}, {
		key: 'displaySortIcon',
		value: function displaySortIcon() {
			var _this2 = this;

			var head_data_cells = this.thead_element.querySelectorAll('.' + HEAD_CELL_CLASS);
			var sort_icon = this.thead_element.querySelector('.' + SORT_ICON_CLASS);

			if (sort_icon) {
				sort_icon.remove();
			}

			if (!this.do_sort) {
				return;
			}

			var new_sort_icon = document.createElement('img');
			var desc_class = this.sort_direction === 'DESC' ? ' icon_desc' : '';
			var icon_class = SORT_ICON_CLASS + desc_class;
			new_sort_icon.setAttribute('src', SORT_ICON_REL_PATH);
			new_sort_icon.setAttribute('class', icon_class);

			head_data_cells.forEach(function (th) {
				if (th.getAttribute('data-target') === _this2.sort_type) {
					th.appendChild(new_sort_icon);
				}
			});
		}
	}, {
		key: 'sortTableRows',
		value: function sortTableRows() {
			var _this3 = this;

			if (!this.do_sort) {
				return;
			}

			var asc_modifier = this.sort_direction === 'ASC' ? 1 : -1;

			if (this.sort_type === 'height') {
				this.table_rows.sort(function (row_a, row_b) {
					return asc_modifier * (row_a.height - row_b.height);
				});
			} else if (this.sort_type === 'name' | this.sort_type === 'hair_color' | this.sort_type === 'eye_color') {
				this.table_rows.sort(function (row_a, row_b) {
					if (row_a[_this3.sort_type] < row_b[_this3.sort_type]) {
						return -1 * asc_modifier;
					}
					if (row_a[_this3.sort_type] > row_b[_this3.sort_type]) {
						return 1 * asc_modifier;
					}
					return 0;
				});
			} else if (this.sort_type === 'birth_year') {
				this.table_rows.sort(function (row_a, row_b) {
					var year_num_a = +row_a.birth_year.replace(/[^\d.-]/g, '');
					var year_num_b = +row_b.birth_year.replace(/[^\d.-]/g, '');

					return asc_modifier * (year_num_a - year_num_b);
				});
			}
		}
	}, {
		key: 'patchRowsFromData',
		value: function patchRowsFromData(data) {
			var _this4 = this;

			return data.map(function (data_obj, i) {
				return new _DataRow2.default(i, data_obj.name, data_obj.height, data_obj.hair_color, data_obj.eye_color, data_obj.birth_year, function () {
					_this4.removeRow.bind(_this4)(i);
				});
			});
		}
	}, {
		key: 'saveTableRowsToStorage',
		value: function saveTableRowsToStorage() {
			localStorage.setItem('table-data', JSON.stringify(this.table_rows));
		}
	}, {
		key: 'getTableRowsFromStorage',
		value: function getTableRowsFromStorage() {
			var table_rows = [];

			if (localStorage.getItem('table-data')) {
				var raw_data = JSON.parse(localStorage.getItem('table-data'));
				table_rows = this.patchRowsFromData(raw_data);
			}

			return table_rows;
		}
	}, {
		key: 'displayLoading',
		value: function displayLoading(is_loading) {
			this.is_data_loading = is_loading;

			this.renderTableBody();
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

main_table.setHeadSortHandlers();
main_table.renderTableBody();

btn_get_data.addEventListener('click', handleBtnGetDataClick);

btn_clear_table.addEventListener('click', function () {
    main_table.clearTable();
});

async function handleBtnGetDataClick(e) {
    main_table.clearTable();
    main_table.displayLoading(true);
    await main_table.updateTableRows();
    main_table.displayLoading(false);
}

},{"./DataTable":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvQXBpU2VydmljZS5qcyIsInNyYy9qcy9EYXRhUm93LmpzIiwic3JjL2pzL0RhdGFUYWJsZS5qcyIsInNyYy9qcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7SUNBcUIsVTs7Ozs7OztrQ0FDSCxFLEVBQUk7QUFDcEIsbUJBQU8sTUFBTSxrQ0FBa0MsRUFBeEMsRUFBNEM7QUFDbEQseUJBQVM7QUFDUixvQ0FBZ0IsaUNBRFI7QUFFUiw0QkFBUTtBQUZBO0FBRHlDLGFBQTVDLEVBS0osSUFMSSxDQU1HLG9CQUFZO0FBQ1Isb0JBQUcsU0FBUyxFQUFaLEVBQWdCO0FBQ1osMkJBQU8sU0FBUyxJQUFULEVBQVA7QUFDSCxpQkFGRCxNQUdLO0FBQ0QsMEJBQU0saUJBQU47QUFDSDtBQUNKLGFBYkosRUFjQyxLQWRELENBY08sZUFBTztBQUNYLHNCQUFNLEdBQU47QUFDSCxhQWhCQSxDQUFQO0FBaUJBOzs7Ozs7a0JBbkJtQixVOzs7Ozs7Ozs7Ozs7Ozs7QUNBckIsSUFBTSxrQkFBa0IsdUJBQXhCO0FBQ0EsSUFBTSxpQkFBaUIsc0JBQXZCOztJQUVxQixPO0FBU3BCLGtCQUNDLEVBREQsRUFFQyxJQUZELEVBR0MsTUFIRCxFQUlDLFVBSkQsRUFLQyxTQUxELEVBTUMsVUFORCxFQU9DLGtCQVBELEVBUUU7QUFBQTs7QUFDRCxNQUFJLGNBQWMsU0FBUyxhQUFULENBQXVCLElBQXZCLENBQWxCO0FBQ0EsY0FBWSxZQUFaLENBQXlCLE9BQXpCLEVBQWtDLGNBQWxDOztBQUVBLE1BQU0sUUFBUSxDQUFDLElBQUQsRUFBTyxNQUFQLEVBQWUsVUFBZixFQUEyQixTQUEzQixFQUFzQyxVQUF0QyxFQUFrRCxHQUFsRCxDQUNiLFVBQUMsT0FBRCxFQUFhO0FBQ1osT0FBSSxPQUFPLFNBQVMsYUFBVCxDQUF1QixJQUF2QixDQUFYO0FBQ0EsUUFBSyxT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OztBQUVBLGFBQWEsZ0JBQWIsQ0FBOEIsT0FBOUIsRUFBdUMscUJBQXZDOztBQUVBLGdCQUFnQixnQkFBaEIsQ0FBaUMsT0FBakMsRUFBMEMsWUFBTTtBQUM1QyxlQUFXLFVBQVg7QUFDSCxDQUZEOztBQUtBLGVBQWUscUJBQWYsQ0FBcUMsQ0FBckMsRUFBd0M7QUFDcEMsZUFBVyxVQUFYO0FBQ0EsZUFBVyxjQUFYLENBQTBCLElBQTFCO0FBQ0EsVUFBTSxXQUFXLGVBQVgsRUFBTjtBQUNBLGVBQVcsY0FBWCxDQUEwQixLQUExQjtBQUNIIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBpU2VydmljZSB7XG5cdHN0YXRpYyBnZXRQZXJzb24oaWQpIHtcblx0XHRyZXR1cm4gZmV0Y2goJ2h0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvJyArIGlkLCB7XG5cdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOCcsXG5cdFx0XHRcdEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxuXHRcdFx0fSxcblx0XHR9KS50aGVuKFxuICAgICAgICAgICAgcmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIGlmKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93ICdCYWQgc3RhdHVzIGNvZGUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuXHR9XG59XG4iLCJjb25zdCBCT0RZX0NFTExfQ0xBU1MgPSAnZGF0YS10YWJsZV9fYm9keS1jZWxsJztcbmNvbnN0IEJPRFlfUk9XX0NMQVNTID0gJ2RhdGEtdGFibGVfX2JvZHktcm93JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YVJvdyB7XG5cdGlkO1xuXHRuYW1lO1xuXHRoZWlnaHQ7XG5cdGhhaXJfY29sb3I7XG5cdGV5ZV9jb2xvcjtcblx0YmlydGhfeWVhcjtcblx0cm93X2VsZW1lbnQ7XG5cblx0Y29uc3RydWN0b3IoXG5cdFx0aWQsXG5cdFx0bmFtZSxcblx0XHRoZWlnaHQsXG5cdFx0aGFpcl9jb2xvcixcblx0XHRleWVfY29sb3IsXG5cdFx0YmlydGhfeWVhcixcblx0XHRyZW1vdmVfcm93X2hhbmRsZXJcblx0KSB7XG5cdFx0bGV0IHJvd19lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcblx0XHRyb3dfZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgQk9EWV9ST1dfQ0xBU1MpO1xuXG5cdFx0Y29uc3QgY2VsbHMgPSBbbmFtZSwgaGVpZ2h0LCBoYWlyX2NvbG9yLCBleWVfY29sb3IsIGJpcnRoX3llYXJdLm1hcChcblx0XHRcdChjb250ZW50KSA9PiB7XG5cdFx0XHRcdGxldCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcblx0XHRcdFx0Y2VsbC5pbm5lckhUTUwgPSBjb250ZW50O1xuXHRcdFx0XHRjZWxsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBCT0RZX0NFTExfQ0xBU1MpO1xuXHRcdFx0XHRyZXR1cm4gY2VsbDtcblx0XHRcdH1cblx0XHQpO1xuXG5cdFx0cm93X2VsZW1lbnQuYXBwZW5kKHRoaXMuY3JlYXRlUmVtb3ZlUm93Q2VsbChyZW1vdmVfcm93X2hhbmRsZXIpLCAuLi5jZWxscyk7XG5cblx0XHRPYmplY3QuYXNzaWduKHRoaXMsIHtcblx0XHRcdGlkLFxuXHRcdFx0bmFtZSxcblx0XHRcdGhlaWdodCxcblx0XHRcdGhhaXJfY29sb3IsXG5cdFx0XHRleWVfY29sb3IsXG5cdFx0XHRiaXJ0aF95ZWFyLFxuXHRcdFx0cm93X2VsZW1lbnQsXG5cdFx0fSk7XG5cdH1cblxuXHRjcmVhdGVSZW1vdmVSb3dDZWxsKHJlbW92ZV9yb3dfaGFuZGxlcikge1xuXHRcdGxldCByZW1vdmVfYnRuX2NlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuXHRcdGxldCByZW1vdmVfYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cdFx0cmVtb3ZlX2J0bi5pbm5lckhUTUwgPSAn0KPQtNCw0LvQuNGC0YwnO1xuXHRcdHJlbW92ZV9idG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZW1vdmVfcm93X2hhbmRsZXIpO1xuXHRcdHJlbW92ZV9idG5fY2VsbC5hcHBlbmQocmVtb3ZlX2J0bik7XG5cdFx0cmVtb3ZlX2J0bl9jZWxsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBCT0RZX0NFTExfQ0xBU1MgKyAnIGJvZHktY2VsbF9yZW1vdmUtcm93Jyk7XG5cdFx0cmV0dXJuIHJlbW92ZV9idG5fY2VsbDtcblx0fVxufVxuIiwiaW1wb3J0IEFwaVNlcnZpY2UgZnJvbSAnLi9BcGlTZXJ2aWNlJztcbmltcG9ydCBEYXRhUm93IGZyb20gJy4vRGF0YVJvdyc7XG5cbmNvbnN0IFRCT0RZX0NMQVNTID0gJ2RhdGEtdGFibGVfX2JvZHknO1xuY29uc3QgSEVBRF9DRUxMX0NMQVNTID0gJ2RhdGEtdGFibGVfX2hlYWQtY2VsbCc7XG5jb25zdCBTT1JUX0lDT05fUkVMX1BBVEggPSAnc3JjL2Fzc2V0cy9hcnJvd190b3Auc3ZnJztcbmNvbnN0IFNPUlRfSUNPTl9DTEFTUyA9ICdkYXRhLXRhYmxlX19zb3J0LWljb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRhVGFibGUge1xuXHRpc190YWJsZV9lbXB0eTtcblx0aXNfZGF0YV9sb2FkaW5nO1xuXHR0YWJsZV9pZDtcblx0dGFibGVfZWxlbWVudDtcblx0dGhlYWRfZWxlbWVudDtcblx0dGJvZHlfZWxlbWVudDtcblx0dGFibGVfcm93cztcblxuXHRzb3J0X2RpcmVjdGlvbjsgLy8gREVTQyB8IEFTQ1xuXHRzb3J0X3R5cGU7IC8vIG5hbWUgfCBoZWlnaHQgfCBoYWlyX2NvbG9yIHwgZXllX2NvbG9yIHwgYmlydGhfeWVhclxuXHRkb19zb3J0O1xuXG5cdGNvbnN0cnVjdG9yKHRhYmxlX2lkLCBoZWFkX2NsYXNzKSB7XG5cdFx0dGhpcy50YWJsZV9pZCA9IHRhYmxlX2lkO1xuXHRcdHRoaXMudGFibGVfZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhYmxlX2lkKTtcblx0XHR0aGlzLnRoZWFkX2VsZW1lbnQgPSB0aGlzLnRhYmxlX2VsZW1lbnQucXVlcnlTZWxlY3RvcignLicgKyBoZWFkX2NsYXNzKTtcblx0XHR0aGlzLmlzX2RhdGFfbG9hZGluZyA9IGZhbHNlO1xuXG5cdFx0dGhpcy50YWJsZV9yb3dzID0gdGhpcy5nZXRUYWJsZVJvd3NGcm9tU3RvcmFnZSgpXG4gICAgICAgIHRoaXMuaXNfdGFibGVfZW1wdHkgPSB0aGlzLnRhYmxlX3Jvd3MubGVuZ3RoID09PSAwXG5cdH1cblxuXHRhc3luYyByZW5kZXJUYWJsZUJvZHkoKSB7XG5cdFx0bGV0IHRhYmxlX2JvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpO1xuXHRcdHRhYmxlX2JvZHkuc2V0QXR0cmlidXRlKCdjbGFzcycsIFRCT0RZX0NMQVNTKTtcblxuXHRcdHRoaXMucmVtb3ZlVGJvZHlFbGVtZW50KCk7XG5cblx0XHRpZiAodGhpcy5pc19kYXRhX2xvYWRpbmcpIHtcblx0XHRcdGNvbnN0IGxvYWRpbmdfcm93ID0gdGhpcy5jcmVhdGVMb2FkaW5nUm93KCk7XG5cdFx0XHR0YWJsZV9ib2R5LmFwcGVuZENoaWxkKGxvYWRpbmdfcm93KTtcblx0XHR9IGVsc2UgaWYgKHRoaXMuaXNfdGFibGVfZW1wdHkpIHtcblx0XHRcdGNvbnN0IGVtcHR5X3JvdyA9IHRoaXMuY3JlYXRlRW1wdHlSb3coKTtcblx0XHRcdHRhYmxlX2JvZHkuYXBwZW5kQ2hpbGQoZW1wdHlfcm93KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFibGVfYm9keS5hcHBlbmQoLi4udGhpcy50YWJsZV9yb3dzLm1hcCgocm93KSA9PiByb3cucm93X2VsZW1lbnQpKTtcblx0XHR9XG5cblx0XHR0aGlzLnRhYmxlX2VsZW1lbnQuYXBwZW5kQ2hpbGQodGFibGVfYm9keSk7XG5cdFx0dGhpcy50Ym9keV9lbGVtZW50ID0gdGFibGVfYm9keTtcblx0fVxuXG5cdGFzeW5jIHVwZGF0ZVRhYmxlUm93cygpIHtcblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcGVvcGxlX2lkcyA9IFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMF07XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgUHJvbWlzZS5hbGwoXG5cdFx0XHRcdHBlb3BsZV9pZHMubWFwKChpZCkgPT4ge1xuXHRcdFx0XHRcdHJldHVybiBBcGlTZXJ2aWNlLmdldFBlcnNvbihpZCk7XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdFx0Y29uc3Qgcm93cyA9IHRoaXMucGF0Y2hSb3dzRnJvbURhdGEoZGF0YSk7XG5cdFx0XHR0aGlzLnRhYmxlX3Jvd3MgPSByb3dzO1xuXHRcdFx0dGhpcy5pc190YWJsZV9lbXB0eSA9IHJvd3MubGVuZ3RoID09PSAwO1xuICAgICAgICAgICAgdGhpcy5zYXZlVGFibGVSb3dzVG9TdG9yYWdlKClcblxuXHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0dGhpcy5jbGVhclRhYmxlKCk7XG5cdFx0XHRjb25zb2xlLmxvZyhlcnIpO1xuXHRcdH1cblxuXHRcdHRoaXMucmVuZGVyVGFibGVCb2R5KCk7XG5cdH1cblxuXHRyZW1vdmVSb3coaWQpIHtcblx0XHR0aGlzLnRhYmxlX3Jvd3MgPSB0aGlzLnRhYmxlX3Jvd3MuZmlsdGVyKChyb3cpID0+IHtcblx0XHRcdHJldHVybiByb3cuaWQgIT09IGlkO1xuXHRcdH0pO1xuXHRcdGlmICh0aGlzLnRhYmxlX3Jvd3MubGVuZ3RoID09PSAwKSB7XG5cdFx0XHR0aGlzLmNsZWFyVGFibGUoKTtcblx0XHR9XG5cbiAgICAgICAgdGhpcy5zYXZlVGFibGVSb3dzVG9TdG9yYWdlKClcblx0XHR0aGlzLnJlbmRlclRhYmxlQm9keSgpO1xuXHR9XG5cblx0cmVtb3ZlVGJvZHlFbGVtZW50KCkge1xuXHRcdGlmICh0aGlzLnRib2R5X2VsZW1lbnQgIT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLnRib2R5X2VsZW1lbnQucmVtb3ZlKCk7XG5cdFx0fVxuXHRcdHRoaXMudGJvZHlfZWxlbWVudCA9IG51bGw7XG5cdH1cblxuXHRjbGVhclRhYmxlKCkge1xuXHRcdHRoaXMucmVtb3ZlVGJvZHlFbGVtZW50KCk7XG5cdFx0dGhpcy5pc190YWJsZV9lbXB0eSA9IHRydWU7XG5cdFx0dGhpcy50YWJsZV9yb3dzID0gbnVsbDtcblx0XHR0aGlzLmRvX3NvcnQgPSBmYWxzZTtcblx0XHR0aGlzLnNvcnRfdHlwZSA9IG51bGw7XG5cdFx0dGhpcy5zb3J0X2RpcmVjdGlvbiA9IG51bGw7XG5cdFx0dGhpcy5pc19kYXRhX2xvYWRpbmcgPSBmYWxzZTtcblx0XHR0aGlzLmRpc3BsYXlTb3J0SWNvbigpO1xuXG5cdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3RhYmxlLWRhdGEnKTtcblxuXHRcdHRoaXMucmVuZGVyVGFibGVCb2R5KCk7XG5cdH1cblxuXHRjcmVhdGVFbXB0eVJvdygpIHtcblx0XHRsZXQgZW1wdHlfcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcblx0XHRsZXQgZW1wdHlfY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG5cdFx0ZW1wdHlfY2VsbC5pbm5lckhUTUwgPSAn0J3QtdGCINC00LDQvdC90YvRhSc7XG5cdFx0ZW1wdHlfcm93LmFwcGVuZENoaWxkKGVtcHR5X2NlbGwpO1xuXHRcdHJldHVybiBlbXB0eV9yb3c7XG5cdH1cblxuXHRjcmVhdGVMb2FkaW5nUm93KCkge1xuXHRcdGxldCBlbXB0eV9yb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuXHRcdGxldCBlbXB0eV9jZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcblx0XHRlbXB0eV9jZWxsLmlubmVySFRNTCA9ICfQl9Cw0LPRgNGD0LfQutCwLi4uJztcblx0XHRlbXB0eV9yb3cuYXBwZW5kQ2hpbGQoZW1wdHlfY2VsbCk7XG5cdFx0cmV0dXJuIGVtcHR5X3Jvdztcblx0fVxuXG5cdHNldEhlYWRTb3J0SGFuZGxlcnMoKSB7XG5cdFx0Y29uc3QgZGF0YV90YXJnZXRzID0gW1xuXHRcdFx0J25hbWUnLFxuXHRcdFx0J2hlaWdodCcsXG5cdFx0XHQnaGFpcl9jb2xvcicsXG5cdFx0XHQnZXllX2NvbG9yJyxcblx0XHRcdCdiaXJ0aF95ZWFyJyxcblx0XHRdO1xuXHRcdGNvbnN0IGhlYWRfZGF0YV9jZWxscyA9IHRoaXMudGhlYWRfZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuXHRcdFx0Jy4nICsgSEVBRF9DRUxMX0NMQVNTXG5cdFx0KTtcblxuXHRcdGhlYWRfZGF0YV9jZWxscy5mb3JFYWNoKCh0aCwgaSkgPT4ge1xuXHRcdFx0dGguc2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldCcsIGRhdGFfdGFyZ2V0c1tpIC0gMV0pO1xuXG5cdFx0XHR0aC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRcdFx0dGhpcy5oYW5kbGVIZWFkQ2VsbENsaWNrKGRhdGFfdGFyZ2V0c1tpIC0gMV0pO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRoYW5kbGVIZWFkQ2VsbENsaWNrKGRhdGFfdGFyZ2V0KSB7XG5cdFx0aWYgKGRhdGFfdGFyZ2V0ID09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLnNvcnRfdHlwZSAhPT0gZGF0YV90YXJnZXQpIHtcblx0XHRcdHRoaXMuZG9fc29ydCA9IHRydWU7XG5cdFx0XHR0aGlzLnNvcnRfZGlyZWN0aW9uID0gJ0FTQyc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICh0aGlzLnNvcnRfZGlyZWN0aW9uID09IG51bGwpIHtcblx0XHRcdFx0dGhpcy5kb19zb3J0ID0gdHJ1ZTtcblx0XHRcdFx0dGhpcy5zb3J0X2RpcmVjdGlvbiA9ICdBU0MnO1xuXHRcdFx0fSBlbHNlIGlmICh0aGlzLnNvcnRfZGlyZWN0aW9uID09PSAnREVTQycpIHtcblx0XHRcdFx0dGhpcy5kb19zb3J0ID0gZmFsc2U7XG5cdFx0XHRcdHRoaXMuc29ydF9kaXJlY3Rpb24gPSBudWxsO1xuXHRcdFx0fSBlbHNlIGlmICh0aGlzLnNvcnRfZGlyZWN0aW9uID09PSAnQVNDJykge1xuXHRcdFx0XHR0aGlzLmRvX3NvcnQgPSB0cnVlO1xuXHRcdFx0XHR0aGlzLnNvcnRfZGlyZWN0aW9uID0gJ0RFU0MnO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5zb3J0X2RpcmVjdGlvbiA9IG51bGw7XG5cdFx0XHRcdHRoaXMuZG9fc29ydCA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMuc29ydF90eXBlID0gZGF0YV90YXJnZXQ7XG5cdFx0dGhpcy5kaXNwbGF5U29ydEljb24oKTtcblx0XHR0aGlzLnNvcnRUYWJsZVJvd3MoKTtcblx0XHR0aGlzLnJlbmRlclRhYmxlQm9keSgpO1xuXHR9XG5cblx0ZGlzcGxheVNvcnRJY29uKCkge1xuXHRcdGNvbnN0IGhlYWRfZGF0YV9jZWxscyA9IHRoaXMudGhlYWRfZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuXHRcdFx0Jy4nICsgSEVBRF9DRUxMX0NMQVNTXG5cdFx0KTtcblx0XHRjb25zdCBzb3J0X2ljb24gPSB0aGlzLnRoZWFkX2VsZW1lbnQucXVlcnlTZWxlY3RvcignLicgKyBTT1JUX0lDT05fQ0xBU1MpO1xuXG5cdFx0aWYgKHNvcnRfaWNvbikge1xuXHRcdFx0c29ydF9pY29uLnJlbW92ZSgpO1xuXHRcdH1cblxuXHRcdGlmICghdGhpcy5kb19zb3J0KSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3QgbmV3X3NvcnRfaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXHRcdGNvbnN0IGRlc2NfY2xhc3MgPSB0aGlzLnNvcnRfZGlyZWN0aW9uID09PSAnREVTQycgPyAnIGljb25fZGVzYycgOiAnJztcblx0XHRjb25zdCBpY29uX2NsYXNzID0gU09SVF9JQ09OX0NMQVNTICsgZGVzY19jbGFzcztcblx0XHRuZXdfc29ydF9pY29uLnNldEF0dHJpYnV0ZSgnc3JjJywgU09SVF9JQ09OX1JFTF9QQVRIKTtcblx0XHRuZXdfc29ydF9pY29uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBpY29uX2NsYXNzKTtcblxuXHRcdGhlYWRfZGF0YV9jZWxscy5mb3JFYWNoKCh0aCkgPT4ge1xuXHRcdFx0aWYgKHRoLmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQnKSA9PT0gdGhpcy5zb3J0X3R5cGUpIHtcblx0XHRcdFx0dGguYXBwZW5kQ2hpbGQobmV3X3NvcnRfaWNvbik7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRzb3J0VGFibGVSb3dzKCkge1xuXHRcdGlmICghdGhpcy5kb19zb3J0KSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3QgYXNjX21vZGlmaWVyID0gdGhpcy5zb3J0X2RpcmVjdGlvbiA9PT0gJ0FTQycgPyAxIDogLTE7XG5cblx0XHRpZiAodGhpcy5zb3J0X3R5cGUgPT09ICdoZWlnaHQnKSB7XG5cdFx0XHR0aGlzLnRhYmxlX3Jvd3Muc29ydCgocm93X2EsIHJvd19iKSA9PiB7XG5cdFx0XHRcdHJldHVybiBhc2NfbW9kaWZpZXIgKiAocm93X2EuaGVpZ2h0IC0gcm93X2IuaGVpZ2h0KTtcblx0XHRcdH0pO1xuXHRcdH0gZWxzZSBpZiAoXG5cdFx0XHQodGhpcy5zb3J0X3R5cGUgPT09ICduYW1lJykgfFxuXHRcdFx0KHRoaXMuc29ydF90eXBlID09PSAnaGFpcl9jb2xvcicpIHxcblx0XHRcdCh0aGlzLnNvcnRfdHlwZSA9PT0gJ2V5ZV9jb2xvcicpXG5cdFx0KSB7XG5cdFx0XHR0aGlzLnRhYmxlX3Jvd3Muc29ydCgocm93X2EsIHJvd19iKSA9PiB7XG5cdFx0XHRcdGlmIChyb3dfYVt0aGlzLnNvcnRfdHlwZV0gPCByb3dfYlt0aGlzLnNvcnRfdHlwZV0pIHtcblx0XHRcdFx0XHRyZXR1cm4gLTEgKiBhc2NfbW9kaWZpZXI7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHJvd19hW3RoaXMuc29ydF90eXBlXSA+IHJvd19iW3RoaXMuc29ydF90eXBlXSkge1xuXHRcdFx0XHRcdHJldHVybiAxICogYXNjX21vZGlmaWVyO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIGlmICh0aGlzLnNvcnRfdHlwZSA9PT0gJ2JpcnRoX3llYXInKSB7XG5cdFx0XHR0aGlzLnRhYmxlX3Jvd3Muc29ydCgocm93X2EsIHJvd19iKSA9PiB7XG5cdFx0XHRcdGNvbnN0IHllYXJfbnVtX2EgPSArcm93X2EuYmlydGhfeWVhci5yZXBsYWNlKC9bXlxcZC4tXS9nLCAnJyk7XG5cdFx0XHRcdGNvbnN0IHllYXJfbnVtX2IgPSArcm93X2IuYmlydGhfeWVhci5yZXBsYWNlKC9bXlxcZC4tXS9nLCAnJyk7XG5cblx0XHRcdFx0cmV0dXJuIGFzY19tb2RpZmllciAqICh5ZWFyX251bV9hIC0geWVhcl9udW1fYik7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRwYXRjaFJvd3NGcm9tRGF0YShkYXRhKSB7XG5cdFx0cmV0dXJuIGRhdGEubWFwKChkYXRhX29iaiwgaSkgPT4ge1xuXHRcdFx0cmV0dXJuIG5ldyBEYXRhUm93KFxuXHRcdFx0XHRpLFxuXHRcdFx0XHRkYXRhX29iai5uYW1lLFxuXHRcdFx0XHRkYXRhX29iai5oZWlnaHQsXG5cdFx0XHRcdGRhdGFfb2JqLmhhaXJfY29sb3IsXG5cdFx0XHRcdGRhdGFfb2JqLmV5ZV9jb2xvcixcblx0XHRcdFx0ZGF0YV9vYmouYmlydGhfeWVhcixcblx0XHRcdFx0KCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMucmVtb3ZlUm93LmJpbmQodGhpcykoaSk7XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblxuICAgIHNhdmVUYWJsZVJvd3NUb1N0b3JhZ2UoKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0YWJsZS1kYXRhJywgSlNPTi5zdHJpbmdpZnkodGhpcy50YWJsZV9yb3dzKSlcbiAgICB9XG5cbiAgICBnZXRUYWJsZVJvd3NGcm9tU3RvcmFnZSgpIHtcbiAgICAgICAgbGV0IHRhYmxlX3Jvd3MgPSBbXVxuXG4gICAgICAgIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YWJsZS1kYXRhJykpIHtcbiAgICAgICAgICAgIGNvbnN0IHJhd19kYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFibGUtZGF0YScpKVxuICAgICAgICAgICAgdGFibGVfcm93cyA9IHRoaXMucGF0Y2hSb3dzRnJvbURhdGEocmF3X2RhdGEpIFxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGFibGVfcm93c1xuICAgIH1cblxuXHRkaXNwbGF5TG9hZGluZyhpc19sb2FkaW5nKSB7XG5cdFx0dGhpcy5pc19kYXRhX2xvYWRpbmcgPSBpc19sb2FkaW5nO1xuXG5cdFx0dGhpcy5yZW5kZXJUYWJsZUJvZHkoKTtcblx0fVxufVxuIiwiaW1wb3J0IERhdGFUYWJsZSBmcm9tICcuL0RhdGFUYWJsZSdcblxuY29uc3QgbWFpbl90YWJsZSA9IG5ldyBEYXRhVGFibGUoJ21haW4tdGFibGUnLCAnZGF0YS10YWJsZV9faGVhZCcpXG5jb25zdCBidG5fZ2V0X2RhdGEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2V0LWRhdGEtYnRuJyk7XG5jb25zdCBidG5fY2xlYXJfdGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xlYXItdGFibGUtYnRuJyk7XG5cbm1haW5fdGFibGUuc2V0SGVhZFNvcnRIYW5kbGVycygpXG5tYWluX3RhYmxlLnJlbmRlclRhYmxlQm9keSgpXG5cbmJ0bl9nZXRfZGF0YS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUJ0bkdldERhdGFDbGljaylcblxuYnRuX2NsZWFyX3RhYmxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIG1haW5fdGFibGUuY2xlYXJUYWJsZSgpXG59KVxuXG5cbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZUJ0bkdldERhdGFDbGljayhlKSB7XG4gICAgbWFpbl90YWJsZS5jbGVhclRhYmxlKClcbiAgICBtYWluX3RhYmxlLmRpc3BsYXlMb2FkaW5nKHRydWUpXG4gICAgYXdhaXQgbWFpbl90YWJsZS51cGRhdGVUYWJsZVJvd3MoKVxuICAgIG1haW5fdGFibGUuZGlzcGxheUxvYWRpbmcoZmFsc2UpXG59XG4iXX0=
