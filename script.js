const myApp = {};
//create an array of all available background images
myApp.backgroundImages = [
    {
        mood: 'aurora',
        url: './assets/aurora-purple.jpg',
        alt: 'some alt text 1',
    },
    {
        mood: 'cartoon',
        url: './assets/cartoon-blue.jpg',
        alt: 'some alt text 3',
    },
    {
        mood: 'cartoon',
        url: './assets/cartoon-dark-blue.jpg',
        alt: 'some alt text 3',
    },
    {
        mood: 'cartoon',
        url: './assets/cartoon-purple.jpg',
        alt: 'some alt text 4',
    },
    {
        mood: 'cartoon',
        url: './assets/cartoon-yellow.jpg',
        alt: '',
    },
    {
        mood: 'clouds',
        url: './assets/clouds-dramatic.jpg',
        alt: '',
    },
    {
        mood: 'clouds',
        url: './assets/clouds-pink.jpg',
        alt: '',
    },
    {
        mood: 'aurora',
        url: './assets/aurora-green.jpg',
    },
    {
        mood: 'clouds',
        url: './assets/clouds-purple.jpg',
        alt: '',
    },
    {
        mood: 'clouds',
        url: './assets/clouds-sunset.jpg',
        alt: '',
    },
    {
        mood: 'yellow',
        url: './assets/yellow-birds.jpg',
        alt: '',
    },
    {
        mood: 'yellow',
        url: './assets/yellow-sun.jpg',
        alt: '',
    },
]
myApp.skylineImages = [
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

myApp.init = () => {

    //add a function to make the background move with mouse position
    // thanks to Chris Boon's codepen
    myApp.movingMouse = function () {
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
    }

    // create a randomizer
    myApp.randomizer = function (array) {
        const randomArrayIndex = Math.floor(Math.random() * array.length);
        return array[randomArrayIndex];
    }

    //get user's input - event listener on button click
    $('button').on('click', function (event) {
        event.preventDefault();
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
            $('.image').css('background-image', `url(${finalBackgroundsToDisplay})`);
        }
    });



    //add event listener on the background image that will fire off once the user clicks the background image
    myApp.currentBackground = 0;

    $(".image").click(function () {

        // get urls of all background images 
        let imageURL = myApp.backgroundImages[myApp.currentBackground].url;

        //loop through all the available background images and display them when the user clicks - one after another 
        $('.image').css('background-image', `url(${imageURL})`);
        myApp.currentBackground++;
        if (myApp.currentBackground >= myApp.backgroundImages.length) {
            myApp.currentBackground = 0;
        }
        //add animation - doesn't work because same div - add if skyline canvas is fixed
        // $('.image').not('img').fadeOut( "slow", function() {
        //     $('.image').not('img').fadeIn('slow');
        // });
// ALT
        // $('.image').attr('alt', `(${myApp.backgroundImages[i].alt})`);

        //add tabindex
        $(this).each(function (i) {
            $(this).attr('tabindex', i + 1)
        });
    });

    // add event listener on the skyline that will fire off once the user clicks it
    // display a next skyline image on a page

    // $('img').on('click', function () {
    //     const imageUrl = "./assets/vancouver.png";
    //     $('#toronto').attr('src', imageUrl, 'alt', 'vancouver')
    //     return false
    // })
}
$(function () {
    myApp.init();
    myApp.movingMouse();
});