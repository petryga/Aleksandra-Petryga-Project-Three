const myApp = {};

//create an array of all available background images

myApp.backgroundImages = [
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
        url: './assets/clouds-1.jpg',
    },
    {
        mood: 'clouds',
        url: './assets/clouds-2.jpg',
    },
    {
        mood: 'aurora',
        url: './assets/aurora-1.jpg',
    },
    {
        mood: 'aurora',
        url: './assets/aurora-3.jpg',
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

myApp.skylineImages = [
    {
        name: 'vancouver',
        url: './assets/vancouver1.png',
        alt: 'black Vancouver skyline',
    },
    {
        name: 'toronto',
        url: './assets/toronto1.png',
        alt: 'black Toronto skyline',
    },
]


//not sure if I used namespacing correctly, please let me know if there is any mistakes. 
//I know it is not a requirement for this project but I was curious to try it

myApp.init = () => {
    const $image = $('.image');
    //add a function to make the background move with mouse position
    // thanks to Chris Boon's codepen (https://codepen.io/chrisboon27/pen/rEDIC)
    myApp.movingMouse = function () {
        const movementStrength = 25;
        const height = movementStrength / $(window).height();
        const width = movementStrength / $(window).width();
        $($image).mousemove(function (e) {
            const pageX = e.pageX - ($(window).width() / 2);
            const pageY = e.pageY - ($(window).height() / 2);
            const newvalueX = width * pageX * -1 - 50;
            const newvalueY = height * pageY * -1 - 50;
            $($image).css('background-position', newvalueX + 'px     ' + newvalueY + 'px');
        });
    }

    // create a randomizer
    myApp.randomizer = function (array) {
        const randomArrayIndex = Math.floor(Math.random() * array.length);
        return array[randomArrayIndex];
    }

    //get user's input - event listener on button click
    $('button').not('#skyline-btn').on('click', function () {
        //get button values after user click on it - clouds, aurora, yellow etc - and store them in a variable
        const userChoice = this.id;
        const backgroundsToDisplay = [];
        for (let i = 0; i < myApp.backgroundImages.length; i++) {
            //get all moods in array
            const backgroundMoods = myApp.backgroundImages[i].mood;
            // see if the mood selected by user matches the background mood value
            if (backgroundMoods === userChoice) {
                // if they match, push background urls to empty array
                backgroundsToDisplay.push(myApp.backgroundImages[i].url);
            }
            //use randomizer for background urls 
            const finalBackgroundsToDisplay = myApp.randomizer(backgroundsToDisplay);
            //display them on the page
            $($image).css('background-image', `url(${finalBackgroundsToDisplay})`);
        }
    });

    myApp.currentSkyline = 0;
    $('#skyline-btn').click(function () {
        // add event listener on the skyline button that will fire off once the user clicks it
        // display a next skyline image on a page
        let skylineURL = myApp.skylineImages[myApp.currentSkyline].url;
        let skylineAlt = myApp.skylineImages[myApp.currentSkyline].alt;
        $('#skyline-img').attr('src', `${skylineURL}`).attr('alt', `${skylineAlt}`);
        myApp.currentSkyline++;
        if (myApp.currentSkyline >= myApp.skylineImages.length) {
            myApp.currentSkyline = 0;
        }
    })

    myApp.backgroundUpdater = function () {
        // get urls of all background images 
        let imageURL = myApp.backgroundImages[myApp.currentBackground].url;
        //go through all the available background images and display them when the user clicks - one after another 
        $($image).css('background-image', `url(${imageURL})`);
        myApp.currentBackground++;
        if (myApp.currentBackground >= myApp.backgroundImages.length) {
            myApp.currentBackground = 0;
        }
        //add tabindex
        $(this).each(function (i) {
            $(this).attr('tabindex', i + 1)
        });
    }

    //add event listener on the background image that will fire off once the user clicks the background image
    myApp.currentBackground = 0;
    $($image).on('click', function () {
        myApp.backgroundUpdater();
    });

    // let user change the background image by pressing space key - a11y
    $($image).on('keydown', function (e) {
        let code = e.keyCode || e.which;
        if (code == 32) {
            myApp.backgroundUpdater();
        }
    });

    //circular menu on/off
    $('.menu-toggle').click(function () {
        $('.menu-toggle').toggleClass('open');
        $('.menu-round').toggleClass('open');
        $('.menu-line').toggleClass('open');
    });
}

$(function () {
    myApp.init();
    myApp.movingMouse();
});