$(document).ready(function() {
	var phaseOne = ['Iron Man','The Incredible Hulk','Iron Man 2','Thor','Captain America: The First Avenger','The Avengers'];
	var phaseTwo = ['Iron Man 3','Thor: The Dark World','Captain America: The Winter Solider','Guardians of the Galaxy','Avengers: Age of Ultron','Ant-Man'];

	dropDowns();

	function dropDowns() {

		for (i = 0; i < phaseOne.length; i++) {
			var movieDropdown = $('<li><a>');
			var movieLink = $('<a>');
			movieLink.attr('href',"")
			movieDropdown.text(phaseOne[i]);
			movieDropdown.append(movieLink);
			$('#pOne').append(movieDropdown);
		}
	}
});