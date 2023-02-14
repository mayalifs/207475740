//New place Validation
const NewPlaceForm = document.querySelector('#add');
NewPlaceForm.addEventListener('click', (e) => {
    e.preventDefault();
    let RName = document.querySelector('#place_name').value;
    let StreetName = document.querySelector('#street_name').value;
    let StreetNumber = document.querySelector('#street_number').value;
    let GoogleSite = document.querySelector('#google_site').value;
    let Phone = document.querySelector('#contact_number').value;
    let msg = document.querySelector('.msg');


    if (NameValidation(RName) == false) {
        msg.innerHTML = "Invalid restaurant name, please type again in English only";
        RName.style.display = "none";
        return false;
    }

    if (RName.length < 3) {
        msg.innerHTML = "Restaurant name must be at least 3 characters";
        RName.style.display = "none";
        return false;
    }

    for (let i = 0; i < PlaceList.length; i++) {
        if (PlaceList[i].getName() === RName) {
            msg.innerHTML = 'Restaurant already exists';
            RName.style.display = "none";
            return false;
        }
    }

    if (NameValidation(StreetName) == false) {
        msg.innerHTML = "Invalid street name, please type again in English only";
        StreetName.style.display = "none";
        return false;
    }

    if (StreetName.length < 3) {
        msg.innerHTML = "Street name must be at least 3 characters";
        StreetName.style.display = "none";
        return false;
    }

    if (StreetNumValidation(StreetNumber) == false) {
        msg.innerHTML = "Invalid street number, please type again in numbers only";
        StreetNumber.style.display = "none";
        return false;
    }

    if (StreetNumber.length > 3) {
        msg.innerHTML = "Street number must be maximum 3 numbers";
        StreetNumber.style.display = "none";
        return false;
    }

    if (UrlValidation(GoogleSite) == false) {
        msg.innerHTML = 'Please enter a valid URL';
        GoogleSite.style.display = "none";
        return false;
    }

    if (PhoneValidation(Phone) == false) {
        msg.innerHTML = 'Please enter a valid phone number';
        Phone.style.display = "none";
        return false;
    } 
    // else {
    //     window.location.href = 'HomePage.html';
    // }


    document.querySelector('.addPlaceForm').submit()

})


function NameValidation(name) {
    if (/^[a-z]+$/i.test(name)) //regex to check if valid name
    {
        return true;
    }
    return false;
}

function StreetNumValidation(number) {
    if (/^\d+$/.test(number)) //regex to check if valid street number
    {
        return true;
    }
    return false;
}

function UrlValidation(url) {
    if (/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(url)) //regex to check if valid url
    {
        return true;
    }
    return false;
}


function PhoneValidation(phone) {
    if (/^\+?(972\-?)?0?(([23489]{1}\-?\d{7})|[5]{1}\d{1}\-?\d{7})$/.test(phone)) //regex to check if valid phone
    {
        return true;
    }
    return false;
}


// Add a new place - if closed remove time option
const closedCheckBox = document.querySelector('#closed')

closedCheckBox.addEventListener('click', (e) => {
    let saturday = document.querySelectorAll('.saturday');
    if (closedCheckBox.checked === true) {
        removeTimeInput(saturday)
    } else {
        showTimeInput(saturday)
    }
})

const removeTimeInput = (className) => {
    for (let i = 0; i < className.length; i++) {
        className[i].style.display = "none";

    }
}
const showTimeInput = (className) => {
    for (let i = 0; i < className.length; i++) {
        className[i].style.display = "block";
    }
}
