/**
 * Created by Patrick on 08.06.2017.
 */


function homeMenu()
{

    var header  = document.getElementById('header');
    header.innerHTML = '';
    var h1 = document.createElement('h1');
    h1.innerHTML = "SHOESALE";
    header.appendChild(h1);
    var container = document.getElementById('container');
    container.innerHTML = '';

    for(var i= 0; i<4; i++)
    {
        container.appendChild(addImages(i));
    }

}

function addColor()
{
    var color_one = createSelectMen('colors', 'primary');
    var color_two = createSelectMen('colors', 'secondary');

    addColorCombo('color', 'Add a Color Combination', {'Primary Color':color_one, 'Secondary Color': color_two});
    get('colors', 'all', function(json) { updateSelect('colors_primary', json); });
    get('colors', 'all', function(json) { updateSelect('colors_secondary', json); });
}

function addColorCombo( form_name, header, fields) {
    var h = document.createElement('h2');
    h.innerHTML = header;
    var form = document.createElement('form');
    form.setAttribute('name', form_name + '_form');
    form.setAttribute('action', ("javascript:send('" + form_name + "','new')"));
    var rows = '';
    for(var field in fields) {

        rows += "<tr><td>" + field + "</td><td>" + changeSig(fields[field]) + "</td></tr>"
    }
    form.innerHTML = "<table>" + rows +  "<tr><td><input type=\"submit\" value=\"Hinzuf&uuml;gen\" /\><td></tr></table>";
    var container = document.getElementById('container');
    container.innerHTML = '';
    container.appendChild(h);
    container.appendChild(form);
}


function deleteShoes()
{
    var f_name = createSelectMen('shoe', 'name');
    showFormAndDelete('shoe', 'Delete', {'Name':f_name,});
    get('shoe', 'all', function(json) { updateSelect('shoe_name', json); });

}

function showFormAndDelete(form_name, header, fields) {
    var h = document.createElement('h2');
    h.innerHTML = header;
    var form = document.createElement('form');
    form.setAttribute('name', form_name + '_form');
    form.setAttribute('action', ("javascript:send('" + form_name + "','delete')"));

    var rows = ''
    for(var field in fields) {
        rows += "<tr><td>" + field + "</td><td>" + changeSig(fields[field]) + "</td></tr>"
    }
    form.innerHTML = "<table>" + rows +  "<tr><td><input type=\"submit\" value=\"Delete\" /\><td></tr></table>";
    var c = document.getElementById('container');
    c.innerHTML = '';
    c.appendChild(h);
    c.appendChild(form);
}


function addShoes()
{
    var name = createTextField('shoe', 'name', 50, '');
    var price = createTextField('shoe', 'price', 10, '');
    var left = createTextField('shoe', 'Anzahl', 10, '');
    var label = createSelectMen('shoe', 'label_id');
    var material = createSelectMen('shoe', 'material_id');
    var type = createSelectMen('shoe', 'type_id');
    var color = createSelectMen('shoe', 'color_id');
    showNewForm('shoe', 'Neue Kreation', {'Name':name, 'Marke':label,'Farbe':color, 'Art':type, 'Material':material, 'Anzahl':left, 'Preis':price});
    get('label', 'all', function(json) { updateSelect('shoe_label_id', json); });
    get('color', 'all', function(json) { updateSelect('shoe_color_id', json); });
    get('type', 'all', function(json) { updateSelect('shoe_type_id', json); });
    get('material', 'all', function(json) { updateSelect('shoe_material_id', json); });

}

function updateSelect(id, json) {
    var f = document.getElementById(id);
    json.forEach(function(a) {
        var opt = document.createElement('option');
        opt.setAttribute('value', a.id);
        opt.innerHTML = a.name;
        f.appendChild(opt);
    });
}

function send(addr, type) {
    var f = document.forms[addr + "_form"];
    var post_string = 'type=' + type;

    console.log(type);

    for(i = 0; i < f.elements.length; i++) {
        if(f.elements[i].name) {
            post_string += ('&' + f.elements[i].name + '=' + f.elements[i].value);
        }
    };
    console.log(post_string);
    alert(post_string);
    var url = "scripts/" + addr + ".php";
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4) {
            alert('response: ' + xmlhttp.responseText);
        }
    }
    xmlhttp.send(post_string);
}

function showNewForm(form_name, header, fields) {
    var h = document.createElement('h2');
    h.innerHTML = header;
    var form = document.createElement('form');
    form.setAttribute('name', form_name + '_form');
    form.setAttribute('action', ("javascript:send('" + form_name + "','new')"));
    var rows = ''
    for(var field in fields) {
        rows += "<tr><td>" + field + "</td><td>" + changeSig(fields[field]) + "</td></tr>"
    }
    form.innerHTML = "<table>" + rows +  "<tr><td><input type=\"submit\" value=\"Hinzuf&uuml;gen\" /\><td></tr></table>";
    c = document.getElementById('container');
    c.innerHTML = '';
    c.appendChild(h);
    c.appendChild(form);
}


function changeSig(node) {
    d = document.createElement('div');
    d.appendChild(node);
    return d.innerHTML;
}

