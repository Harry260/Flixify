function loadResult(query) {
  if (!query) {
    toastMsg("Please provide you search query!");
    return;
  }
  $(".secondary-search, .search-in").val(query);
  viewer("loading");
  const LIMIT = 500;
  fetch(`/api?query=${query}&limit=${LIMIT}`)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);

      const resultItems = $(".result-items");
      if (response.success) {
        var html = "";
        response.torrents.forEach((item) => {
          html += `
					<a href="${item.magnet}" target="_blank">
						<div class="item">
							<div class="title">
								<h1>${item.title}</h1>
								<h3 class="extra-info">${item.size} · ${getDateFormatter(item.time)}</h3>
							</div>
						</div>
					</a>
               `;
        });

        resultItems.html(html);
        resultItems.scrollTop();
        viewer("end_loading");
      } else {
        errorGIveOut();
      }
    })
    .catch((e = console.log));

  function getDateFormatter(dateString) {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  function errorGIveOut() {
    toastMsg("Sorry! Couldn't get any results", true);
    viewer(false);
  }
}

$(".card").on("click", (e) => {
  var x = $(e.currentTarget).attr("title");
  loadResult(x);
});
