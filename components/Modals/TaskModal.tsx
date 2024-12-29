import React, { useEffect, useRef, useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { ValidationFlow } from "@lib/ValidationFlow";
import { showSuccess } from "@lib/ToastMessages";
import { states } from "@lib/data";
import { TaskValidation } from "@validations/TaskValidation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/store";
import { addTask, updateTask } from "@store/slices/tasksSlice";
import { ITaskState } from "@interfaces/ITask";
import { IZodError } from "@interfaces/IAuth";
import { IModal } from "@interfaces/IModal";
import { VerifyErrorsInForms } from "@lib/VerifyErrorsInForms";

export default function TaskModal({ state, setState }: IModal) {
  const toast = useRef(null);
  const dispatch = useDispatch();
  const task = useSelector((state: RootState) => state.tasks.dataSelected);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [stateTask, setStateTask] = useState<ITaskState>();
  const [validations, setValidations] = useState<Array<IZodError>>([]);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      const state = states.filter((s) => s.code === task.state);
      setStateTask(state[0]);
    } else {
      setTitle("");
      setDescription("");
      setStateTask(states[0]);
    }
  }, [task]);

  const headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2">
      <span className="font-bold white-space-nowrap">
        Categoría de variable
      </span>
    </div>
  );

  const footerContent = (
    <div>
      <Button
        label="Cancelar"
        severity="danger"
        onClick={() => handleClose()}
      />
      <Button label="Guardar" onClick={() => handleSubmit()} />
    </div>
  );

  const handleSubmit = async () => {
    //Validate data
    const validationFlow = ValidationFlow(
      TaskValidation({
        title,
        description,
        state: stateTask.code,
      }),
      toast
    );

    // Show errors in inputs
    setValidations(validationFlow);
    if (validationFlow && validationFlow.length > 0) {
      return;
    }

    if (task) {
      dispatch(
        updateTask({
          id: task._id,
          updatedTask: { _id: task._id, title, description, state },
        })
      );
    } else {
      dispatch(addTask({ title, description, state }));
    }

    showSuccess(toast, "", "Categoría creada");
    setTimeout(() => {
      handleClose();
    }, 800);
  };

  const handleClose = async () => {
    setTitle("");
    setDescription("");
    setValidations([]);
    setStateTask(states[0]);
    setState(!state);
  };

  return (
    <Dialog
      visible={state}
      modal
      header={headerElement}
      footer={footerContent}
      closable={false}
      style={{ width: "30rem" }}
      onHide={() => {
        if (!state) return;
        setState(false);
      }}
    >
      <Toast ref={toast} />

      <div className="flex flex-column gap-4">
        <div>
          <label htmlFor="name">
            Nombre <span className="text-red-500">*</span>
          </label>

          <InputText
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            type="text"
            className={`w-full mt-2 ${
              VerifyErrorsInForms(validations, "title") ? "p-invalid" : ""
            } `}
            placeholder="Nombre"
          />
        </div>

        <div className="w-full">
          <label htmlFor="description">
            Descripción <span className="text-red-500">*</span>
          </label>
          <InputTextarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            className={`w-full mt-2 ${
              VerifyErrorsInForms(validations, "description") ? "p-invalid" : ""
            } `}
            placeholder="Descripción"
            rows={5}
            cols={30}
          />
        </div>

        <div>
          <label htmlFor="state">
            Estado <span className="text-red-500">*</span>
          </label>
          <Dropdown
            value={stateTask}
            onChange={(e) => setStateTask(e.value)}
            options={states}
            id="state"
            optionLabel="name"
            placeholder="Estado"
            className={`w-full mt-2 ${
              VerifyErrorsInForms(validations, "state") ? "p-invalid" : ""
            } `}
          />
        </div>
      </div>
    </Dialog>
  );
}
