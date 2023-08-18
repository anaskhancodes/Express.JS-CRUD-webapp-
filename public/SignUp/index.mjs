let form = document.querySelector("form")

form.addEventListener("click ", (event) => {
    let fname = document.getElementById("#fname")
    let lname = document.getElementById("#lname")
    let email = document.getElementById("#email")
    let password = document.getElementById("#password")

    axios.post(`/api/v1/signup`, {
        fname: fname,
        lname: lname,
        email: email,
        password: password,
    })
    .then(function(response) {
       console.log("Sign Up Successfuly")
        // window.location.pathname = "/"
    })
    .catch(function(error) {
        // handle error
        console.log(error.data);
        return;
    });

// Reset the input fields after successful signup
document.getElementById("fname").value = "";
document.getElementById("lname").value = "";
document.getElementById("email").value = "";
document.getElementById("password").value = "";
})
