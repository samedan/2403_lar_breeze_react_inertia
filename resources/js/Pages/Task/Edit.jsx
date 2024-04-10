import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ auth, task, projects, users }) {
    console.log(users);

    // const task = taskData.data;
    // Inertia Form stuff
    // console.log(task.data);
    console.log(task.name);
    const { data, setData, post, processing, errors, reset } = useForm({
        image: task.image || "",
        // image_path: task.image_path || "",
        name: task.name || "",
        status: task.status || "",
        description: task.description || "",
        due_date: task.due_date || "",
        project_id: task.project_id || "",
        priority: task.priority || "",
        assigned_user_id: task.assigned_user_id || "",
        _method: "PUT",
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("task.update", task.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Edit Task "{task.name}"{" "}
                    </h2>
                </div>
            }
        >
            <Head title="Tasks" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        {/* <div className="p-6 text-gray-900 dark:text-gray-100"> */}
                        <pre>{JSON.stringify(task, undefined, 2)}</pre>
                        <form
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                        >
                            {/* <pre className="text-white">
                                {JSON.stringify(data, undefined, 2)}
                            </pre> */}
                            {/* Task Project ID */}
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="task_project_id"
                                    value="Project"
                                />
                                {data.project_id}
                                <SelectInput
                                    id="project_id"
                                    name="task_project_id"
                                    value={data.project_id}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("project_id", e.target.value)
                                    }
                                >
                                    <option value="">Select Project:</option>
                                    {projects.data.map((project) => (
                                        <option
                                            value={project.id}
                                            key={project.id}
                                        >
                                            {project.name}
                                        </option>
                                    ))}
                                </SelectInput>
                                <InputError
                                    message={errors.assigned_user_id}
                                    className="mt-2"
                                />
                            </div>
                            {/* IMAGE */}
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="task_image_path"
                                    value="Task Image"
                                />
                                {task.image_path && (
                                    <img
                                        src={task.image_path}
                                        className="w-64"
                                    />
                                )}

                                <TextInput
                                    id="task_image_path"
                                    type="file"
                                    name="image"
                                    // value={image}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("image", e.target.files[0])
                                    }
                                />
                                <InputError
                                    message={errors.image}
                                    className="mt-2"
                                />
                            </div>
                            {/* NAME */}
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="task_name"
                                    value="Task Name"
                                />
                                <TextInput
                                    id="task_name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>
                            {/* DESCRIPTION */}
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="task_description"
                                    value="Description"
                                />
                                <TextAreaInput
                                    id="task_description"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    // isFocused={true}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.description}
                                    className="mt-2"
                                />
                            </div>
                            {/* DUE DATE */}
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="task_due_date"
                                    value="Task Deadline"
                                />
                                <TextInput
                                    id="task_due_date"
                                    type="date"
                                    name="due_date"
                                    value={task.due_date}
                                    className="mt-1 block w-full"
                                    // isFocused={true}
                                    onChange={(e) =>
                                        setData("due_date", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.due_date}
                                    className="mt-2"
                                />
                            </div>
                            {/* STATUS */}
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="task_status"
                                    value="status"
                                />
                                <SelectInput
                                    id="task_status"
                                    name="status"
                                    className="mt-1 block w-full"
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                >
                                    <option value="">Select status:</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">
                                        In Progress
                                    </option>
                                    <option value="completed">Completed</option>
                                </SelectInput>
                                <InputError
                                    message={errors.status}
                                    className="mt-2"
                                />
                            </div>
                            {/* PRIORITY */}
                            <div>
                                <InputLabel
                                    htmlFor="task_priority"
                                    value="Priority"
                                />
                                <SelectInput
                                    id="task_priority"
                                    name="priority"
                                    value={data.priority}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("priority", e.target.value)
                                    }
                                >
                                    <option value="">Select priority:</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </SelectInput>
                                <InputError
                                    message={errors.priority}
                                    className="mt-2"
                                />
                            </div>
                            {/* Assigned User */}
                            <div>
                                <InputLabel
                                    htmlFor="task_assigned_user"
                                    value="Assigned User"
                                />
                                <SelectInput
                                    id="task_assigned_user"
                                    name="assigned_user_id"
                                    value={data.assigned_user_id}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData(
                                            "assigned_user_id",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">Select User:</option>
                                    {users.data.map((user) => (
                                        <option value={user.id} key={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </SelectInput>
                                <InputError
                                    message={errors.assigned_user_id}
                                    className="mt-2"
                                />
                            </div>
                            {/* <buttons> */}
                            <div className="mt-4 text-right">
                                <Link
                                    href={route("task.index")}
                                    className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2 "
                                >
                                    Cancel
                                </Link>
                                <button
                                    className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                                    style={{ lineHeight: "normal" }}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
