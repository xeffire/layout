let userData;
const timer = (ms) => new Promise((res) => setTimeout(res, ms)); //timeris uzdelsimui

//pirmas veiksmas, kai uzsikrauna DOM medis
document.addEventListener("DOMContentLoaded", () => {
  dataRequest(generateCards);
});

//asinkchroninis requestas, serveryje konvertuoja text faila i objekta, grazina kaip JSON
let dataRequest = (callback) => {
  let getData = new XMLHttpRequest();
  getData.onreadystatechange = () => {
    if (getData.readyState == 4 && getData.status == 200) {
      userData = JSON.parse(getData.responseText);
      callback();
    }
  };
  getData.open("GET", window.location.href.replace("index.php", "getData.php"));
  getData.send();
};

//visu korteliu generacija
let generateCards = () => {
    let h1 = document.createElement('h1');
    h1.appendChild(document.createTextNode('Find. Connect. Enjoy'));

    let h2 = document.createElement('h2');
    h2.appendChild(document.createTextNode('new way to meet people'));

    let cardDisplay = document.createElement('div');
    cardDisplay.className = 'cardDisplay';
    for (user of userData) {
        cardDisplay.appendChild(builder(user));
        cardAnim();
    }

    for (elem of [h1, h2, cardDisplay]) {
        document.body.appendChild(elem);
    }
};

//atskiros korteles generacija is kuriant ir sulipinant HTML elementus idedant atitinkama userio info
let builder = (obj) => {
  let elem = document.createElement("div");
  elem.className = "card";
    /* Pries tai buvau pridejes elementus i Card komponenta su innerHTML property*/
    //   elem.innerHTML = 
    //   `<img src='./profile-images/${obj.src}' alt='${obj.name}'>
    //     <h3 class='name'>${obj.name}</h3>
    //     <span><i class='fas fa-map-marker-alt'></i> ${obj.address}</span>
    //     <p>${obj.about}</p>
    //     <a>Get Connected!</a>
    //     <span class='contacts'>
    //         <i class='fab fa-facebook'></i>
    //         <i class='fab fa-twitter'></i>
    //         <i class='fab fa-google'></i>
    //         <i class='fab fa-instagram'></i>
    //     </span>`;
    //img
    let img = document.createElement('img');
    img.setAttribute('src', `profile-images/${obj.src}`);
    img.setAttribute('alt', obj.name);
    //img
    let h3 = document.createElement('h3');
    h3.className = 'name';
    h3.innerText = obj.name;
    //span
    let span = document.createElement('span');
        //map
        map = document.createElement('i');
        map.className = 'fas fa-map-marker-alt';
    span.appendChild(map);
    span.appendChild(document.createTextNode(obj.address));        
    //p
    let p = document.createElement('p');
    p.innerText = obj.about;
    //a
    let a = document.createElement('a');
    a.setAttribute('href', '#');
    a.innerText = 'Get connected!';
    //span
    let contacts = document.createElement('span');
    contacts.className = 'contacts';
        //icons
        for (icon of ['fa-facebook', 'fa-twitter', 'fa-google', 'fa-instagram']) {
            let i = document.createElement('i');
            i.classList.add('fab', icon);
            contacts.appendChild(i);
        }
    
    //elementu prilipdymas
    for (child of [img, h3, span, p, a, contacts]){
        elem.appendChild(child);
    }

  return elem;
};

//galiausiai pritaikant inline stilius animuojamos korteles
let cardAnim = async () => {
  await timer(500);
  let cardCollection = document.getElementsByClassName("card");
  for (card of cardCollection) {
    card.style.opacity = "1";
    await timer(200);
  }
};
