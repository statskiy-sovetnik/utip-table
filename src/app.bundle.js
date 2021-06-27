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

		this.table_rows_limit = 8;
		this.pages_count = this.countPages();
		this.current_page = 1;

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
				table_body.append.apply(table_body, _toConsumableArray(this.getCurrentPageRows().map(function (row) {
					return row.row_element;
				})));
			}

			this.renderPagination();

			this.table_element.appendChild(table_body);
			this.tbody_element = table_body;
		}
	}, {
		key: 'renderPagination',
		value: function renderPagination() {
			var _this = this;

			var pagination_block = document.getElementById('main-table-pagination');
			pagination_block.innerHTML = '';

			if (this.pages_count === 1) {
				return;
			}

			var _loop = function _loop(i) {
				var i_btn = document.createElement('button');

				var active_class = i + 1 === _this.current_page ? ' active' : '';
				i_btn.setAttribute('class', 'pagination-btn' + active_class);
				i_btn.addEventListener('click', function () {
					_this.goToPage(i + 1);
				});
				i_btn.innerHTML = i + 1;

				pagination_block.appendChild(i_btn);
			};

			for (var i = 0; i < this.pages_count; i++) {
				_loop(i);
			}
		}
	}, {
		key: 'goToPage',
		value: function goToPage(page) {
			this.current_page = page;
			this.renderTableBody();
		}
	}, {
		key: 'countPages',
		value: function countPages() {
			return Math.ceil(this.table_rows.length / this.table_rows_limit);
		}
	}, {
		key: 'getCurrentPageRows',
		value: function getCurrentPageRows() {
			var first_row_id = (this.current_page - 1) * this.table_rows_limit;
			var last_row_id = first_row_id + this.table_rows_limit - 1;

			return this.table_rows.slice(first_row_id, last_row_id + 1);
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

				this.pages_count = this.countPages();
				this.current_page = 1;

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

			var rows_count = this.table_rows.length;

			this.pages_count = this.countPages();
			//Переход на предыдущую страницу, если удалили последнюю строку на последней странице
			if (rows_count % this.table_rows_limit === 0 && rows_count !== 0 && this.current_page !== this.pages_count) {
				this.current_page--;
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

			this.current_page = 1;
			this.pages_count = 1;

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
			var _this2 = this;

			var data_targets = ['name', 'height', 'hair_color', 'eye_color', 'birth_year'];
			var head_data_cells = this.thead_element.querySelectorAll('.' + HEAD_CELL_CLASS);

			head_data_cells.forEach(function (th, i) {
				th.setAttribute('data-target', data_targets[i - 1]);

				th.addEventListener('click', function () {
					_this2.handleHeadCellClick(data_targets[i - 1]);
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
			var _this3 = this;

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
				if (th.getAttribute('data-target') === _this3.sort_type) {
					th.appendChild(new_sort_icon);
				}
			});
		}
	}, {
		key: 'sortTableRows',
		value: function sortTableRows() {
			var _this4 = this;

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
					if (row_a[_this4.sort_type] < row_b[_this4.sort_type]) {
						return -1 * asc_modifier;
					}
					if (row_a[_this4.sort_type] > row_b[_this4.sort_type]) {
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
			var _this5 = this;

			return data.map(function (data_obj, i) {
				return new _DataRow2.default(i, data_obj.name, data_obj.height, data_obj.hair_color, data_obj.eye_color, data_obj.birth_year, function () {
					_this5.removeRow.bind(_this5)(i);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvQXBpU2VydmljZS5qcyIsInNyYy9qcy9EYXRhUm93LmpzIiwic3JjL2pzL0RhdGFUYWJsZS5qcyIsInNyYy9qcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7SUNBcUIsVTs7Ozs7OztrQ0FDSCxFLEVBQUk7QUFDcEIsbUJBQU8sTUFBTSxrQ0FBa0MsRUFBeEMsRUFBNEM7QUFDbEQseUJBQVM7QUFDUixvQ0FBZ0IsaUNBRFI7QUFFUiw0QkFBUTtBQUZBO0FBRHlDLGFBQTVDLEVBS0osSUFMSSxDQU1HLG9CQUFZO0FBQ1Isb0JBQUcsU0FBUyxFQUFaLEVBQWdCO0FBQ1osMkJBQU8sU0FBUyxJQUFULEVBQVA7QUFDSCxpQkFGRCxNQUdLO0FBQ0QsMEJBQU0saUJBQU47QUFDSDtBQUNKLGFBYkosRUFjQyxLQWRELENBY08sZUFBTztBQUNYLHNCQUFNLEdBQU47QUFDSCxhQWhCQSxDQUFQO0FBaUJBOzs7Ozs7a0JBbkJtQixVOzs7Ozs7Ozs7Ozs7Ozs7QUNBckIsSUFBTSxrQkFBa0IsdUJBQXhCO0FBQ0EsSUFBTSxpQkFBaUIsc0JBQXZCOztJQUVxQixPO0FBU3BCLGtCQUNDLEVBREQsRUFFQyxJQUZELEVBR0MsTUFIRCxFQUlDLFVBSkQsRUFLQyxTQUxELEVBTUMsVUFORCxFQU9DLGtCQVBELEVBUUU7QUFBQTs7QUFDRCxNQUFJLGNBQWMsU0FBUyxhQUFULENBQXVCLElBQXZCLENBQWxCO0FBQ0EsY0FBWSxZQUFaLENBQXlCLE9BQXpCLEVBQWtDLGNBQWxDOztBQUVBLE1BQU0sUUFBUSxDQUFDLElBQUQsRUFBTyxNQUFQLEVBQWUsVUFBZixFQUEyQixTQUEzQixFQUFzQyxVQUF0QyxFQUFrRCxHQUFsRCxDQUNiLFVBQUMsT0FBRCxFQUFhO0FBQ1osT0FBSSxPQUFPLFNBQVMsYUFBVCxDQUF1QixJQUF2QixDQUFYO0FBQ0EsUUFBSyxT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QixZQUFyQixDQUFKLEVBQXdDO0FBQ3ZDLFFBQU0sV0FBVyxLQUFLLEtBQUwsQ0FBVyxhQUFhLE9BQWIsQ0FBcUIsWUFBckIsQ0FBWCxDQUFqQjtBQUNBLGlCQUFhLEtBQUssaUJBQUwsQ0FBdUIsUUFBdkIsQ0FBYjtBQUNBOztBQUVELFVBQU8sVUFBUDtBQUNBOzs7aUNBRWMsVSxFQUFZO0FBQzFCLFFBQUssZUFBTCxHQUF1QixVQUF2Qjs7QUFFQSxRQUFLLGVBQUw7QUFDQTs7Ozs7O2tCQTVVbUIsUzs7Ozs7QUNSckI7Ozs7OztBQUVBLElBQU0sYUFBYSxJQUFJLG1CQUFKLENBQWMsWUFBZCxFQUE0QixrQkFBNUIsQ0FBbkI7QUFDQSxJQUFNLGVBQWUsU0FBUyxjQUFULENBQXdCLGNBQXhCLENBQXJCO0FBQ0EsSUFBTSxrQkFBa0IsU0FBUyxjQUFULENBQXdCLGlCQUF4QixDQUF4Qjs7QUFFQSxXQUFXLG1CQUFYO0FBQ0EsV0FBVyxlQUFYOztBQUVBLGFBQWEsZ0JBQWIsQ0FBOEIsT0FBOUIsRUFBdUMscUJBQXZDOztBQUVBLGdCQUFnQixnQkFBaEIsQ0FBaUMsT0FBakMsRUFBMEMsWUFBTTtBQUM1QyxlQUFXLFVBQVg7QUFDSCxDQUZEOztBQUtBLGVBQWUscUJBQWYsQ0FBcUMsQ0FBckMsRUFBd0M7QUFDcEMsZUFBVyxVQUFYO0FBQ0EsZUFBVyxjQUFYLENBQTBCLElBQTFCO0FBQ0EsVUFBTSxXQUFXLGVBQVgsRUFBTjtBQUNBLGVBQVcsY0FBWCxDQUEwQixLQUExQjtBQUNIIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBpU2VydmljZSB7XG5cdHN0YXRpYyBnZXRQZXJzb24oaWQpIHtcblx0XHRyZXR1cm4gZmV0Y2goJ2h0dHBzOi8vc3dhcGkuZGV2L2FwaS9wZW9wbGUvJyArIGlkLCB7XG5cdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOCcsXG5cdFx0XHRcdEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxuXHRcdFx0fSxcblx0XHR9KS50aGVuKFxuICAgICAgICAgICAgcmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIGlmKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93ICdCYWQgc3RhdHVzIGNvZGUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuXHR9XG59XG4iLCJjb25zdCBCT0RZX0NFTExfQ0xBU1MgPSAnZGF0YS10YWJsZV9fYm9keS1jZWxsJztcbmNvbnN0IEJPRFlfUk9XX0NMQVNTID0gJ2RhdGEtdGFibGVfX2JvZHktcm93JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YVJvdyB7XG5cdGlkO1xuXHRuYW1lO1xuXHRoZWlnaHQ7XG5cdGhhaXJfY29sb3I7XG5cdGV5ZV9jb2xvcjtcblx0YmlydGhfeWVhcjtcblx0cm93X2VsZW1lbnQ7XG5cblx0Y29uc3RydWN0b3IoXG5cdFx0aWQsXG5cdFx0bmFtZSxcblx0XHRoZWlnaHQsXG5cdFx0aGFpcl9jb2xvcixcblx0XHRleWVfY29sb3IsXG5cdFx0YmlydGhfeWVhcixcblx0XHRyZW1vdmVfcm93X2hhbmRsZXJcblx0KSB7XG5cdFx0bGV0IHJvd19lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcblx0XHRyb3dfZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgQk9EWV9ST1dfQ0xBU1MpO1xuXG5cdFx0Y29uc3QgY2VsbHMgPSBbbmFtZSwgaGVpZ2h0LCBoYWlyX2NvbG9yLCBleWVfY29sb3IsIGJpcnRoX3llYXJdLm1hcChcblx0XHRcdChjb250ZW50KSA9PiB7XG5cdFx0XHRcdGxldCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcblx0XHRcdFx0Y2VsbC5pbm5lckhUTUwgPSBjb250ZW50O1xuXHRcdFx0XHRjZWxsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBCT0RZX0NFTExfQ0xBU1MpO1xuXHRcdFx0XHRyZXR1cm4gY2VsbDtcblx0XHRcdH1cblx0XHQpO1xuXG5cdFx0cm93X2VsZW1lbnQuYXBwZW5kKHRoaXMuY3JlYXRlUmVtb3ZlUm93Q2VsbChyZW1vdmVfcm93X2hhbmRsZXIpLCAuLi5jZWxscyk7XG5cblx0XHRPYmplY3QuYXNzaWduKHRoaXMsIHtcblx0XHRcdGlkLFxuXHRcdFx0bmFtZSxcblx0XHRcdGhlaWdodCxcblx0XHRcdGhhaXJfY29sb3IsXG5cdFx0XHRleWVfY29sb3IsXG5cdFx0XHRiaXJ0aF95ZWFyLFxuXHRcdFx0cm93X2VsZW1lbnQsXG5cdFx0fSk7XG5cdH1cblxuXHRjcmVhdGVSZW1vdmVSb3dDZWxsKHJlbW92ZV9yb3dfaGFuZGxlcikge1xuXHRcdGxldCByZW1vdmVfYnRuX2NlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuXHRcdGxldCByZW1vdmVfYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cdFx0cmVtb3ZlX2J0bi5pbm5lckhUTUwgPSAn0KPQtNCw0LvQuNGC0YwnO1xuXHRcdHJlbW92ZV9idG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZW1vdmVfcm93X2hhbmRsZXIpO1xuXHRcdHJlbW92ZV9idG5fY2VsbC5hcHBlbmQocmVtb3ZlX2J0bik7XG5cdFx0cmVtb3ZlX2J0bl9jZWxsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBCT0RZX0NFTExfQ0xBU1MgKyAnIGJvZHktY2VsbF9yZW1vdmUtcm93Jyk7XG5cdFx0cmV0dXJuIHJlbW92ZV9idG5fY2VsbDtcblx0fVxufVxuIiwiaW1wb3J0IEFwaVNlcnZpY2UgZnJvbSAnLi9BcGlTZXJ2aWNlJztcbmltcG9ydCBEYXRhUm93IGZyb20gJy4vRGF0YVJvdyc7XG5cbmNvbnN0IFRCT0RZX0NMQVNTID0gJ2RhdGEtdGFibGVfX2JvZHknO1xuY29uc3QgSEVBRF9DRUxMX0NMQVNTID0gJ2RhdGEtdGFibGVfX2hlYWQtY2VsbCc7XG5jb25zdCBTT1JUX0lDT05fUkVMX1BBVEggPSAnc3JjL2Fzc2V0cy9hcnJvd190b3Auc3ZnJztcbmNvbnN0IFNPUlRfSUNPTl9DTEFTUyA9ICdkYXRhLXRhYmxlX19zb3J0LWljb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRhVGFibGUge1xuXHRpc190YWJsZV9lbXB0eTtcblx0aXNfZGF0YV9sb2FkaW5nO1xuXHR0YWJsZV9pZDtcblx0dGFibGVfZWxlbWVudDtcblx0dGhlYWRfZWxlbWVudDtcblx0dGJvZHlfZWxlbWVudDtcblx0dGFibGVfcm93cztcblxuXHR0YWJsZV9yb3dzX2xpbWl0O1xuXHRwYWdlc19jb3VudDtcblx0Y3VycmVudF9wYWdlO1xuXG5cdHNvcnRfZGlyZWN0aW9uOyAvLyBERVNDIHwgQVNDXG5cdHNvcnRfdHlwZTsgLy8gbmFtZSB8IGhlaWdodCB8IGhhaXJfY29sb3IgfCBleWVfY29sb3IgfCBiaXJ0aF95ZWFyXG5cdGRvX3NvcnQ7XG5cblx0Y29uc3RydWN0b3IodGFibGVfaWQsIGhlYWRfY2xhc3MpIHtcblx0XHR0aGlzLnRhYmxlX2lkID0gdGFibGVfaWQ7XG5cdFx0dGhpcy50YWJsZV9lbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFibGVfaWQpO1xuXHRcdHRoaXMudGhlYWRfZWxlbWVudCA9IHRoaXMudGFibGVfZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuJyArIGhlYWRfY2xhc3MpO1xuXHRcdHRoaXMuaXNfZGF0YV9sb2FkaW5nID0gZmFsc2U7XG5cblx0XHR0aGlzLnRhYmxlX3Jvd3MgPSB0aGlzLmdldFRhYmxlUm93c0Zyb21TdG9yYWdlKCk7XG5cblx0XHR0aGlzLnRhYmxlX3Jvd3NfbGltaXQgPSA4O1xuXHRcdHRoaXMucGFnZXNfY291bnQgPSB0aGlzLmNvdW50UGFnZXMoKTtcblx0XHR0aGlzLmN1cnJlbnRfcGFnZSA9IDE7XG5cblx0XHR0aGlzLmlzX3RhYmxlX2VtcHR5ID0gdGhpcy50YWJsZV9yb3dzLmxlbmd0aCA9PT0gMDtcblx0fVxuXG5cdGFzeW5jIHJlbmRlclRhYmxlQm9keSgpIHtcblx0XHRsZXQgdGFibGVfYm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rib2R5Jyk7XG5cdFx0dGFibGVfYm9keS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgVEJPRFlfQ0xBU1MpO1xuXG5cdFx0dGhpcy5yZW1vdmVUYm9keUVsZW1lbnQoKTtcblxuXHRcdGlmICh0aGlzLmlzX2RhdGFfbG9hZGluZykge1xuXHRcdFx0Y29uc3QgbG9hZGluZ19yb3cgPSB0aGlzLmNyZWF0ZUxvYWRpbmdSb3coKTtcblx0XHRcdHRhYmxlX2JvZHkuYXBwZW5kQ2hpbGQobG9hZGluZ19yb3cpO1xuXHRcdH0gZWxzZSBpZiAodGhpcy5pc190YWJsZV9lbXB0eSkge1xuXHRcdFx0Y29uc3QgZW1wdHlfcm93ID0gdGhpcy5jcmVhdGVFbXB0eVJvdygpO1xuXHRcdFx0dGFibGVfYm9keS5hcHBlbmRDaGlsZChlbXB0eV9yb3cpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YWJsZV9ib2R5LmFwcGVuZChcblx0XHRcdFx0Li4udGhpcy5nZXRDdXJyZW50UGFnZVJvd3MoKS5tYXAoKHJvdykgPT4gcm93LnJvd19lbGVtZW50KVxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHR0aGlzLnJlbmRlclBhZ2luYXRpb24oKTtcblxuXHRcdHRoaXMudGFibGVfZWxlbWVudC5hcHBlbmRDaGlsZCh0YWJsZV9ib2R5KTtcblx0XHR0aGlzLnRib2R5X2VsZW1lbnQgPSB0YWJsZV9ib2R5O1xuXHR9XG5cblx0cmVuZGVyUGFnaW5hdGlvbigpIHtcblx0XHRsZXQgcGFnaW5hdGlvbl9ibG9jayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluLXRhYmxlLXBhZ2luYXRpb24nKTtcblx0XHRwYWdpbmF0aW9uX2Jsb2NrLmlubmVySFRNTCA9ICcnO1xuXG5cdFx0aWYgKHRoaXMucGFnZXNfY291bnQgPT09IDEpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGFnZXNfY291bnQ7IGkrKykge1xuXHRcdFx0bGV0IGlfYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cblx0XHRcdGNvbnN0IGFjdGl2ZV9jbGFzcyA9IGkgKyAxID09PSB0aGlzLmN1cnJlbnRfcGFnZSA/ICcgYWN0aXZlJyA6ICcnO1xuXHRcdFx0aV9idG4uc2V0QXR0cmlidXRlKCdjbGFzcycsICdwYWdpbmF0aW9uLWJ0bicgKyBhY3RpdmVfY2xhc3MpO1xuXHRcdFx0aV9idG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHRcdHRoaXMuZ29Ub1BhZ2UoaSArIDEpO1xuXHRcdFx0fSk7XG5cdFx0XHRpX2J0bi5pbm5lckhUTUwgPSBpICsgMTtcblxuXHRcdFx0cGFnaW5hdGlvbl9ibG9jay5hcHBlbmRDaGlsZChpX2J0bik7XG5cdFx0fVxuXHR9XG5cblx0Z29Ub1BhZ2UocGFnZSkge1xuXHRcdHRoaXMuY3VycmVudF9wYWdlID0gcGFnZTtcblx0XHR0aGlzLnJlbmRlclRhYmxlQm9keSgpO1xuXHR9XG5cblx0Y291bnRQYWdlcygpIHtcblx0XHRyZXR1cm4gTWF0aC5jZWlsKHRoaXMudGFibGVfcm93cy5sZW5ndGggLyB0aGlzLnRhYmxlX3Jvd3NfbGltaXQpO1xuXHR9XG5cblx0Z2V0Q3VycmVudFBhZ2VSb3dzKCkge1xuXHRcdGNvbnN0IGZpcnN0X3Jvd19pZCA9ICh0aGlzLmN1cnJlbnRfcGFnZSAtIDEpICogdGhpcy50YWJsZV9yb3dzX2xpbWl0O1xuXHRcdGNvbnN0IGxhc3Rfcm93X2lkID0gZmlyc3Rfcm93X2lkICsgdGhpcy50YWJsZV9yb3dzX2xpbWl0IC0gMTtcblxuXHRcdHJldHVybiB0aGlzLnRhYmxlX3Jvd3Muc2xpY2UoZmlyc3Rfcm93X2lkLCBsYXN0X3Jvd19pZCArIDEpO1xuXHR9XG5cblx0YXN5bmMgdXBkYXRlVGFibGVSb3dzKCkge1xuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCBwZW9wbGVfaWRzID0gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwXTtcblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCBQcm9taXNlLmFsbChcblx0XHRcdFx0cGVvcGxlX2lkcy5tYXAoKGlkKSA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIEFwaVNlcnZpY2UuZ2V0UGVyc29uKGlkKTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cdFx0XHRjb25zdCByb3dzID0gdGhpcy5wYXRjaFJvd3NGcm9tRGF0YShkYXRhKTtcblx0XHRcdHRoaXMudGFibGVfcm93cyA9IHJvd3M7XG5cdFx0XHR0aGlzLmlzX3RhYmxlX2VtcHR5ID0gcm93cy5sZW5ndGggPT09IDA7XG5cblx0XHRcdHRoaXMucGFnZXNfY291bnQgPSB0aGlzLmNvdW50UGFnZXMoKTtcblx0XHRcdHRoaXMuY3VycmVudF9wYWdlID0gMTtcblxuXHRcdFx0dGhpcy5zYXZlVGFibGVSb3dzVG9TdG9yYWdlKCk7XG5cdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHR0aGlzLmNsZWFyVGFibGUoKTtcblx0XHRcdGNvbnNvbGUubG9nKGVycik7XG5cdFx0fVxuXG5cdFx0dGhpcy5yZW5kZXJUYWJsZUJvZHkoKTtcblx0fVxuXG5cdHJlbW92ZVJvdyhpZCkge1xuXHRcdHRoaXMudGFibGVfcm93cyA9IHRoaXMudGFibGVfcm93cy5maWx0ZXIoKHJvdykgPT4ge1xuXHRcdFx0cmV0dXJuIHJvdy5pZCAhPT0gaWQ7XG5cdFx0fSk7XG5cblx0XHRpZiAodGhpcy50YWJsZV9yb3dzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0dGhpcy5jbGVhclRhYmxlKCk7XG5cdFx0fVxuXG5cdFx0Y29uc3Qgcm93c19jb3VudCA9IHRoaXMudGFibGVfcm93cy5sZW5ndGg7XG5cblx0XHR0aGlzLnBhZ2VzX2NvdW50ID0gdGhpcy5jb3VudFBhZ2VzKCk7XG5cdFx0Ly/Qn9C10YDQtdGF0L7QtCDQvdCwINC/0YDQtdC00YvQtNGD0YnRg9GOINGB0YLRgNCw0L3QuNGG0YMsINC10YHQu9C4INGD0LTQsNC70LjQu9C4INC/0L7RgdC70LXQtNC90Y7RjiDRgdGC0YDQvtC60YMg0L3QsCDQv9C+0YHQu9C10LTQvdC10Lkg0YHRgtGA0LDQvdC40YbQtVxuXHRcdGlmIChcblx0XHRcdHJvd3NfY291bnQgJSB0aGlzLnRhYmxlX3Jvd3NfbGltaXQgPT09IDAgJiZcblx0XHRcdHJvd3NfY291bnQgIT09IDAgJiZcblx0XHRcdHRoaXMuY3VycmVudF9wYWdlICE9PSB0aGlzLnBhZ2VzX2NvdW50XG5cdFx0KSB7XG5cdFx0XHR0aGlzLmN1cnJlbnRfcGFnZS0tO1xuXHRcdH1cblxuXHRcdHRoaXMuc2F2ZVRhYmxlUm93c1RvU3RvcmFnZSgpO1xuXHRcdHRoaXMucmVuZGVyVGFibGVCb2R5KCk7XG5cdH1cblxuXHRyZW1vdmVUYm9keUVsZW1lbnQoKSB7XG5cdFx0aWYgKHRoaXMudGJvZHlfZWxlbWVudCAhPSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMudGJvZHlfZWxlbWVudC5yZW1vdmUoKTtcblx0XHR9XG5cdFx0dGhpcy50Ym9keV9lbGVtZW50ID0gbnVsbDtcblx0fVxuXG5cdGNsZWFyVGFibGUoKSB7XG5cdFx0dGhpcy5yZW1vdmVUYm9keUVsZW1lbnQoKTtcblx0XHR0aGlzLmlzX3RhYmxlX2VtcHR5ID0gdHJ1ZTtcblx0XHR0aGlzLnRhYmxlX3Jvd3MgPSBudWxsO1xuXHRcdHRoaXMuZG9fc29ydCA9IGZhbHNlO1xuXHRcdHRoaXMuc29ydF90eXBlID0gbnVsbDtcblx0XHR0aGlzLnNvcnRfZGlyZWN0aW9uID0gbnVsbDtcblx0XHR0aGlzLmlzX2RhdGFfbG9hZGluZyA9IGZhbHNlO1xuXHRcdHRoaXMuZGlzcGxheVNvcnRJY29uKCk7XG5cblx0XHR0aGlzLmN1cnJlbnRfcGFnZSA9IDE7XG5cdFx0dGhpcy5wYWdlc19jb3VudCA9IDE7XG5cblx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndGFibGUtZGF0YScpO1xuXG5cdFx0dGhpcy5yZW5kZXJUYWJsZUJvZHkoKTtcblx0fVxuXG5cdGNyZWF0ZUVtcHR5Um93KCkge1xuXHRcdGxldCBlbXB0eV9yb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuXHRcdGxldCBlbXB0eV9jZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcblx0XHRlbXB0eV9jZWxsLmlubmVySFRNTCA9ICfQndC10YIg0LTQsNC90L3Ri9GFJztcblx0XHRlbXB0eV9yb3cuYXBwZW5kQ2hpbGQoZW1wdHlfY2VsbCk7XG5cdFx0cmV0dXJuIGVtcHR5X3Jvdztcblx0fVxuXG5cdGNyZWF0ZUxvYWRpbmdSb3coKSB7XG5cdFx0bGV0IGVtcHR5X3JvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG5cdFx0bGV0IGVtcHR5X2NlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuXHRcdGVtcHR5X2NlbGwuaW5uZXJIVE1MID0gJ9CX0LDQs9GA0YPQt9C60LAuLi4nO1xuXHRcdGVtcHR5X3Jvdy5hcHBlbmRDaGlsZChlbXB0eV9jZWxsKTtcblx0XHRyZXR1cm4gZW1wdHlfcm93O1xuXHR9XG5cblx0c2V0SGVhZFNvcnRIYW5kbGVycygpIHtcblx0XHRjb25zdCBkYXRhX3RhcmdldHMgPSBbXG5cdFx0XHQnbmFtZScsXG5cdFx0XHQnaGVpZ2h0Jyxcblx0XHRcdCdoYWlyX2NvbG9yJyxcblx0XHRcdCdleWVfY29sb3InLFxuXHRcdFx0J2JpcnRoX3llYXInLFxuXHRcdF07XG5cdFx0Y29uc3QgaGVhZF9kYXRhX2NlbGxzID0gdGhpcy50aGVhZF9lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG5cdFx0XHQnLicgKyBIRUFEX0NFTExfQ0xBU1Ncblx0XHQpO1xuXG5cdFx0aGVhZF9kYXRhX2NlbGxzLmZvckVhY2goKHRoLCBpKSA9PiB7XG5cdFx0XHR0aC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0JywgZGF0YV90YXJnZXRzW2kgLSAxXSk7XG5cblx0XHRcdHRoLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0XHR0aGlzLmhhbmRsZUhlYWRDZWxsQ2xpY2soZGF0YV90YXJnZXRzW2kgLSAxXSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdGhhbmRsZUhlYWRDZWxsQ2xpY2soZGF0YV90YXJnZXQpIHtcblx0XHRpZiAoZGF0YV90YXJnZXQgPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuc29ydF90eXBlICE9PSBkYXRhX3RhcmdldCkge1xuXHRcdFx0dGhpcy5kb19zb3J0ID0gdHJ1ZTtcblx0XHRcdHRoaXMuc29ydF9kaXJlY3Rpb24gPSAnQVNDJztcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKHRoaXMuc29ydF9kaXJlY3Rpb24gPT0gbnVsbCkge1xuXHRcdFx0XHR0aGlzLmRvX3NvcnQgPSB0cnVlO1xuXHRcdFx0XHR0aGlzLnNvcnRfZGlyZWN0aW9uID0gJ0FTQyc7XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuc29ydF9kaXJlY3Rpb24gPT09ICdERVNDJykge1xuXHRcdFx0XHR0aGlzLmRvX3NvcnQgPSBmYWxzZTtcblx0XHRcdFx0dGhpcy5zb3J0X2RpcmVjdGlvbiA9IG51bGw7XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuc29ydF9kaXJlY3Rpb24gPT09ICdBU0MnKSB7XG5cdFx0XHRcdHRoaXMuZG9fc29ydCA9IHRydWU7XG5cdFx0XHRcdHRoaXMuc29ydF9kaXJlY3Rpb24gPSAnREVTQyc7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLnNvcnRfZGlyZWN0aW9uID0gbnVsbDtcblx0XHRcdFx0dGhpcy5kb19zb3J0ID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5zb3J0X3R5cGUgPSBkYXRhX3RhcmdldDtcblx0XHR0aGlzLmRpc3BsYXlTb3J0SWNvbigpO1xuXHRcdHRoaXMuc29ydFRhYmxlUm93cygpO1xuXHRcdHRoaXMucmVuZGVyVGFibGVCb2R5KCk7XG5cdH1cblxuXHRkaXNwbGF5U29ydEljb24oKSB7XG5cdFx0Y29uc3QgaGVhZF9kYXRhX2NlbGxzID0gdGhpcy50aGVhZF9lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG5cdFx0XHQnLicgKyBIRUFEX0NFTExfQ0xBU1Ncblx0XHQpO1xuXHRcdGNvbnN0IHNvcnRfaWNvbiA9IHRoaXMudGhlYWRfZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuJyArIFNPUlRfSUNPTl9DTEFTUyk7XG5cblx0XHRpZiAoc29ydF9pY29uKSB7XG5cdFx0XHRzb3J0X2ljb24ucmVtb3ZlKCk7XG5cdFx0fVxuXG5cdFx0aWYgKCF0aGlzLmRvX3NvcnQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjb25zdCBuZXdfc29ydF9pY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cdFx0Y29uc3QgZGVzY19jbGFzcyA9IHRoaXMuc29ydF9kaXJlY3Rpb24gPT09ICdERVNDJyA/ICcgaWNvbl9kZXNjJyA6ICcnO1xuXHRcdGNvbnN0IGljb25fY2xhc3MgPSBTT1JUX0lDT05fQ0xBU1MgKyBkZXNjX2NsYXNzO1xuXHRcdG5ld19zb3J0X2ljb24uc2V0QXR0cmlidXRlKCdzcmMnLCBTT1JUX0lDT05fUkVMX1BBVEgpO1xuXHRcdG5ld19zb3J0X2ljb24uc2V0QXR0cmlidXRlKCdjbGFzcycsIGljb25fY2xhc3MpO1xuXG5cdFx0aGVhZF9kYXRhX2NlbGxzLmZvckVhY2goKHRoKSA9PiB7XG5cdFx0XHRpZiAodGguZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldCcpID09PSB0aGlzLnNvcnRfdHlwZSkge1xuXHRcdFx0XHR0aC5hcHBlbmRDaGlsZChuZXdfc29ydF9pY29uKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHNvcnRUYWJsZVJvd3MoKSB7XG5cdFx0aWYgKCF0aGlzLmRvX3NvcnQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjb25zdCBhc2NfbW9kaWZpZXIgPSB0aGlzLnNvcnRfZGlyZWN0aW9uID09PSAnQVNDJyA/IDEgOiAtMTtcblxuXHRcdGlmICh0aGlzLnNvcnRfdHlwZSA9PT0gJ2hlaWdodCcpIHtcblx0XHRcdHRoaXMudGFibGVfcm93cy5zb3J0KChyb3dfYSwgcm93X2IpID0+IHtcblx0XHRcdFx0cmV0dXJuIGFzY19tb2RpZmllciAqIChyb3dfYS5oZWlnaHQgLSByb3dfYi5oZWlnaHQpO1xuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIGlmIChcblx0XHRcdCh0aGlzLnNvcnRfdHlwZSA9PT0gJ25hbWUnKSB8XG5cdFx0XHQodGhpcy5zb3J0X3R5cGUgPT09ICdoYWlyX2NvbG9yJykgfFxuXHRcdFx0KHRoaXMuc29ydF90eXBlID09PSAnZXllX2NvbG9yJylcblx0XHQpIHtcblx0XHRcdHRoaXMudGFibGVfcm93cy5zb3J0KChyb3dfYSwgcm93X2IpID0+IHtcblx0XHRcdFx0aWYgKHJvd19hW3RoaXMuc29ydF90eXBlXSA8IHJvd19iW3RoaXMuc29ydF90eXBlXSkge1xuXHRcdFx0XHRcdHJldHVybiAtMSAqIGFzY19tb2RpZmllcjtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAocm93X2FbdGhpcy5zb3J0X3R5cGVdID4gcm93X2JbdGhpcy5zb3J0X3R5cGVdKSB7XG5cdFx0XHRcdFx0cmV0dXJuIDEgKiBhc2NfbW9kaWZpZXI7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHR9KTtcblx0XHR9IGVsc2UgaWYgKHRoaXMuc29ydF90eXBlID09PSAnYmlydGhfeWVhcicpIHtcblx0XHRcdHRoaXMudGFibGVfcm93cy5zb3J0KChyb3dfYSwgcm93X2IpID0+IHtcblx0XHRcdFx0Y29uc3QgeWVhcl9udW1fYSA9ICtyb3dfYS5iaXJ0aF95ZWFyLnJlcGxhY2UoL1teXFxkLi1dL2csICcnKTtcblx0XHRcdFx0Y29uc3QgeWVhcl9udW1fYiA9ICtyb3dfYi5iaXJ0aF95ZWFyLnJlcGxhY2UoL1teXFxkLi1dL2csICcnKTtcblxuXHRcdFx0XHRyZXR1cm4gYXNjX21vZGlmaWVyICogKHllYXJfbnVtX2EgLSB5ZWFyX251bV9iKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdHBhdGNoUm93c0Zyb21EYXRhKGRhdGEpIHtcblx0XHRyZXR1cm4gZGF0YS5tYXAoKGRhdGFfb2JqLCBpKSA9PiB7XG5cdFx0XHRyZXR1cm4gbmV3IERhdGFSb3coXG5cdFx0XHRcdGksXG5cdFx0XHRcdGRhdGFfb2JqLm5hbWUsXG5cdFx0XHRcdGRhdGFfb2JqLmhlaWdodCxcblx0XHRcdFx0ZGF0YV9vYmouaGFpcl9jb2xvcixcblx0XHRcdFx0ZGF0YV9vYmouZXllX2NvbG9yLFxuXHRcdFx0XHRkYXRhX29iai5iaXJ0aF95ZWFyLFxuXHRcdFx0XHQoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5yZW1vdmVSb3cuYmluZCh0aGlzKShpKTtcblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdHNhdmVUYWJsZVJvd3NUb1N0b3JhZ2UoKSB7XG5cdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RhYmxlLWRhdGEnLCBKU09OLnN0cmluZ2lmeSh0aGlzLnRhYmxlX3Jvd3MpKTtcblx0fVxuXG5cdGdldFRhYmxlUm93c0Zyb21TdG9yYWdlKCkge1xuXHRcdGxldCB0YWJsZV9yb3dzID0gW107XG5cblx0XHRpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RhYmxlLWRhdGEnKSkge1xuXHRcdFx0Y29uc3QgcmF3X2RhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YWJsZS1kYXRhJykpO1xuXHRcdFx0dGFibGVfcm93cyA9IHRoaXMucGF0Y2hSb3dzRnJvbURhdGEocmF3X2RhdGEpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0YWJsZV9yb3dzO1xuXHR9XG5cblx0ZGlzcGxheUxvYWRpbmcoaXNfbG9hZGluZykge1xuXHRcdHRoaXMuaXNfZGF0YV9sb2FkaW5nID0gaXNfbG9hZGluZztcblxuXHRcdHRoaXMucmVuZGVyVGFibGVCb2R5KCk7XG5cdH1cbn1cbiIsImltcG9ydCBEYXRhVGFibGUgZnJvbSAnLi9EYXRhVGFibGUnXG5cbmNvbnN0IG1haW5fdGFibGUgPSBuZXcgRGF0YVRhYmxlKCdtYWluLXRhYmxlJywgJ2RhdGEtdGFibGVfX2hlYWQnKVxuY29uc3QgYnRuX2dldF9kYXRhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dldC1kYXRhLWJ0bicpO1xuY29uc3QgYnRuX2NsZWFyX3RhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsZWFyLXRhYmxlLWJ0bicpO1xuXG5tYWluX3RhYmxlLnNldEhlYWRTb3J0SGFuZGxlcnMoKVxubWFpbl90YWJsZS5yZW5kZXJUYWJsZUJvZHkoKVxuXG5idG5fZ2V0X2RhdGEuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVCdG5HZXREYXRhQ2xpY2spXG5cbmJ0bl9jbGVhcl90YWJsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBtYWluX3RhYmxlLmNsZWFyVGFibGUoKVxufSlcblxuXG5hc3luYyBmdW5jdGlvbiBoYW5kbGVCdG5HZXREYXRhQ2xpY2soZSkge1xuICAgIG1haW5fdGFibGUuY2xlYXJUYWJsZSgpXG4gICAgbWFpbl90YWJsZS5kaXNwbGF5TG9hZGluZyh0cnVlKVxuICAgIGF3YWl0IG1haW5fdGFibGUudXBkYXRlVGFibGVSb3dzKClcbiAgICBtYWluX3RhYmxlLmRpc3BsYXlMb2FkaW5nKGZhbHNlKVxufVxuIl19
