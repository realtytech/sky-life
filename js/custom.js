


function resize() {
  $('#slider').height($('#slider').children('.aslide').height());
}
$(window).resize(resize);
$(window).load(resize);


// Nav Scroll

// $(document).ready(function() {
//   $('.nav').onePageNav({
//     filter: ':not(.external)',
//     begin: function() {
//       console.log('start')
//     },
//     end: function() {
//       console.log('stop')
//     }
//   });

// });

$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .not('[href="#internal"]')
  .not('[href="#external"]')
  .not('[href="#construction"]')
  .not('[href="#demolition"]')
  .not('[href="#shorepile"]')
  .not('[href="#excavation"]')
  .not('[href="#plumb"]')
  .not('[href="#plinth"]')
  .not('[href="#slab"]')
  .not('[href="#slab1"]')
  .not('[href="#slab2"]')
  .not('[href="#slab3"]')
  .not('[href="#slab4"]')
  .not('[href="#slab5"]')
  .not('.carousel-control')
  .click(function (event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - 60
        }, 1000, function () {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });



jQuery.validator.addMethod("mobile", function (value, element) {
  return this.optional(element) || value.match(/^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/);
}, "Enter 10 digit number");

jQuery.validator.addMethod("alphabets", function (value, element) {
  return this.optional(element) || /^[a-zA-Z ]*$/.test(value);
}, "Please enter Alphabets only");

jQuery.validator.addMethod("email", function (value, element) {
  return this.optional(element) || /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
}, "Please enter a valid email address.");




var priceValidate;
var instantValidate;

/*popup js starts here*/
$(window).load(function () {
  if (!Get_Cookie('popout')) {

    if ($(window).width() > 550) {
      window.setTimeout(function () {
        $('#popupModal').modal({
          /*backdrop: 'static',
          keyboard: false*/
        });
      }, 3000);
    }
  }
});

$('#popupModal .close').click(function () {
  Set_Cookie('popout', 'it works');
});
$('#popupModal').on('hide.bs.modal', function () {
  Set_Cookie('popout', 'it works');
});

$('.pricepop').click(function () {
  var pricePopup = $('#price');
  pricePopup.find('input[name=source]').val('Price Popup');
  pricePopup.find('strong').html('Please enter the details below to get the detailed pricing information.');
  pricePopup.modal();
  $('#price').on('hidden.bs.modal', function () {
    $(this).find('.has-error').removeClass('has-error');
    priceValidate.resetForm();
  });
});

$('.download').click(function () {
  var inquirePopup = $('#popupModal');
  inquirePopup.find('input[name=source]').val('Download Brochure');
  inquirePopup.find('strong').html('Enter your details for Download Brochure.');
  inquirePopup.modal();
});

$('#bookvisit').click(function () {
  var pricePopup = $('#sitevisit');
  pricePopup.modal();
  $('#sitevisit').on('hidden.bs.modal', function () {
    $(this).find('.has-error').removeClass('has-error');
    priceValidate.resetForm();
  });
});

$('.inquireButton').click(function () {
  var inquirePopup = $('#price');
  inquirePopup.find('input[name=source]').val('Inquiry Form - Mobile');
  inquirePopup.find('strong').html('Enter your details for project information.');
  inquirePopup.modal();
});

/*popup js ends here*/

jQuery(function ($) {
  $(document).ready(function () {
    "use strict";
    var instantFlag = false;
    var hotlineFlag = false;
    $("#instant-callback-div .instant-switch").click(function () {
      $('#instant-callback-div').addClass('opened');
      $("#instant-callback-div").animate({
        "right": $("#instant-callback-div").css('right') == "-1px" ? "-247px" : "-1px"
      }, 500);
      instantFlag = true;
      if (hotlineFlag) {
        $("#hotline-div").animate({
          "right": "-277px"
        }, 500);
        hotlineFlag = false;
      }
    });
    $("#hide").click(function () {
      $('#instant-callback-div').removeClass('opened');
      $("#instant-callback-div").animate({
        "right": "-247px"
      }, 500);
      instantFlag = false;
      $('#InstantCallback').find('.has-error').removeClass('has-error');
      instantValidate.resetForm();
    });

    $("#hotline-div .hotline-switch").click(function () {
      $("#hotline-div").animate({
        "right": "-1px"
      }, 500);
      hotlineFlag = true;
      if (instantFlag) {
        $("#instant-callback-div").animate({
          "right": "-246px"
        }, 500);
        instantFlag = false;
      }
    });
    $("#hide-hotline").click(function () {
      $("#hotline-div").animate({
        "right": "-245px"
      }, 500);
      hotlineFlag = false;
    });
  });
});



