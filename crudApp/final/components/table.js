import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { getUser } from "../lib/helper";
import { useQuery } from 'react-query';

export default function Table(){

    const { isLoading, isError, data, error } = useQuery('users', getUser)
    console.log(data)

    if(isLoading) return <div>Employee is Loading...</div>;
    if(isError) return <div>Got Error {error}</div>


    return (
        <table className="min-w-full table-auto">
            <thead>
                <tr className="bg-gray-800">
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Name</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Email</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Salary</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Birthday</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Status</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Actions</span>
                    </th>
                </tr>
            </thead>
            <tbody className="bg-gray-200">
                    {
                        data.map((obj, i) => <Tr {...obj} key={i} />)
                    }
            </tbody>
        </table>
    )
}

function Tr({id, name, avatar, email, salary, date, status }){
    return (
        <tr className="bg-gray-50 text-center">
        <td className="px-16 py-2 flex flex-row items-center">
            <img src={avatar || '#'} alt="" className="h-8 w-8 rounded-full object-cover" />
            <span className="text-center ml-2 font-semibold">{name || "Unknown"}</span>
        </td>
        <td className="px-16 py-2">
            <span>{email || "Unknown"}</span>
        </td>
        <td className="px-16 py-2">
            <span>{salary || "Unknown"}</span>
        </td>
        <td className="px-16 py-2">
            <span>{date || "Unknown"}</span>
        </td>
        <td className="px-16 py-2">
            <button className="cursor"><span className={`${status == "Active" ? 'bg-green-500' : 'bg-rose-500'} text-white px-5 py-1 rounded-full`}>{status || "Unknown"}</span></button>
        </td>
        <td className="px-16 py-2 flex justify-around gap-5">
            <button className="cursor"><BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit></button>
            <button className="cursor"><BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt></button>
        </td>
    </tr>
    )
}