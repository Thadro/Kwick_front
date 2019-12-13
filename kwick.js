const app = {
	kwick_api_url: 'http://greenvelvet.alwaysdata.net/kwick/api/',
	init: function() {
		console.log('Kwick app is ready to rock !');
		//alert(localStorage.getItem('time'));

		$('#bt_ping').on('click', app.ping);
		$('#sign-up-to-sign-in').on('click', app.signup);
		$('#sign-in-to-chat').on('click', app.login);
		$('#button-ctnr').on('click', app.logout);
		$('#btn-submit').on('click', app.message);
	},
	ping: function() {
		$.ajax({
			url: app.kwick_api_url + 'ping',
			dataType: 'jsonp',
			type: 'GET',
			contentType: 'application/json; charset=utf-8',
			success: function(result, status, xhr) {
				console.log(result);
				localStorage.setItem('time', result.kwick.completed_in);
			},
			error: function(xhr, status, error) {
				alert('Error');
			}
		});
	},

	signup: function() {
		let user_name = $("#sign-up-identifiant").val();
    	let password = $("#sign-up-mdp").val();
			$.ajax({
				url: app.kwick_api_url + 'signup' + '/' + user_name + '/' + password,
				dataType: 'jsonp',
				type: 'GET',
				contentType: 'application/json; charset=utf-8',
				success: function(result, status, xhr) {
					localStorage.setItem('username', user_name);
					localStorage.setItem('password', password);
					console.log(app.kwick_api_url + 'signup' + '/' + user_name + '/' + password)

					if (result.result.status == 'done') {
							$("#accueil").css("display","none")
							$("#sign-up-main-ctnr").css("display","flex")
					}

			},
			error: function(xhr, status, error) {
				alert('Error');
			}
		});

		/*LOG OUT*//*
		$("#button-ctnr").click(function(){
			$("#header-chat").css("display","none")
			$("#chat-ctnr").css("display","none")
			$("#sign-in-main-ctnr").css("display","flex")
		})
	});*/
	
	},

	login: function() {
		let user_name = $("#sign-in-identifiant").val();
    	let password = $("#sign-in-mdp").val();
			$.ajax({
				url: app.kwick_api_url + 'login' + '/' + user_name + '/' + password,
				dataType: 'jsonp',
				type: 'GET',
				contentType: 'application/json; charset=utf-8',
				success: function(result, status, xhr) {
					localStorage.setItem('token', result.result.token);
					localStorage.setItem('id', result.result.id)
					
					if (result.result.status == 'failure') {
						console.log('Tu as une erreur petit con')
					}

				if(result.result.status == 'done') {
					$("#sign-in-main-ctnr").css('display','none');
					$("#header-chat").css('display','flex');
					$("#chat-ctnr").css('display','flex');
				}
			},
			error: function(xhr, status, error) {
				alert('Error');
			}
		});
	},



	logout: function() {
		let token_logout = localStorage.getItem('token');
    	let id_logout = localStorage.getItem('id');
			$.ajax({
				url: app.kwick_api_url + 'logout' + '/' + token_logout + '/' + id_logout,
				dataType: 'jsonp',
				type: 'GET',
				contentType: 'application/json; charset=utf-8',
				success: function(result, status, xhr) {
					
					if (result.result.status == 'failure') {
						console.log('tu as une erreur petit con')
					}
				if(result.result.status == 'done') {
					$("#button-ctnr").click(function(){
						$("#header-chat").css("display","none")
						$("#chat-ctnr").css("display","none")
						$("#sign-in-main-ctnr").css("display","flex")
					})
				}
			},
			error: function(xhr, status, error) {
				alert('Error');
			}
		});
	},
	
	logged: function() {
		let token_logged = localStorage.getItem('token');
			$.ajax({
				url: app.kwick_api_url + 'user' + '/' + 'logged' + '/' + token_logged,
				dataType: 'jsonp',
				type: 'GET',
				contentType: 'application/json; charset=utf-8',
				success: function(result, status, xhr) {
				
				if (result.result.status == 'failure') {
					console.log('tu as une erreur petit con')
				}
			if(result.result.status == 'done') {
				for (let i=0; i<result.result.user.length; i++){
				let user_account_name = result.result.user[i]
					if(result.result.user != localStorage.getItem('token_logged')){
						$('#online-user').append('<div class="item-contact" >' + '<img src="./image/compte-utilisateur-1.png" />' + '<p>' + user_account_name + '</p>' + '</div>');
					}
				}
			}
		},
			error: function(xhr, status, error) {
				alert('Error');
			}
		});
	},

	message: function() {
		let token_message = localStorage.getItem('token');
		let id_message = localStorage.getItem('id');
		let message = $("#write-text").val();
			$.ajax({
				url: app.kwick_api_url + 'say' + '/' + token_message + '/' + id_message + '/' + encodeURI(message),
				dataType: 'jsonp',
				type: 'GET',
				contentType: 'application/json; charset=utf-8',
				success: function(result, status, xhr) {
					
					if (result.result.status == 'failure') {
						console.log('tu as une erreur petit con')
					}
					console.log (app.kwick_api_url + 'say' + '/' + token_message + '/' + id_message + '/' + encodeURI(message))
					console.log (message)

					$('#window-chat').append('<div class="item-chat-right">' + '<img src="./image/romain.jpg"/>' + '<p>' + message + '</p>' + '</div>');
					
			},
			error: function(xhr, status, error) {
				alert('Error');
			}
		});
	},

	message: function() {
		let token_message = localStorage.getItem('token');
		let id_message = localStorage.getItem('id');
		let message = $("#write-text").val();
			$.ajax({
				url: app.kwick_api_url + 'say' + '/' + token_message + '/' + id_message + '/' + encodeURI(message),
				dataType: 'jsonp',
				type: 'GET',
				contentType: 'application/json; charset=utf-8',
				success: function(result, status, xhr) {
					
					if (result.result.status == 'failure') {
						console.log('tu as une erreur petit con')
					}
					console.log (app.kwick_api_url + 'say' + '/' + token_message + '/' + id_message + '/' + encodeURI(message))
					console.log (message)

					$('#window-chat').append('<div class="item-chat-right">' + '<img src="./image/romain.jpg"/>' + '<p>' + message + '</p>' + '</div>');
					
			},
			error: function(xhr, status, error) {
				alert('Error');
			}
		});
	},
};





















// Transition entre les pages

$(document).ready(function(){
	/*$("#sign-up").click(function(){
		$("#accueil").css("display","none")
		$("#sign-up-main-ctnr").css("display","flex")
	})*/
	$("#sign-in").click(function(){
		$("#accueil").css("display","none")
		$("#sign-in-main-ctnr").css("display","flex")
	})
	$("#sign-up-to-sign-in").click(function(){
		$("#sign-up-main-ctnr").css("display","none")
		$("#sign-in-main-ctnr").css("display","flex")
	})
	/* $('#sign-in-to-chat').click(function(){
		$("#sign-in-main-ctnr").css("display","none")
		$("#header-chat").css("display","flex")
		$("#chat-ctnr").css("display","flex")
	})*/
	$("#button-ctnr").click(function(){
		$("#header-chat").css("display","none")
		$("#chat-ctnr").css("display","none")
		$("#sign-in-main-ctnr").css("display","flex")
	})
});

