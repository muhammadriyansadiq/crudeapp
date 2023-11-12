

function signuppage(){
  window.location.href = "index.html"
}


function signup(e) {
  // yeh function call hoga jab sign up k button par click karoonga
  e.preventDefault();
  let location = false;
  let namecheck = false;
  let passwordcheck = false;
  let emailcheck = false;
  let name = document.querySelector("#name");
  let username = name.value;
  let email = document.querySelector("#email");
  let inputemail = email.value;
  let password = document.querySelector("#password");
  let passwordpattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{10,}$/
  let passwordpatternchecker = false;
  let inputpassword = password.value;
  // input field sai value get kar rahai hai
  let getting = JSON.parse(localStorage.getItem("formdata")) || [];
   // local storage sai  data lai raha hai aur getting variable mai data safe horaha hai
   // agar pasword pattern match karjaye aur email aur paswword unique hoto next page yani login par chala jayye
if(passwordpattern.test(inputpassword)){
  for (let data of getting) {
    if (data.email === inputemail) {
      emailcheck = true;
      console.log(data.email);
      break;
    }
    if (data.password === inputpassword){
      passwordcheck = true;
      console.log(data.password);
      break;
    }
  }
  if (emailcheck) {
    alert("Email has already been used");
  } 
  else if (passwordcheck) {
    alert("Password has already been used");
  }
  // agar email password match nhi kartai tu  else chalaiyga object banaiga obj push hoga array mai phir wo array storage mai bithaoonga stringify kar k aur page bhi move hojaayega
  else {
    let objec = {
      name: username,
      email: inputemail,
      password: inputpassword,
    };
    getting.push(objec);
    localStorage.setItem("formdata", JSON.stringify(getting));
    window.location.href = "loginup.html";
  }
}
// agar password pattern match nhi karta tu yeh chalaiy
else{
    alert("wrong passord pattern")
}
}
// login start
function Login(event) {
  event.preventDefault();
  var isValid = false;
  var emailAlert = false;
  var passwordAlert = false;
  var emailPasswordAlert = false;
  var LoginEmail = document.getElementById("lgnuemail").value;
  var Loginpassword = document.getElementById("lgnpassword").value;
  let gett = JSON.parse(localStorage.getItem("formdata"));
  let pushing = JSON.parse(localStorage.getItem("lastperson")) || [];

  let object = {
       lastpersonloginemail:LoginEmail
     }  
pushing.push(object)
localStorage.setItem('lastperson',JSON.stringify(pushing))
// last person ko bitha hai local storage mai 

  gett.forEach((element) => {
    // agar email aur password right haito home par chala jyaei
    if (element.password === Loginpassword && element.email === LoginEmail) {
      console.log(element.password);
      window.location.href = "home.html";
      isValid = true; /// else ki jagah yeh logic istimal karooo
    } 
    else if (
      // only email wrong haito yeh chaljaye
      element.password === Loginpassword &&
      element.email !== LoginEmail
    ) {
      emailAlert = true;
      isValid = true;
    } 
    else if (
      // only password wrong haito yeh chaljaye
      element.password !== Loginpassword &&
      element.email === LoginEmail
    
      ) {
    
        passwordAlert = true;
        isValid = true;
    
    } 
    else if (
// agar password email dono wrong haito yeh chal jye
      element.password !== Loginpassword &&
      element.email !== LoginEmail
      
    ) {
        isValid = false;
    }
  });
  if(!isValid){
    swal("Email & password!", "...wrong email & password!");
  }

 else if (emailAlert) {
    swal("Email!", "...Wrong Email!");
  }
  else if (passwordAlert) {
    swal("password", "...Wrong Password!");
  }
}


// ============================ todo list =============================//
// let removelocalstoragedata = document.querySelector(".delbtn").addEventListener("click",removelocalstoragedatafunction)

let lastperson;