// Transfer the logic for form submission for Shivji Krupa
function numbersonly(e) {
  var unicode = e.charCode ? e.charCode : e.keyCode
  if (unicode != 8) { //if the key isn't the backspace key (which we should allow)
      if (unicode < 48 || unicode > 57) //if not a number
          return false //disable key press
  }
  // isValidOTP();
}

function ValidateEmail(mail) {
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
      return (true)
  }
  // alert("You have entered an invalid email address!")
  return (false)
}

function queryParameter(name, url) {
  if (!url) url = location.href;
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(url);
  return results == null ? null : results[1];
}

$("form").submit(function (e) {

  e.preventDefault();


  var formName = (e.target).getAttribute("id");

  const nameInputSelector = `#${formName} input[name="name"]`;
  const emailInputSelector = `#${formName} input[name="email"]`;
  const countryCodeSelector = `#${formName} select[name="CountryCode"]`;
  const mobileInputSelector = `#${formName} input[name="mobile"]`;
  const submitButton = `#${formName} #submitf`;
  var name = $(nameInputSelector).val();
  var email = $(emailInputSelector).val();
  var countryCode = $(countryCodeSelector).val();
  var mobile = $(mobileInputSelector).val();
  $(submitButton).prop('disabled', true);
  

  if (name == "") {
    alert('Please enter your name');
    return;
  }

  if (email == "") {
    alert('Please enter your email id');
    return;
  } else {
    if (!ValidateEmail(email)) {
      alert('Please enter a valid email id');
      return;
    }

  }
  if (mobile == "") {
    alert('Please enter your valid mobile number');
    return;
  } else {
    const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!regex.test(mobile)) {
      alert('Please enter your valid 10 digit mobile number');
      return;
    }
  }
  console.log(countryCode);
  if(countryCode && countryCode != "")  mobile = "+"+countryCode+mobile;

  var currentUrl = window.location.href;
  var project = 'Shivji Krupa';
  var utm_source = queryParameter('utm_source', currentUrl);
  var utm_medium = queryParameter('utm_medium', currentUrl);
  var utm_campaign = queryParameter('utm_campaign', currentUrl);
  var utm_term = queryParameter('utm_term', currentUrl);
  var utm_content = queryParameter('utm_content', currentUrl);

  var source = "Website"
  if (utm_source) {
    if (utm_source == "google") {
      source = (utm_term) ? "Google Search" : "Google Discovery";
    } else if (utm_source == "facebook") {
      source = "Facebook";
    }

  }

  var data = {
    "name": name,
    "mobile": mobile,
    "email": email,
    "source": source,
    "comment": "Source:" + utm_source + "|Medium:" + utm_medium + "|term:" + utm_term + "|content:" + utm_content + "|campaign:" + utm_campaign + "|URL:" + currentUrl.substring(0, 255),
    "sub_source": utm_medium,
    "project": project

  }

  var sfdcData = {
    "req":
    {
    "name": name,
    "mobile": mobile,
    "phone":  "",
    "email": email, 
    "alternateEmail":  "",
    "campaignCode": "a025i00000VUkdJAAT",
    "url":currentUrl.substring(0,255),
    "remarks": "Source:" + utm_source + "|Medium:" + utm_medium + "|term:" + utm_term + "|content:" + utm_content + "|campaign:" + utm_campaign + "|URL:" + currentUrl.substring(0, 255),
    "UTM_Medium":  utm_medium,
    "UTM_Source":  utm_source,
    "LeadIdentifier":  "post"
    }
}

storeLeadInSFDC(sfdcData);

// storeLeadInEnrichr(data,formName);
return;

});


