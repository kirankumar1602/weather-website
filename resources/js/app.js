console.log("Client side javascript is loaded");



const weatherReport = document.querySelector('form');
const search = document.querySelector('input[name=location]');
const result = document.querySelector('#result');

weatherReport.addEventListener('submit', (e) => {
    result.innerHTML = "Loading ...";
    e.preventDefault();
    var location = search.value;
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            result.innerHTML = JSON.stringify(data, undefined, 4);
        });
    });
});