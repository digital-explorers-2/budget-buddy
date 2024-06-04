// public/theme-toggle.js
;(function () {
  function setTheme(theme) {
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(theme)
    localStorage.setItem("theme", theme)
  }

  function toggleTheme() {
    const currentTheme = localStorage.getItem("theme") || "light"
    const newTheme = currentTheme === "light" ? "dark" : "light"
    setTheme(newTheme)
  }

  // Set theme on page load based on local storage
  document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "light"
    setTheme(savedTheme)
  })

  // Add event listener to the toggle button
  document.getElementById("theme-toggle").addEventListener("click", toggleTheme)
})()
