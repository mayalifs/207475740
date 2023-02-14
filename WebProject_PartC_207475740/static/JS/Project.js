//Active nav bar
var currentPage = window.location.pathname;
console.log(currentPage);

const activePage = document.querySelectorAll("nav a").forEach(
    link => {
        if (link.href.includes(`${currentPage}`)) {
            link.classList.add("active");
        }
    }
);
// console.log(activePage);


//Show password
function showPassword() {
    var x = document.getElementById('password');
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

//****************Objects and classes*******************

//Class Place
class Places {
    constructor(name, street, sNumber, city, googleSite, openHours, contact) {
        this.name = name;
        this.street = street;
        this.sNumber = sNumber;
        this.city = city;
        this.googleSite = googleSite;
        this.openHours = new OpenH(openHours);
        this.contact = contact;
    }

    getName() {
        return this.name;
    }

    getCity() {
        return this.city;
    }

}

const PlaceList = [];

const place1 = new Places('Anastasia', 'Frishman', '54', 'Tel Aviv', 'https://www.anastasiatlv.co.il/',
    new OpenH('8am-10pm', '8am-2pm', '9am-8pm'), '03-5290095');
const place2 = new Places('Meshek Barzilay', 'Ahad Haam', '6', 'Tel Aviv', 'https://www.meshekbarzilay.co.il/',
    new OpenH('8am-10pm', '8am-2pm', 'Closed'),
    '03-5166329');
const place3 = new Places('Goodness', 'King George', '41', 'Tel Aviv', 'https://www.goodness.co.il/',
    new OpenH('12am-10pm', '12am-4pm', '12pm-8pm'),
    '055-973-5792');

PlaceList.push(place1);
PlaceList.push(place2);
PlaceList.push(place3);

console.log(PlaceList);


// function OpenH(SunTillThur, friday, saturday)
function OpenH(openHst, closeHst, openHf, closeHf, openHs, closeHs) {
    this.SunTillThur = `Sunday-Thursday: ${openHst} + ${closeHst}`;
    this.friday = `Friday: ${openHf} + ${closeHf}`;
    this.saturday = `Saturday: ${openHs} + ${closeHs}`;
}

console.log(place1);
console.log(place2);
console.log(place3);

//Class User
class User {
    constructor(fname, uname, email, psw) {
        this.fname = fname;
        this.uname = uname;
        this.email = email;
        this.psw = psw;
    }

    getUname() {
        return this.uname;
    }

    getPsw() {
        return this.psw;
    }

}


const UserList = [];

const user1 = new User('Maya Lifshitz', 'mali', 'maya@gmail.com', '12345678!');
const user2 = new User('Dana Cohen', 'daco', 'dana@walla.com', '11223344?');
const user3 = new User('Noy Kalifa', 'noka', 'noy123@hotmail.com', '!?987654321');

UserList.push(user1)
UserList.push(user2)
UserList.push(user3)

console.log(UserList);


//Class Rate
class Rate {
    constructor(pname, cleanliness, FQuality, SQuality, VForMoney, review) {
        this.pname = pname;
        this.cleanliness = cleanliness;
        this.FQuality = FQuality;
        this.pSQualitysw = SQuality;
        this.VForMoney = VForMoney;
        this.review = review;
    }
}

const RateList = [];

const rate1 = new Rate('Anastasia', '5', '5', '4', '5', 'Had the best time!');
const rate2 = new Rate('Meshek Brzilay', '5', '5', '4', '5', 'What an amazing place had the best time!');
const rate3 = new Rate('Goddness', '5', '5', '4', '5', 'Cant wait to eat there again!!');

RateList.push(rate1)
RateList.push(rate2)
RateList.push(rate3)

console.log(RateList);

//****************Functions*******************

//Initial map
function initMap() {
    //Map options
    var options = {
        zoom: 12,
        //Latitude and Longitude coordinates of Tel aviv
        center: {lat: 32.109333, lng: 34.855499}
    }
    //New map
    var map = new google.maps.Map(document.getElementById('map'), options);


    addMarkers({lat: 32.06320275037311, lng: 34.76837102051949})
    addMarkers({lat: 32.06320275037311, lng: 34.77492051807076})
    addMarkers({lat: 32.073653185202765, lng: 34.774821078067326})

    //Add marker function
    function addMarkers(coords) {
        var marker = new google.maps.Marker({
            position: coords,
            map: map
        });
    }

}


// AutoComplete Places Location
let autocomplete;

function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'),
        {
            type: ['establishment'],
            componentRestrictions: {'country': ['IL']},
            fields: ['place_id', 'geometry', 'name']
        });
    autocomplete.addListener('click', onPlaceChanged());
}

function onPlaceChanged() {
    var place = autocomplete.getPlace();
    if (!place.geometry) {
        //User did not select a prediction; reset the input field
        document.getElementById('autocomplete'.placeholder = 'Enter a place');
    } else {
        //Display details about the valid place
        document.getElementById('details').innerHTML = place.name;
    }
}


// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


//Greeting according to the time
function MyGreeting() {
    hour = new Date().getHours();
    if (hour < 12) {
        document.getElementById("greeting").innerHTML = "Good Morning :)";
    } else if (hour < 18) {
        document.getElementById("greeting").innerHTML = "Good Afternoon :)";
    } else {
        document.getElementById("greeting").innerHTML = "Good Evening :)"
    }
    ;
};


//Filter places by location
const filterPlaces = PlaceList.filter(place => {
    return place.getCity();
})


