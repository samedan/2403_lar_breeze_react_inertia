import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ auth, task }) {
    // console.log(taskData);

    // const task = taskData.data;
    // Inertia Form stuff
    console.log(task.data);
    console.log(task.data.name);
    const { data, setData, post, processing, errors, reset } = useForm({
        image: task.data.image || "",
        // image_path: task.image_path || "",
        name: task.data.name || "",
        status: task.data.status || "",
        description: task.data.description || "",
        due_date: task.data.due_date || "",
        _method: "PUT",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("task.data");
        console.log(task.data);
        console.log(task.data.id);
        console.log(data);

        post(route("task.update", task.data.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Edit Task "{task.data.name}"{" "}
                    </h2>
                </div>
            }
        >
            <Head title="Tasks" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        {/* <div className="p-6 text-gray-900 dark:text-gray-100"> */}
                        {/* <pre>{JSON.stringify(tasks, undefined, 2)}</pre> */}
                        <form
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                        >
                            <pre className="text-white">
                                {JSON.stringify(data, undefined, 2)}
                            </pre>
                            {/* IMAGE */}
                            {task.data.image_path && (
                                <div className="mb-4">
                                    <img
                                        src={task.data.image_path}
                                        className="w-64"
                                    />
                                </div>
                            )}
                            <div>
                                <InputLabel
                                    htmlFor="task_image_path"
                                    value="Task Image"
                                />

                                <TextInput
                                    id="task_image_path"
                                    type="file"
                                    name="image"
                                    // value={data.image}
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
                            <div>
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
                            <div>
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
                            <div>
                                <InputLabel
                                    htmlFor="task_due_date"
                                    value="Task Deadline"
                                />
                                <TextInput
                                    id="task_due_date"
                                    type="date"
                                    name="due_date"
                                    value={data.due_date}
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
                            <div>
                                <InputLabel
                                    htmlFor="task_status"
                                    value="status"
                                />
                                <SelectInput
                                    id="task_status"
                                    name="status"
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                    value={data.status}
                                >
                                    <option value="">Select status:</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">
                                        In Progress
                                    </option>
                                    <option value="completed">Completed</option>
                                </SelectInput>
                                <InputError
                                    message={errors.task_status}
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
