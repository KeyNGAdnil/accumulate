var request = new XMLHttpRequest()
request.open('GET', '/a/b/c?name=ff', true);
request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
        console.log(request.responseText);
    }
};
request.send();
