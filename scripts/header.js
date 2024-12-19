function hydrateHeader() {
  document.addEventListener("DOMContentHasLoaded", () => {
    const header = document.getElementById("nav-container");
    fetch("../components/header.html")
      .then((response) => {
        if (!response.okay) {
          throw new Error("Failed to load header");
        }
        return response.text();
      })
      .then((html) => {
        header.innerHTML = html;
      })
      .catch((error) => {
        console.log("Header failed to load", error);
      });
  });
}

export default hydrateHeader;
