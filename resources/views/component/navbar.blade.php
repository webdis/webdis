<header class="bg-white shadow-sm dark:bg-gray-900 lg:static lg:overflow-y-visible" x-data="{ mobileMenu: false, dropMenu: false }">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
        <div class="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
          <div class="flex items-center flex-shrink-0">
            <a href="/dashboard" class="flex">
              <img class="block w-auto h-8" src="/img/webdis.svg" alt="Workflow">
              <p class="self-center ml-2 text-xl font-bold dark:text-gray-50">Webdis</p>
            </a>
          </div>
        </div>
        <div class="flex-1 min-w-0 md:px-8 lg:px-0 xl:col-span-6">
          <div class="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
            <div class="w-full">
              <form method="POST" action="/run">
                <label for="command" class="sr-only">Run Command</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none dark:bg-gray-900">
                    <!-- Heroicon name: solid/search -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400 dark:text-gray-200" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <input id="command" name="command" class="block w-full py-2 pl-10 pr-3 text-sm placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-900 dark:focus:ring-0 dark:focus:ring-transparent dark:text-gray-50 dark:focus:text-gray-300 dark:border-gray-900 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Run Command" type="text" required>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
          <!-- Mobile menu button -->
          <button type="button" class="inline-flex items-center justify-center p-2 -mx-2 text-gray-400 rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false">
            <span class="sr-only">Open menu</span>
            <!--
              Icon when menu is closed.
  
              Heroicon name: outline/menu
  
              Menu open: "hidden", Menu closed: "block"
            -->
            <svg class="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!--
              Icon when menu is open.
  
              Heroicon name: outline/x
  
              Menu open: "block", Menu closed: "hidden"
            -->
            <svg class="hidden w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
  
          <!-- Profile dropdown -->
          <div class="relative flex-shrink-0 ml-5">
            <div>
              <button type="button" class="flex bg-white rounded-full dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true" @click="dropMenu = ! dropMenu">
                <span class="sr-only">Open user menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 p-2 bg-green-600 rounded-full dark:bg-green-400 text-gray-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
  
            <!--
              Dropdown menu, show/hide based on menu state.
  
              Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            -->
            <div class="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1" x-show="dropMenu" @click.away="dropMenu = false" x-cloak>
              <!-- Active: "bg-gray-100", Not Active: "" -->
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
  
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>
              
              <a href="https://elijahcruz12.gitbook.io/webdis-documentation/" target="_blank" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200" role="menuitem" tabindex="-1" id="user-menu-item-1">Documentation</a>
              
              <button class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200" role="menuitem" tabindex="-1" id="darkmodetoggle">Dark Mode</button>
  
              <form action="/logout" method="POST">
                <button type="submit" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</button>
              </form>
            </div>
          </div>
  
        </div>
      </div>
    </div>
  
    <!-- Mobile menu, show/hide based on menu state. -->
    <nav class="lg:hidden" aria-label="Global">
      <div class="max-w-3xl px-2 pt-2 pb-3 mx-auto space-y-1 sm:px-4">
        <!-- Current: "bg-gray-100 text-gray-900", Default: "hover:bg-gray-50" -->
        <a href="#" aria-current="page" class="block px-3 py-2 text-base font-medium text-gray-900 bg-gray-100 rounded-md">Dashboard</a>
  
        <a href="#" class="block px-3 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-50">Run Command</a>
      </div>
      <div class="pt-4 pb-3 border-t border-gray-200">
        <div class="flex items-center max-w-3xl px-4 mx-auto sm:px-6">
          <div class="ml-3">
            <div class="text-base font-medium text-gray-800">Logged In To "tcp://{{ \Delight\Cookie\Session::get('host') }}:{{ \Delight\Cookie\Session::get('port') }}"</div>
            <div class="text-sm font-medium text-gray-500">@if(\Delight\Cookie\Session::get('has_password')) With Password @else Without Password @endif</div>
          </div>
        </div>
        <div class="max-w-3xl px-2 mx-auto mt-3 space-y-1 sm:px-4">
          <a href="#" class="block px-3 py-2 text-base font-medium text-gray-500 rounded-md hover:bg-gray-50 hover:text-gray-900">Settings</a>
  
          <form method="POST" action="/logout">
            <button href="#" class="block px-3 py-2 text-base font-medium text-gray-500 rounded-md hover:bg-gray-50 hover:text-gray-900">Sign out</button>
          </form>
        </div>
      </div>
    </nav>
  </header>
  