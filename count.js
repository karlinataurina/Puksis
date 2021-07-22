// iestatām datumu, līdz kuram skaitīt
var countDownDate = new Date("May 1, 2022 10:00:00").getTime();

// lai apdeido laiku ik pēc sekundes
var x = setInterval(function () {

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
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "Happy birthday!!!";
        document.getElementById("hide").style.display = "none";
        var pic = document.getElementById("Puksis");
        pic.src = "images/webPuksis.jpg";
    }
}, 1000);



// pievienojam dzimšanas dienas viesus datubāzē
// avots: https://stackoverflow.com/a/67558064
const addVisitor = async () => {
    var name = document.getElementById("fname").value
    console.log(name)
    var last_name = document.getElementById("lname").value
    var age = document.getElementById("age").value

    try {
        const response = await fetch('http://130.61.147.255:5000/create_visitor/' + name + '/' + last_name + '/' + age, {
            method: 'POST',
        });
        const data = await response.json();
        // enter your logic when the fetch is successful
        console.log(data);
    } catch (error) {
        // enter your logic for when there is an error (ex. error toast)

        console.log(error)
    }

    //noslēpj formu
    document.getElementById("frm1").style.display = "none";
    // Apstiprina lietotājam, ka dati saņemti
    var x = document.createElement("P");
    var t = document.createTextNode("Awesome! Don't forget the gifts!");
    x.appendChild(t);
    document.body.appendChild(x);
}