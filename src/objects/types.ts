export type Word = Character[]

export class Character {
    constructor(
        public toplines: TopLine[] = [],
        public bottomlines: BottomLine[] = []
    )
    
    public serialize(): SerializedCharacter {
        let sertop = 0
        for (let it of this.toplines) {
            sertop += 1 << it
        }
        let serbot = 0
        for (let it of this.bottomlines) {
            serbot += 1 << it
        }
        return {top: sertop, bottom: serbot}
    }
    
    public static deserialize(serialized: SerializedCharacter): Character {
        const toparr: TopLine[] = []
        for (let i =0; i <= TopLine.VERTMID3; i++) {
            if ((serialized.top & i) != 0) {
                toparr.push(i as TopLine)
            }
        }
        const botarr: BottomLine[] = []
        for (let i = 0; i <= BottomLine.CLOSEDDOT; i++) {
            if ((serialized.bottom & i) != 0) {
                botarr.push(i as BottomLine)
            }
        }
        
        return Character(toparr, botarr)
    }
}

interface SerializedCharacter {
    top: number,
    bottom: number
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
    VERTLEFT3,
    VERTMID1,
    VERTMID2,
    VERTMID3,
    OPENDOT,
    CLOSEDDOT
}