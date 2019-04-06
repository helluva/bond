var config = {
apiKey: "AIzaSyBV8cecqa1eIJhiFP5kBYcjkWreNWO5QfI",
authDomain: "eventexplorer-3ecd6.firebaseapp.com",
databaseURL: "https://eventexplorer-3ecd6.firebaseio.com",
projectId: "eventexplorer-3ecd6",
storageBucket: "eventexplorer-3ecd6.appspot.com",
messagingSenderId: "1018227441892"
};
firebase.initializeApp(config);

var people = [];
var peopleRef = firebase.database.ref('people');

peopleRef.collection('people').get().then(function(querySnapshot) {
	querySnapshot.forEach(function(doc) {
		console.log(doc.id, " => ", doc.data());
	});
});