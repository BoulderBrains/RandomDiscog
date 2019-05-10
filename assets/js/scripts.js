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

				// Storing the information I want off the response
				const artistName = release.basic_information.artists[0].name;
				const releaseName = release.basic_information.title;
				const recordLabel = release.basic_information.labels[0].name;

				// console.log("Artist name", release.basic_information.artists[0].name);
				// console.log("Release title", release.basic_information.title);
				// console.log("Record Label", release.basic_information.labels[0].name);

				// Appending the release information to the front end
				$("#artist-name").append(artistName);
				$("#release-name").append(releaseName);
				$("#record-label").append(recordLabel);
		});
	});
});