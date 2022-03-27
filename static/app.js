//var that takes all the data from the menu site 
var count = {}


function submitbutton(){
  // when submitbutton is pressed sends all data to the back end
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
  // when the plus button is presed ad one to the amout to order that item
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
  // when the minus button is presed minus one to the amount of the order 
  
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
  // cancels all data and returns all data to zero in count and on the page
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
  // when the submit button is presed on the /orders page give name to the flask 
  x = {}
  x["Name"] = document.getElementById("OrderName").value;
  $.ajax({
    type:"POST",
    data: JSON.stringify(x),
    url:"/orders/name",
    contentType: "application/json",
    dataType: "json"
  })
  console.log(x)

};

