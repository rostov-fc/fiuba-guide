import { ReactSVG } from "react-svg";
import { FloorId } from "../types/FloorId";
import { RoomSearchData } from "./SearchBar";

type Props = {
  selectedRoom: RoomSearchData | null;
};

const colorSelectedRoom = (svg: SVGSVGElement, selectedRoom: RoomSearchData | null) => {
  if (!selectedRoom) return;

  // we search all nodes for one with inkscape:label equal to selectedRoom
  // we can not use id, because it is changed by the library when injected
  // we can not use querySelector because it breaks the image
  const nodes = [...svg.getElementsByTagName("*")] as HTMLElement[];

  for (const node of nodes) {
    if (node.getAttribute("inkscape:label") === selectedRoom.room) {
      node.style.fill = "red";
    }
  }
};

export const Floor = ({ selectedRoom }: Props) => {
  const afterInjection = (svg: SVGSVGElement) => {
    colorSelectedRoom(svg, selectedRoom);
  };

  return (
    <ReactSVG
      src={`/floorplans/svg/${selectedRoom ? selectedRoom.floorId : FloorId.P1}.svg`}
      afterInjection={afterInjection}
    />
  );
};
