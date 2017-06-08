/**
 * Created by Patrick on 08.06.2017.
 */


function showShoes() {
    header = document.createElement('h1');
    header.innerHTML = 'Shoe Collection';
    table = document.createElement('table');
    table.setAttribute('class', 'movies');
    table.innerHTML = '<tr><th>Name</th><th>Marke</th><th>Farbe</th><th>Typ</th><th>Material</th><th>Preis</th></tr>';
    var c = document.getElementById('container');

    c.innerHTML = '';
    c.appendChild(header);
    c.appendChild(table);
    get('shoe', 'all', function(json) {
        var i = 0;
        json.forEach(function(a) {

            row = document.createElement('tr');
            row.setAttribute('class', 'r' + i);
            row.appendChild(addImages(i));
            row.appendChild(createCell(a, 'name'));
            row.appendChild(createCell(a, 'label_id'));
            row.appendChild(createCell(a, 'color_id'));
            row.appendChild(createCell(a, 'type_id'));
            row.appendChild(createCell(a, 'material_id'));
            row.appendChild(createCell(a, 'price'));
            row.appendChild(addButton());
            table.firstChild.appendChild(row);
            i++;
        });

        get('label', 'all', function(json) { updateTable('label', json); });
        get('color', 'all', function(json) { updateTableColor('color', json); });
        get('type', 'all', function(json) { updateTable('type', json); });
        get('material', 'all', function(json) { updateTable('material', json); });
    });
}

function get(addr, rec, responseFunction) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", "scripts/" + addr + ".php?rec=" + rec, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            responseFunction(eval('(' + xmlhttp.responseText + ')'));
        }
    }
    xmlhttp.send(null);
}
function createCell(object, cell) {
    c = document.createElement('td');
    c.setAttribute('name', cell);
    c.innerHTML = object[cell];
    return c;
}

function addButton() {
    var button = document.createElement('button');
    button.innerHTML = "Kaufen";
    return button;
}

function updateTable(c_name, json) {
    cells = document.getElementsByName(c_name + '_id');
    var map = {};
    json.forEach(function(a) {
        map[a.id] = a.name;
    });
    for (i = 0; i < cells.length; i++) {
        key = cells[i].innerHTML;
        cells[i].innerHTML = map[key];
    }
}

function updateTableColor(c_name, json) {
    cells = document.getElementsByName(c_name + '_id');
    var map = {};
    json.forEach(function(a) {
        map[a.id] = a.primary_color + "/"+ a.secundary_color;
    });
    for (i = 0; i < cells.length; i++) {
        key = cells[i].innerHTML;
        cells[i].innerHTML = map[key];
    }
}

function addImages(i)
{
    var img_array =[];
    img_array.push("img/highheels.JPG");
    img_array.push("img/nike.JPG");
    img_array.push("img/sandalen.JPG");
    img_array.push("img/stoeckel.JPG");

    var img = document.createElement('img');
    img.setAttribute('src', img_array[i]);
    img.setAttribute('height', '100px');
    img.setAttribute('width', '100px');

    return img
}