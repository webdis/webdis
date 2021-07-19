console.log('Nothing to see here :)');

var theme = window.localStorage.getItem('theme');

if(theme == null) {
  if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
    console.log('theme set to dark');
    window.localStorage.setItem('theme', 'dark');
    document.cookie = "webdis_theme=dark; path=/";

  }
  else {
    window.localStorage.setItem('theme', 'light');
    console.log('theme set to light');
    document.cookie = "username=light";
    document.cookie = "webdis_theme=light; path=/";
  }
}
  
  // Dark mode capability


var darkModeButton = document.getElementById('darkmodetoggle');

if(darkModeButton != null) {
  if(theme == 'light') {
    darkModeButton.textContent = 'Enable Dark Mode';
    console.log('It\'s to bright!');
  }
  else {
    darkModeButton.textContent = 'Disable Dark Mode';
    console.log('Dark Mode Activate!');
  }

  darkModeButton.onclick = function() {
  
    darkModeBtn = document.getElementById('darkmodetoggle');
  
    var toggleTheme = window.localStorage.getItem('theme');  
  
     if(toggleTheme == 'light') {
      window.localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
      document.cookie = "webdis_theme=dark; path=/";
      darkModeBtn.textContent = 'Disable Dark Mode';
      console.log('Dark Mode Activate!');
     }
     else
     {
      window.localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
      document.cookie = "webdis_theme=light; path=/";
      darkModeBtn.textContent = 'Enable Dark Mode';
      console.log('It\'s to bright!');
     }
    
  }
}