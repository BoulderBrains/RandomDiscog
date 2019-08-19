$(document).ready(function () {

	$("#random-release").on("click", function (event) {
		event.preventDefault();
		// creating a username variable, store the entered username
		const username = $('#username-input').val();

		// Constructing our query URL to hit the API
		var queryURL = "https://api.discogs.com/users/" + username + "/collection/folders/0/releases";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).then(function (response) {
				// Pulling a random release off the response
				const release = response.releases[Math.floor(Math.random() * response.releases.length)];
				console.log('response', response);
				console.log("release info:", release)

				// Building a bootstrap card for release display
				const responseCard = $("<div id='response-card' class='card'>");
				const responseCardImage = $("<img id='release-cover' class='card-img-top'>");
				//have to set the source of responseCardImage to image I still need to dig out of the API
				const cardBody = $("<div class='card-body'>");
				console.log({cardBody})
				const artistNameContainer = $("<h3 id='artist-name' class='card-title'>");
				const releaseNameContainer = $("<h5 id='release-name' class='card-text'>");
				const recordLabelContainer = $("<p id='record-label' class='card-text'>");
				
				console.log(recordLabelContainer);
				console.log(cardBody);
				console.log(artistNameContainer);
				console.log(releaseNameContainer);
				console.log(recordLabelContainer);

				// putting all the pieces together
				responseCard.append(responseCardImage, cardBody, artistNameContainer, releaseNameContainer, recordLabelContainer);

				console.log(responseCard);
				$("#response-card-container").append(responseCard);

				// Storing the information I want off the response
				const artistName = release.basic_information.artists[0].name;
				const releaseName = release.basic_information.title;
				const recordLabel = release.basic_information.labels[0].name;
				const releaseImage = release.basic_information.cover_image;
				const artistId = release.basic_information.artists[0].id;

				console.log('release image', releaseImage);

				// Appending the release information to the newly response created card
				$("#artist-name").append(artistName);
				$("#release-cover").append(releaseImage);
				$("#release-name").append(releaseName);
				$("#record-label").append(recordLabel);

				// console.log("Artist name", release.basic_information.artists[0].name);
				// console.log("Release title", release.basic_information.title);
				// console.log("Record Label", release.basic_information.labels[0].name);
		}).then(function(artistId) {
			getServeBandImage(artistId);
		});

	});

	function getServeBandImage(artistId) {
		var bandQueryURL = "https://api.discogs.com/artists/" + artistId;

		$.ajax({
			url: bandQueryURL,
			method: "GET"
		}).then(function () {
			console.log('artist id', response);
		});
	}
});