var isotope_container = $('#index #posts');
$(window).load(function(){
	$('#posts-sorter a').click(function(e){
		var filter = $(this).data('filter');
		e.preventDefault();
		$('.post').fadeOut();
		$(filter).fadeIn();
		$('#posts-sorter li').removeClass('active');
		$(this).parents('li').addClass('active');
	});
	loadPosts();


});
$(document).ready(function(){
	$('#size-toggle a').bind('click', function(e){
		console.log("class");
		e.preventDefault();
		var size_filter = $(this).data('filter');
		console.log(size_filter);

		$('.post').removeClass('small').removeClass('default').addClass(size_filter);
	});
});

function intializeIsotope(){
	
	isotope_container.isotope({
  		// options
  		itemSelector : '.post',
  		layoutMode : 'fitRows'
	});
}


function loadPosts(){
	if($("#index").length>0){

	var api_key = "Vc68Nq5tUM7in4XOQ43bfTjKP0ht0KVePDPKFkajZKagTSp4Q7";
	$.ajax({
		url: 'http://api.tumblr.com/v2/blog/paigesgifdump.tumblr.com/posts',
		method: 'get',
		data : ({
			api_key : api_key
		}),
		dataType: "jsonp",
		success: function(data){
			console.log(data);
			var source   = $("#posts-template").html();
			var template = Handlebars.compile(source);
			var html    = template(data.response);
			$("#index #posts").html(html);
			/*intializeIsotope();*/
		}
		});
	}
}

Handlebars.registerHelper('body_content', function() {
  return new Handlebars.SafeString(
    this.body
  );
});