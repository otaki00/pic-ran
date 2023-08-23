const randomPic = document.getElementById('random-pic')
const grayscalePic = document.getElementById('grayscale-pic')
const blurPic = document.getElementById('blur-pic')
const imageHolder = document.getElementById('image-holder')
const image = document.getElementById('image')
const displayOvarlayBtn = document.getElementById('display-overlay')
const closeOverlayBtn = document.getElementById('close-overlay')
const layer = document.getElementById('layer')



// constants 
const WIDHT = 450
const HEIGHT = 350


// global 
let type = ""
let blurDegree = 2
let URL = `https://picsum.photos/`
let id = 237
let DOWNLOAD_URL = ""




// function to extract the id from url 
const extractId = (url) => {
    const parts = url.split('/');
    const ids = parts[parts.indexOf('id') + 1];

    id = ids
}

// function for download image

// const downloadImage = async (download_url) => {
    
//     const downloadLink = document.createElement('a');
//     downloadLink.href = download_url
//     downloadLink.download = 'image.jpg'; // Specify the desired file name

//     // Trigger the download
//     downloadLink.click();

//     document.body.removeChild(downloadLink);
//     // Clean up the object URL
//     URL.revokeObjectURL(downloadLink.href);
// }


// fill the info of image in the modal
const fillInfo = async (author, imageSrc, dwonloadLink) => {
    const secImage = document.getElementById('secImage')
    const authorH2 = document.getElementById('author')
    const downloadBtn = document.getElementById('downloadBtn')
    URL = `https://picsum.photos/id/${id}/250/250`
    secImage.src = URL
    authorH2.innerText = author
    authorH2.href = imageSrc
    downloadBtn.href = dwonloadLink
    // downloadBtn.addEventListener('click', () => downloadImage(dwonloadLink))
}

// close the module
const closeModule = () => {
    document.querySelectorAll('.overlay').forEach((element) => {
        element.style.display = "none"
    })
}

closeOverlayBtn.addEventListener('click', closeModule)
layer.addEventListener('click', closeModule)


// function for set animation 
const setAnimation = () => {
    image.classList.remove('animate__bounceInUp')
    image.classList.add('animate__bounceInUp');
}

// set active class to active item in navbar
document.querySelectorAll('.nav-item').forEach((element) => {
    element.addEventListener("click", function (event) {
        event.preventDefault();
        document.querySelectorAll(".nav-item")
            .forEach((ele) => ele.classList.remove("active"));
        this.classList.add("active")
    })
})


// functions for fetch pictures 
const getRandom = async () => {
    try {
        type = ""
        URL = `https://picsum.photos/${WIDHT}/${HEIGHT}/${type}`
        const response = await fetch(URL);
        const url = response.url; // Get the image data as a Blob
        DOWNLOAD_URL = url
        extractId(url)
        setAnimation()
        image.src = url; 
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}




const getGrayScal = async () => {
    try {
        const response = await fetch(URL);
        const url = response.url; // Get the image data as a Blob
        DOWNLOAD_URL = url
        extractId(url)
        setAnimation()
        image.src = url; 
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


const getBlur = async () => {
    try {
        const response = await fetch(URL);
        const url = response.url; // Get the image data as a Blob
        extractId(url)
        // console.log(url);
        image.src = url; 
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const getPicInfoById = async() => {
    try {
        URL = `https://picsum.photos/id/${id}/info`
        const response = await fetch(URL);
        const data =await response.json()
        fillInfo(data.author, data.url, data.download_url)

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// display the module
displayOvarlayBtn.addEventListener('click', () => {
    getPicInfoById()
    // display the module
    displayOvarlayBtn.addEventListener('click', () => {
        document.querySelectorAll('.overlay').forEach((element) => {
            element.style.display = "block"
        })
    })
})

randomPic.addEventListener("click", () => {
    type = ""
    URL = `https://picsum.photos/${WIDHT}/${HEIGHT}/${type}`
    getRandom()
    setAnimation()
})

grayscalePic.addEventListener("click", () => {
    type = "?grayscale"
    URL = `https://picsum.photos/${WIDHT}/${HEIGHT}/${type}`
    getGrayScal()
    setAnimation()
})

blurPic.addEventListener("click", () => {
    type = "?blur"
    URL = `https://picsum.photos/${WIDHT}/${HEIGHT}/${type}=${blurDegree}`
    setAnimation()
    getBlur()
    
})


// for mouse movement and animation 

image.onmousedown = function (event) {
    

    let shiftY = event.clientY - image.getBoundingClientRect().top;


    moveAt(event.pageY);

    function moveAt(pageY) {
        const maxY = window.innerHeight - image.clientHeight;
        const newY = Math.min(maxY, pageY - shiftY);
        image.style.top = newY + 'px';
    }

    function onMouseMove(event) {
        
        moveAt(event.pageY);
        
    }


    document.addEventListener('mousemove', onMouseMove);

    image.onmouseup =async function () {
        image.style.display = 'none'
        if (type == "") await getRandom()
        else if (type == "blur") await getBlur()
        else await getGrayScal()
        document.removeEventListener('mousemove', onMouseMove);
            setAnimation()
            image.style.top = '90%'
            image.style.display = 'block'
            image.onmouseup = null;
    };

};

image.ondragstart = function () {
    return false;
};
