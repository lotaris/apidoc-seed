var shiftWindow = function () {
	scrollBy(0, -65)
};
window.addEventListener("hashchange", shiftWindow);
function load() {
	if (window.location.hash) shiftWindow();
}