// jis last bandai nai login kiya hai os hi ka data aajaye students data mai
window.onload = function(){
  let gett = JSON.parse(localStorage.getItem("tododata")) || [];
        const stddata = document.querySelector(".studentsdata");
        stddata.innerHTML = "" //e.g: 30 bando ka data mujhai daikhai jitna local storage mai hai
        let r = JSON.parse(localStorage.getItem("lastperson"));
        lastperson = r.slice(r.length-1)[0].lastpersonloginemail;
        // jitna bhi data local storage mai save tha jis last bandai login kiya hai sirf wo filter hokar ayye hai
        let get = gett.filter((dat)=>{
return dat.lastpersonlognemail === lastperson

       })

       // yeh pora block students data dikhaiyga jis last bandai nai enter kiya hai

        for (let data of get) {
          const newRow = document.createElement('div');
          newRow.classList.add(`student-row`);
          newRow.innerHTML = `
          <p><strong class="strong">Form Id: </strong><span class="formide" > ${data.formid}</span></p>
            <p><strong class="strong">Name: </strong><span class="stdname"> ${data.name}</span></p>
            <p><strong class="strong">Email: </strong><span class="stdemail"> ${data.email}</span></p>
            <p><strong class="strong">Number: </strong><span class="stdnumber"> ${data.number}</span></p>
            <div>
              <button class="delbtn" >Delete</button>
              <a href="#unique"><button class="edtformbtn">Edit</button></a>
            </div>
            <br>`;
          stddata.appendChild(newRow);
        }

}

// let lastperson;
let editstudentbtn = document.querySelector(".editstudentbtn")
let addstudentbtn = document.querySelector(".addstudentbtn")
let stddata = document.querySelector(".studentsdata")
let userid = 0;
let editingRow = null;
var editstudentdata = document.querySelector(".editstudentdata")
var editbtn = document.querySelector(".editbtn")
addstudentbtn.addEventListener("click",function(){
let namef = document.querySelector("#name")
let emailf = document.querySelector("#email")
let numberf = document.querySelector("#number")
let gett = JSON.parse(localStorage.getItem("tododata")) || [];
let namevalue = namef.value;
let emailvalue = emailf.value;
let numbervalue = numberf.value;
let geting = JSON.parse(localStorage.getItem("tododata"));
let r = JSON.parse(localStorage.getItem("lastperson"));
 lastperson = r.slice(r.length-1)[0].lastpersonloginemail;
 // agar geting variable k local storage mai kuch save kiya hoa haito

if(geting){

  // unnique user id bithanai ka treeka
  let a = geting.slice(geting.length -1)
  userid = +a[0].formid +1
}
console.log(userid);
    if(namef.value == "" || emailf.value==""|| numberf.value==""){

        alert("please fillout form")
    }
else{
let obj = {
name:namevalue,
email:emailvalue,
number:numbervalue,
formid: userid,
lastpersonlognemail:lastperson
}
gett.push(obj);
localStorage.setItem('tododata',JSON.stringify(gett));
console.log(gett);
// addstudent k btn k click par local storage mai data save hojaye
toaddata();
// yeh function kiya krta hai jo last person login hoa hai is hi ka data lakar daiga
namef.value = "";
emailf.value = "";
numberf.value = "";

      }
    })
       function toaddata() {
        // Code to load student data from local storage and display it
        let gett = JSON.parse(localStorage.getItem("tododata")) || [];
        const stddata = document.querySelector(".studentsdata");
        stddata.innerHTML = "" //e.g: 30 bando ka data mujhai daikhai jitna local storage mai hai
        let get = gett.filter((dat)=>{
             return dat.lastpersonlognemail === lastperson
             })

       
        for (let data of get) {
          const newRow = document.createElement('div');
          newRow.classList.add(`student-row`);
          newRow.innerHTML = `
          <p><strong class="strong">form Id: </strong><span class="formide"> ${data.formid}</span></p>
            <p><strong class="strong">name: </strong><span class="stdname"> ${data.name}</span></p>
            <p><strong class="strong">email: </strong><span class="stdemail"> ${data.email}</span></p>
            <p><strong class="strong">number: </strong><span class="stdnumber"> ${data.number}</span></p>
            <div>
              <button class="delbtn" >Delete</button>
              <a href="#name"><button class="edtformbtn">Edit</button></a>
            </div>
            <br>`;
          stddata.appendChild(newRow);
        }
      };


