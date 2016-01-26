  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (req.readyState == 4 && req.status == 200) {
      console.log(req.responseText);
    }
  };
  req.open("POST", "http://178.62.155.193", true);
  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  req.send("fname=Henry&lname=Ford");