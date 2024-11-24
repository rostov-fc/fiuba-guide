import { ReactSVG } from "react-svg";
import { FloorId } from "../types/FloorId";
import { RoomSearchData } from "./RoomSearchBar";
import { insertWrappedTextInSvg } from "../utils";
import "./Floor.css";
import { useGesture } from "@use-gesture/react";
import { searchById } from "../assets/floorConfig";
import { CSSProperties, useState } from "react";

type Props = {
  selectedRoom: RoomSearchData | null;
  style?: CSSProperties;
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

export const Floor = ({ selectedRoom, style }: Props) => {
  const afterInjection = (svg: SVGSVGElement) => {
    colorSelectedRoom(svg, selectedRoom);
  };

  return (
    <div className="floor">
      <ReactSVG
        style={style}
        viewBox="0 0 20 10"
        preserveAspectRatio="xMidYMid meet"
        src={`/fiuba-guide/floorplans/svg/${selectedRoom ? selectedRoom.floorId : FloorId.P1}.svg`}
        afterInjection={afterInjection}
      />
    </div>
  );
};

export const FloorWithGestures = ({ selectedRoom }: Props) => {
  const [translate, setTranslate] = useState([0, 0]);
  const [scale, setScale] = useState(1);

  const bind = useGesture({
    onDrag: (state) => setTranslate(state.offset),
    onPinch: (state) => setScale(state.offset[0]),
  });

  const transform = `translate(${translate[0]}px, ${translate[1]}px) scale(${scale})`;

  return (
    <div {...bind()} style={{ touchAction: "none" }}>
      <Floor selectedRoom={selectedRoom} style={{ transform }} />
    </div>
  );
};
