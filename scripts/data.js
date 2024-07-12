function loadDataTable(contentDiv) {
    contentDiv.innerHTML = `
        <table id="example" class="display" style="width:100%">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Position</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    `;

    $.getJSON('data.json', function(data) {
        $('#example').DataTable({
            data: data,
            columns: [
                { data: 'name' },
                { data: 'age' },
                { data: 'position' }
            ]
        });
    });
}

export { loadDataTable };