### Source

> Youtube: https://www.youtube.com/watch?v=VrQRa-afCAk&ab_channel=TheCodeholic

> this git: https://github.com/samedan/2403_lar_breeze_react_inertia
> original git : https://github.com/thecodeholic/laravel11-react-spa

### INSTALATION

## Create Laravel Project

> composer create-project laravel/laravel=10 laravel-react-inertia
> php artisan serve

## Laravel Breeze

> composer require laravel/breeze:1.29 --dev
> php artisan breeze:install
> postcss.config.js : php artisan breeze:install

## Dark Mode

> tailwind.config.js : darkMode:'class'
> /resources/views/app.blade.php : class="dark"

## Login:register Breeze

> /models/User.php: implements MustVerifyEmail

> Logs: /storage/logs/laravel.log

### DATABASE

## Models, Factories, Migrations

> php artisan make:model Project -fm
> php artisan make:model Task -fm

## Fake data

> TaskFactory, ProjectFactory
> DatabaseSeeder
> php artisan migrate:refresh --seed

### TINKER

> php artisan tinker
> \App\Models\Project::count()
> \App\Models\Taks::count()
> \App\Models\Taks::query()->paginate(5)->all()

### CONTROLLERS

> php artisan make:controller ProjectController --model=Project --requests --resource
> php artisan make:controller TaskController --model=Task --requests --resource

## Routes

> routes\web.php Route::resource('project', ProjectController::class);
> C: php artisan route:list

## Views

> HandleInertiaReqquesrs.php shares 'auth' to all the Components
> PP

## Limit/Filter data sent to FrontEnd

> php artisan make:resource TaskResource, ProjectResource, UserResource
> Project model -> ProjectController -> ProjectResource -> (props) on \resources\js\Pages\Project\Index.jsx
> in UserResources -> filter for data coming into ProjectResources

### ADD DATA

> /resources/js/Pages/Project/Create.jsx
> StoreProjectRequest.jsx -> Rules for the Form

## Image storage in public folder

> php artisan storage:link