stddata.addEventListener('click', function (e) {
    if (e.target.classList.contains('delbtn')) {
      let parentdiv =   e.target.parentElement.parentElement;
      let firstP = parentdiv.querySelector('p');
      let spanElement = firstP.querySelector('span');
      let valu = spanElement.textContent;
        let data = JSON.parse(localStorage.getItem("tododata"));
        let indexToRemove; 
//agar formid match karti haito wo wala object remove hojaye
data.forEach((element,ind) => {
  if(element.formid === +valu){
indexToRemove = ind;
data.splice(indexToRemove, 1);
localStorage.setItem("tododata", JSON.stringify(data));
console.log("indexToRemove"+indexToRemove);
  }
});// yeh nhi chal raha hai?
      // })
      e.target.parentElement.parentElement.remove();
    }



// edit btn par click karon tu
    else if (e.target.classList.contains('edtformbtn')) {
        editstudentdata.style.display = "block";
        editingRow = e.target.parentElement.parentElement.parentElement;
        // console.log(editingRow);
    // poori div ka data ajayega is variable mai editingRow
      }
});
editstudentbtn.addEventListener("click",function(){
  let formi = document.querySelector(".formid")
    let nam = document.querySelector(".editname");
    let emai = document.querySelector(".editemail");
    let numbe = document.querySelector(".editnumber");
    let name = nam.value;
    let email = emai.value;
    let number = numbe.value;
    let formid = formi.value;
    if(name === "" || email === "" || number === "" || formid === ""){
        alert("Please Fill Out Form");
    }
    else{


let g;
      let a = +editingRow.querySelector('.formide').textContent
      let data = JSON.parse(localStorage.getItem("tododata"));
data.forEach((element,ind)=>{
if(element.formid === a){
  console.log(`index ${ind}`); 
g =ind;
}
})
let obj = {
  name:name,
  email:email,
  number:number,
  formid: formid
  }
data.splice(g,1,obj)
localStorage.setItem("tododata", JSON.stringify(data));
//agar edit k btn k click par is div ki formid match karjaye local storage mai mujood object sai is index ko remove kar k data.splice(g,1,obj) yeh data add hojaye

// console.log(a+5);
// editing kiya hoa data ajjaye
      editingRow.querySelector('.formide').textContent = formid;
        editingRow.querySelector('.stdname').textContent = name;
        editingRow.querySelector('.stdemail').textContent = email;
        editingRow.querySelector('.stdnumber').textContent = number;
   editstudentdata.style.display = "none";
    editingRow = null;
     document.querySelector(".editname").value = "";
    document.querySelector(".editemail").value = "";
   document.querySelector(".editnumber").value = "";
   document.querySelector(".formid").value = "";
}
})




function Deleteall(){
  let got = JSON.parse(localStorage.getItem("tododata"))//all data

  let r = JSON.parse(localStorage.getItem("lastperson"));

  lastperson = r.slice(r.length-1)[0].lastpersonloginemail;

  let get = got.filter((data)=>{// filtered data
    return data.lastpersonlognemail === lastperson
  })

  // jodata match kr raha hi wo remove hojaye deleteall k btn par click kar k
let g= got.filter((element)=>{
return !get.includes(element)
})

localStorage.setItem("tododata", JSON.stringify(g));
location.reload();
  // console.log(lastperson);
  console.log(got);
  console.log(get);
  console.log(g);
}