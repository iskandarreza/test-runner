/* It's a self-invoking function that adds a style tag to the head of the document that inverts night mode to dark mode (or vice-versa). */
// You can even save this as a bookmarklet!
!(function (d) {
    d.head.appendChild(d.createElement("style")).innerText =
      "html,img,video{-webkit-filter:invert(1)hue-rotate(180deg);filter:invert(1)hue-rotate(180deg)}body{background:#000}";
  })(document);  