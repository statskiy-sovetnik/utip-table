const BODY_CELL_CLASS = 'data-table__body-cell';

export default class DataRow {
	name;
	height;
	hair_color;
	eye_color;
	birth_year;
	row_element;

	constructor(name, height, hair_color, eye_color, birth_year) {
		let row_element = document.createElement('tr');

		const cells = [name, height, hair_color, eye_color, birth_year].map(
			content => {
                let cell = document.createElement('td')
                cell.innerHTML = content
                cell.setAttribute('class', BODY_CELL_CLASS)
                return cell
            }
		);

		row_element.append(...cells);

		Object.assign(this, {
			name,
            height,
            hair_color,
            eye_color,
            birth_year,
			row_element,
		});
	}
}
