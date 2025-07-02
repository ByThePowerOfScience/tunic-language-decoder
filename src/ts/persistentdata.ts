import {Serializable} from "@/ts/types";
import {Phrase} from "@/ts/dictionary";

export function saveData(key: string, data: Serializable) {
    localStorage.setItem(key, data.serialize());
}

const KEY_PHRASES = "phrases"

// export function savePhrase(phrase: Phrase) {
//     const knownphrases: Phrase[] = getPhrases()
//     knownphrases.push(phrase)
//     localStorage.setItem(KEY_PHRASES, JSON.stringify(knownphrases))
// }
//
// export function loadPhrases(): Phrase[] {
//     return JSON.parse( || "[]", (_, value) => typeof value === 'object' ? Phrase.deserialize(value) : null)
// }
//
// function getRawPhrases(): any[] {
//     return JSON.parse(localStorage.getItem(KEY_PHRASES))
// }