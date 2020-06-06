//Model Class to create Constructor
class  User {
    constructor(fname,lname,password,email,username) {
      this.fname = fname;
      this.lname = lname;
      this.password = password;
      this.email = email;
      this.username = username;
    }
  }
  class SendMessage {
    constructor(fname,lname,email,mobile,msgid,userId){
      this.fname = fname;
      this.lname = lname;
       this.email = email;
       this.mobile = mobile;
       this.msgid = msgid;
      this.userId= userId;
    }
  }
  class Booking {
    constructor(fname,lname,emailid,mobile,msgid,userId) {
      this.fname = fname;
      this.lname = lname;
      this.emailid = emailid;
       this.mobile = mobile;
       this.msgid = msgid;
       this.userId= userId;
    }
  }