import { Button, Tag, Tooltip } from "antd";
import React, { memo } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import CurriculumForm from "../../components/forms/CurriculumForm/CurriculumForm";
import {
    deleteCurriculumsAction,
    getCurriculumAction,
    getCurriculumsAction,
} from "../../redux/actions/CurriculumAction";
import { GET_CURRICULUMN } from "../../redux/types/CurriculumType";
import { LOAD_MODAL } from "../../redux/types/ModalHOCType";
import { LOAD_COMPONENT } from "../../redux/types/PageType";

const Curriculum = memo(() => {
    let { curriculums } = useSelector((a) => a.CurriculumReducer);
    let { selectedRowKeys } = useSelector((a) => a.PageReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurriculumsAction());
        dispatch({
            type: LOAD_COMPONENT,
            data: {
                title: "Curriculums",
                columns: [
                    {
                        title: "Name",
                        dataIndex: "name",
                    },
                    {
                        title: "Description",
                        dataIndex: "description",
                    },
                    {
                        title: "Type",
                        dataIndex: "type",
                        render: (_, item, index) => {
                            switch (item.type) {
                                case "new":
                                    return (
                                        <Tag color="#87d068">
                                            {item.type.toUpperCase()}
                                        </Tag>
                                    );
                                    break;
                                case "pro":
                                    return (
                                        <Tag color="#f50">
                                            {item.type.toUpperCase()}
                                        </Tag>
                                    );
                                    break;
                                case "free":
                                    return (
                                        <Tag color="#108ee9">
                                            {item.type.toUpperCase()}
                                        </Tag>
                                    );
                                    break;

                                default:
                                    return;
                                    break;
                            }
                        },
                    },
                    {
                        title: "Price",
                        dataIndex: "price",
                    },
                    {
                        title: "",
                        dataIndex: "",
                        align: "right",
                        fixed: "right",
                        width: "200px",
                        render: (_, item, index) => {
                            return (
                                <React.Fragment>
                                    <Tooltip
                                        placement="top"
                                        title="Level"
                                        key={index + "3"}
                                    >
                                        <Link to={`/curriculum/${item.id}`}>
                                            <button className="btn btn-primary ms-2">
                                                <i className="bx bx-list-ol"></i>
                                            </button>
                                        </Link>
                                    </Tooltip>
                                    <Tooltip
                                        placement="top"
                                        title="Edit"
                                        key={index + "1"}
                                    >
                                        <button
                                            className="btn btn-warning ms-2"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            onClick={() => {
                                                dispatch({
                                                    type: GET_CURRICULUMN,
                                                    data: {
                                                        name: "",
                                                        description: "",
                                                        detail: "",
                                                        type: "",
                                                        price: "",
                                                        wallpaper: "",
                                                        id_parent: null,
                                                    },
                                                });
                                                dispatch(
                                                    getCurriculumAction(item.id)
                                                );
                                                const action = {
                                                    type: LOAD_MODAL,
                                                    data: {
                                                        titleModal:
                                                            "Edit curriculum",
                                                        maxWidth: 60,
                                                        component: (
                                                            <CurriculumForm />
                                                        ),
                                                    },
                                                };
                                                dispatch(action);
                                            }}
                                        >
                                            <i className="bx bxs-edit"></i>
                                        </button>
                                    </Tooltip>
                                    <Tooltip
                                        placement="top"
                                        title="Delete"
                                        key={index + "2"}
                                    >
                                        <button
                                            className="btn btn-danger ms-2"
                                            onClick={() => {
                                                Swal.fire({
                                                    title: "Are you sure to delete this curriculum?",
                                                    icon: "warning",
                                                    showCancelButton: true,
                                                    showConfirmButton: true,
                                                    confirmButtonText:
                                                        "Confirm",
                                                    cancelButtonText: "Cancel",
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        dispatch(
                                                            deleteCurriculumsAction(
                                                                [item.id]
                                                            )
                                                        );
                                                    }
                                                });
                                            }}
                                        >
                                            <i className="bx bx-trash"></i>
                                        </button>
                                    </Tooltip>
                                </React.Fragment>
                            );
                        },
                    },
                ],
                dataSource: curriculums,
                page: 1,
                fetchData: getCurriculumsAction,
                buttons: buttons(),
                selectedRowKeys: [],
            },
        });
    }, []);

    useEffect(() => {
        dispatch({
            type: LOAD_COMPONENT,
            data: {
                dataSource: curriculums,
            },
        });
    }, [curriculums]);
    useEffect(() => {
        dispatch({
            type: LOAD_COMPONENT,
            data: {
                buttons: buttons(),
            },
        });
    }, [selectedRowKeys]);

    const buttons = () => {
        return [
            <Button
                danger
                type="primary"
                className="me-2"
                key={1}
                onClick={() => {
                    if (selectedRowKeys.length) {
                        Swal.fire({
                            title: "Are you sure to delete these curriculums?",
                            icon: "warning",
                            showCancelButton: true,
                            showConfirmButton: true,
                            confirmButtonText: "Confirm",
                            cancelButtonText: "Cancel",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                dispatch(
                                    deleteCurriculumsAction(selectedRowKeys)
                                );
                            }
                        });
                    }
                }}
            >
                Delete
            </Button>,
            <Button
                type="primary"
                key={2}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => {
                    dispatch({
                        type: GET_CURRICULUMN,
                        data: {
                            name: "",
                            description: "",
                            detail: "",
                            type: "",
                            price: "",
                            wallpaper: "",
                            id_parent: null,
                            id: null,
                        },
                    });
                    const action = {
                        type: LOAD_MODAL,
                        data: {
                            titleModal: "Create curriculum",
                            maxWidth: 60,
                            component: <CurriculumForm />,
                        },
                    };
                    dispatch(action);
                }}
            >
                Create
            </Button>,
        ];
    };
    return <></>;
});

export default Curriculum;
