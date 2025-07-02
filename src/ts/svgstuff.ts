import {$enum} from "ts-enum-util";
import {
    BOTLINE_VECTOR,
    bottomCoordToSvgCoord,
    BottomLine,
    topCoordToSvgCoord,
    TopLine,
    TOPLINE_VECTOR,
    Vector
} from "@/ts/types";

export const ALL_TOP_LINE_VECTORS = $enum(TopLine).map(it => [it, TOPLINE_VECTOR[it]] as [TopLine, Vector]).map(([k, v]) => [k, v.map(topCoordToSvgCoord)] as [TopLine, Vector])
export const ALL_BOTTOM_LINE_VECTORS = $enum(BottomLine).map(it => [it, BOTLINE_VECTOR[it]] as [BottomLine, Vector]).map(([k, v]) => [k, v.map(bottomCoordToSvgCoord)] as [BottomLine, Vector])