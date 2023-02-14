//SignIn Validation
const SignInForm = document.querySelector('#signin');
SignInForm.addEventListener('click', (e) => {
    e.preventDefault();
    let UName = document.querySelector('#username').value;
    let Psw = document.querySelector('#password').value;
    let msg = document.querySelector('.msg');

    if (UName === '' || UName == null || Psw === '' || Psw == null) {
        msg.innerHTML = 'Please enter all fields';
        // setTimeout(() => msg.remove(), 3000)
        UName.style.display = "none";
        // setTimeout(() => window.location.href = 'http://localhost:3000/SignInPage', 1000)
        return false;
    } else {
        let user = 0;
        for (let i = 0; i < UserList.length; i++) {
            if (UserList[i].getUname() === UName && UserList[i].getPsw() === Psw) {
                window.location.href = 'http://localhost:3000/HomePage';
                user = 1;
            }
        }
        if (user === 0) {
            msg.innerHTML = 'User doest exists';
            UName.style.display = "none";
            Psw.style.display = "none";
            // setTimeout(() => msg.remove(), 3000)
            // setTimeout(() => window.location.href = 'http://localhost:3000/SignInPage', 1000)
            return false;
        }

    }

})

