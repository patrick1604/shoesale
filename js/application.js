function newFormat() {
  f_name = textField('format', 'name', 30, '');
  showNewForm('format', 'Neues Dateiformat', {'Bezeichnung':f_name});
}

function newGenre() {
  f_name = textField('genre', 'name', 30, '');
  showNewForm('genre', 'Neues Genre', {'Bezeichnung':f_name});
}

function newLanguage() {
  f_name = textField('language', 'name', 30, '');
  showNewForm('language', 'Neue Sprache', {'Sprache':f_name});
}

function newMovie() {
  f_name = textField('movie', 'name', 50, '');
  f_length = textField('movie', 'length', 10, '');
  f_format = select('movie', 'format_id');
  f_genre = select('movie', 'genre_id');
  f_language = select('movie', 'language_id');
  showNewForm('movie', 'Neuer Film', {'Name':f_name, 'L&auml;nge (Minuten)':f_length, 'Format':f_format, 'Genre':f_genre, 'Sprache':f_language});
  get('language', 'all', function(json) { updateSelect('movie_language_id', json); });
  get('genre', 'all', function(json) { updateSelect('movie_genre_id', json); });
  get('format', 'all', function(json) { updateSelect('movie_format_id', json); });
}

function editMovie(id) {
  get('movie', id, function(json) {
    f_name = textField('movie', 'name', 50, json[0]['name']);
    f_length = textField('movie', 'length', 10, json[0]['length']);
    f_format = select('movie', 'format_id');
    f_genre = select('movie', 'genre_id');
    f_language = select('movie', 'language_id');
    f_id = document.createElement('input');
    f_id.setAttribute('id', 'movie_id');
    f_id.setAttribute('name', 'id');
    f_id.setAttribute('type', 'hidden');
    f_id.setAttribute('value', json[0]['id']);
    showEditForm('movie', 'Neuer Film', {'Name':f_name, 'L&auml;nge (Minuten)':f_length, 'Format':f_format, 'Genre':f_genre, 'Sprache':f_language});
    f = document.forms["movie_form"].appendChild(f_id);
    get('language', 'all', function(j) { updatePreSelect('movie', 'language_id', j, json); });
    get('genre', 'all', function(j) { updatePreSelect('movie', 'genre_id', j, json); });
    get('format', 'all', function(j) { updatePreSelect('movie', 'format_id', j, json); });
  });
}

function allMovies() {
  header = document.createElement('h2');
  header.innerHTML = 'Alle Filme';
  table = document.createElement('table');
  table.setAttribute('class', 'movies');
  table.innerHTML = '<tr><th>Titel</th><th>L&auml;nge</th><th>Genre</th><th>Sprache</th><th>Format</th></tr>';
  var c = document.getElementById('container');
  c.innerHTML = '';
  c.appendChild(header);
  c.appendChild(table);
  get('movie', 'all', function(json) {
    i = 0;
    json.forEach(function(a) {
      if(i > 1) {i = 0;}
      i += 1;
      row = document.createElement('tr');
      row.setAttribute('class', 'r' + i);
      row.appendChild(createCell(a, 'name'));
      row.appendChild(createCell(a, 'length'));
      row.appendChild(createCell(a, 'genre_id'));
      row.appendChild(createCell(a, 'language_id'));
      row.appendChild(createCell(a, 'format_id'));
      edit = document.createElement('td');
      edit.innerHTML = '<a href="javascript:editMovie(' + a.id + ')">Bearbeiten</a>';
      row.appendChild(edit);
      table.firstChild.appendChild(row);
    });
    get('language', 'all', function(json) { updateTable('language', json); });
    get('genre', 'all', function(json) { updateTable('genre', json); });
    get('format', 'all', function(json) { updateTable('format', json); });
  });
}

/* AJAX send & get functions */
function send(addr, type) {
  var f = document.forms[addr + "_form"];
  var post_string = 'type=' + type;

  for(i = 0; i < f.elements.length; i++) {
    if(f.elements[i].name) {
      post_string += ('&' + f.elements[i].name + '=' + f.elements[i].value);
    }
  };
//  alert(post_string);
  var url = "interface/" + addr + ".php";
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.open("POST", url, true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xmlhttp.setRequestHeader("Content-length", post_string.length);

  xmlhttp.setRequestHeader("Connection", "close");

  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState == 4) {
      alert('response: ' + xmlhttp.responseText);
    }
  }
  xmlhttp.send(post_string);
}

function get(addr, rec, responseFunction) {
  var url = "interface/" + addr + ".php?rec=" + rec;
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.open("GET", url, true);
  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState == 4) {
      responseFunction(eval('(' + xmlhttp.responseText + ')'));
    }
  }
  xmlhttp.send(null);
}

/* Helpers */
function outerHTML(node) {
  d = document.createElement('div');
  d.appendChild(node);
  return d.innerHTML;
}
function textField(f, f_name, size, val) {
  field = document.createElement('input');
  field.setAttribute('id', f + '_' + f_name);
  field.setAttribute('name', f_name);
  field.setAttribute('type', 'text');
  field.setAttribute('value', val);
  field.setAttribute('size', size);
  return field;
}

function select(f, f_name) {
  s = document.createElement('select');
  s.setAttribute('id', f + '_' + f_name);
  s.setAttribute('name', f_name);
  return s;
}

function updateSelect(id, json) {
  var f = document.getElementById(id);
  json.forEach(function(a) {
    o = document.createElement('option');
    o.setAttribute('value', a.id);
    o.innerHTML = a.name;
    f.appendChild(o);
  });
}

function updatePreSelect(m, m_id, j, json) {
  var id = m + '_' + m_id;
  updateSelect(id, j);
  e = document.getElementById(id);
  for(i = 0; i < j.length; i++) {
    if(j[i]['id'] == json[0][m_id]) {
      e.options[i].selected = true;
    }
  }
}

function showNewForm(form_name, header, fields) {
  h = document.createElement('h2');
  h.innerHTML = header;
  form = document.createElement('form');
  form.setAttribute('name', form_name + '_form');
  form.setAttribute('action', ("javascript:send('" + form_name + "','new')"));
  var rows = ''
  for(var field in fields) {
    rows += "<tr><td>" + field + "</td><td>" + outerHTML(fields[field]) + "</td></tr>"
  }
  form.innerHTML = "<table>" + rows +  "<tr><td><input type=\"submit\" value=\"Hinzuf&uuml;gen\" /\><td></tr></table>";
  c = document.getElementById('container');
  c.innerHTML = '';
  c.appendChild(h);
  c.appendChild(form);
}

function showEditForm(form_name, header, fields) {
  h = document.createElement('h2');
  h.innerHTML = header;
  form = document.createElement('form');
  form.setAttribute('name', form_name + '_form');
  form.setAttribute('action', ("javascript:send('" + form_name + "','edit')"));
  var rows = ''
  for(var field in fields) {
    rows += "<tr><td>" + field + "</td><td>" + outerHTML(fields[field]) + "</td></tr>"
  }
  form.innerHTML = "<table>" + rows +  "<tr><td><input type=\"submit\" value=\"&Auml;ndern\" /\><td></tr></table>";
  c = document.getElementById('container');
  c.innerHTML = '';
  c.appendChild(h);
  c.appendChild(form);
}

function createCell(object, cell) {
  c = document.createElement('td');
  c.setAttribute('name', cell);
  c.innerHTML = object[cell];
  return c;
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
