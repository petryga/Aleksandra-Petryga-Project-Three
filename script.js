
const myApp = {};

myApp.init = () => {

//add a function to make the background move with mouse position
// Chris Boon codepen

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

//create an array of all available background images
const backgroundImages = [
    {
        mood: 'aurora',
        url: './assets/aurora-purple.jpg',
    },
    {
        mood: 'cartoon',
        url: './assets/cartoon-blue.jpg',
    },
    {
        mood: 'cartoon',
        url: './assets/cartoon-dark-blue.jpg',
    },
    {
        mood: 'cartoon',
        url: './assets/cartoon-purple.jpg',
    },
    {
        mood: 'cartoon',
        url: './assets/cartoon-yellow.jpg',
    },
    {
        mood: 'clouds',
        url: './assets/clouds-dramatic.jpg',
    },
    {
        mood: 'clouds',
        url: './assets/clouds-pink.jpg',
    },
    {
        mood: 'aurora',
        url: './assets/aurora-green.jpg',
    },
    {
        mood: 'clouds',
        url: './assets/clouds-purple.jpg',
    },
    {
        mood: 'clouds',
        url: './assets/clouds-sunset.jpg',
    },
    {
        mood: 'yellow',
        url: './assets/yellow-birds.jpg',
    },
    {
        mood: 'yellow',
        url: './assets/yellow-sun.jpg',
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

//add event listener on the background image that will fire off once the user clicks the background image

let currentBackground = 0;

$(".image").click(function () {
    // get urls of all background images 
    let imageURL = backgroundImages[currentBackground].url;
    
    //loop through all the available background images and display them when the user clicks - one after another 
        $('.image').css('background-image', `url(${imageURL})`);
        currentBackground++;
        if (currentBackground >= backgroundImages.length) {
            currentBackground = 0;
        }
    });

// add event listener on the skyline that will fire off once the user clicks it
//display a next skyline image on a page

// $('img').on('click', function () {
//     const imageUrl = "./assets/vancouver.png";
//     $('#toronto').attr('src', imageUrl, 'alt', 'vancouver')
//     return false
// })
 

 //get user's input - event listener on button click

 //create a randomizer
    const randomizer = function (array) {
        const randomArrayIndex = Math.floor(Math.random() * array.length);
        return array[randomArrayIndex]
    }
 //use randomizer to select backgrounds that correspond to user’s choice and display them on the page
}
$(function () {
    myApp.init()
});