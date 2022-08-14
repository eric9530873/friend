const url = "https://lighthouse-user-api.herokuapp.com/api/v1/users/";
const userlist = document.querySelector("#userlist");
const datapanel = document.querySelector("#userlist");
const searchform = document.querySelector('#search-form')
const searchinput = document.querySelector('#search-input')

const users = [];
let filterusers = []

axios.get(url).then(function (response) {
  for (let i = 0; i < response.data.results.length; i = i + 1) {
    users.push(response.data.results[i]);
    userlistrender(users);
  }
});

function userlistrender(data) {
  let content = "";
  data.forEach(item => {
    content +=`
    <div class="card d-flex  m-3 col-xs-4" id="usercard">   
      <div class="card-body">
        <div class="cardlink">
          <a href="#"  ><img class="heart" src="https://static.vecteezy.com/system/resources/previews/000/552/501/original/vector-heart-romantic-love-graphic.jpg" width="15px" alt="" data-id="${item.id}"></a>
        </div>
        <div>
          <img src="${item.avatar}" class="card-img-top" alt="..." data-id="${item.id}" data-bs-toggle="modal" data-bs-target="#user-modal">
        </div>
        <h5 class="card-title">${item.name}</h5>
        <h5 class="card-title">${item.surname}</h5>
      </div>
    </div>
    `
  });
  userlist.innerHTML = content;
}

datapanel.addEventListener("click", function (event) {
  if (event.target.matches(".card-img-top")) {
    console.log(Number(event.target.dataset.id));
    userid(Number(event.target.dataset.id));
  } else if(event.target.matches(".heart")){
    console.log(event.target.dataset.id)
    favoritelist(Number(event.target.dataset.id))
  }
});

function favoritelist (id){
  const locallist = JSON.parse(localStorage.getItem('favorite')) || []
  const usersfriendlist = users.find(function(id){
    return usersfriendlist.id === id
  })
  if(locallist.some(function(id){
    return usersfriendlist.id === id
  }
    return alert('已收藏')))

  locallist.push(user)  
  localStorage.setItem('favorite',JSON.stringify(locallist))
}

function userid(id) {
  const username = document.querySelector("#username");
  const userinfo = document.querySelector("#userinfo");
  const userimg = document.querySelector("#userimg");

  axios.get(url + id).then(function (response) {
    console.log(response);
    const data = response.data;
    username.innerText = data.name;
    userimg.innerHTML = `<img class="m-auto" src="${data.avatar}" alt="" id="userimg">`;
    userinfo.innerHTML = `
      <p>email: ${data.email}</p>
      <p>gender: ${data.gender}</p>
      <p>age: ${data.age}</p>
      <p>region: ${data.region}</p>
      <p>birthday:${data.birthday}</p>
    `;
  });
}











searchform.addEventListener('submit',function(event){
  event.preventDefault()
  const keyword = searchinput.value.trim().toLowerCase()
  
  console.log(keyword)

  filterusers = users.filter(function(user){
    return user.name.toLowerCase().includes(keyword) || user.surname.toLowerCase().includes(keyword)
  })
  if (filterusers.length === 0){
    return alert (`您輸入的關鍵字：${keyword} 沒有符合條件`)
  }
  userlistrender(filterusers)
  console.log(filterusers)
})

datapanel.addEventListener('click',function(event){
console.log(event.target)
})

