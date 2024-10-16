import { ReactSVG } from "react-svg";
import { FloorId } from "../types/FloorId";
import { RoomSearchData } from "./SearchBar";
import "./Floor.css"

type Props = {
  selectedRoom: RoomSearchData | null;
};

const colorSelectedRoom = (svg: SVGSVGElement, selectedRoom: RoomSearchData | null) => {
  // we search all nodes for one with label equal to selectedRoom
  // we can not use id, because it is changed by the library when injected

  (svg.querySelectorAll("rect,path") as NodeListOf<SVGElement>)
    .forEach((node) => {
      const label = node.getAttribute("label");
      if (label === selectedRoom?.room) {
        node.style.removeProperty("fill");
        node.classList.add("selected");
      }
    });
};

export const Floor = ({ selectedRoom }: Props) => {
  const afterInjection = (svg: SVGSVGElement) => {
    colorSelectedRoom(svg, selectedRoom);
  };

  return (
    <ReactSVG className="floor" viewBox="0 0 20 10" preserveAspectRatio="xMidYMid meet"
      src={`/floorplans/svg/${selectedRoom ? selectedRoom.floorId : FloorId.P1}.svg`}
      afterInjection={afterInjection}
    />
  );
};

