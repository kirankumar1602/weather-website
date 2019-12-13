console.log("Client side javascript is loaded");



const weatherReport = document.querySelector('form');
const search = document.querySelector('input[name=location]');
const place = document.querySelector('#place');
const message = document.querySelector('#message');

weatherReport.addEventListener('submit', (e) => {
    place.innerHTML = "Loading ...";
    message.innerHTML = "";
    e.preventDefault();
    var location = search.value;
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            console.log("inside");
            if(!data.response.place){
                console.log("if");
                place.innerHTML = data.response;
            }else {
                console.log("else");
                place.innerHTML = data.response.place;
                message.innerHTML = data.response.message;
            }
        });
    });
});