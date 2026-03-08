// login page  ====================================

// document.getElementById('login-btn').addEventListener('click', function () {
//   // 1. get the username input
//   const userInput = document.getElementById('input-username');
//   const userName = userInput.value;
//   console.log(userName);

//   // 2. get the password
//   const passInput = document.getElementById('input-pass');

//   const passWord = passInput.value;
//   console.log(passWord);
//   // 3. match password and password
//   if (userName === 'admin' && passWord === 'admin123') {
//     alert('Login Successful');
//           localStorage.setItem('loggedIn', 'true');
// window.location.assign('./index.html');
//   } else {
//     alert('please try again');
//     return;
//   }
//   // 3.1 true --alert > homepage
//   // 3.1 false --alert > return
// });

document.getElementById('login-btn').addEventListener('click', function () {
  const userName = document.getElementById('input-username').value;
  const passWord = document.getElementById('input-pass').value;

  if (userName === 'admin' && passWord === 'admin123') {
    localStorage.setItem('loggedIn', 'true');
    window.location.replace('index.html');
  } else {
    alert('please try again');
  }
});