export interface IModal {
  state: boolean;
  setState: () => void;
}

export interface IModalDelete extends IModal {
  api: () => void;
  update: () => void;
}

export interface IModalEditorDelete extends IModal {
  remove: () => void;
}

export interface IModalCreate extends IModal {
  data: any;
  account?: string;
  update?: () => void;
}
