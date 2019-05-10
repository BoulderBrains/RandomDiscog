$(document).ready(function () {

	$("#random-release").on("click", function (event) {
		event.preventDefault();
		// creating a username variable, store the entered username
		const username = $('#username-input').val();

		// Constructing our query URL to hit the API
		var queryURL = "https://api.discogs.com/users/" + username + "/collection/folders/0/releases";

		$.ajax({ url: queryURL, method: "GET"})
			.then(function (response) {
				// Pulling a random release off the response
				const release = response.releases[Math.floor(Math.random() * response.releases.length)];
				console.log("release info:", release)

				// Storing the information I want off the response
				const artistName = release.basic_information.artists[0].name;
				const releaseName = release.basic_information.title;
				const recordLabel = release.basic_information.labels[0].name;
				const releaseImage = release.basic_information.cover_image;

				// Building a bootstrap card for release display
				const responseCard = $("<div id='response-card' class='card'>");
				const responseCardImage = $("<img id='release-cover' class='card-img-top'>");
				//have to set the source of responseCardImage to image I still need to dig out of the API
				const cardBody = $("<div class='card-body'>");
				const artistNameContainer = $("<h3 id='artist-name' class='card-title'>");
				const releaseNameContainer = $("<h5 id='release-name' class='card-text'>");
				const recordLabelContainer = $("<p id='record-label' class='card-text'>");

				// Appending the release information to the newly response created card
				$("#artist-name").append(artistName);
				$("#release-cover").append(releaseImage);
				$("#release-name").append(releaseName);
				$("#record-label").append(recordLabel);

				// putting all the pieces together
				responseCard.append(responseCardImage, cardBody, artistNameContainer, releaseNameContainer, recordLabelContainer);

				console.log(responseCard);
				$("#response-card-container").append(responseCard);

				// console.log("Artist name", release.basic_information.artists[0].name);
				// console.log("Release title", release.basic_information.title);
				// console.log("Record Label", release.basic_information.labels[0].name);
		});
	});
});