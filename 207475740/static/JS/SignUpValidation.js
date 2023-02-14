//SignUp Validation
const SignUpForm = document.querySelector('#signup');
SignUpForm.addEventListener('click', (e) => {
    e.preventDefault();
    let FirstName = document.querySelector('#first_name').value;
    let LastName = document.querySelector('#last_name').value;
    let UserName = document.querySelector('#username').value;
    let Email = document.querySelector('#email').value;
    let Password = document.querySelector('#password').value;
    let PasswordRepeat = document.querySelector('#password_repeat').value;
    let msg = document.querySelector('.msg');


    // console.log(Password);
    // console.log(PasswordRepeat);

    console.log(FirstName);
    if (NameValidation(FirstName) == false) {
        console.log("inside first name valid");

        msg.innerHTML = 'Invalid first name, please type again in English only';
        FirstName.style.display = "none";
        return false;
    }

    console.log(FirstName);
    if (FirstName.length < 3) {
        console.log("inside first name length valid");

        msg.innerHTML = 'First name must be at least 3 characters';
        FirstName.style.display = "none";
        return false;
    }

    console.log(LastName);
    if (NameValidation(LastName) == false) {
        console.log("inside last name valid");

        msg.innerHTML = 'Invalid last name, please type again in English only';
        LastName.style.display = "none";
        return false;
    }

    console.log(LastName);
    if (LastName.length < 3) {
        console.log("inside last name length valid");

        msg.innerHTML = 'Last name must be at least 3 characters';
        LastName.style.display = "none";
        return false;
    }

    console.log(UserName);
    if (NameValidation(UserName) == false) {
        console.log("inside user name valid");

        msg.innerHTML = 'Invalid user name, please type again in English only';
        UserName.style.display = "none";
        return false;
    }

    console.log(UserName);
    if (UserName.length < 4) {
        console.log("inside user name length valid");

        msg.innerHTML = 'User name must be at least 5 characters';
        UserName.style.display = "none";
        return false;
    }

    // for (let i = 0; i < UserList.length; i++) {
    //     if (UserList[i].getUname() === UserName) {
    //         msg.innerHTML = 'User name is already taken, please try a different one';
    //         UserName.style.display = "none";
    //         return false;
    //     }
    // }

    console.log(Email);
    if (EmailValidation(Email) == false) {
        console.log("inside email valid");
        msg.innerHTML = 'Invalid email address';
        Email.style.display = "none";
        return false;
    }

    console.log(Password);
    if (Password.length < 8) {
        console.log("inside password length min valid");

        msg.innerHTML = 'Password must be at least 8 characters';
        Password.style.display = "none";
        return false;
    }

    console.log(Password);
    if (Password.length > 15) {
        console.log("inside password length max valid");

        msg.innerHTML = 'Password must be less than 15 characters';
        Password.style.display = "none";
        return false;
    }

    console.log(Password);
    if (PasswordValidation(Password) == false) {
        console.log("inside password syntax valid");

        msg.innerHTML = 'Password must contain at least one uppercase letter, one lowercase letter and one number';
        Password.style.display = "none";
        return false;
    }

    console.log(Password);
    console.log(PasswordRepeat);
    if (Password !== PasswordRepeat) {
        console.log("inside password and psw repeat valid");

        msg.innerHTML = 'Please check that both passwords are the same';
        Password.style.display = "none";
        PasswordRepeat.style.display = "none";
        return false;

    } 
    console.log("Im here")
    // SignUpForm.submit()
    document.querySelector('.signUpForm').submit()
})


function EmailValidation(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) //regex to check if valid email
    {
        return true;
    }
    return false;
}

function NameValidation(name) {
    if (/^[a-z]+$/i.test(name)) //regex to check if valid name
    {
        return true;
    }
    return false;
}

function PasswordValidation(password) {
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password))
    {
        return true;
    }
    return false;
}
