const presence = new Presence({
	clientId: "821810069733376022",
});
presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "logo",
		startTimestamp: Math.floor(Date.now() / 1000),
	};
	// Landing Site - kryptonia.fr
	if (window.location.hostname === "kryptonia.fr") {
		presenceData.details = "Navigue sur le site";
		presenceData.state = document
			.querySelector("head > title")
			.textContent.replace("- Kryptonia", "");
	}
	// Forum - forum.kryptonia.fr
	if (window.location.hostname === "forum.kryptonia.fr") {
		presenceData.details = "Navigue sur le forum";
		if (window.location.pathname.startsWith("/threads/")) {
			presenceData.state = `📝${
				document.querySelector(
					"#top > div.p-body-header > div > div > div.p-title > h1 > span.label-append"
				)
					? ""
					: " "
			}${document
				.querySelector(
					"#top > div.p-body-header > div > div > div.p-title > h1"
				)
				.textContent.replace("Accepté(e)", "")
				.replace("Refusé(e)", "")
				.replace("Résolu(e)", "")
				.replace("Important", "")}`;
		} else if (window.location.pathname.startsWith("/members/")) {
			if (
				document.querySelector(
					"#top > div.p-body > div > div > div > div > div > div > div > div > div > div.memberHeader-main > div > h1 > span > span"
				)
			) {
				presenceData.state = `👤 ${
					document.querySelector(
						"#top > div.p-body > div > div > div > div > div > div > div > div > div > div.memberHeader-main > div > h1 > span > span"
					).textContent
				}`;
			} else {
				presenceData.state = document
					.querySelector("head > title")
					.textContent.replace("| Kryptonia", "");
			}
		} else if (window.location.pathname.includes("/forums/")) {
			presenceData.state = `📌 ${document
				.querySelector("head > title")
				.textContent.replace("| Kryptonia", "")}`;
		} else {
			presenceData.state = document
				.querySelector("head > title")
				.textContent.replace("Kryptonia", "")
				.replace("| ", "");
		}
	}
	presence.setActivity(presenceData);
});