function storeLeadInSFDC(data) {
  console.log(data)
  var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://l3g8sgyj77.execute-api.ap-south-1.amazonaws.com/Production",
      "method": "POST",
      "headers": {
          "content-type": "application/json",
      },
      "processData": false,
      "data": JSON.stringify(data)
  }

  $.ajax(settings).done(function (response) {
      console.log(response);
      storeLeadInDB(data["name"], data["email"], data["mobile"], JSON.stringify(response));
      setTimeout(function redirect_response() { window.location.href = "response.html"; }, 2000);
      return;

  });

}


function storeLeadInEnrichr(data, formName) {
  console.log("Adding Data to Enrichr");
  console.log(data)
  var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://pinkode.glitz.apps.enrichr.co/public/companies/41b21e3e-600b-4d9f-aab1-bfb72c5b915e/leads-all",
      "method": "POST",
      "headers": {
          "content-type": "application/json",
      },
      "processData": false,
      "data": JSON.stringify(data)
  }

  $.ajax(settings).done(function (response) {
      console.log(response);
      storeLeadInDB(data["name"], data["email"], data["mobile"], JSON.stringify(response), formName);
      setTimeout(function redirect_response() { window.location.href = "response.html"; }, 2000)
  });

}

function storeLeadInDB(name, email, mobile, response, formName) {
  var currentUrl = window.location.href;
  var utm_source = queryParameter('utm_source', currentUrl);
  var utm_medium = queryParameter('utm_medium', currentUrl)
  var utm_campaign = queryParameter('utm_campaign', currentUrl)
  var utm_adgroup = queryParameter('utm_adgroup', currentUrl)
  var utm_keyword = queryParameter('utm_keyword', currentUrl)
  var utm_adset = queryParameter('utm_adset', currentUrl)
  var utm_ad = queryParameter('utm_ad', currentUrl)
  var utm_device = queryParameter('utm_device', currentUrl)
  var utm_site = queryParameter('utm_site', currentUrl)
  var utm_placement = queryParameter('utm_placement', currentUrl);
  var gclid = queryParameter('gclid', currentUrl);
  var fbclid = queryParameter('fbclid', currentUrl);
  var srd = queryParameter('srd', currentUrl);


  var project = 'Shivji Krupa';
  var timestamp = Date();
  data = {
      "formId": String(Math.floor(Date.now() / 1000)),
      "name": name,
      "email": email,
      "mobile": mobile,
      "project": project,
      "lead_creation_date": timestamp,
      "utm_source": utm_source,
      "utm_medium": utm_medium,
      "utm_campaign": utm_campaign,
      "utm_adgroup": utm_adgroup,
      "utm_keyword": utm_keyword,
      "utm_adset": utm_adset,
      "utm_ad": utm_ad,
      "utm_device": utm_device,
      "utm_site": utm_site,
      "utm_placement": utm_placement,
      "gclid": gclid,
      "fbclid": fbclid,
      "response": response,
      "formName": formName,
      "url": currentUrl,
      "srd": srd

  }
  const formURL = 'https://dj2kxzt125.execute-api.ap-south-1.amazonaws.com/Prod/submitForm';

  var xhr = new XMLHttpRequest();
  xhr.open('POST', formURL, true);
  xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

  // Send the collected data as JSON
  xhr.send(JSON.stringify(data));

  xhr.onloadend = response => {
      if (response.target.status === 200) {
          //   form.reset();
          console.error(JSON.parse(response));

          //   submitResponse.innerHTML = 'Form submitted. Success!';
      } else {
          //   submitResponse.innerHTML = 'Error! Please try again.';
          console.error(JSON.parse(response));
      }
  };

}

