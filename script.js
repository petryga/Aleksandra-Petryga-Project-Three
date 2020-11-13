    /** FROM https://ourcodeworld.com/articles/read/185/how-to-get-the-pixel-color-from-a-canvas-on-click-or-mouse-event-with-javascript**/

    const canvas = $('#canvas')[0]

    function getElementPosition(obj) {
        let curleft = 0, curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return { x: curleft, y: curtop };
        }
        return undefined;
    }

    function getEventLocation(element, event) {
        const pos = getElementPosition(element);

        return {
            x: (event.pageX - pos.x),
            y: (event.pageY - pos.y)
        };
    }

    function rgbToHex(r, g, b) {
        if (r > 255 || g > 255 || b > 255)
            throw "Invalid color component";
        return ((r << 16) | (g << 8) | b).toString(16);
    }

    function drawImageFromWebUrl(sourceurl) {
        const img = new Image();

        img.addEventListener("load", function () {
            // The image can be drawn from any source
            canvas.getContext("2d").drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);

        });

        img.setAttribute("src", sourceurl);
    }
    // Draw a base64 image because this is a fiddle, and if we try with an image from URL we'll get tainted canvas error
    // Read more about here : http://ourcodeworld.com/articles/read/182/the-canvas-has-been-tainted-by-cross-origin-data-and-tainted-canvases-may-not-be-exported
    let img = document.getElementById('img');
    canvas.getContext("2d").drawImage(img, 10, 10);
    canvas.addEventListener("click", function (e) {
        const eventLocation = getEventLocation(this, e);
        const coord = "x=" + eventLocation.x + ", y=" + eventLocation.y;

        // Get the data of the pixel according to the location generate by the getEventLocation function
        const context = this.getContext('2d');
        const pixelData = context.getImageData(eventLocation.x, eventLocation.y, 1, 1).data;

        // If transparency on the image
        if ((pixelData[0] == 0) && (pixelData[1] == 0) && (pixelData[2] == 0) && (pixelData[3] == 0)) {
            console.log("it is transparent");
        } else {
            console.log("It is not transparent");
        }

        // var hex = "#" + ("000000" + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);

        // Draw the color and coordinates.
        // document.getElementById("status").innerHTML = coord;
        // document.getElementById("color").style.backgroundColor = hex;
    }, false);



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
        url: './assets/yellow-birds.jpg',
    },
    {
        mood: 'yellow',
        url: './assets/yellow-sun.jpg',
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