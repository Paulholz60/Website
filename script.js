var NAVBAR_OFFSET_PERCENT = 40; // percent of viewport height

UpdateBackground(); // Initial call to set background positions on page load

function openTab(evt, tabName) {
  // Scroll to the first element of the tab section with offset for sticky navbar
  var elements = document.getElementsByName(tabName);
  if (elements.length <= 0) return;
  var rect = elements[0].getBoundingClientRect();
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  var offsetPx = window.innerHeight * ((tabName === 'HomeTab' ? 100 : NAVBAR_OFFSET_PERCENT) / 100);
  var targetY = rect.top + scrollTop - offsetPx;
  window.scrollTo({ top: targetY, behavior: 'smooth' });
}
function UpdateBackground() {
  var background = this.document.getElementsByClassName("backgroundVersions")[0];
  var Y = 100 + window.scrollY * -0.1;
  background.style.top = Y + '%';

  background = this.document.getElementsByClassName("backgroundApplications")[0];
  var Y = 250 + window.scrollY * -0.1;
  background.style.top = Y + '%';

  background = this.document.getElementsByClassName("backgroundStats")[0];
  var Y = -150 + window.scrollY * 0.05;
  background.style.backgroundPositionY = Y + '%';

  background = this.document.getElementsByClassName("backgroundHome")[0];
  if (window.scrollY * 0.1 > 100)
  {   
    background.style.backgroundPositionY = '600%';
    return;
  }

  // Calculate zoom factor based on scroll position
  var Y = 50 + window.scrollY * 0.05;
  background.style.backgroundPositionY = Y + '%';
}

window.addEventListener('scroll', UpdateBackground);
window.addEventListener('scroll', function() {
  // --- Active tab update on scroll ---
  var offsetPx = window.innerHeight * (NAVBAR_OFFSET_PERCENT / 100);
  var tabSections = [
    {name: 'HomeTab', buttonText: 'Home'},
    {name: 'VersionsTab', buttonText: 'Versions'},
    {name: 'ApplicationsTab', buttonText: 'Applications'},
    {name: 'StatsTab', buttonText: 'Your Stats'}
  ];
  var tablinks = document.getElementsByClassName('tablink');
  for (var i = 0; i < tabSections.length; i++) {
    var section = document.getElementsByName(tabSections[i].name)[0];
    if (!section) continue;
    var rect = section.getBoundingClientRect();
    if (rect.bottom <= offsetPx + 10) continue; // Skip if we've scrolled past the bottom of the section
    if (rect.top > offsetPx + 10) continue; // Skip if section is not yet reached
    for (var j = 0; j < tablinks.length; j++) {
      tablinks[j].classList.remove('active');
      if (tablinks[j].textContent.trim() === tabSections[i].buttonText) {
        tablinks[j].classList.add('active');
      }
    }
  }
});