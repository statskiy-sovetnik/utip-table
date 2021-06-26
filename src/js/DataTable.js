import ApiService from './ApiService';
import DataRow from './DataRow';

const TBODY_CLASS = 'data-table__body';
const HEAD_CELL_CLASS = 'data-table__head-cell';
const SORT_ICON_REL_PATH = 'src/assets/arrow_top.svg';
const SORT_ICON_CLASS = 'data-table__sort-icon';

export default class DataTable {
	is_table_empty;
	table_id;
	table_element;
	thead_element;
	tbody_element;
	table_rows;

	sort_direction; // DESC | ASC
	sort_type; // name | height | hair_color | eye_color | birth_year
	do_sort;

	constructor(table_id, head_class) {
		this.is_table_empty = true;
		this.table_id = table_id;
		this.table_element = document.getElementById(table_id);
		this.thead_element = this.table_element.querySelector('.' + head_class);
	}

	async renderTableBody() {
		let table_body = document.createElement('tbody');
		table_body.setAttribute('class', TBODY_CLASS);

		this.removeTbodyElement();

		if (this.is_table_empty) {
			const empty_row = this.createEmptyRow();
			table_body.appendChild(empty_row);
		} else {
			table_body.append(...this.table_rows.map((row) => row.row_element));
		}

		this.table_element.appendChild(table_body);
		this.tbody_element = table_body;
	}

	async updateTableRows() {
		try {
			const people_ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			const data = await Promise.all(
				people_ids.map((id) => {
					return ApiService.getPerson(id);
				})
			);
			const rows = this.patchRowsFromData(data);
			this.table_rows = rows;
			this.is_table_empty = rows.length === 0;
		} catch (err) {
			this.clearTable();
			console.log(err);
		}
	}

	removeRow(id) {
		this.table_rows = this.table_rows.filter((row) => {
			return row.id !== id;
		});
		if (this.table_rows.length === 0) {
			this.clearTable();
		}

		this.renderTableBody();
	}

	removeTbodyElement() {
		if (this.tbody_element != undefined) {
			this.tbody_element.remove();
		}
		this.tbody_element = null;
	}

	clearTable() {
		this.removeTbodyElement();
		this.is_table_empty = true;
		this.table_rows = null;

		this.renderTableBody();
	}

	createEmptyRow() {
		let empty_row = document.createElement('tr');
		let empty_cell = document.createElement('td');
		empty_cell.innerHTML = 'Нет данных';
		empty_row.appendChild(empty_cell);
		return empty_row;
	}

	setHeadSortHandlers() {
		const data_targets = [
			'name',
			'height',
			'hair_color',
			'eye_color',
			'birth_year',
		];
		const head_data_cells = this.thead_element.querySelectorAll(
			'.' + HEAD_CELL_CLASS
		);

		head_data_cells.forEach((th, i) => {
			th.setAttribute('data-target', data_targets[i - 1]);

			th.addEventListener('click', () => {
				this.handleHeadCellClick(data_targets[i - 1]);
			});
		});
	}

	handleHeadCellClick(data_target) {
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

	displaySortIcon() {
		const head_data_cells = this.thead_element.querySelectorAll(
			'.' + HEAD_CELL_CLASS
		);
		const sort_icon = this.thead_element.querySelector('.' + SORT_ICON_CLASS);

		if (sort_icon) {
			sort_icon.remove();
		}

		if (!this.do_sort) {
			return;
		}

		const new_sort_icon = document.createElement('img');
		const desc_class = this.sort_direction === 'DESC' ? ' icon_desc' : '';
		const icon_class = SORT_ICON_CLASS + desc_class;
		new_sort_icon.setAttribute('src', SORT_ICON_REL_PATH);
		new_sort_icon.setAttribute('class', icon_class);

		head_data_cells.forEach((th) => {
			if (th.getAttribute('data-target') === this.sort_type) {
				th.appendChild(new_sort_icon);
			}
		});
	}

	sortTableRows() {
		if (!this.do_sort) {
			return;
		}

		const asc_modifier = this.sort_direction === 'ASC' ? 1 : -1;

		if (this.sort_type === 'height') {
			this.table_rows.sort((row_a, row_b) => {
				return asc_modifier * (row_a.height - row_b.height);
			});
		} else if (
			(this.sort_type === 'name') |
			(this.sort_type === 'hair_color') |
			(this.sort_type === 'eye_color')
		) {
			this.table_rows.sort((row_a, row_b) => {
				if (row_a[this.sort_type] < row_b[this.sort_type]) {
					return -1 * asc_modifier;
				}
				if (row_a[this.sort_type] > row_b[this.sort_type]) {
					return 1 * asc_modifier;
				}
				return 0;
			});
		}
        else if(this.sort_type === 'birth_year') {
			this.table_rows.sort((row_a, row_b) => {
                const year_num_a = +row_a.birth_year.replace(/[^\d.-]/g, '')
                const year_num_b = +row_b.birth_year.replace(/[^\d.-]/g, '')

                return asc_modifier * (year_num_a - year_num_b)
            })
        }
	}

	patchRowsFromData(data) {
		return data.map((data_obj, i) => {
			return new DataRow(
				i,
				data_obj.name,
				data_obj.height,
				data_obj.hair_color,
				data_obj.eye_color,
				data_obj.birth_year,
				() => {
					this.removeRow.bind(this)(i);
				}
			);
		});
	}
}