function createTextField(f, f_name, size, val) {
    var field = document.createElement('input');
    field.setAttribute('id', f + '_' + f_name);
    field.setAttribute('name', f_name);
    field.setAttribute('type', 'text');
    field.setAttribute('value', val);
    field.setAttribute('size', size);
    return field;
}

function createSelectMen(f, f_name) {
    s = document.createElement('select');
    s.setAttribute('id', f + '_' + f_name);
    s.setAttribute('name', f_name);
    return s;
}


function showShoes() {
    var header = document.createElement('h1');
    header.innerHTML = 'Shoe Collection';
    var table = document.createElement('table');
    table.setAttribute('class', 'shoes');
    var line = document.createElement('hr');
    table.innerHTML = '<tr><th></th><th>Name</th><th>Marke</th><th>Farbe</th><th>Typ</th><th>Material</th><th>Anzahl</th><th>Preis</th></tr>';
    var container = document.getElementById('container');

    container.innerHTML = '';
    container.appendChild(header);
    container.appendChild(table);
    get('shoe', 'all', function(json) {
        var i = 0;
        json.forEach(function(a) {

            row = document.createElement('tr');
            row.setAttribute('class', 'r' + i);
            row.appendChild(callImage(i));
            row.appendChild(makeEntry(a, 'name'));
            row.appendChild(makeEntry(a, 'label_id'));
            row.appendChild(makeEntry(a, 'color_id'));
            row.appendChild(makeEntry(a, 'type_id'));
            row.appendChild(makeEntry(a, 'material_id'));

            var count = document.createElement('td');
            count.setAttribute('name', 'Anzahl');
            count.setAttribute('class', 'count');
            count.innerHTML = a['Anzahl'];

            row.appendChild(count);


            //TODO: add Anzahl to buyshoes function for verifying if no more shoes left (c<0)

            row.appendChild(makeEntry(a, 'price'));
            var button = document.createElement('button');
            button.setAttribute('class', 'buy');
            button.innerHTML = '<a href="javascript:buyShoes(' + a.id + ')">Buy</a>';
            row.appendChild(button);

            table.firstChild.appendChild(row);
            i++;
        });

        get('label', 'all', function(json) { updateTable('label', json); });
        get('color', 'all', function(json) { updateTable('color', json); });
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

            console.log(xmlhttp.responseText);
            responseFunction(eval('(' + xmlhttp.responseText + ')'));
        }
    };
    xmlhttp.send(null);
}
function makeEntry(object, cell) {
    c = document.createElement('td');
    c.setAttribute('name', cell);
    c.innerHTML = object[cell];
    return c;
}

function buyShoes(id) {

    var post_string = 'type=' + 'update';

    post_string += ('&' + 'id' + '=' + id);

    console.log(id + " " + post_string);

    var url = "scripts/" + 'shoe' + ".php";
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4) {
          //  alert('response: ' + xmlhttp.responseText);
        }
    };
    xmlhttp.send(post_string);

    updateCount(id);
}


function updateCount(id)
{
    var table = document.getElementById('movies');
    var rows = document.getElementsByClassName('count');

    for(var i = 1; i < rows.length+1; i++)
    {
        if(id == i)
        {
            console.log(id + " " +  i);
            rows[i-1].innerHTML -= 1;
        }

    }
}

function updateTable(c_name, json) {
    cells = document.getElementsByName(c_name + '_id');
    var map = {};
    json.forEach(function (a) {
        map[a.id] = a.name;
    });
    for (i = 0; i < cells.length; i++) {
        key = cells[i].innerHTML;
        cells[i].innerHTML = map[key];
    }
}

function addImages(i)
{
    var img_array =[];
    img_array.push("img/sale.JPG");
    img_array.push("img/more.jpg");
    img_array.push("img/nomore.JPG");
    img_array.push("img/newcolor.JPG");

    var a = document.createElement('a');

    switch (i) {

        case 0:
            a.setAttribute('onclick', 'showShoes()');
            break;
        case 1:
            a.setAttribute('onclick', 'addShoes()');
            break;
        case 2:
            a.setAttribute('onclick', 'deleteShoes()');
            break;
        case 3:
            a.setAttribute('onclick', 'addColor()');
            break;
    }

    var img = document.createElement('img');
    img.setAttribute('src', img_array[i]);
    img.setAttribute('height', '300px');
    img.setAttribute('width', '300px');
    img.setAttribute('class', 'img'+ i);
    a.appendChild(img);


    return a;
}

function callImage(i)
{
    var img_array =[];
    img_array.push("img/heel.JPG");
    img_array.push("img/sandale.JPG");
    img_array.push("img/nike.JPG");
    img_array.push("img/stoeckel.JPG");

    var img = document.createElement('img');
    img.setAttribute('src', img_array[i]);
    img.setAttribute('height', '150px');
    img.setAttribute('width', '150px');

    if(i>3)
    {
        img.setAttribute('src', 'img/nopic.png');
        img.setAttribute('height', '150px');
        img.setAttribute('width', '150px');
    }

    return img;
}