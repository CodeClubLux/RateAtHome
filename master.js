/**
 * Created by Joe, Henri & Pick Team on 30/06/16.
 *
 * Note that I have tried to make this easy to understand. you can still reduce the code to 90 lines at least :)
 */

function generateRatings() //Dynamic empty house loading for all the divs
{
    var c=0;
    for (var i=0; i<6; i++) {
        var loc= "#div"+c;
        for (var x = 0; x < 5; x++) {
            $("<img  />", {src: "house_empty.png", class: "rateImg" , id: "img_div_"+i+"_"+x}).appendTo(loc);
        }
        c++;
    }
}

//Resetting the current div images to help redraw empty houses
function resetHouse()
{
    for (var x = 0; x < 5; x++) {
        var Newlem='#img_div_0_'+x;
        $( '#div0 '+ Newlem).attr('src', 'house_empty.png');
    }
}

/**This is where the homes are manupilated.
 *
 * There is a event listener on every image click beside those on the first Div
 *
  */
$(document).ready(function(){
    $("img").click(function(){
        var elemParent = $( this ).parent().get(0).id;
        if(elemParent!="div0")
        {
            var idNum = parseInt(this.id.substr(this.id.length-1,1));

            //Loading house_full image on the current image click
            var elem = this.id.substr(0,10).toString();
            if(idNum>=0)
            {
                for (var x=0; x<5; x++)
                {
                    var Nelem='#'+elem+x;
                    $(Nelem).attr('src', 'house_empty.png').removeClass('full').fadeIn();
                }

                for (var x=0; x<idNum+1; x++)
                {
                    var Nelem='#'+elem+x;
                    $(Nelem).attr('src', 'house_full.png').addClass('full');
                }
            }
            //Counting full house images and updating the interface
            var fullHouse= $('.full').length;
            var initial = fullHouse * 5 / 25;
            var average = Math.floor(initial);
            if(average>0)
            {
                resetHouse(); //Resetting house image to empty before re draw

                for (var x = 0; x < average; x++) {
                    var Nelem='#img_div_0_'+x;
                    $( '#div0 '+ Nelem).attr('src', 'house_full.png').fadeIn();
                }
                $('#no-floor-average').text(initial);
                $('#sendInput').val(initial);
                $( "#sendButton" ).removeClass( 'btn-default disabled').addClass('btn-warning');

                //Change my House photo here
                var imgsrc= "./src/img/house_0"+average+".jpg"
                $( '#myhome').attr('src', imgsrc);
            }
            else
            {
                resetHouse(); //Resetting house image to empty before re draw
                $( "#sendButton").removeClass('btn-warning').addClass( 'btn-default disabled'); //Disabling Submit button
            }
        }
    });
});

generateRatings();  //This is how I call the dynamic load of images

/**I also made sure that the Click behaviour be activated only when average > 0
 * rate.php need to be implemented , if you need help with it, let me know and will tke you through.
 **/

$("#sendForm").click(function(e) {
    e.preventDefault();

    if(parseFloat($('#sendInput').val())>0)
    {
        var formdata = document.querySelector("sendForm");
        $.ajax({
            type: "POST",
            url: "rate.php",
            data: formdata,
            processData: false,
            contentType: false,
            success: function(data) {
                console.log("PHP return data: " + data);
            }
        });
    }
});