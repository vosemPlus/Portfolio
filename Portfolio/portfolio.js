$(document).ready(function() {
    $(".intro_nav, .go_from_intro, .go_from_portfolio, .go_from_skills, .go_from_contacts").on("click", "a", function(event) {
        event.preventDefault();
        var id = $(this).attr("href"),
            top = $(id).offset().top;
        $("body, html").animate({
            scrollTop: top
        }, 1500);
    });

    $('.intro_nav').addClass('appear_left_to_right');
    $('h1.name').addClass('zoomIn');
    $('.my_photo_image').addClass('flipY');
    $('div.my_photo_border').addClass('flipY');
    $('p.go_from_intro').addClass('appear_in');

    var portfolioItemsArray = document.querySelectorAll('div.portfolio_item'),
        firstLiSkills = document.querySelector("li.skills_item"),
        skillsAbout = document.getElementsByClassName("about_skills")[0];


    function flipPortfItems() {
        for (var i = 0; i < portfolioItemsArray.length; i++) {
            if ((portfolioItemsArray[i].getBoundingClientRect().top > 0) && (portfolioItemsArray[i].getBoundingClientRect().bottom < document.documentElement.clientHeight)) {
                portfolioItemsArray[i].classList.add('flip');
            }
        }
    };

    function animateSkillsList() {
        if ((firstLiSkills.getBoundingClientRect().top > 0) && (firstLiSkills.getBoundingClientRect().bottom < document.documentElement.clientHeight)) {
            $('li.skills_item').addClass('anim');
            var LiSkillsArr = document.querySelectorAll("li.anim");
            var delayCounter = 0;
            for (var i = 0; i < LiSkillsArr.length; i++) {
                LiSkillsArr[i].style.animationDelay = delayCounter + "ms";
                LiSkillsArr[i].style.WebkitAnimationDelay = delayCounter + "ms";
                delayCounter += 500;
            }
        }
    };

    function animateSkillsDescription() {
        if ((skillsAbout.getBoundingClientRect().top > 0) && (skillsAbout.getBoundingClientRect().top * 1.25 < document.documentElement.clientHeight)) {
            $('.about_skills').addClass('zoomIn');
        }
    };
    // animating on loading if (not scrolled and) located in visible area - for Mozilla(!)
    flipPortfItems();
    animateSkillsList();
    animateSkillsDescription();
    // animating by scrolling
    $(window).scroll(function() {
        flipPortfItems();
        animateSkillsList();
        animateSkillsDescription();
    });


    // SKILLS SLIDES
    var skillsSlides = Array.from($(".skills_slides")[0].childNodes);

    function changeSlides(counter) {
        if (counter == skillsSlides.length) {
            counter = 0;
            skillsSlides[skillsSlides.length - 1].classList.remove('fadedIn')
        };
        skillsSlides[counter].classList.add('fadedIn');
        if (skillsSlides[counter - 1]) {
            skillsSlides[counter - 1].classList.remove('fadedIn');
        }
        counter++;
        if (counter <= skillsSlides.length) setTimeout(changeSlides, 10000, counter);
    }
    changeSlides(0);

    // SKILLS DIPLOMAS

    var diplBachelor = document.getElementsByClassName('bachelor')[0];
    diplBachelor.onclick = function() {
        diplBachelor.classList.toggle('enlarge');
    };
    var diplMaster = document.getElementsByClassName('master')[0];
    diplMaster.onclick = function() {
        diplMaster.classList.toggle('enlarge');
    };
    $(window).scroll(function() {
        if ($('enlarge')) {
            $('div.enlarge').removeClass('enlarge');
        }
    });

});

// CONTACTS

var contacts = document.getElementsByClassName('contacts_line'),
    email = document.getElementsByClassName('email')[0],
    contactsTextArray = [],
    timeout = 0;

function displayLetters(el) {
    for (var n = 0; n < el.innerHTML.length; n++) {
        contactsTextArray.push('<span>' + el.innerHTML.charAt(n) + '</span>');
    }
    el.innerHTML = contactsTextArray.join('');
    el.style.opacity = '1';
    var contactsSpans = el.childNodes;

    for (var m = 0; m < contactsSpans.length; m++) {
        setTimeout((function(m) {
            return function() {
                contactsSpans[m].style.opacity = '1';
            };
        })(m), timeout);
        timeout += 100;
    };
    clearTimeout();

    contactsTextArray = [];
};

var marker = true;
if (contacts[0].getBoundingClientRect().bottom < document.documentElement.clientHeight) {
    if (marker) {
        for (var k = 0; k < contacts.length - 1; ++k) {
            displayLetters(contacts[k]);
        }
        displayLetters(email);
        marker = false;
    }
}

$(window).scroll(function() {
    if (contacts[0].getBoundingClientRect().bottom < document.documentElement.clientHeight) {
        if (marker) {
            for (var k = 0; k < contacts.length - 1; ++k) {
                displayLetters(contacts[k]);
            }
            displayLetters(email);
            marker = false;
        }
    }
});