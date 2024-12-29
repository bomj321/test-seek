import { State } from "@enums/StateEnum";
import { Badge } from "primereact/badge";

interface IBasicState {
  state: string | boolean;
}

export default function BasicStates({ state }: IBasicState) {
  switch (state) {
    case State.TO_DO:
      return <Badge value="Por hacer" severity="success"></Badge>;

    case State.IN_PROGRESS:
      return <Badge value="En progreso" severity="danger"></Badge>;

    case State.COMPLETED:
      return <Badge value="Completado" severity="info"></Badge>;

    default:
      return <Badge value="-"></Badge>;
  }
}
