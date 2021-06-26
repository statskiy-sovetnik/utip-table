export default class ApiService {
	static getPerson(id) {
		return fetch('https://swapi.dev/api/people/' + id, {
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				Accept: 'application/json',
			},
		}).then(
            response => {
                if(response.ok) {
                    return response.json()
                }
                else {
                    throw 'Bad status code'
                }
            }
        ).catch(err => {
            throw err;
        });
	}
}
