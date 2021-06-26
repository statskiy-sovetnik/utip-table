import DataTable from './DataTable'

const main_table = new DataTable('main-table', 'data-table__head')
const btn_get_data = document.getElementById('get-data-btn');
const btn_clear_table = document.getElementById('clear-table-btn');

main_table.renderTableBody()

btn_get_data.addEventListener('click', async () => {
    await main_table.updateTableRows()
    main_table.renderTableBody()
})

btn_clear_table.addEventListener('click', () => {
    main_table.clearTable()
})