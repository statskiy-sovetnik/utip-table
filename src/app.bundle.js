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

		this.is_table_empty = true;
		this.table_id = table_id;
		this.table_element = document.getElementById(table_id);
		this.thead_element = this.table_element.querySelector('.' + head_class);
	} // name | height | hair_color | eye_color | birth_year


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

btn_get_data.addEventListener('click', async function () {
    await main_table.updateTableRows();
    main_table.renderTableBody();
});

btn_clear_table.addEventListener('click', function () {
    main_table.clearTable();
});

},{"./DataTable":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvQXBpU2VydmljZS5qcyIsInNyYy9qcy9EYXRhUm93LmpzIiwic3JjL2pzL0RhdGFUYWJsZS5qcyIsInNyYy9qcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7SUNBcUIsVTs7Ozs7OztrQ0FDSCxFLEVBQUk7QUFDcEIsbUJBQU8sTUFBTSxrQ0FBa0MsRUFBeEMsRUFBNEM7QUFDbEQseUJBQVM7QUFDUixvQ0FBZ0IsaUNBRFI7QUFFUiw0QkFBUTtBQUZBO0FBRHlDLGFBQTVDLEVBS0osSUFMSSxDQU1HLG9CQUFZO0FBQ1Isb0JBQUcsU0FBUyxFQUFaLEVBQWdCO0FBQ1osMkJBQU8sU0FBUyxJQUFULEVBQVA7QUFDSCxpQkFGRCxNQUdLO0FBQ0QsMEJBQU0saUJBQU47QUFDSDtBQUNKLGFBYkosRUFjQyxLQWRELENBY08sZUFBTztBQUNYLHNCQUFNLEdBQU47QUFDSCxhQWhCQSxDQUFQO0FBaUJBOzs7Ozs7a0JBbkJtQixVOzs7Ozs7Ozs7Ozs7Ozs7QUNBckIsSUFBTSxrQkFBa0IsdUJBQXhCO0FBQ0EsSUFBTSxpQkFBaUIsc0JBQXZCOztJQUVxQixPO0FBU3BCLGtCQUNDLEVBREQsRUFFQyxJQUZELEVBR0MsTUFIRCxFQUlDLFVBSkQsRUFLQyxTQUxELEVBTUMsVUFORCxFQU9DLGtCQVBELEVBUUU7QUFBQTs7QUFDRCxNQUFJLGNBQWMsU0FBUyxhQUFULENBQXVCLElBQXZCLENBQWxCO0FBQ0EsY0FBWSxZQUFaLENBQXlCLE9BQXpCLEVBQWtDLGNBQWxDOztBQUVBLE1BQU0sUUFBUSxDQUFDLElBQUQsRUFBTyxNQUFQLEVBQWUsVUFBZixFQUEyQixTQUEzQixFQUFzQyxVQUF0QyxFQUFrRCxHQUFsRCxDQUNiLFVBQUMsT0FBRCxFQUFhO0FBQ1osT0FBSSxPQUFPLFNBQVMsYUFBVCxDQUF1QixJQUF2QixDQUFYO0FBQ0EsUUFBSyxTQUFMLEdBQWlCLE9BQWpCO0FBQ0EsUUFBSyxZQUFMLENBQWtCLE9BQWxCLEVBQTJCLGVBQTNCO0FBQ0EsVUFBTyxJQUFQO0FBQ0EsR0FOWSxDQUFkOztBQVNBLGNBQVksTUFBWixxQkFBbUIsS0FBSyxtQkFBTCxDQUF5QixrQkFBekIsQ0FBbkIsNEJBQW9FLEtBQXBFOztBQUVBLFNBQU8sTUFBUCxDQUFjLElBQWQsRUFBb0I7QUFDbkIsU0FEbUI7QUFFbkIsYUFGbUI7QUFHbkIsaUJBSG1CO0FBSW5CLHlCQUptQjtBQUtuQix1QkFMbUI7QUFNbkIseUJBTm1CO0FBT25CO0FBUG1CLEdBQXBCO0FBU0E7Ozs7c0NBRW1CLGtCLEVBQW9CO0FBQ3ZDLE9BQUksa0JBQWtCLFNBQVMsYUFBVCxDQUF1QixJQUF2QixDQUF0QjtBQUNBLE9BQUksYUFBYSxTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBakI7QUFDQSxjQUFXLFNBQVgsR0FBdUIsU0FBdkI7QUFDQSxjQUFXLGdCQUFYLENBQTRCLE9BQTVCLEVBQXFDLGtCQUFyQztBQUNBLG1CQUFnQixNQUFoQixDQUF1QixVQUF2QjtBQUNBLG1CQUFnQixZQUFoQixDQUE2QixPQUE3QixFQUFzQyxrQkFBa0IsdUJBQXhEO0FBQ0EsVUFBTyxlQUFQO0FBQ0E7Ozs7OztrQkFuRG1CLE87Ozs7Ozs7Ozs7O0FDSHJCOzs7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQSxJQUFNLGNBQWMsa0JBQXBCO0FBQ0EsSUFBTSxrQkFBa0IsdUJBQXhCO0FBQ0EsSUFBTSxxQkFBcUIsMEJBQTNCO0FBQ0EsSUFBTSxrQkFBa0IsdUJBQXhCOztJQUVxQixTO0FBUUo7QUFJaEIsb0JBQVksUUFBWixFQUFzQixVQUF0QixFQUFrQztBQUFBOztBQUNqQyxPQUFLLGNBQUwsR0FBc0IsSUFBdEI7QUFDQSxPQUFLLFFBQUwsR0FBZ0IsUUFBaEI7QUFDQSxPQUFLLGFBQUwsR0FBcUIsU0FBUyxjQUFULENBQXdCLFFBQXhCLENBQXJCO0FBQ0EsT0FBSyxhQUFMLEdBQXFCLEtBQUssYUFBTCxDQUFtQixhQUFuQixDQUFpQyxNQUFNLFVBQXZDLENBQXJCO0FBQ0EsRSxDQVJVOzs7OzswQ0FVYTtBQUN2QixPQUFJLGFBQWEsU0FBUyxhQUFULENBQXVCLE9BQXZCLENBQWpCO0FBQ0EsY0FBVyxZQUFYLENBQXdCLE9BQXhCLEVBQWlDLFdBQWpDOztBQUVBLFFBQUssa0JBQUw7O0FBRUEsT0FBSSxLQUFLLGNBQVQsRUFBeUI7QUFDeEIsUUFBTSxZQUFZLEtBQUssY0FBTCxFQUFsQjtBQUNBLGVBQVcsV0FBWCxDQUF1QixTQUF2QjtBQUNBLElBSEQsTUFHTztBQUNOLGVBQVcsTUFBWCxzQ0FBcUIsS0FBSyxVQUFMLENBQWdCLEdBQWhCLENBQW9CLFVBQUMsR0FBRDtBQUFBLFlBQVMsSUFBSSxXQUFiO0FBQUEsS0FBcEIsQ0FBckI7QUFDQTs7QUFFRCxRQUFLLGFBQUwsQ0FBbUIsV0FBbkIsQ0FBK0IsVUFBL0I7QUFDQSxRQUFLLGFBQUwsR0FBcUIsVUFBckI7QUFDQTs7OzBDQUV1QjtBQUN2QixPQUFJO0FBQ0gsUUFBTSxhQUFhLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsRUFBNUIsQ0FBbkI7QUFDQSxRQUFNLE9BQU8sTUFBTSxRQUFRLEdBQVIsQ0FDbEIsV0FBVyxHQUFYLENBQWUsVUFBQyxFQUFELEVBQVE7QUFDdEIsWUFBTyxxQkFBVyxTQUFYLENBQXFCLEVBQXJCLENBQVA7QUFDQSxLQUZELENBRGtCLENBQW5CO0FBS0EsUUFBTSxPQUFPLEtBQUssaUJBQUwsQ0FBdUIsSUFBdkIsQ0FBYjtBQUNBLFNBQUssVUFBTCxHQUFrQixJQUFsQjtBQUNBLFNBQUssY0FBTCxHQUFzQixLQUFLLE1BQUwsS0FBZ0IsQ0FBdEM7QUFDQSxJQVZELENBVUUsT0FBTyxHQUFQLEVBQVk7QUFDYixTQUFLLFVBQUw7QUFDQSxZQUFRLEdBQVIsQ0FBWSxHQUFaO0FBQ0E7QUFDRDs7OzRCQUVTLEUsRUFBSTtBQUNiLFFBQUssVUFBTCxHQUFrQixLQUFLLFVBQUwsQ0FBZ0IsTUFBaEIsQ0FBdUIsVUFBQyxHQUFELEVBQVM7QUFDakQsV0FBTyxJQUFJLEVBQUosS0FBVyxFQUFsQjtBQUNBLElBRmlCLENBQWxCO0FBR0EsT0FBSSxLQUFLLFVBQUwsQ0FBZ0IsTUFBaEIsS0FBMkIsQ0FBL0IsRUFBa0M7QUFDakMsU0FBSyxVQUFMO0FBQ0E7O0FBRUQsUUFBSyxlQUFMO0FBQ0E7Ozt1Q0FFb0I7QUFDcEIsT0FBSSxLQUFLLGFBQUwsSUFBc0IsU0FBMUIsRUFBcUM7QUFDcEMsU0FBSyxhQUFMLENBQW1CLE1BQW5CO0FBQ0E7QUFDRCxRQUFLLGFBQUwsR0FBcUIsSUFBckI7QUFDQTs7OytCQUVZO0FBQ1osUUFBSyxrQkFBTDtBQUNBLFFBQUssY0FBTCxHQUFzQixJQUF0QjtBQUNBLFFBQUssVUFBTCxHQUFrQixJQUFsQjs7QUFFQSxRQUFLLGVBQUw7QUFDQTs7O21DQUVnQjtBQUNoQixPQUFJLFlBQVksU0FBUyxhQUFULENBQXVCLElBQXZCLENBQWhCO0FBQ0EsT0FBSSxhQUFhLFNBQVMsYUFBVCxDQUF1QixJQUF2QixDQUFqQjtBQUNBLGNBQVcsU0FBWCxHQUF1QixZQUF2QjtBQUNBLGFBQVUsV0FBVixDQUFzQixVQUF0QjtBQUNBLFVBQU8sU0FBUDtBQUNBOzs7d0NBRXFCO0FBQUE7O0FBQ3JCLE9BQU0sZUFBZSxDQUNwQixNQURvQixFQUVwQixRQUZvQixFQUdwQixZQUhvQixFQUlwQixXQUpvQixFQUtwQixZQUxvQixDQUFyQjtBQU9BLE9BQU0sa0JBQWtCLEtBQUssYUFBTCxDQUFtQixnQkFBbkIsQ0FDdkIsTUFBTSxlQURpQixDQUF4Qjs7QUFJQSxtQkFBZ0IsT0FBaEIsQ0FBd0IsVUFBQyxFQUFELEVBQUssQ0FBTCxFQUFXO0FBQ2xDLE9BQUcsWUFBSCxDQUFnQixhQUFoQixFQUErQixhQUFhLElBQUksQ0FBakIsQ0FBL0I7O0FBRUEsT0FBRyxnQkFBSCxDQUFvQixPQUFwQixFQUE2QixZQUFNO0FBQ2xDLFdBQUssbUJBQUwsQ0FBeUIsYUFBYSxJQUFJLENBQWpCLENBQXpCO0FBQ0EsS0FGRDtBQUdBLElBTkQ7QUFPQTs7O3NDQUVtQixXLEVBQWE7QUFDaEMsT0FBSSxlQUFlLFNBQW5CLEVBQThCO0FBQzdCO0FBQ0E7O0FBRUQsT0FBSSxLQUFLLFNBQUwsS0FBbUIsV0FBdkIsRUFBb0M7QUFDbkMsU0FBSyxPQUFMLEdBQWUsSUFBZjtBQUNBLFNBQUssY0FBTCxHQUFzQixLQUF0QjtBQUNBLElBSEQsTUFHTztBQUNOLFFBQUksS0FBSyxjQUFMLElBQXVCLElBQTNCLEVBQWlDO0FBQ2hDLFVBQUssT0FBTCxHQUFlLElBQWY7QUFDQSxVQUFLLGNBQUwsR0FBc0IsS0FBdEI7QUFDQSxLQUhELE1BR08sSUFBSSxLQUFLLGNBQUwsS0FBd0IsTUFBNUIsRUFBb0M7QUFDMUMsVUFBSyxPQUFMLEdBQWUsS0FBZjtBQUNBLFVBQUssY0FBTCxHQUFzQixJQUF0QjtBQUNBLEtBSE0sTUFHQSxJQUFJLEtBQUssY0FBTCxLQUF3QixLQUE1QixFQUFtQztBQUN6QyxVQUFLLE9BQUwsR0FBZSxJQUFmO0FBQ0EsVUFBSyxjQUFMLEdBQXNCLE1BQXRCO0FBQ0EsS0FITSxNQUdBO0FBQ04sVUFBSyxjQUFMLEdBQXNCLElBQXRCO0FBQ0EsVUFBSyxPQUFMLEdBQWUsS0FBZjtBQUNBO0FBQ0Q7O0FBRUQsUUFBSyxTQUFMLEdBQWlCLFdBQWpCO0FBQ0EsUUFBSyxlQUFMO0FBQ0EsUUFBSyxhQUFMO0FBQ0EsUUFBSyxlQUFMO0FBQ0E7OztvQ0FFaUI7QUFBQTs7QUFDakIsT0FBTSxrQkFBa0IsS0FBSyxhQUFMLENBQW1CLGdCQUFuQixDQUN2QixNQUFNLGVBRGlCLENBQXhCO0FBR0EsT0FBTSxZQUFZLEtBQUssYUFBTCxDQUFtQixhQUFuQixDQUFpQyxNQUFNLGVBQXZDLENBQWxCOztBQUVBLE9BQUksU0FBSixFQUFlO0FBQ2QsY0FBVSxNQUFWO0FBQ0E7O0FBRUQsT0FBSSxDQUFDLEtBQUssT0FBVixFQUFtQjtBQUNsQjtBQUNBOztBQUVELE9BQU0sZ0JBQWdCLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUF0QjtBQUNBLE9BQU0sYUFBYSxLQUFLLGNBQUwsS0FBd0IsTUFBeEIsR0FBaUMsWUFBakMsR0FBZ0QsRUFBbkU7QUFDQSxPQUFNLGFBQWEsa0JBQWtCLFVBQXJDO0FBQ0EsaUJBQWMsWUFBZCxDQUEyQixLQUEzQixFQUFrQyxrQkFBbEM7QUFDQSxpQkFBYyxZQUFkLENBQTJCLE9BQTNCLEVBQW9DLFVBQXBDOztBQUVBLG1CQUFnQixPQUFoQixDQUF3QixVQUFDLEVBQUQsRUFBUTtBQUMvQixRQUFJLEdBQUcsWUFBSCxDQUFnQixhQUFoQixNQUFtQyxPQUFLLFNBQTVDLEVBQXVEO0FBQ3RELFFBQUcsV0FBSCxDQUFlLGFBQWY7QUFDQTtBQUNELElBSkQ7QUFLQTs7O2tDQUVlO0FBQUE7O0FBQ2YsT0FBSSxDQUFDLEtBQUssT0FBVixFQUFtQjtBQUNsQjtBQUNBOztBQUVELE9BQU0sZUFBZSxLQUFLLGNBQUwsS0FBd0IsS0FBeEIsR0FBZ0MsQ0FBaEMsR0FBb0MsQ0FBQyxDQUExRDs7QUFFQSxPQUFJLEtBQUssU0FBTCxLQUFtQixRQUF2QixFQUFpQztBQUNoQyxTQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsQ0FBcUIsVUFBQyxLQUFELEVBQVEsS0FBUixFQUFrQjtBQUN0QyxZQUFPLGdCQUFnQixNQUFNLE1BQU4sR0FBZSxNQUFNLE1BQXJDLENBQVA7QUFDQSxLQUZEO0FBR0EsSUFKRCxNQUlPLElBQ0wsS0FBSyxTQUFMLEtBQW1CLE1BQXBCLEdBQ0MsS0FBSyxTQUFMLEtBQW1CLFlBRHBCLEdBRUMsS0FBSyxTQUFMLEtBQW1CLFdBSGQsRUFJTDtBQUNELFNBQUssVUFBTCxDQUFnQixJQUFoQixDQUFxQixVQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWtCO0FBQ3RDLFNBQUksTUFBTSxPQUFLLFNBQVgsSUFBd0IsTUFBTSxPQUFLLFNBQVgsQ0FBNUIsRUFBbUQ7QUFDbEQsYUFBTyxDQUFDLENBQUQsR0FBSyxZQUFaO0FBQ0E7QUFDRCxTQUFJLE1BQU0sT0FBSyxTQUFYLElBQXdCLE1BQU0sT0FBSyxTQUFYLENBQTVCLEVBQW1EO0FBQ2xELGFBQU8sSUFBSSxZQUFYO0FBQ0E7QUFDRCxZQUFPLENBQVA7QUFDQSxLQVJEO0FBU0EsSUFkTSxNQWVJLElBQUcsS0FBSyxTQUFMLEtBQW1CLFlBQXRCLEVBQW9DO0FBQzlDLFNBQUssVUFBTCxDQUFnQixJQUFoQixDQUFxQixVQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWtCO0FBQzFCLFNBQU0sYUFBYSxDQUFDLE1BQU0sVUFBTixDQUFpQixPQUFqQixDQUF5QixVQUF6QixFQUFxQyxFQUFyQyxDQUFwQjtBQUNBLFNBQU0sYUFBYSxDQUFDLE1BQU0sVUFBTixDQUFpQixPQUFqQixDQUF5QixVQUF6QixFQUFxQyxFQUFyQyxDQUFwQjs7QUFFQSxZQUFPLGdCQUFnQixhQUFhLFVBQTdCLENBQVA7QUFDSCxLQUxWO0FBTU07QUFDUDs7O29DQUVpQixJLEVBQU07QUFBQTs7QUFDdkIsVUFBTyxLQUFLLEdBQUwsQ0FBUyxVQUFDLFFBQUQsRUFBVyxDQUFYLEVBQWlCO0FBQ2hDLFdBQU8sSUFBSSxpQkFBSixDQUNOLENBRE0sRUFFTixTQUFTLElBRkgsRUFHTixTQUFTLE1BSEgsRUFJTixTQUFTLFVBSkgsRUFLTixTQUFTLFNBTEgsRUFNTixTQUFTLFVBTkgsRUFPTixZQUFNO0FBQ0wsWUFBSyxTQUFMLENBQWUsSUFBZixDQUFvQixNQUFwQixFQUEwQixDQUExQjtBQUNBLEtBVEssQ0FBUDtBQVdBLElBWk0sQ0FBUDtBQWFBOzs7Ozs7a0JBdk5tQixTOzs7OztBQ1JyQjs7Ozs7O0FBRUEsSUFBTSxhQUFhLElBQUksbUJBQUosQ0FBYyxZQUFkLEVBQTRCLGtCQUE1QixDQUFuQjtBQUNBLElBQU0sZUFBZSxTQUFTLGNBQVQsQ0FBd0IsY0FBeEIsQ0FBckI7QUFDQSxJQUFNLGtCQUFrQixTQUFTLGNBQVQsQ0FBd0IsaUJBQXhCLENBQXhCOztBQUVBLFdBQVcsbUJBQVg7QUFDQSxXQUFXLGVBQVg7O0FBRUEsYUFBYSxnQkFBYixDQUE4QixPQUE5QixFQUF1QyxrQkFBWTtBQUMvQyxVQUFNLFdBQVcsZUFBWCxFQUFOO0FBQ0EsZUFBVyxlQUFYO0FBQ0gsQ0FIRDs7QUFLQSxnQkFBZ0IsZ0JBQWhCLENBQWlDLE9BQWpDLEVBQTBDLFlBQU07QUFDNUMsZUFBVyxVQUFYO0FBQ0gsQ0FGRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwaVNlcnZpY2Uge1xuXHRzdGF0aWMgZ2V0UGVyc29uKGlkKSB7XG5cdFx0cmV0dXJuIGZldGNoKCdodHRwczovL3N3YXBpLmRldi9hcGkvcGVvcGxlLycgKyBpZCwge1xuXHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLTgnLFxuXHRcdFx0XHRBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcblx0XHRcdH0sXG5cdFx0fSkudGhlbihcbiAgICAgICAgICAgIHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICBpZihyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyAnQmFkIHN0YXR1cyBjb2RlJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgKS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcblx0fVxufVxuIiwiY29uc3QgQk9EWV9DRUxMX0NMQVNTID0gJ2RhdGEtdGFibGVfX2JvZHktY2VsbCc7XG5jb25zdCBCT0RZX1JPV19DTEFTUyA9ICdkYXRhLXRhYmxlX19ib2R5LXJvdyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGFSb3cge1xuXHRpZDtcblx0bmFtZTtcblx0aGVpZ2h0O1xuXHRoYWlyX2NvbG9yO1xuXHRleWVfY29sb3I7XG5cdGJpcnRoX3llYXI7XG5cdHJvd19lbGVtZW50O1xuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdGlkLFxuXHRcdG5hbWUsXG5cdFx0aGVpZ2h0LFxuXHRcdGhhaXJfY29sb3IsXG5cdFx0ZXllX2NvbG9yLFxuXHRcdGJpcnRoX3llYXIsXG5cdFx0cmVtb3ZlX3Jvd19oYW5kbGVyXG5cdCkge1xuXHRcdGxldCByb3dfZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG5cdFx0cm93X2VsZW1lbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsIEJPRFlfUk9XX0NMQVNTKTtcblxuXHRcdGNvbnN0IGNlbGxzID0gW25hbWUsIGhlaWdodCwgaGFpcl9jb2xvciwgZXllX2NvbG9yLCBiaXJ0aF95ZWFyXS5tYXAoXG5cdFx0XHQoY29udGVudCkgPT4ge1xuXHRcdFx0XHRsZXQgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG5cdFx0XHRcdGNlbGwuaW5uZXJIVE1MID0gY29udGVudDtcblx0XHRcdFx0Y2VsbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgQk9EWV9DRUxMX0NMQVNTKTtcblx0XHRcdFx0cmV0dXJuIGNlbGw7XG5cdFx0XHR9XG5cdFx0KTtcblxuXHRcdHJvd19lbGVtZW50LmFwcGVuZCh0aGlzLmNyZWF0ZVJlbW92ZVJvd0NlbGwocmVtb3ZlX3Jvd19oYW5kbGVyKSwgLi4uY2VsbHMpO1xuXG5cdFx0T2JqZWN0LmFzc2lnbih0aGlzLCB7XG5cdFx0XHRpZCxcblx0XHRcdG5hbWUsXG5cdFx0XHRoZWlnaHQsXG5cdFx0XHRoYWlyX2NvbG9yLFxuXHRcdFx0ZXllX2NvbG9yLFxuXHRcdFx0YmlydGhfeWVhcixcblx0XHRcdHJvd19lbGVtZW50LFxuXHRcdH0pO1xuXHR9XG5cblx0Y3JlYXRlUmVtb3ZlUm93Q2VsbChyZW1vdmVfcm93X2hhbmRsZXIpIHtcblx0XHRsZXQgcmVtb3ZlX2J0bl9jZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcblx0XHRsZXQgcmVtb3ZlX2J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXHRcdHJlbW92ZV9idG4uaW5uZXJIVE1MID0gJ9Cj0LTQsNC70LjRgtGMJztcblx0XHRyZW1vdmVfYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVtb3ZlX3Jvd19oYW5kbGVyKTtcblx0XHRyZW1vdmVfYnRuX2NlbGwuYXBwZW5kKHJlbW92ZV9idG4pO1xuXHRcdHJlbW92ZV9idG5fY2VsbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgQk9EWV9DRUxMX0NMQVNTICsgJyBib2R5LWNlbGxfcmVtb3ZlLXJvdycpO1xuXHRcdHJldHVybiByZW1vdmVfYnRuX2NlbGw7XG5cdH1cbn1cbiIsImltcG9ydCBBcGlTZXJ2aWNlIGZyb20gJy4vQXBpU2VydmljZSc7XG5pbXBvcnQgRGF0YVJvdyBmcm9tICcuL0RhdGFSb3cnO1xuXG5jb25zdCBUQk9EWV9DTEFTUyA9ICdkYXRhLXRhYmxlX19ib2R5JztcbmNvbnN0IEhFQURfQ0VMTF9DTEFTUyA9ICdkYXRhLXRhYmxlX19oZWFkLWNlbGwnO1xuY29uc3QgU09SVF9JQ09OX1JFTF9QQVRIID0gJ3NyYy9hc3NldHMvYXJyb3dfdG9wLnN2Zyc7XG5jb25zdCBTT1JUX0lDT05fQ0xBU1MgPSAnZGF0YS10YWJsZV9fc29ydC1pY29uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YVRhYmxlIHtcblx0aXNfdGFibGVfZW1wdHk7XG5cdHRhYmxlX2lkO1xuXHR0YWJsZV9lbGVtZW50O1xuXHR0aGVhZF9lbGVtZW50O1xuXHR0Ym9keV9lbGVtZW50O1xuXHR0YWJsZV9yb3dzO1xuXG5cdHNvcnRfZGlyZWN0aW9uOyAvLyBERVNDIHwgQVNDXG5cdHNvcnRfdHlwZTsgLy8gbmFtZSB8IGhlaWdodCB8IGhhaXJfY29sb3IgfCBleWVfY29sb3IgfCBiaXJ0aF95ZWFyXG5cdGRvX3NvcnQ7XG5cblx0Y29uc3RydWN0b3IodGFibGVfaWQsIGhlYWRfY2xhc3MpIHtcblx0XHR0aGlzLmlzX3RhYmxlX2VtcHR5ID0gdHJ1ZTtcblx0XHR0aGlzLnRhYmxlX2lkID0gdGFibGVfaWQ7XG5cdFx0dGhpcy50YWJsZV9lbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFibGVfaWQpO1xuXHRcdHRoaXMudGhlYWRfZWxlbWVudCA9IHRoaXMudGFibGVfZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuJyArIGhlYWRfY2xhc3MpO1xuXHR9XG5cblx0YXN5bmMgcmVuZGVyVGFibGVCb2R5KCkge1xuXHRcdGxldCB0YWJsZV9ib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGJvZHknKTtcblx0XHR0YWJsZV9ib2R5LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBUQk9EWV9DTEFTUyk7XG5cblx0XHR0aGlzLnJlbW92ZVRib2R5RWxlbWVudCgpO1xuXG5cdFx0aWYgKHRoaXMuaXNfdGFibGVfZW1wdHkpIHtcblx0XHRcdGNvbnN0IGVtcHR5X3JvdyA9IHRoaXMuY3JlYXRlRW1wdHlSb3coKTtcblx0XHRcdHRhYmxlX2JvZHkuYXBwZW5kQ2hpbGQoZW1wdHlfcm93KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFibGVfYm9keS5hcHBlbmQoLi4udGhpcy50YWJsZV9yb3dzLm1hcCgocm93KSA9PiByb3cucm93X2VsZW1lbnQpKTtcblx0XHR9XG5cblx0XHR0aGlzLnRhYmxlX2VsZW1lbnQuYXBwZW5kQ2hpbGQodGFibGVfYm9keSk7XG5cdFx0dGhpcy50Ym9keV9lbGVtZW50ID0gdGFibGVfYm9keTtcblx0fVxuXG5cdGFzeW5jIHVwZGF0ZVRhYmxlUm93cygpIHtcblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcGVvcGxlX2lkcyA9IFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMF07XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgUHJvbWlzZS5hbGwoXG5cdFx0XHRcdHBlb3BsZV9pZHMubWFwKChpZCkgPT4ge1xuXHRcdFx0XHRcdHJldHVybiBBcGlTZXJ2aWNlLmdldFBlcnNvbihpZCk7XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdFx0Y29uc3Qgcm93cyA9IHRoaXMucGF0Y2hSb3dzRnJvbURhdGEoZGF0YSk7XG5cdFx0XHR0aGlzLnRhYmxlX3Jvd3MgPSByb3dzO1xuXHRcdFx0dGhpcy5pc190YWJsZV9lbXB0eSA9IHJvd3MubGVuZ3RoID09PSAwO1xuXHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0dGhpcy5jbGVhclRhYmxlKCk7XG5cdFx0XHRjb25zb2xlLmxvZyhlcnIpO1xuXHRcdH1cblx0fVxuXG5cdHJlbW92ZVJvdyhpZCkge1xuXHRcdHRoaXMudGFibGVfcm93cyA9IHRoaXMudGFibGVfcm93cy5maWx0ZXIoKHJvdykgPT4ge1xuXHRcdFx0cmV0dXJuIHJvdy5pZCAhPT0gaWQ7XG5cdFx0fSk7XG5cdFx0aWYgKHRoaXMudGFibGVfcm93cy5sZW5ndGggPT09IDApIHtcblx0XHRcdHRoaXMuY2xlYXJUYWJsZSgpO1xuXHRcdH1cblxuXHRcdHRoaXMucmVuZGVyVGFibGVCb2R5KCk7XG5cdH1cblxuXHRyZW1vdmVUYm9keUVsZW1lbnQoKSB7XG5cdFx0aWYgKHRoaXMudGJvZHlfZWxlbWVudCAhPSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMudGJvZHlfZWxlbWVudC5yZW1vdmUoKTtcblx0XHR9XG5cdFx0dGhpcy50Ym9keV9lbGVtZW50ID0gbnVsbDtcblx0fVxuXG5cdGNsZWFyVGFibGUoKSB7XG5cdFx0dGhpcy5yZW1vdmVUYm9keUVsZW1lbnQoKTtcblx0XHR0aGlzLmlzX3RhYmxlX2VtcHR5ID0gdHJ1ZTtcblx0XHR0aGlzLnRhYmxlX3Jvd3MgPSBudWxsO1xuXG5cdFx0dGhpcy5yZW5kZXJUYWJsZUJvZHkoKTtcblx0fVxuXG5cdGNyZWF0ZUVtcHR5Um93KCkge1xuXHRcdGxldCBlbXB0eV9yb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuXHRcdGxldCBlbXB0eV9jZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcblx0XHRlbXB0eV9jZWxsLmlubmVySFRNTCA9ICfQndC10YIg0LTQsNC90L3Ri9GFJztcblx0XHRlbXB0eV9yb3cuYXBwZW5kQ2hpbGQoZW1wdHlfY2VsbCk7XG5cdFx0cmV0dXJuIGVtcHR5X3Jvdztcblx0fVxuXG5cdHNldEhlYWRTb3J0SGFuZGxlcnMoKSB7XG5cdFx0Y29uc3QgZGF0YV90YXJnZXRzID0gW1xuXHRcdFx0J25hbWUnLFxuXHRcdFx0J2hlaWdodCcsXG5cdFx0XHQnaGFpcl9jb2xvcicsXG5cdFx0XHQnZXllX2NvbG9yJyxcblx0XHRcdCdiaXJ0aF95ZWFyJyxcblx0XHRdO1xuXHRcdGNvbnN0IGhlYWRfZGF0YV9jZWxscyA9IHRoaXMudGhlYWRfZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuXHRcdFx0Jy4nICsgSEVBRF9DRUxMX0NMQVNTXG5cdFx0KTtcblxuXHRcdGhlYWRfZGF0YV9jZWxscy5mb3JFYWNoKCh0aCwgaSkgPT4ge1xuXHRcdFx0dGguc2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldCcsIGRhdGFfdGFyZ2V0c1tpIC0gMV0pO1xuXG5cdFx0XHR0aC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRcdFx0dGhpcy5oYW5kbGVIZWFkQ2VsbENsaWNrKGRhdGFfdGFyZ2V0c1tpIC0gMV0pO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRoYW5kbGVIZWFkQ2VsbENsaWNrKGRhdGFfdGFyZ2V0KSB7XG5cdFx0aWYgKGRhdGFfdGFyZ2V0ID09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLnNvcnRfdHlwZSAhPT0gZGF0YV90YXJnZXQpIHtcblx0XHRcdHRoaXMuZG9fc29ydCA9IHRydWU7XG5cdFx0XHR0aGlzLnNvcnRfZGlyZWN0aW9uID0gJ0FTQyc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICh0aGlzLnNvcnRfZGlyZWN0aW9uID09IG51bGwpIHtcblx0XHRcdFx0dGhpcy5kb19zb3J0ID0gdHJ1ZTtcblx0XHRcdFx0dGhpcy5zb3J0X2RpcmVjdGlvbiA9ICdBU0MnO1xuXHRcdFx0fSBlbHNlIGlmICh0aGlzLnNvcnRfZGlyZWN0aW9uID09PSAnREVTQycpIHtcblx0XHRcdFx0dGhpcy5kb19zb3J0ID0gZmFsc2U7XG5cdFx0XHRcdHRoaXMuc29ydF9kaXJlY3Rpb24gPSBudWxsO1xuXHRcdFx0fSBlbHNlIGlmICh0aGlzLnNvcnRfZGlyZWN0aW9uID09PSAnQVNDJykge1xuXHRcdFx0XHR0aGlzLmRvX3NvcnQgPSB0cnVlO1xuXHRcdFx0XHR0aGlzLnNvcnRfZGlyZWN0aW9uID0gJ0RFU0MnO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5zb3J0X2RpcmVjdGlvbiA9IG51bGw7XG5cdFx0XHRcdHRoaXMuZG9fc29ydCA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMuc29ydF90eXBlID0gZGF0YV90YXJnZXQ7XG5cdFx0dGhpcy5kaXNwbGF5U29ydEljb24oKTtcblx0XHR0aGlzLnNvcnRUYWJsZVJvd3MoKTtcblx0XHR0aGlzLnJlbmRlclRhYmxlQm9keSgpO1xuXHR9XG5cblx0ZGlzcGxheVNvcnRJY29uKCkge1xuXHRcdGNvbnN0IGhlYWRfZGF0YV9jZWxscyA9IHRoaXMudGhlYWRfZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuXHRcdFx0Jy4nICsgSEVBRF9DRUxMX0NMQVNTXG5cdFx0KTtcblx0XHRjb25zdCBzb3J0X2ljb24gPSB0aGlzLnRoZWFkX2VsZW1lbnQucXVlcnlTZWxlY3RvcignLicgKyBTT1JUX0lDT05fQ0xBU1MpO1xuXG5cdFx0aWYgKHNvcnRfaWNvbikge1xuXHRcdFx0c29ydF9pY29uLnJlbW92ZSgpO1xuXHRcdH1cblxuXHRcdGlmICghdGhpcy5kb19zb3J0KSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3QgbmV3X3NvcnRfaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXHRcdGNvbnN0IGRlc2NfY2xhc3MgPSB0aGlzLnNvcnRfZGlyZWN0aW9uID09PSAnREVTQycgPyAnIGljb25fZGVzYycgOiAnJztcblx0XHRjb25zdCBpY29uX2NsYXNzID0gU09SVF9JQ09OX0NMQVNTICsgZGVzY19jbGFzcztcblx0XHRuZXdfc29ydF9pY29uLnNldEF0dHJpYnV0ZSgnc3JjJywgU09SVF9JQ09OX1JFTF9QQVRIKTtcblx0XHRuZXdfc29ydF9pY29uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBpY29uX2NsYXNzKTtcblxuXHRcdGhlYWRfZGF0YV9jZWxscy5mb3JFYWNoKCh0aCkgPT4ge1xuXHRcdFx0aWYgKHRoLmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQnKSA9PT0gdGhpcy5zb3J0X3R5cGUpIHtcblx0XHRcdFx0dGguYXBwZW5kQ2hpbGQobmV3X3NvcnRfaWNvbik7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRzb3J0VGFibGVSb3dzKCkge1xuXHRcdGlmICghdGhpcy5kb19zb3J0KSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3QgYXNjX21vZGlmaWVyID0gdGhpcy5zb3J0X2RpcmVjdGlvbiA9PT0gJ0FTQycgPyAxIDogLTE7XG5cblx0XHRpZiAodGhpcy5zb3J0X3R5cGUgPT09ICdoZWlnaHQnKSB7XG5cdFx0XHR0aGlzLnRhYmxlX3Jvd3Muc29ydCgocm93X2EsIHJvd19iKSA9PiB7XG5cdFx0XHRcdHJldHVybiBhc2NfbW9kaWZpZXIgKiAocm93X2EuaGVpZ2h0IC0gcm93X2IuaGVpZ2h0KTtcblx0XHRcdH0pO1xuXHRcdH0gZWxzZSBpZiAoXG5cdFx0XHQodGhpcy5zb3J0X3R5cGUgPT09ICduYW1lJykgfFxuXHRcdFx0KHRoaXMuc29ydF90eXBlID09PSAnaGFpcl9jb2xvcicpIHxcblx0XHRcdCh0aGlzLnNvcnRfdHlwZSA9PT0gJ2V5ZV9jb2xvcicpXG5cdFx0KSB7XG5cdFx0XHR0aGlzLnRhYmxlX3Jvd3Muc29ydCgocm93X2EsIHJvd19iKSA9PiB7XG5cdFx0XHRcdGlmIChyb3dfYVt0aGlzLnNvcnRfdHlwZV0gPCByb3dfYlt0aGlzLnNvcnRfdHlwZV0pIHtcblx0XHRcdFx0XHRyZXR1cm4gLTEgKiBhc2NfbW9kaWZpZXI7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHJvd19hW3RoaXMuc29ydF90eXBlXSA+IHJvd19iW3RoaXMuc29ydF90eXBlXSkge1xuXHRcdFx0XHRcdHJldHVybiAxICogYXNjX21vZGlmaWVyO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0fSk7XG5cdFx0fVxuICAgICAgICBlbHNlIGlmKHRoaXMuc29ydF90eXBlID09PSAnYmlydGhfeWVhcicpIHtcblx0XHRcdHRoaXMudGFibGVfcm93cy5zb3J0KChyb3dfYSwgcm93X2IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB5ZWFyX251bV9hID0gK3Jvd19hLmJpcnRoX3llYXIucmVwbGFjZSgvW15cXGQuLV0vZywgJycpXG4gICAgICAgICAgICAgICAgY29uc3QgeWVhcl9udW1fYiA9ICtyb3dfYi5iaXJ0aF95ZWFyLnJlcGxhY2UoL1teXFxkLi1dL2csICcnKVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFzY19tb2RpZmllciAqICh5ZWFyX251bV9hIC0geWVhcl9udW1fYilcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblx0fVxuXG5cdHBhdGNoUm93c0Zyb21EYXRhKGRhdGEpIHtcblx0XHRyZXR1cm4gZGF0YS5tYXAoKGRhdGFfb2JqLCBpKSA9PiB7XG5cdFx0XHRyZXR1cm4gbmV3IERhdGFSb3coXG5cdFx0XHRcdGksXG5cdFx0XHRcdGRhdGFfb2JqLm5hbWUsXG5cdFx0XHRcdGRhdGFfb2JqLmhlaWdodCxcblx0XHRcdFx0ZGF0YV9vYmouaGFpcl9jb2xvcixcblx0XHRcdFx0ZGF0YV9vYmouZXllX2NvbG9yLFxuXHRcdFx0XHRkYXRhX29iai5iaXJ0aF95ZWFyLFxuXHRcdFx0XHQoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5yZW1vdmVSb3cuYmluZCh0aGlzKShpKTtcblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxufVxuIiwiaW1wb3J0IERhdGFUYWJsZSBmcm9tICcuL0RhdGFUYWJsZSdcblxuY29uc3QgbWFpbl90YWJsZSA9IG5ldyBEYXRhVGFibGUoJ21haW4tdGFibGUnLCAnZGF0YS10YWJsZV9faGVhZCcpXG5jb25zdCBidG5fZ2V0X2RhdGEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2V0LWRhdGEtYnRuJyk7XG5jb25zdCBidG5fY2xlYXJfdGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xlYXItdGFibGUtYnRuJyk7XG5cbm1haW5fdGFibGUuc2V0SGVhZFNvcnRIYW5kbGVycygpXG5tYWluX3RhYmxlLnJlbmRlclRhYmxlQm9keSgpXG5cbmJ0bl9nZXRfZGF0YS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBtYWluX3RhYmxlLnVwZGF0ZVRhYmxlUm93cygpXG4gICAgbWFpbl90YWJsZS5yZW5kZXJUYWJsZUJvZHkoKVxufSlcblxuYnRuX2NsZWFyX3RhYmxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIG1haW5fdGFibGUuY2xlYXJUYWJsZSgpXG59KSJdfQ==
