const baseURL = "https://ci-swapi.herokuapp.com/api/";

function getData(type, cb) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", baseURL + type);
    xhr.send();

    xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        cb(JSON.parse(this.responseText));
      }
    };
}

function getTableHeaders(obj) {
    var tableHeaders = [];

    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`);
    });

    return `<tr>${tableHeaders}</tr>`;
}

function writeToDocument(type) {
    var tableRows = [];
    var el = document.getElementById("data");
    el.innerHTML = "";
    
    getData(type, function(data) {
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);

        data.forEach(function(item) {
            var dataRow = [];

            Object.keys(item).forEach(function(key) {
                dataRow.push(`<td>${item[key]}</td>`)
            });
            tableRows.push(dataRow);
        });

        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>`;
    });
}
