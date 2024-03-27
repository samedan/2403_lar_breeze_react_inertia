import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/16/solid";

export default function TableHeading({
    sort_field = null,
    sort_direction = null,
    sortChanged = () => {},
    name,
    sortable = true,
    children,
}) {
    return (
        <th className="px-3 py-3" onClick={(e) => sortChanged(name)}>
            <div className=" flex items-center justify-between gap-1 cursor-pointer">
                {children}
                {sortable && (
                    <div>
                        <ChevronUpIcon
                            className={
                                "w-4 " +
                                (sort_field === name && sort_direction === "asc"
                                    ? " text-white"
                                    : "")
                            }
                        />
                        <ChevronDownIcon
                            className={
                                "-4 -mt-2 " +
                                (sort_field === name &&
                                sort_direction === "desc"
                                    ? " text-white"
                                    : "")
                            }
                        />
                    </div>
                )}
            </div>
        </th>
    );
}
