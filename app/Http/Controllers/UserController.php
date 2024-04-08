<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserCrudResource;
// use App\Http\Resources\UserResource;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();

        // SORTING
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", 'desc');
        
        // queryParams comes from /resources/js/Pages/User/Index.jsx
        if(request("name")) {
            $query->where("name","like","%".request("name")."%");
        }
        if(request("email")) {
            $query->where("email","like","%".request("email")."%");
        }
       

        $users = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);
        return Inertia::render("User/Index", [
            'users' => UserCrudResource::collection($users),
            'queryParams' => request()->query() ? :null, // if NOT an empty array, if empty [] then Index.jsx transforms [] into {}
            'success' => session('success')  // message sent by PostUser
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('User/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['email_verified_at'] = time();
        $data['password'] = bcrypt($data['password']);
        User::create($data);

        return to_route('user.index')
            ->with('success', 'User was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    
    public function edit(User $user)
    {
        return inertia('User/Edit', ['user'=> new UserCrudResource($user)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        $data['email_verified_at'] = time();
        $password = $data['password'] ?? null;
        if($password) {
            $data['password'] = bcrypt($password);
        } else {
            unset($data['password']);
        }
        $user->update($data);

        return to_route('user.index')->with('success',"User \"$user->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
