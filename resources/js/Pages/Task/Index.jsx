import { Head, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "../../constants";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TasksTable from "./TasksTables";

export default function Index({ auth, tasks, queryParams = null }) {
    queryParams = queryParams || {};

    // SEARCHINg & SORTING

    const searchFieldChanged = (name, value) => {
        if (value) {
            console.log(queryParams);
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        console.log(queryParams);
        router.get(route("task.index"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;
        searchFieldChanged(name, e.target.value);
    };

    // SORTING
    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            // already set 'asc' or 'desc'
            console.log("Already set");
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            // NOT set 'asc' or 'desc
            console.log("note set");
            queryParams.sort_field = name; // name, status, create_date etc
            queryParams.sort_direction = "asc";
        }
        console.log(queryParams);
        router.get(route("task.index"), queryParams);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Tasks
                    </h2>
                    <Link
                        href={route("task.create")}
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                    >
                        Add new
                    </Link>
                </div>
            }
        >
            <Head title="Tasks" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* <pre>{JSON.stringify(tasks, undefined, 2)}</pre> */}
                            <TasksTable
                                tasks={tasks}
                                queryParams={queryParams}
                                // success={success}
                            />

                            {/* Pagination */}
                            {/* <Pagination links={tasks.meta.links} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
