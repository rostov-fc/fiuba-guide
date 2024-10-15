import { ReactSVG } from "react-svg";
import { FloorId } from "../types/FloorId";
import { RoomSearchData } from "./SearchBar";
import "./Floor.css"

type Props = {
  selectedRoom: RoomSearchData | null;
};

const colorSelectedRoom = (svg: SVGSVGElement, selectedRoom: RoomSearchData | null) => {
  // we search all nodes for one with inkscape:label equal to selectedRoom
  // we can not use id, because it is changed by the library when injected
  // we can not use querySelector because it breaks the image
  const nodes = [...svg.getElementsByTagName("*")] as HTMLElement[];

  for (const node of nodes) {
    const label = node.getAttribute("inkscape:label");
    if (label === selectedRoom?.room) {
      node.style.removeProperty("fill");
      node.classList.add("selected");
    } else if (node.style?.fill) {
      if (label?.startsWith("BACKGROUND")) {
        node.style.fill = "#0000";
        node.style.stroke = "#0000";
      }
      else if (label?.startsWith("WALL")) {
        node.style.fill = "#0000";
      } else {
        node.style.removeProperty("fill");
        node.classList.add("unselected");
      }
    }
  }
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
