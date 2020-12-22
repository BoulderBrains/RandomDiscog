$(document).ready(function () {

	// $("#random-release").on("click", function (event) {
	$(document).on("click", "#random-release", function() {
		event.preventDefault();
		// creating a username variable, store the entered username
		const username = $('#username-input').val();

		// Constructing our query URL to hit the API
		var queryURL = "https://api.discogs.com/users/" + username + "/collection/folders/0/releases";

		$.ajax({
			url: queryURL,
			header: "--user-agent RandomRelease/0.1 +http://adb.example.com",
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

				// putting all the pieces together
				responseCard.append(responseCardImage, cardBody, artistNameContainer, releaseNameContainer, recordLabelContainer);

				console.log(responseCard);
				$("#response-card-container").empty().append(responseCard);

				// Storing the information I want off the response
				const artistName = release.basic_information.artists[0].name;
				let releaseName = release.basic_information.title;
				const recordLabel = release.basic_information.labels[0].name;
				const releaseImage = release.basic_information.cover_image;
				let releaseId = release.basic_information.id;

				// Appending the release information to the newly response created card
				$("#artist-name").empty().append(artistName);
				$("#release-cover").empty().append(releaseImage);
				$("#release-name").empty().append(releaseName);
				$("#record-label").empty().append(recordLabel);
				console.log('releaseName', releaseName);
				const urlFriendlyName = releaseName.split(' ').join('-');
				console.log('urlFriendlyName', urlFriendlyName);
				return { releaseId, urlFriendlyName };
		}).then(function (releaseId, urlFriendlyName) {
			console.log('release id after passed', releaseId);
			console.log('urlFiendlyName', urlFriendlyName);
			// currently the URL friendly name is not making it into this then statement
			// Now that i'm passing an object the whole thing is being returned like
			// CONSOLE.LOG returns from above:
			// release id after passed {releaseId: 435537, urlFriendlyName: "Boston's-Finest"}
			// urlFiendlyName undefined

			// https://www.discogs.com/release/1421848-Mindless-Violence-EP/images
			var bandQueryURL = "https://cors-anywhere.herokuapp.com/https://api.discogs.com/releases/" + releaseId;
			var imageURL = "https://api.discogs.com/release/" + releaseId[0] + -releaseId[1] + "/images" + "--user-agent RandomRelease/0.1 +http://adb.example.com";
			console.log('imageURL', imageURL);
			$.ajax({
				url: bandQueryURL,
				method: "GET"
			}).then(function (response) {
				console.log('2nd response', response);
				// const releaseImage = response.
				// $("#release-cover").append(releaseImage);
			});
		});

	});

	// function getServedReleaseImage(releaseId) {
	// 	var bandQueryURL = "https://api.discogs.com/release/" + releaseId;

	// 	$.ajax({
	// 		url: bandQueryURL,
	// 		method: "GET"
	// 	}).then(function () {
	// 		console.log('release id', response);
	// 	});
	// }
});