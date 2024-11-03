import { ReactSVG } from "react-svg";
import { FloorId } from "../types/FloorId";
import { insertWrappedTextInSvg } from "../utils";
import "./Floor.css";
import { searchById } from "../assets/floorConfig";
import { RoomSearchData } from "../Floors";

type Props = {
  selectedRoom: RoomSearchData | null;
};

const colorSelectedRoom = (svg: SVGSVGElement, selectedRoom: RoomSearchData | null) => {
  // we search all nodes for one with label equal to selectedRoom
  // we can not use id, because it is changed by the library when injected

  const selectedFloor = selectedRoom ? selectedRoom.floorId : FloorId.P1;

  (svg.querySelectorAll("rect,path") as NodeListOf<SVGElement>).forEach((node) => {
    const label = node.getAttribute("label");
    if (!label) {
      return;
    }

    if (label === selectedRoom?.room) {
      node.style.removeProperty("fill");
      node.classList.add("selected");
    }

    if (label?.startsWith("BACKGROUND") || label?.startsWith("WALL") || label?.startsWith("UNK")) {
      return;
    }

    const displayName = searchById(selectedFloor, label)?.displayName;

    insertWrappedTextInSvg(node as SVGGraphicsElement, displayName || "", label === selectedRoom?.room ? ["selected-text"] : []);
  });
};

export const Floor = ({ selectedRoom }: Props) => {
  const afterInjection = (svg: SVGSVGElement) => {
    colorSelectedRoom(svg, selectedRoom);
  };

  return selectedRoom?.element;
};
