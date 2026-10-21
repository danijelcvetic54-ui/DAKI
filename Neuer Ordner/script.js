// DAKI Website – Links hier anpassen
const CONFIG = {
  discord: "https://discord.gg/6Rq4yJ9jK",
  twitch: "", // z.B. "daki"
  tiktok: ""  // z.B. "daki.chaso"
};

const discordLinks = document.querySelectorAll('a[href*="discord.gg/"]');
discordLinks.forEach(link => link.href = CONFIG.discord);

const twitchCard = document.getElementById("twitchCard");
const tiktokCard = document.getElementById("tiktokCard");

function setSocialLink(element, base, username, label) {
  if (!element) return;
  if (username && username.trim()) {
    element.href = base + encodeURIComponent(username.trim().replace(/^@/, ""));
    element.setAttribute("aria-label", label + " öffnen");
  } else {
    element.href = "https://www." + (label === "Twitch" ? "twitch.tv" : "tiktok.com");
    element.addEventListener("click", event => {
      event.preventDefault();
      alert("Trage zuerst deinen " + label + "-Namen in der Datei script.js ein.");
    });
  }
}
setSocialLink(twitchCard, "https://www.twitch.tv/", CONFIG.twitch, "Twitch");
setSocialLink(tiktokCard, "https://www.tiktok.com/@", CONFIG.tiktok, "TikTok");

// Musik: Lege deine eigene MP3-Datei neben index.html und nenne sie music.mp3.
const audio = document.getElementById("siteAudio");
const musicButton = document.getElementById("musicToggle");
const trackStatus = document.getElementById("trackStatus");
const equalizer = document.getElementById("equalizer");

if (musicButton && audio) {
  musicButton.addEventListener("click", async () => {
    if (audio.paused) {
      try {
        await audio.play();
        musicButton.innerHTML = 'Ⅱ <span>PAUSE MUSIC</span>';
        musicButton.setAttribute("aria-label", "Musik pausieren");
        trackStatus.textContent = "Jetzt läuft dein Soundtrack";
        equalizer?.classList.add("playing");
      } catch (error) {
        trackStatus.textContent = "MP3 fehlt oder konnte nicht geladen werden";
        alert("Die Musikdatei wurde nicht gefunden. Lege deine MP3 neben index.html und nenne sie genau music.mp3. Lade sie anschließend auch auf GitHub hoch.");
      }
    } else {
      audio.pause();
      musicButton.innerHTML = '▶ <span>PLAY MUSIC</span>';
      musicButton.setAttribute("aria-label", "Musik abspielen");
      trackStatus.textContent = "Pausiert · Drücke Play zum Fortsetzen";
      equalizer?.classList.remove("playing");
    }
  });
  audio.addEventListener("ended", () => {
    musicButton.innerHTML = '▶ <span>PLAY MUSIC</span>';
    equalizer?.classList.remove("playing");
  });
  audio.addEventListener("error", () => {
    if (trackStatus) trackStatus.textContent = "Lege music.mp3 in den Website-Ordner";
  });
}

// Mobiles Menü
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
    menuToggle.textContent = open ? "×" : "☰";
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  }));
}
