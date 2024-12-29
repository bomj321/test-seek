"use client";

import { useDispatch, useSelector } from "react-redux";
import { signOut } from "next-auth/react";
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import React, { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import Image from "next/image";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { setTask } from "@store/slices/tasksSlice";
import { ITask } from "@interfaces/ITask";
import BasicStates from "@components/TableExtensions/BasicStates";
import BasicActions from "@components/TableExtensions/BasicActions";
import DeleteModal from "@components/Modals/DeleteModal";
import { RootState } from "@store/store";
import TaskModal from "@components/Modals/TaskModal";

const start = (
  <Image
    alt="logo"
    src="https://primefaces.org/cdn/primereact/images/logo.png"
    width="40"
    height="40"
    className="mr-2"
  ></Image>
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const tasks = useSelector((state: RootState) => state.tasks.data);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalClose, setOpenModalClose] = useState<boolean>(false);

  const handleLogout = () => {
    signOut({ callbackUrl: "/", redirect: true });
  };

  const end = (
    <div className="flex align-items-center gap-2">
      <Button label="Salir" onClick={() => handleLogout()} />
    </div>
  );

  //Button events

  const handleEdit = (data: ITask) => {
    dispatch(setTask(data));
    setOpenModal(true);
  };

  const handleModalDelete = (data: ITask) => {
    dispatch(setTask(data));
    setOpenModalClose(true);
  };

  return (
    <>
      <header className="card mb-5">
        <Menubar start={start} end={end} />
      </header>

      <Toast ref={toast} />

      <TaskModal state={openModal} setState={(e) => setOpenModal(e)} />
      <DeleteModal
        state={openModalClose}
        setState={(e) => setOpenModalClose(e)}
      />

      <Button
        onClick={() => setOpenModal(true)}
        icon="pi pi-plus"
        className="mr-2 mb-5"
        label="Tarea"
      />

      <DataTable
        emptyMessage="Sin tareas"
        value={tasks}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column field="_id" header="Id"></Column>
        <Column field="title" header="Título"></Column>
        <Column field="description" header="Descrición"></Column>

        <Column
          field="state"
          body={(rowData: ITask) => <BasicStates state={rowData.state} />}
          header="Estado"
        ></Column>

        <Column
          body={(rowData) => (
            <BasicActions
              handleEdit={() => handleEdit(rowData)}
              handleDelete={() => handleModalDelete(rowData)}
            ></BasicActions>
          )}
          header="Acciones"
        ></Column>
      </DataTable>
    </>
  );
};

export default Dashboard;
