count = {}

function submitbutton(){
  a = document.getElementById("Name").value
  count["Name"] = a
  for(const [key, value] of Object.entries(count)){
    if(value == 0){
      delete count[key],count[value]
    }
  }
  $.ajax({
    type:"POST",
    data: JSON.stringify(count),
    url:"/order",
    contentType: "application/json",
    dataType: "json"
  })
  console.log(a)
  console.log(count)
}

function plusbutoon(y){
  if(y in count){
  count[y] += 1
  }
  else{
    count[y] = 1
  }
  document.getElementById(y).innerHTML = count[y];
  console.log("hello")
};

function minusbutton(a){
  
    if(a in count){
      if(count[a] >= 1){
        count[a] -= 1
      }
      }
      else{
        count[a] = 0
      }
  
    document.getElementById(a).innerHTML = count[a];

};
function cancelbutton(){
    for(const [key, value] of Object.entries(count)){
      if(value >= 1){
        count[key] = 0
        document.getElementById(key).innerHTML = 0;
      }
      if(key == "Name"){
        ducument.getElementById("Name").value ="";
      }
  }
};

function orderssubmit(){
  x = document.getElementById("OrderName").value;
  $.ajax({
    type:"POST",
    data: JSON.stringify(x),
    url:"/order/name",
    contentType: "application/json",
    dataType: "json"
  })

};

