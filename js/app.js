$(document).ready(function () {
    $('#postMessage').click(function (e) {
        e.preventDefault();

        //serialize form data
        var url = $('form').serialize();

        //function to turn url to an object
        function getUrlVars(url) {
            var hash;
            var myJson = {};
            var hashes = url.slice(url.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                myJson[hash[0]] = hash[1];
            }
            return JSON.stringify(myJson);
        }

        //pass serialized data to function
        var test = getUrlVars(url);

        //post with ajax
        $.ajax({
            type: "POST",
            url: "http://localhost/php_rest_myblog/api/post/create.php",
            data: test,
            ContentType: "application/json",

            success: function () {
                alert('Post Creado Exitosamente');
                window.location.href = "http://127.0.0.1:5500/index.html"
            },
            error: function () {
                alert('Error al Crear el Post');
            }

        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var req;
    req = new XMLHttpRequest();
    req.open("GET", 'http://localhost/php_rest_myblog/api/post/read.php', true);
    req.send();

    req.onload = function () {
        var json = JSON.parse(req.responseText);

        //limit data called
        var son = json.filter(function (val) {
            return (val.id);
        });

        var html = "";
        console.log(son);
        //loop and display data
        son.forEach(function (val) {
            html += "<tr>";
            html += '<th>' + val["id"] + '</th>';
            html += '<th>' + val["category_name"] + '</th>';
            html += '<th>' + val["title"] + '</th>';
            html += '<th>' + val["body"] + '</th>';
            html += '<th>' + val["author"] + '</th>';
            html += "</tr>";
            
        });

        //append in message class
        document.getElementById('message').innerHTML = html;
    };
});