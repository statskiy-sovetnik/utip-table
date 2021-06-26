const BODY_CELL_CLASS = 'data-table__body-cell';
const BODY_ROW_CLASS = 'data-table__body-row';

export default class DataRow {
	id;
	name;
	height;
	hair_color;
	eye_color;
	birth_year;
	row_element;

	constructor(
		id,
		name,
		height,
		hair_color,
		eye_color,
		birth_year,
		remove_row_handler
	) {
		let row_element = document.createElement('tr');
		row_element.setAttribute('class', BODY_ROW_CLASS);

		const cells = [name, height, hair_color, eye_color, birth_year].map(
			(content) => {
				let cell = document.createElement('td');
				cell.innerHTML = content;
				cell.setAttribute('class', BODY_CELL_CLASS);
				return cell;
			}
		);

		row_element.append(this.createRemoveRowCell(remove_row_handler), ...cells);

		Object.assign(this, {
			id,
			name,
			height,
			hair_color,
			eye_color,
			birth_year,
			row_element,
		});
	}

	createRemoveRowCell(remove_row_handler) {
		let remove_btn_cell = document.createElement('td');
		let remove_btn = document.createElement('button');
		remove_btn.innerHTML = 'Удалить';
		remove_btn.addEventListener('click', remove_row_handler);
		remove_btn_cell.append(remove_btn);
		remove_btn_cell.setAttribute('class', BODY_CELL_CLASS + ' body-cell_remove-row');
		return remove_btn_cell;
	}
}
