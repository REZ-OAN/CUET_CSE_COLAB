import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import axios from "axios";
const columns = {
    post: [
        { id: "postId", label: "PostID", minWidth: 170 },
        { id: "content", label: "Content", minWidth: 100 },
        {
            id: "authorId",
            label: "AuthorId",
            minWidth: 170,
            align: "center",
        },
        {
            id: "authorName",
            label: "Author",
            minWidth: 170,
            align: "center",
        },
        {
            id: "currStatus",
            label: "Current Status",
            minWidth: 170,
            align: "center",
        },
        {
            id: "status",
            label: "Status",
            minWidth: 170,
            align: "center",
        },
    ],
    user: [
        {
            id: "authorId",
            label: "AuthorId",
            minWidth: 170,
            align: "center",
        },
        {
            id: "authorName",
            label: "Author",
            minWidth: 170,
            align: "center",
        },
        {
            id: "studentId",
            label: "StudentId",
            minWidth: "440px",
        },
        {
            id: "currStatus",
            label: "Current Status",
            minWidth: 170,
            align: "center",
        },
        {
            id: "status",
            label: "Status",
            minWidth: 170,
            align: "center",
        },
    ],
    achievement: [
        { id: "achievementId", label: "AchievementID", minWidth: 170 },
        { id: "content", label: "Content", minWidth: 100 },
        {
            id: "authorId",
            label: "AuthorId",
            minWidth: 170,
            align: "center",
        },
        {
            id: "authorName",
            label: "Author",
            minWidth: 170,
            align: "center",
        },
        {
            id: "currStatus",
            label: "Current Status",
            minWidth: 170,
            align: "center",
        },
        {
            id: "status",
            label: "Status",
            minWidth: 170,
            align: "center",
        },
    ],
};

export default function TableComp({ who, rows }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns[who].map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ maxWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows &&
                            rows
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row) => {
                                    const inxid = row.authorId;
                                    const postId = row.postId;
                                    const achievementId = row.achievementId;
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.authorId}
                                        >
                                            {columns[who].map((column) => {
                                                const value = row[column.id];
                                                if (column.id === "studentId") {
                                                    return (
                                                        <TableCell
                                                            key={column.id}
                                                            align={column.align}
                                                            width="440px"
                                                            height="280px"
                                                        >
                                                            <img
                                                                src={value}
                                                                height="280px"
                                                                width="440px"
                                                            />
                                                        </TableCell>
                                                    );
                                                }
                                                if (column.id === "status") {
                                                    if (who === "user") {
                                                        return (
                                                            <TableCell
                                                                key={column.id}
                                                                align={
                                                                    column.align
                                                                }
                                                            >
                                                                <Button
                                                                    variant="text"
                                                                    onClick={async (
                                                                        e
                                                                    ) => {
                                                                        e.preventDefault();
                                                                        const {
                                                                            data,
                                                                        } =
                                                                            await axios.put(
                                                                                "/api/v1/admin/updateuserstatus",
                                                                                {
                                                                                    id: inxid,
                                                                                    status: "notVerified",
                                                                                }
                                                                            );
                                                                        window.location.reload();
                                                                    }}
                                                                >
                                                                    {
                                                                        "notVerified"
                                                                    }
                                                                </Button>
                                                                <Button
                                                                    variant="text"
                                                                    onClick={async (
                                                                        e
                                                                    ) => {
                                                                        e.preventDefault();
                                                                        const {
                                                                            data,
                                                                        } =
                                                                            await axios.put(
                                                                                "/api/v1/admin/updateuserstatus",
                                                                                {
                                                                                    id: inxid,
                                                                                    status: "admin",
                                                                                }
                                                                            );
                                                                        window.location.reload();
                                                                    }}
                                                                >
                                                                    {"admin"}
                                                                </Button>
                                                                <Button
                                                                    variant="text"
                                                                    onClick={async (
                                                                        e
                                                                    ) => {
                                                                        e.preventDefault();
                                                                        const {
                                                                            data,
                                                                        } =
                                                                            await axios.put(
                                                                                "/api/v1/admin/updateuserstatus",
                                                                                {
                                                                                    id: inxid,
                                                                                    status: "alumni",
                                                                                }
                                                                            );
                                                                        window.location.reload();
                                                                    }}
                                                                >
                                                                    {"alumni"}
                                                                </Button>
                                                                <Button
                                                                    variant="text"
                                                                    onClick={async (
                                                                        e
                                                                    ) => {
                                                                        e.preventDefault();
                                                                        const {
                                                                            data,
                                                                        } =
                                                                            await axios.put(
                                                                                "/api/v1/admin/updateuserstatus",
                                                                                {
                                                                                    id: inxid,
                                                                                    status: "student",
                                                                                }
                                                                            );
                                                                        window.location.reload();
                                                                    }}
                                                                >
                                                                    {"student"}
                                                                </Button>
                                                            </TableCell>
                                                        );
                                                    } else {
                                                        return (
                                                            <TableCell
                                                                key={column.id}
                                                                align={
                                                                    column.align
                                                                }
                                                            >
                                                                <Button
                                                                    variant="text"
                                                                    onClick={async (
                                                                        e
                                                                    ) => {
                                                                        const link =
                                                                            who ===
                                                                            "post"
                                                                                ? "/api/v1/adminupdatepoststatus"
                                                                                : "/api/v1/adminupdateachievementstatus";
                                                                        const bodyId =
                                                                            who ===
                                                                            "post"
                                                                                ? postId
                                                                                : achievementId;
                                                                        e.preventDefault();
                                                                        const {
                                                                            data,
                                                                        } =
                                                                            await axios.put(
                                                                                `${link}`,
                                                                                {
                                                                                    id: bodyId,
                                                                                    status: "processing",
                                                                                }
                                                                            );
                                                                        window.location.reload();
                                                                    }}
                                                                >
                                                                    {
                                                                        "processing"
                                                                    }
                                                                </Button>
                                                                <Button
                                                                    variant="text"
                                                                    onClick={async (
                                                                        e
                                                                    ) => {
                                                                        e.preventDefault();
                                                                        const link =
                                                                            who ===
                                                                            "post"
                                                                                ? "/api/v1/adminupdatepoststatus"
                                                                                : "/api/v1/adminupdateachievementstatus";
                                                                        const bodyId =
                                                                            who ===
                                                                            "post"
                                                                                ? postId
                                                                                : achievementId;
                                                                        const {
                                                                            data,
                                                                        } =
                                                                            await axios.put(
                                                                                `${link}`,
                                                                                {
                                                                                    id: bodyId,
                                                                                    status: "approved",
                                                                                }
                                                                            );
                                                                        window.location.reload();
                                                                    }}
                                                                >
                                                                    {"approved"}
                                                                </Button>
                                                            </TableCell>
                                                        );
                                                    }
                                                }
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                    >
                                                        {value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                rowsPerPageOptions={[5, 10]}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
