// iestatām datumu, līdz kuram skaitīt
var countDownDate = new Date("July 20, 2021 18:15:00").getTime();

// lai apdeido laiku ik pēc sekundes
var x = setInterval(function() {

// get šodienas datumu un laiku
var now = new Date().getTime();
    
// atrodam attālumu starp tagadējo laiku un laiku līdz kuram skaitīt
var distance = countDownDate - now;
    
// laika aprēķins dienām, stundām, minūtēm un sekundēm
var days = Math.floor(distance / (1000 * 60 * 60 * 24));
var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
// izdod rezultātu elementā ar id="demo"
document.getElementById("demo").innerHTML = days + "d " + hours + "h "
+ minutes + "m " + seconds + "s ";
    
// kad skaitīšana beigusies, uzrakstām tekstu 
if (distance < 0)
{
    clearInterval(x);
    document.getElementById("demo").innerHTML = "Happy birthday!!!";
}
}, 1000);