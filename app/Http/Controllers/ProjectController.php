<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Project::query();

        // SORTING
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", 'desc');
        
        // queryParams comes from /resources/js/Pages/Project/Index.jsx
        if(request("name")) {
            $query->where("name","like","%".request("name")."%");
        }
        if(request('status')){
            $query->where('status', request('status'));
        }


        $projects = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);
        return Inertia::render("Project/Index", [
            'projects' => ProjectResource::collection($projects),
            'queryParams' => request()->query() ? :null, // if NOT an empty array, if empty [] then Index.jsx transforms [] into {}
            'success' => session('success')  // message sent by PostProject
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Project/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        $project = Project::create($data);
        return to_route('project.index')->with('success', 'Project created successfully');
        // dd($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
