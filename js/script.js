
(function(){

	// 构造函数
	function Header(){
		var self = this;
		this.$hasDropdown = $('#header .nav .hasDropdown');
		this.$dropdown = this.$hasDropdown.children('.dropdown');
		this.$toggle = $('#header .sm-nav .toggle');
		this.$smNavbar = $('#header .sm-navbar');
		this.state = "hidden";
		this.$smHasDropdown = $('#header .sm-nav .hasDropdown');
		this.$smDropdown = this.$smHasDropdown.children('.sm-dropdown');
		this.$chevronUp = this.$smHasDropdown.find('span');

		this.$toggle.on('click',function(e){
			e.stopPropagation();
			self.stateChange();
		});
		this.$dropdown.on('click',function(e){
			e.stopPropagation();
		});
		this.$smDropdown.on('click mouseover mouseout',function(e){
			e.stopPropagation();
		});
		this.$hasDropdown.hover(function(){
			self.mouseover();
		},function(){
			self.mouseout();
		});
		this.$smHasDropdown.hover(function(){
			self.smOver();
		},function(){
			self.smOut();
		});
		$('html').on('click',function(){
			self.smOut();
			self.hide();
		});
	}
	Header.prototype.mouseover = function(){
		this.$dropdown.css('display','block');
		this.$dropdown.stop(true).animate({
			opacity:1,
			top:40,
		},400);
	}
	Header.prototype.mouseout = function(){
		this.$dropdown.stop(true).animate({
			opacity:0,
			top:90,
		},400,function(){
			$(this).css('display','none');
		});
	}
	Header.prototype.stateChange = function(){
		if(this.state === 'showed')
			this.hide();
		else if(this.state === 'hidden')
			this.show();
	}
	Header.prototype.show = function(){
		this.state = 'showed';
		this.$smNavbar.stop(true).animate({
			right:5,
		},500);
	}
	Header.prototype.hide = function(){
		this.state = 'hidden';
		this.$smNavbar.stop(true).animate({
			right:-210,
		},500);
	}
	Header.prototype.smOver = function(){
		this.$chevronUp.css('transform','rotate(180deg)');
		this.$smDropdown.slideDown(500);
	}
	Header.prototype.smOut = function(){
		this.$chevronUp.css('transform','rotate(0)');
		this.$smDropdown.slideUp(500);
	}

	// 声明定义
	$('#footer .gotop').on('click',function(){
		$('html,body').stop(true).animate({
			scrollTop:0
		},2000)
	})

	var header = new Header;
	window.sr = new ScrollReveal;
	var toTop = {
			scale:1,
			distance:'50px',
			viewFactor:0.5,
			delay:100,
		},
		center = {
			distance:0,
			viewFactor:0.5,
			delay:100,
		}

	sr.reveal(('#header .header-body'),toTop);
	sr.reveal(('#main .heading'),toTop);
	sr.reveal(('#main .services .col-body'),toTop,150);
	sr.reveal(('#main .project .row .col-body'),center,100);
	sr.reveal(('#main .testimonial .col-body'),toTop,100);
	sr.reveal(('#main .counter .body [class*='+"col-"+']'),{
		origin:'left',
		scale:1,
		distance:'50px',
		viewFactor:0.5,
		delay:100,
		afterReveal: function(elem){
			var $span = $(elem).find('.number');
			var number = Number($span.attr('data-num'));
			var timer = null;
			var i = 0;
			timer = setInterval(function(){
				$span.html(i);
				i++;
				if(i>number)
					clearInterval(timer);
			},100);
		},
	},100);
	sr.reveal(('#main .blog .body [class*='+"col-"+']'),center);
	sr.reveal(('#main .team .staff'),center,150);
	
})();