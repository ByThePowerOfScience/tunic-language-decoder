import {Character, Serializable, Word} from "@/ts/types";

export class Phrase implements Serializable {
    constructor(
        public context: string = "",
        public words: Word[] = []
    ) {}
    
    public serialize(): string {
        return JSON.stringify({context: this.context || "", words: this.words.map(it => it.serialize())});
    }
    
    public static deserialize(serialized: object): Phrase | null {
        if ("context" in serialized && "words" in serialized)
            return new Phrase(serialized["context"] as string, (serialized["words"] as object[]).map(Word.deserialize).filter(it => it != null))
        return null
    }
}

function findWordUsage(toFind: Word, dict: Phrase[]): Phrase[] {
    const found: Phrase[] = []
    
    search:
    for (const phrase of dict) {
        for (const word of phrase.words) {
            if (toFind.equals(word)) {
                found.push(phrase)
                continue search
            }
        }
    }
    return found
}