//Fix for chrome address bar Issue

function toastMsg(msg, error = false, to = 3000) {
	var toast = document.createElement("div");
	toast.innerHTML = msg;
	toast.classList.add("bottom-toast");

	if (error) {
		toast.classList.add("toast-error");
		viewer("end_loading");
	}

	toast = $(toast);
	$("body").append(toast);

	setTimeout(function () {
		toast.addClass("animate__animated animate__slideOutDown");
	}, to);
}

function viewer(on = true) {
	const logo = $(".logo-section");
	const v = $(".result-overlay");
	const ri = $(".result-items");
	const ldr = $(".loader");

	if (on === true) {
		//
		v.fadeIn();
		logo.fadeOut();
	} else if (on === "loading") {
		ri.fadeOut();
		ldr.fadeIn();

		//
		v.fadeIn();
		logo.fadeOut();
	} else if (on === "end_loading") {
		ri.fadeIn();
		ldr.fadeOut();

		//
		v.fadeIn();
		logo.fadeOut();
	} else {
		v.fadeOut();
		logo.fadeIn();
	}
}

$(".back").on("click", () => viewer(false));

$(".secondary-search, .search-in").on("keydown", function (event) {
	if (event.keyCode === 13) {
		const query = $(this).val();
		viewer("loading");
		loadResult(query);
	}
});

$(".list-swap").on("click", () => {
	$(".list-swap").toggleClass("list-enabled");
	$(".result-items").toggleClass("list-arr");
});

if (!localStorage.intro) {
	intro();
}

function intro(state = 1) {
	const introOverlay = $(".intro");
	localStorage.setItem("intro", true);
	if (state === 2) {
		$(".slide-1").hide();
		$(".slide-2").show();
		introOverlay.fadeIn();
	} else if (state === 1) {
		$(".slide-2").hide();
		$(".slide-1").show();
		introOverlay.fadeIn().css("display", "flex");
	} else {
		introOverlay.fadeOut();
	}
}

function setPosters() {
	var posters = [
		{
			name: "Wednesday",
			file: "wednesday.jpeg",
		},
		{
			name: "God Of War",
			file: "gow.jpg",
		},
		{
			name: "Stranger Things",
			file: "st.jpg",
		},
		{
			name: "GTA V",
			file: "gta.png",
		},
		{
			name: "Demon Slayer",
			file: "ds.jpg",
		},
	];

	function getRandom(arr, n = 3) {
		var result = new Array(n),
			len = arr.length,
			taken = new Array(len);
		if (n > len)
			throw new RangeError(
				"getRandom: more elements taken than available"
			);
		while (n--) {
			var x = Math.floor(Math.random() * len);
			result[n] = arr[x in taken ? taken[x] : x];
			taken[x] = --len in taken ? taken[len] : len;
		}
		return result;
	}

	const newArray = getRandom(posters);
	console.log(newArray);
	newArray.forEach((e, i) => {
		$(`.c${i + 1}`)
			.css("background-image", `url(./assets/posters/${e.file})`)
			.attr("title", e.name);
	});
}

setPosters();
