var apikey = config.apikey
var counter = [] 
//get date

init()
nextDays()
tday()

function tday(){
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; 
today = mm+'/'+dd
$("#td").text(today)

}

//next 5 days
function nextDays(){
array = ['#adate','#bdate','#cdate','#ddate','#edate']
for (i=1; i<6; i++){
var tomorrow = new Date()
tomorrow.setDate(new Date().getDate() + i)
var dd = tomorrow.getDate();
var mm = tomorrow.getMonth()+1; 
tomorrow = mm+'/'+dd
$(array[i-1]).text(tomorrow)
}
}


function weatherToday(city){
  var current = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apikey
  var future = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+apikey

  $.ajax({
    url: current,
    method: "GET"
  }).then(function(response) {

   
    
    $("#iname").text(response.name)
    $('#mainc').attr("src","http://openweathermap.org/img/wn/"+response.weather[0].icon+"@2x.png")
    $('#mainc').attr("alt",response.weather[0].main)
    $("#itemp").text("Temperature: "+response.main.temp)
    $("#ihumi").text("Humidity: "+response.main.humidity)
    $("#iwind").text("Wind Speed: "+response.wind.speed)
}
)
$.ajax({
  url: future,
  method: "GET"
}).then(function(response) {
  $("#amain").attr("src","http://openweathermap.org/img/wn/"+response.list[7].weather[0].icon+"@2x.png")
  //$("#adate").text(response.list[7])
  $("#atemp").text("Temperature: "+response.list[7].main.temp)
  $("#ahumi").text("Humidity: "+response.list[7].main.humidity)

  $("#bmain").attr("src","http://openweathermap.org/img/wn/"+response.list[14].weather[0].icon+"@2x.png")
  //$("#adate").text(response.list[7])
  $("#btemp").text("Temperature: "+response.list[14].main.temp)
  $("#bhumi").text("Humidity: "+response.list[14].main.humidity)
  
  $("#cmain").attr("src","http://openweathermap.org/img/wn/"+response.list[21].weather[0].icon+"@2x.png")
  //$("#adate").text(response.list[7])
  $("#ctemp").text("Temperature: "+response.list[21].main.temp)
  $("#chumi").text("Humidity: "+response.list[21].main.humidity)

  $("#dmain").attr("src","http://openweathermap.org/img/wn/"+response.list[28].weather[0].icon+"@2x.png")
  //$("#adate").text(response.list[7])
  $("#dtemp").text("Temperature: "+response.list[28].main.temp)
  $("#dhumi").text("Humidity: "+response.list[28].main.humidity)

  $("#emain").attr("src","http://openweathermap.org/img/wn/"+response.list[35].weather[0].icon+"@2x.png")
  //$("#adate").text(response.list[7])
  $("#etemp").text("Temperature: "+response.list[35].main.temp)
  $("#ehumi").text("Humidity: "+response.list[35].main.humidity)

 //24/3=8 taking every 7th item in the array as sample because I don't have the startup subscribtion for daily 16 days forcast :(

  
  
}
)
} 
function favCities(){
  var city = document.getElementById("searchbar").value
  var item = "<li class='list-group-item' onclick='weatherToday("+'"'+city+'"'+")'>"+city+"</li>"
  console.log(item) 
  if(counter.length<6){
    counter.push(city)
    $("#list").append(item)
  }else if(counter.length=6){
    counter=[]
    $("#list").empty()
    counter.push(city)
    $("#list").append(item)
  }
  weatherToday(city)
  console.log(counter)
  localStorage.setItem("counter", JSON.stringify(counter))
}
function init(){
  var history=JSON.parse(localStorage.getItem("counter"))
  if (history !== null) {
    counter = history
    var lastSearch = counter[counter.length-1]
    }
  if (lastSearch !== null) {
    weatherToday(lastSearch)
  }
  
  for(i=0; i < counter.length; i++){
   var city = counter[i]
    var item = "<li class='list-group-item' onclick='weatherToday("+'"'+city+'"'+")'>"+city+"</li>"
    $("#list").append(item)}
}
