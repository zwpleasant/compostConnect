var pounds = 0;
setInterval(myCounter, 1000);

function myCounter() {
    pounds = pounds+21;
    document.getElementById("odometer").innerHTML = pounds; 
    console.log(pounds);
}


// 55,000,000 pounds wasted per month, /30=
// 1,833,333.333 pounds wasted per day, /24=
// 76,388.889 pounds wasted per hour, /60=
// 1,273.148 pounds wasted per minute, /60=
// 21.219 pounds wasted per second