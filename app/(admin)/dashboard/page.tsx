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
import { CutText } from "@lib/CutText";

const Dashboard = () => {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const tasks = useSelector((state: RootState) => state.tasks.data);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalClose, setOpenModalClose] = useState<boolean>(false);

  const handleLogout = () => {
    signOut({ callbackUrl: "/", redirect: true });
  };

  //Elements to Header
  const start = (
    <Image
      alt="logo"
      src="https://media.licdn.com/dms/image/v2/C4D0BAQERNQFncHNMhw/company-logo_200_200/company-logo_200_200/0/1651080962129/seek_peru_logo?e=1743638400&v=beta&t=xZuD3DXSFE_NU6ugMbUveajXXN5hRwAbQGA754wkMW0"
      width="60"
      height="60"
      className="mr-2 border-circle"
    ></Image>
  );

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

      <TaskModal
        state={openModal}
        setState={(e) => setOpenModal(e)}
        toast={toast}
      />
      <DeleteModal
        state={openModalClose}
        setState={(e) => setOpenModalClose(e)}
        toast={toast}
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
        <Column
          field="title"
          header="Título"
          body={(rowData) => CutText(rowData.title)}
        ></Column>
        <Column
          field="description"
          header="Descripción"
          body={(rowData) => CutText(rowData.description)}
        ></Column>

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
