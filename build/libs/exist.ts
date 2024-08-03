import { stat } from "fs/promises"

export async function exist(path: string) {
    try {
        await stat(path)
        return true
    } catch {
        return false
    }
}