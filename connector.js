function POSTData(data) {
    const request = new XMLHttpRequest();

    request.open("POST", "storage.php", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(data));
}

function GETData(callback) {
    const request = new XMLHttpRequest();
    let data = [];

    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data = request.responseText;
            
            callback(JSON.parse(data));
        }
    };

    request.open("GET", "storage.php", true);
    request.send();
}