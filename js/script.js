let $ = document;
let registerFormElm = $.querySelector(".registerForm");
let firstNameElm = $.querySelector(".firstName");
let lastNameElm = $.querySelector(".lastName");
let ageElm = $.querySelector(".age");
let emailElm = $.querySelector(".email");
let passwordElm = $.querySelector(".password");
let tableBody = $.querySelector(".tableBody");
let modalElm = $.querySelector(".modal");
let btnModalYes = $.querySelector(".btnModal-yes");
let btnModalNo = $.querySelector(".btnModal-no");
let EditModalElm = $.querySelector(".EditModal");
let EditSubmitElm = $.querySelector(".EditSubmit");
let EditCancelElm = $.querySelector(".EditCancel");
let editFirstNameElm = $.querySelector(".editFirstName")
let editLastNameElm = $.querySelector(".editLastName")
let editAgeElm = $.querySelector(".editAge")
let editEmailElm = $.querySelector(".editEmail")
let editPasswordElm = $.querySelector(".editPassword")
function clearInputs() {
  firstNameElm.value = "";
  lastNameElm.value = "";
  ageElm.value = "";
  emailElm.value = "";
  passwordElm.value = "";
}

// Post create new user
registerFormElm.addEventListener("submit", (e) => {
  e.preventDefault();
  let userInfo = {
    firstName: firstNameElm.value,
    lastName: lastNameElm.value,
    age: ageElm.value,
    email: emailElm.value,
    password: passwordElm.value,
  };
  clearInputs();
  fetch(
    "https://moahmadaghaeitestproject1381-default-rtdb.firebaseio.com/users.json",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userInfo),
    }
  )
    .then((resolve) => {
      userGenerator();
      console.log(resolve);
    })
    .catch((err) => console.log(err));
});

// GET read the users in data base and show users in the front
function userGenerator() {
  tableBody.innerHTML = "";
  fetch(
    "https://moahmadaghaeitestproject1381-default-rtdb.firebaseio.com/users.json"
  )
    .then((res) => res.json())
    .then((data) => {
      let usersArray = Object.entries(data);

      usersArray.forEach((user) => {
        tableBody.insertAdjacentHTML(
          "beforeend",
          `<tr>
             <td>${user[0]}</td>
             <td>${user[1].firstName}</td>
             <td>${user[1].lastName}</td>
             <td>${user[1].age}</td>
             <td>${user[1].email}</td>
             <td>${user[1].password}</td>
             <td class="box-btn"><button onclick="deleteUserHandler('${user[0]}')" class ="delete-btn btn">Delete</button><button onclick="editGenerator('${user[0]}')" class="Edit-btn btn">Edit</button></td>
            </tr>`
        );
      });
    })

    .catch((err) => console.log(err));
}
window.addEventListener("load", () => {
  userGenerator();
});

// DELETE  delete the user in dom and in our db
let userId = null;
function closeDeleteModal() {
  btnModalNo.addEventListener("click", () => {
    modalElm.classList.remove("modalVisible");
  });
}
function deleteUserHandler(id) {
  closeDeleteModal();
  userId = id;
  modalElm.classList.add("modalVisible");
  btnModalYes.addEventListener("click", () => {
    fetch(
      `https://moahmadaghaeitestproject1381-default-rtdb.firebaseio.com/users/${userId}.json`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        console.log(res);
        userGenerator();
        modalElm.classList.remove("modalVisible");
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
// PUT update(Edit) users
function editGenerator(userId) {
  EditModalElm.classList.add("ShowEditModal");
  EditSubmitElm.addEventListener("click", (e) => {
    e.preventDefault()
       let newInformationUser = {
        firstName: editFirstNameElm.value,
        lastName: editLastNameElm.value,
        age: editAgeElm.value,
        email: editEmailElm.value,
        password: editPasswordElm.value,
       };
       fetch(`https://moahmadaghaeitestproject1381-default-rtdb.firebaseio.com/users/${userId}.json`,{
        method: "PUT",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(newInformationUser)
       }).then((res)=>{
        console.log(res);
        userGenerator() 
        closeEditModal()
       }).catch(err => console.log(err))

  });
  EditCancelElm.addEventListener("click", () => {
    closeEditModal();
  });
}

function closeEditModal() {
  EditModalElm.classList.remove("ShowEditModal");
}
