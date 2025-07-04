export class Word implements Serializable {
    public constructor(public chars: Character[] = []) {}
    
    public serialize(): string {
        return JSON.stringify({chars: this.chars.map(it => it.serialize())});
    }
    
    public equals(other: Word): boolean {
        let c1 = this.chars;
        let c2 = other.chars;
        
        if (c1.length != c2.length) return false;
        
        for (let i = 0; i < c1.length; i++) {
            if (!c1[i].equals(c2[i]))
                return false;
        }
        return true;
    }
    
    public static deserialize(serialized: object): Word | null {
        if ("chars" in serialized) {
            return new Word((serialized["chars"] as object[]).map(Character.deserialize))
        }
        return null
    }
}

export class Character implements Serializable {
    constructor(
        public toplines: Set<TopLine> = new Set(),
        public bottomlines: Set<BottomLine> = new Set(),
        public dotType: DotType = DotType.NONE
    ) {
    }
    
    public serialize(): string {
        let sertop = 0
        for (let it of this.toplines) {
            sertop += 1 << it
        }
        let serbot = 0
        for (let it of this.bottomlines) {
            serbot += 1 << it
        }
        return JSON.stringify({top: sertop, bottom: serbot, dot_type: this.dotType})
    }
    
    public static deserialize(raw: object): Character {
        const serialized = raw as SerializedCharacter
        const toparr: Set<TopLine> = new Set()
        for (let i = 0; i <= TopLine.VERTMID3; i++) {
            if ((serialized.top & i) != 0) {
                toparr.add(i as TopLine)
            }
        }
        const botarr: Set<BottomLine> = new Set()
        for (let i = 0; i <= BottomLine.VERTMID2; i++) {
            if ((serialized.bottom & i) != 0) {
                botarr.add(i as BottomLine)
            }
        }
        
        return new Character(toparr, botarr, serialized.dot_type as DotType)
    }
    
    public equals(other: Character): boolean {
        return setsEqual(this.toplines, other.toplines) && setsEqual(this.bottomlines, other.bottomlines) && this.dotType == other.dotType
    }
}

function setsEqual<T>(set1: Set<T>, set2: Set<T>): boolean {
    if (set1.size != set2.size)
        return false;
    
    for (const value of set2.values()) {
        if (!set1.has(value))
            return false;
    }
    
    return true;
    
}

export interface SerializedCharacter {
    top: number,
    bottom: number,
    dot_type: number
}

export enum TopLine {
    TOPLEFT = 0,
    TOPRIGHT,
    BOTTOMLEFT,
    BOTTOMRIGHT,
    VERTLEFT1,
    VERTLEFT2,
    VERTLEFT3,
    VERTMID1,
    VERTMID2,
    VERTMID3,
}

export enum BottomLine {
    TOPLEFT = 0,
    TOPRIGHT,
    BOTTOMLEFT,
    BOTTOMRIGHT,
    VERTLEFT1,
    VERTLEFT2,
    VERTMID1,
    VERTMID2,
}

export enum DotType {
    NONE,
    OPEN,
    CLOSED
}

export type Coordinate = [number, number]
export type Vector = [Coordinate, Coordinate]

/**
 * Coordinates are x in [0, 2] and y in [0, 3], since there are 4 rows and 3 columns per top character
 */
export const TOPLINE_VECTOR: Record<TopLine, Vector> = {
    [TopLine.TOPLEFT]: [[0, 2], [1, 3]],
    [TopLine.TOPRIGHT]: [[1, 3], [2, 2]],
    [TopLine.BOTTOMLEFT]: [[0, 2], [1, 1]],
    [TopLine.BOTTOMRIGHT]: [[1, 1], [2, 2]],
    [TopLine.VERTLEFT1]: [[0, 0], [0, 1]],
    [TopLine.VERTLEFT2]: [[0, 1], [0, 2]],
    [TopLine.VERTLEFT3]: [[0, 2], [0, 3]],
    [TopLine.VERTMID1]: [[1, 0], [1, 1]],
    [TopLine.VERTMID2]: [[1, 1], [1, 2]],
    [TopLine.VERTMID3]: [[1, 2], [1, 3]]
}

/**
 * Coordinates are x in [0, 2] and y in [0, 2], since there are 3 rows and 3 columns per bottom character
 * Coordinates start from 0 at the top and go down
 */
export const BOTLINE_VECTOR: Record<BottomLine, Vector> = {
    [BottomLine.TOPLEFT]: [[0, 1], [1, 0]],
    [BottomLine.TOPRIGHT]: [[1, 0], [2, 1]],
    [BottomLine.BOTTOMLEFT]: [[0, 1], [1, 2]],
    [BottomLine.BOTTOMRIGHT]: [[1, 2], [2, 1]],
    [BottomLine.VERTLEFT1]: [[0, 0], [0, 1]],
    [BottomLine.VERTLEFT2]: [[0, 1], [0, 2]],
    [BottomLine.VERTMID1]: [[1, 0], [1, 1]],
    [BottomLine.VERTMID2]: [[1, 1], [1, 2]],
}

export const DIST_INCREMENT = 40
export const HEIGHT_INCREMENT = 30
export const LINE_WIDTH = DIST_INCREMENT * 2
export const LINE_Y = 3 * HEIGHT_INCREMENT

/**
 * we're doing a 120 by 120 space so it can easily be divided up into thirds and fourths
 */
export function topCoordToSvgCoord(coord: Coordinate): Coordinate {
    return [DIST_INCREMENT * coord[0], LINE_Y - (HEIGHT_INCREMENT * coord[1])]
}

export function bottomCoordToSvgCoord(coord: Coordinate): Coordinate {
    return [coord[0] * DIST_INCREMENT, coord[1] * HEIGHT_INCREMENT]
}

export interface Serializable {
    serialize(): string;
}