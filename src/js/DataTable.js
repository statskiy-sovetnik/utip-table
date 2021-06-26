import ApiService from './ApiService';
import DataRow from './DataRow';

const TBODY_CLASS = 'data-table__body';

export default class DataTable {
	is_table_empty;
	table_id;
	table_element;
	thead_element;
    tbody_element;
	table_rows;

	constructor(table_id, head_class) {
		this.is_table_empty = true;
		this.table_id = table_id;
		this.table_element = document.getElementById(table_id);
		this.thead_element = this.table_element.querySelector('.' + head_class);
	}

	async renderTableBody() {
		let table_body = document.createElement('tbody');
		table_body.setAttribute('class', TBODY_CLASS);

        this.removeTbodyElement()

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
		const data = await ApiService.getData();
		const rows = this.patchRowsFromData(data);
		this.table_rows = rows;
		this.is_table_empty = rows.length === 0;
	}

    removeTbodyElement() {
        if(this.tbody_element != undefined) {
            this.tbody_element.remove()
        }
        this.tbody_element = null;
    }

    clearTable() {
        this.removeTbodyElement()
        this.is_table_empty = true
        this.table_rows = null

        this.renderTableBody()
    }

	createEmptyRow() {
		let empty_row = document.createElement('tr');
		let empty_cell = document.createElement('td');
		empty_cell.innerHTML = 'Нет данных';
		empty_row.appendChild(empty_cell);
		return empty_row;
	}

	patchRowsFromData(data) {
		return data.map((data_obj) => {
			return new DataRow(
				data_obj.id,
				data_obj.name,
				data_obj.surname,
				data_obj.nick,
				data_obj.cock
			);
		});
	}
}
