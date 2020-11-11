//add a function to make the background move with mouse position
// Chris Boon codepen
$(function () {
    const movementStrength = 25;
    const height = movementStrength / $(window).height();
    const width = movementStrength / $(window).width();
    $(".image").mousemove(function (e) {
        const pageX = e.pageX - ($(window).width() / 2);
        const pageY = e.pageY - ($(window).height() / 2);
        const newvalueX = width * pageX * -1 - 50;
        const newvalueY = height * pageY * -1 - 50;
        //    $('.image').css("background-position", newvalueX + "px     ");
        $('.image').css("background-position", newvalueX + "px     " + newvalueY + "px");
    });


//create a randomizer???? or just a loop
//be sure to prevent display of a current picture

//add event listener on the background image that will fire off once the user clicks the background image

//loop through all the available background images

//display a random background image on a page
// ——
// add event listener on the skyline that will fire off once the user clicks it
//loop through all the available skyline images

//display a random skyline image on a page
// ——
//cache the results, so if the user reloads the page, chosen options stay on the page until the user interacts with them again

//create an array of all available background images
const backgroundImages = [
    {
        mood: 'aurora',
        url: '/assets/aurora-green.jpg',
    },
    {
        mood: 'aurora',
        url: '/assets/aurora-purple.jpg',
    },
    {
        mood: 'cartoon',
        url: '/assets/cartoon-blue.jpg',
    },
    {
        mood: 'cartoon',
        url: '/assets/cartoon-dark-blue.jpg',
    },
    {
        mood: 'cartoon',
        url: '/assets/cartoon-purple.jpg',
    },
    {
        mood: 'cartoon',
        url: '/assets/cartoon-yellow.jpg',
    },
    {
        mood: 'clouds',
        url: '/assets/clouds-dramatic.jpg',
    },
    {
        mood: 'clouds',
        url: '/assets/clouds-pink.jpg',
    },
    {
        mood: 'clouds',
        url: '/assets/clouds-purple.jpg',
    },
    {
        mood: 'clouds',
        url: '/assets/clouds-sunset.jpg',
    },
    {
        mood: 'yellow',
        url: '/assets/yellow-birds.jpg',
    },
    {
        mood: 'yellow',
        url: '/assets/yellow-sun.jpg',
    },
]
const skylineImages = [
    {
        name: 'toronto',
        url: './assets/toronto.png',
        alt: 'black Toronto skyline',
    },
    {
        name: 'vancouver',
        url: './assets/vancouver.png',
        alt: 'black Vancouver skyline',
    },
]

// get urls of all background images 

const allBackgroundUrls = backgroundImages.map((item) => {
return item.url
})
console.log(allBackgroundUrls);

// allBackgroundUrls.forEach((item) => {
// })


$(".image").click(function () {
    const imageUrl = allBackgroundImages['url']
    $(".image").css("background-image", "url(" + imageUrl + ")");
});   

// $('img').on('click', function () {
//     const imageUrl = "./assets/vancouver.png";
//     $('#toronto').attr('src', imageUrl, 'alt', 'vancouver')
//     return false
// })






    //not sure yet if i need a randomizer
    const randomizer = function (array) {
        const randomArrayIndex = Math.floor(Math.random() * array.length);
        return array[randomArrayIndex]
    }

   const randomBackgroundURL = randomizer(allBackgroundUrls);
    console.log(randomBackgroundURL);

})