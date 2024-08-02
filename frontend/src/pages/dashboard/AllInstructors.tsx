import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllInstructorDetails } from "../../services/operations/adminAPI";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";

const AllInstructors = () => {
  //@ts-ignore
  const { token } = useSelector((state) => state.auth);
  const [allInstructors, setAllInstructors] = useState([]);

  const columns = [
    {
      key: "firstName",
      label: "FIRST NAME",
    },
    {
      key: "lastName",
      label: "LAST NAME",
    },
    {
      key: "email",
      label: "Email",
    },
  ];

  useEffect(() => {
    const fetchAllInstructor = async () => {
      const { allInstructorsDetails } = await getAllInstructorDetails(token);
      setAllInstructors(allInstructorsDetails);
    };

    fetchAllInstructor();
  }, [token]);
  return (
    <div className="p-10">
      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={allInstructors}>
          {(item) => (
            //@ts-ignore
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllInstructors;
