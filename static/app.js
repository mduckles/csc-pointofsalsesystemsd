//var that storse the count for the amount of one thing orders on the front end
var count={}
// stores all the order data
var data={}
// stores all the orders to be sent to the kitchen
var kitchen_data=[]

// runs when the page starts
$(document).ready(function(){
  // hides the  options radios when 0 are orders
  $(".options").hide()
  $(".cost_options").hide()
  for (i in kitchen_data){
    for (index in kitchen_data[i]){
    $("#cooks").append('<p>'+kitchen_data[i][index]+'</p>');
    }
      }
});
function prosessdata2(datas){
  kitchen_data[-1] = datas
};

// when submitbutton is pressed sends all data to the back end
function submitbutton(){
  // gets the data of order name
  a = document.getElementById("orderName").value
  clean_input = a.replace(/[^a-zA-Z ]/g, "");
  // gives data the order name
  data["ordername"] = clean_input
  $("input[type=radio]").prop('checked', false);
  // post to /order in the back end
  $.ajax({
    type:"POST",
    data: JSON.stringify(data),
    url:"/order",
    contentType: "application/json",
    dataType: "json",
    // runs when the data was sent successfuly
    success: function(datas){
      prosessdata2(datas)
    }
  })
}
function lowerunder(stin) { 
  // lowercases any string data and replaces space with _
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
 for(i=1;i<= count[name];i++ ){
   if(data.hasOwnProperty([name+i]) == false || data[name+i] == NaN){
      data[name+i] = {} // fill empty object for each of the menu items
      if(data[name+i].hasOwnProperty('Cost')==false){
      data[name+i]['Cost'] = ""
      }
      if(data[name+i].hasOwnProperty('Options')== false){
        data[name+i]['Options'] = ""
      }
   }
  } 
  document.getElementById(name).innerHTML = count[name]; // make number appear on page
  lower_name = name.toLowerCase().replaceAll(" ", "_")
  // runs through each options
  for( option in options){
      options_lower = options[option].toLowerCase().replaceAll(" ","_")
      // clones the options when 
      lable = $("#"+options_lower+"lable").clone().attr('id', options_lower +"lable"+ count[name])
      input = $("#"+options_lower+"input").clone().attr('id', options_lower +"input"+ count[name]).attr('name',lower_name+'options'+count[name])

      console.log("#"+"menuoptions"+lower_name)
      // append to the thing they are options of
      $("#"+"menuoptions"+lower_name).append(lable)
      $("#"+"menuoptions"+lower_name).append(input)
      $("#"+options_lower+"lable"+ count[name]).show()
      $("#"+options_lower+"input"+ count[name]).show().prop('checked',true)
      checkbox(options[option],name)

    }
    for(cost_option in cost_options){
      // cones and appends to what ever the meal is the cost options
      cost_lower = cost_options[cost_option].toLowerCase().replaceAll(" ","_").replaceAll("$","").replaceAll(".","")
      console.log("#"+lower_name+cost_lower+"lable")
      lable_cost = $("#"+lower_name+cost_lower+"lable").clone().attr('id',lower_name+cost_lower+"lable"+ count[name])
      $("#"+"menuoptions"+lower_name).append(lable_cost)
      $("#"+lower_name+cost_lower+"lable"+ count[name]).show()
      input_cost = $("#"+lower_name+cost_lower+"input").clone().attr('id',lower_name+cost_lower+"input"+ count[name]).attr('name',lower_name+'cost'+count[name])
      $("#"+"menuoptions"+lower_name).append(input_cost)
      $("#"+lower_name+cost_lower+"input"+ count[name]).show()
      checkbox(cost_options[cost_option],name)
    }
    console.log(data)
};

function minusbutton(name,options,cost_options){
  // when the minus button is presed minus one to the amount of the order 
    if(name in count){
      if(count[name] >= 1){
        count[name] -= 1
      }
      }
      else{
        count[name] = 0
      }
x = count[name] + 1
delete  data[name+x]; 
    document.getElementById(name).innerHTML = count[name];
    y = count[name] +1
    // hides the options when the minus button is press
for(i in options){
j = options[options].toLowerCase().replaceAll(" ",'_')
 $('#'+j+"input"+y).hide()
 $('#'+j+"lable"+y).hide()
}
// hides the cost options when button presed 
for(i in cost_options){
  name_lower = name.toLowerCase().replaceAll(" ","_").replaceAll("$","").replaceAll(".","")
  cost_lower = cost_options[i].toLowerCase().replaceAll(" ","_").replaceAll("$","").replaceAll(".","")
  $("#"+name_lower+cost_lower+"lable"+y).hide()
  $("#"+name_lower+cost_lower+"input"+y).hide()
} 

  console.log(data)
};
function cancelbutton(){
  // cancels all data and returns all data to zero in count and on the page
  $(".options").hide()
  $(".cost_options").hide()
    for(const [key, value] of Object.entries(count)){
      //loops through the counts and reasets them
      if(value >= 1){
        count[key] = 0
        document.getElementById(key).innerHTML = 0;
      }
      if(key == "Name"){
        document.getElementById("Name").value ="";
      }
  }
  data = {}
  $("input[type=radio]").prop('checked', false);
  location.reload();
};

function prosessdata(datas){
  
  for (i in datas){
    $("#reciet").append('<p>'+datas[i]+'</p>');
  } 
}

function orderssubmit(){
  // when the submit button is presed on the /orders page give name to the flask 
  x = {}
  a = document.getElementById("OrderName").value;
  clean_inputs = a.replace(/[^a-zA-Z ]/g, "")
  x["Name"] = clean_inputs
  
  // post to /orders/name
  $.ajax({
    type:"POST",
    data: JSON.stringify(x),
    url:"/orders/name",
    contentType: "application/json",
    dataType: "json",
    success: function(datas){
      prosessdata(datas)
    },
    error: function(){
      alert('you entered a invalid name')
    }
  })
};

function checkbox(options,name){
  //lets check boxes do stuff
  options_lower = options.toLowerCase().replaceAll(" ","_").replaceAll("$","").replaceAll(".","")
  name_lower = name.toLowerCase().replaceAll(" ","_").replaceAll("$","").replaceAll(".","")

    if($("#"+name_lower+options_lower+"input"+count[name]).is(':checked') === true){
      for(i=1;i<= count[name];i++ ){
        // check each box
        data[name+i]['Cost'] = options;
        console.log(data)
      }
    }
  console.log("#"+options_lower+"input"+count[name])
  if($("#"+options_lower+"input"+count[name]).is(':checked') === true){
    console.log("isworking")
    for(i=1;i<= count[name];i++ ){
        //loops through data 
        data[name+i]['Options'] = options;
        console.log(data)
    }
  }
};