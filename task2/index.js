var nPreviousScrollTop;
var bIsScrolling;
var nAnchorClicked = 0;
var oHeader;

function hasScrolled() {  
    var nScrollTop = window.scrollY;
    if (oHeader) {        
        if (nScrollTop > nPreviousScrollTop){
            oHeader.classList.add('header--up');
        } else {
            oHeader.classList.remove('header--up');
        }
    } else {
        oHeader = document.querySelector('#header');
    }
    nPreviousScrollTop = nScrollTop;  
}

document.addEventListener('scroll', function(oEvent) {
    bIsScrolling = true;
}, false);

setInterval(function() {
    if (bIsScrolling && !nAnchorClicked) {
        hasScrolled();
    }    
    bIsScrolling = false;
}, 300);

window.addEventListener('load', function() {
    document.querySelectorAll('a[href^="#"]').forEach(oAnchor => {
        oAnchor.addEventListener('click', function (oEvent) {
            oEvent.preventDefault();
            nAnchorClicked += 1;
            document.getElementById('chk').checked = false;

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth', 
                block: 'center'
            });

            setTimeout(function() {
                nAnchorClicked -= 1;
            }, 1500);
        });
    });
}, false )

setInterval(function() {
    const oSlider = document.getElementById('slider');
    const nIndex = Math.floor(Math.random() * 7) + 1;
    oSlider.style.background = `url(images/img${nIndex}.jpg)`;
}, 5000);