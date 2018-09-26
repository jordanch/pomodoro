import { cache } from "./cache.runtime"
import { MemoryDatabase }  from "./classes"

export const storage = new MemoryDatabase(cache)
