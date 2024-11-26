// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        const name = document.querySelector(".name");
        const surname = document.querySelector(".surname");
        const email = document.querySelector(".email");
        const username = document.querySelector(".username");
        const password = document.querySelector(".password");
 

        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        } else{
            event.preventDefault()
            event.stopPropagation()
            // const newUser = {
            //     name,
            //     surname,
            //     email,
            //     username,
            //     password
            // }
            const newUser = {
                username,
                password,
                email
            }
            axios.post("http://localhost:8080/api/auth/registration", newUser )
           ) .then((response) => {
                console.log(response.data);
                alert(response.data)
                alert("good"
                

            })
            .catch((error) => {
                console.log(error)
                alert("bad")
            })
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()