import TorrentSearchApi from "torrent-search-api";

try {
	TorrentSearchApi.enableProvider("ThePirateBay");
} catch (error) {}

async function getInfo(query, limit = 20) {
	return TorrentSearchApi.search(query, "All", limit)
		.then(async (torrents) => {
			// Return combined data

			if (torrents[0].title === "No results returned") return false;
			const data = {
				success: true,
				query,
				torrents,
			};
			return data;
		})
		.catch((e) => {
			return false;
		});
}

export default getInfo;
