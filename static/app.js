count = {}
//function cancelbutton(){
  //for((key,value) in count){
    //count[key] = 0
    //document.getElementById(count[value]).innerHTML = 0;

  //}


//};

function plusbutoon(y){
  if(y in count){
  count[y] += 1
  }
  else{
    count[y] = 1
  }
  document.getElementById(y).innerHTML = count[y];
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
