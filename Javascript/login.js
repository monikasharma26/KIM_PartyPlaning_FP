//Index Db Created

let db = null;
var dbinit = false;

    const dbName = "Party_Planning";
    const dbVersion = "1";
    const dbrequest = indexedDB.open(dbName,dbVersion)

    //on upgrade needed
    dbrequest.onupgradeneeded = e => {
        db = e.target.result
        const pNotes = db.createObjectStore("users", {autoIncrement: true});

        const photels = db.createObjectStore("reservations", {autoIncrement: true});
        const lhotels = db.createObjectStore("queries", {autoIncrement: true});
        dbinit = true;
       alert(`upgrade is called database name: ${db.name} version : ${db.version}`)

    }
    //on success
    dbrequest.onsuccess = e => {
      if(dbinit)
     fillReservationData();

        db = e.target.result;
    }
    //on error
    dbrequest.onerror = e => {
        alert(`error: ${e.target.error} was found `)

    }
    
    $(document).ready(function() {
      init();
    });
    
    //init function
    function init() {
      var navLoginLink = document.getElementById("login_b");
      var navLogoutLink = document.getElementById("logout_b");
      var navMyListLink = document.getElementById("mylist");
    
    
      if(performLoginCheck()) {
        navLoginLink.style.display = "none";
        navLogoutLink.style.display = "visible";
        navMyListLink.style.display = "visible";
      }
      else {
        if(navLoginLink!= null && navLogoutLink!= null )
        {
        navLoginLink.style.display = "visible";
        navLogoutLink.style.display = "none";
        navMyListLink.style.display = "none";
        }
    
      }
    }
    

    
    function performLoginCheck() {
      var id = localStorage.getItem("currentuser");
      if(id) {
        return true;
      }
      else {
        return false;
      }
    }
    //user function
    
    function addUserToDB(newuser) {
      const tx = db.transaction("users", "readwrite")
      tx.onerror = e => alert( ` Error! ${e.target.error}  `)
      const users = tx.objectStore("users");
      console.log(newuser);
      users.add(newuser);
  
    }
    function getUser() {

      let  email = document.getElementById('email').value;
     var password = document.getElementById('password').value;
  
  
     var transaction = db.transaction(["users"]); //readonly
     var objectStore = transaction.objectStore("users");
     var request = objectStore.get(email);
  
  
     request.onerror = function(e) {
      alert("Unable to get data from database!");
      return;
     };
       request.onsuccess = function(e) {
         console.log("email :"+ request);
        alert(password +" " + request.result.password);
        if(password != request.result.password) {
         alert("Could not log you in");
         return;
        }
        console.log("You are logged in");
    
      };
    }
    
    function getUserId(username) {
      return new Promise((resolve,reject)=> {
        const tx = db.transaction("users","readonly")
        const users = tx.objectStore("users")
        const request =users.openCursor();
    
       request.onsuccess = function(e) {
    
            const cursor = e.target.result
    
             if(cursor) {
    
               if(cursor.value.username == username)
               {
    
                 resolve(cursor.key);
               }
               else {
                 cursor.continue();
               }
    
    
    
            }
            else {
              resolve("not found");
            }
    
        }
    
      });
    }
    
      function checkLogin(username,password) {
       return new Promise((resolve,reject)=> {
         const tx = db.transaction("users","readonly")
         const users = tx.objectStore("users")
         const request =users.openCursor();
        request.onsuccess = function(e) {
             const cursor = e.target.result
    
              if(cursor) {
               
                if(cursor.value.username == username && cursor.value.password == password)
                {
    
                  resolve(true);
                }
                else {
                  cursor.continue();
                }
    
    
    
             }
             else {
               resolve(false);
             }
    
         }
    
       });
     }
    
    
    
     function addBookingRequestToDB(newBookingRequest) {
       const tx = db.transaction("reservations", "readwrite")
       tx.onerror = e => alert( ` Error! ${e.target.error}  `)
       const bookings = tx.objectStore("reservations");
       console.log(newBookingRequest);
       bookings.add(newBookingRequest);
    
     }
    
    async function getBookingRequests(userId) {
         return new Promise((resolve,reject)=> {
           const tx = db.transaction("reservations","readonly")
           
           const hotels = tx.objectStore("reservations")
           const request =hotels.openCursor();
           var hotelRequests = [];
          request.onsuccess = function(e) {
    
               const cursor = e.target.result
                console.log(cursor);
                if(cursor) {
    
                  if(cursor.value.userId == userId)
                  {
                    var hotel = cursor.value;
                    hotelRequests.push(hotel);
                  }
                  cursor.continue();
    
    
    
    
               }
               else {
                 resolve(hotelRequests);
               }
    
           }
    
         });
       }
    
    
   
    
    function addMessageRequestToDB(msgRequest) {
      const tx = db.transaction("queries", "readwrite")
      tx.onerror = e => alert( ` Error! ${e.target.error}  `)
      const flights = tx.objectStore("queries");
      flights.add(msgRequest);
    }
    
    function getMessgaeRequests(userId) {
        return new Promise((resolve,reject)=> {
          const tx = db.transaction("queries","readonly")
          const hotels = tx.objectStore("queries")
          const request =hotels.openCursor();
          var hotelRequests = [];
         request.onsuccess = function(e) {
    
              const cursor = e.target.result
    
               if(cursor) {
    
                 if(cursor.value.userID == userId)
                 {
                   var hotel = cursor.value;
                   hotelRequests.push(hotel);
                 }
                 cursor.continue();
    
              }
              else {
                resolve(hotelRequests);
              }
    
          }
    
        });
      }
    