<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::query();

        // SORTING
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", 'desc');
        
        // queryParams comes from /resources/js/Pages/Task/Index.jsx
        if(request("name")) {
            $query->where("name","like","%".request("name")."%");
        }
        if(request('status')){
            $query->where('status', request('status'));
        }


        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);
        return Inertia::render("Task/Index", [
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ? :null, // if NOT an empty array, if empty [] then Index.jsx transforms [] into {}
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
    }
}
