
// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCdE4HNyBvqKsyejTNaX6s_YRBUilMNwaE",
	authDomain: "data-personalization.firebaseapp.com",
	databaseURL: "https://data-personalization.firebaseio.com",
	projectId: "data-personalization",
	storageBucket: "data-personalization.appspot.com",
	messagingSenderId: "330328842011",
	appId: "1:330328842011:web:cd599bda4d724128"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.requestPermission()
	.then(function() {
		console.log('Notification permission granted.');
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('./sw.js')
				.then(function(registration) {
					//using service worker
					messaging.useServiceWorker(registration);

					//foreground receiving logic
					messaging.onMessage(function(payload) {
						//You can use it in your notification logic
						console.log('Message received. ', payload);
					});
					messaging.getToken()
						.then(function(token) {
							document.getElementById('tokken').innerText = token;
							console.log(token);
						})
				}).catch(function(err) {
				console.log('Service worker registration failed, error:', err);
			});
		}
	})
	.catch(function(err) {
		console.log('Unable to get permission to notify.', err);
	});
