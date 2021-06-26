const BODY_CELL_CLASS = 'data-table__body-cell'

export default class DataRow {
	id;
	name;
	surname;
	nick;
	cock;
	row_element;

	constructor(id, name, surname, nick, cock) {
		let row_element = document.createElement('tr');

		const i = document.createElement('td')
		i.innerHTML = id
        i.setAttribute('class', BODY_CELL_CLASS)

		const n = document.createElement('td')
		n.innerHTML = name
        n.setAttribute('class', BODY_CELL_CLASS)

		const s = document.createElement('td')
		s.innerHTML = surname
        s.setAttribute('class', BODY_CELL_CLASS)

		const ni = document.createElement('td')
		ni.innerHTML = nick
        ni.setAttribute('class', BODY_CELL_CLASS)

		const co = document.createElement('td');
		co.innerHTML = cock;
        co.setAttribute('class', BODY_CELL_CLASS)

		row_element.append(i, n, s, ni, co);

		Object.assign(this, {
			i,
			n,
			s,
			ni,
			co,
			row_element,
		});
	}
}
