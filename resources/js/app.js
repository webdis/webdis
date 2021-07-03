console.log('Nothing to see here :)');

window.addEventListener("load", () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/servicesworker.js");
    }
  });
  
  // Dark mode capability
var theme = window.localStorage.getItem('theme');
if(theme == null) {
  if(windows.matchMedia('(prefers-color-scheme: dark)').matches) {
    window.localStorage.setItem('theme', 'dark');
  }
  else {
    window.localStorage.setItem('theme', 'light');
  }
}

  if (localStorage.theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

var darkModeButton = document.getElementById('darkmodetoggle');

if(darkModeButton != null) {
  if(theme == 'light') {
    darkModeButton.textContent('Enable Dark Mode');
  }
  else {
    darkModeButton.textContent('Disable Dark Mode');
  }
}

function darkModeToggle () {
 if(clicked) {
   if(theme == 'light') {
    window.localStorage.setItem('theme', 'dark');
   }
   else
   {
    window.localStorage.setItem('theme', 'light');
   }
 }
}