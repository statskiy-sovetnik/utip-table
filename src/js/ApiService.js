export default class ApiService {
    static getData() {
        return new Promise(resolve => {
            resolve([
                {
                    id: 0,
                    name: 'Suka', 
                    surname: 'Buka', 
                    nick: 'Dodopizza', 
                    cock: 'big'
                },
                {
                    id: 1,
                    name: 'Mam', 
                    surname: 'LFC', 
                    nick: 'Random', 
                    cock: 'small'
                },
            ])
        })    
    }
}