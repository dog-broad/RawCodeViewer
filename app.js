$(document).ready(function () {
    fetchCSVFromURL();
});

function fetchCSVFromURL() {
    var url = 'https://raw.githubusercontent.com/dog-broad/CodeRankingLeaderboardCLI/main/LeaderboardsStorage/CurrentCodeRankingLeaderboard.csv'; // Replace with your CSV file URL
    Papa.parse(url, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
            renderDataTable(results.data);
        }
    });
}

function renderDataTable(data) {
    // Extract headers from the first row of data
    var headers = Object.keys(data[0]);

    // Create thead with the extracted headers
    var thead = '<tr>' + headers.map(header => `<th>${header}</th>`).join('') + '</tr>';
    $('#leaderboard thead').html(thead);

    // Generate table rows with the remaining data
    var tbody = data.map(row => {
        return '<tr>' + headers.map(header => `<td>${row[header]}</td>`).join('') + '</tr>';
    }).join('');

    // Populate the table body
    $('#leaderboard tbody').html(tbody);

    // Initialize DataTable
    $('#leaderboard').DataTable({
        scrollY:        "calc(100vh - 200px)",
        scrollX:        true,
        scrollCollapse: true,
        paging:         false,
        fixedColumns:   {
            leftColumns: 1
        }
    });
}

