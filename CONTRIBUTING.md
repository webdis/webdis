# Contributing

So you want to contribute to Webis? Awesome! We aren't really that strict at ALL on contributions, and we try to make it as simple as possible to contribute.

## Some notes first

First, we'd like you to know that by helping Webdis, you're helping us build the absolute best Redis Web Administration Tool we can possible create.

## A note on the way Webdis' is frameworked.

Webdis is unique in multiple ways. For one, a custom framework was created specific to Webdis, however, we did use some Symfony Components, as well as some Laravel Components. We also used some ideas from both projects to make not only the development of Webdis easier, but also the usage.

A great example of this is that we use Laravel Blade components. This allows us to have a much easier view rendering than using Twig, or other templating engines. Not every Blade directive is added, and some are even customized specifically for us. 

Another example is how we load our configuration files. We've set up a completely custom way to load our configuration, that works exactly like Larave's configuration files, without using Laravel's own loader.

We've also created custom Route, View, and even Kernel files that allow us to use Symfony and Laravel components in our own way. A great way to see this in practice is to check out the App/Controllers folder. This is where we store all of our controllers, and EVERY route goes to a Controller. I'd recommend checking out DashboardController.php and Controller.php to see how we've made Webdis much easier to use.

## FAQ

- What branch do I use?

We have two branches, master, and dev. Master is where we have all the current code of Webdis, and dev is where we have the code we're working on. We recommend forking Webdis and then creating a branch from dev, preferably a branch with your username. This will make creating a Pull Request much easier.

- Is there anything you'd recommend I do before starting to work on the code?

I'd recommend checking out how the code works first, of course. It's a VERY bootstrapped style code, which we will for sure be making better at a later date, which will allow the code to function better.

But specifically, I'd recommend checking out the src/ folder. We've in a way made it similar to how laravel/framework is done. As an example, src/Foundation/Application is where every request is handled. In a way, it is our Kernel file. We've used Symfony/HttpKernel's HttpKernelInterface for this file, which gives us a very great way to structure this file.

- What if I want to work on the CSS/JavaScript?

This depends on what you are looking to do. If you're working on the service worker, which is responsible for allowing a user of Webdis to install it from the web, giving a way to use it standalone, and even features a page to show if you are offline, then you don't have to check out much other code, save for most likely the public folder, where all requests are pointing to, and is the root web folder.

If you are wanting to help restyle our code, All of the code for this is in our resources/ folder. I'd recommend checking out how [Blade Templates](https://laravel.com/docs/blade) work as well. Although, if you are going to adjust any templates, make sure you know what the variables do, by checking out the controller that uses it. This can be found out in the routes/web.php file.