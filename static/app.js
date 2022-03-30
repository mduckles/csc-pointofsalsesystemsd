//var that takes all the data from the menu site 
var count = {}
var data = {}

$(document).ready(function(){
  $(".options").hide()
});



function submitbutton(){
  // when submitbutton is pressed sends all data to the back end
  a = $("#Name")
  data["Name"] = a
  $.ajax({
    type:"POST",
    data: JSON.stringify(data),
    url:"/order",
    contentType: "application/json",
    dataType: "json"
  })

}

lowerunder = function(stin) { 
    return stin.toLowerCase().replace(" ", "_")
}

function plusbutoon(name,options,cost_options) { // y = name; x = option names
  // when the plus button is presed ad one to the amout to order that item
  if(name in count){
    count[name] += 1
  }
  else{
    count[name] = 1
  }
//  for(i=1;i<= count[name];i++ ){
 //     data[name+i] = {} // fill empty object for each of the menu items
 // }
      
  document.getElementById(name).innerHTML = count[name]; // make number appear on page
  lower_name = name.toLowerCase().replaceAll(" ", "_")

  for( i in options){
      options_lower = options[i].toLowerCase().replaceAll(" ",'_')
      lable = $("#"+options_lower+"lable").clone().attr('id', options_lower +"lable"+ count[name])
      input = $("#"+options_lower+"input").clone().attr('id', options_lower +"input"+ count[name])

      console.log("#"+"menuoptions"+lower_name)
      $("#"+"menuoptions"+lower_name).append(lable)
      $("#"+"menuoptions"+lower_name).append(input)
      $("#"+options_lower+"lable"+ count[name]).show()
      $("#"+options_lower+"input"+ count[name]).show()

    }
  
};

function minusbutton(a,b,cost_options){
  // when the minus button is presed minus one to the amount of the order 
  
    if(a in count){
      if(count[a] >= 1){
        count[a] -= 1
      }
      }
      else{
        count[a] = 0
      }
x = count[a] + 1
delete  data[a+x]; 
    document.getElementById(a).innerHTML = count[a];



console.log(count)
    y = count[a] +1
    console.log(y)



for(i in b){
console.log("working")
j = b[i].toLowerCase().replaceAll(" ",'_')
 $('#'+j+"input"+y).hide()
 $('#'+j+"lable"+y).hide()
}
for(i in cost_options){
  cost_lower = cost_options[i].toLowerCase().replaceAll(" ","_")
} 
};
function cancelbutton(){
  // cancels all data and returns all data to zero in count and on the page
    for(const [key, value] of Object.entries(count)){
      if(value >= 1){
        count[key] = 0
        document.getElementById(key).innerHTML = 0;
      }
      if(key == "Name"){
        document.getElementById("Name").value ="";
      }
  }
  data = {}
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


};

function checkbox(options,name){
  //lets check boxes do stuff
  
}