import { access } from "node:fs";
import { mkdir } from "node:fs/promises";
import { dirname, join, normalize } from "node:path";

function inject(fnOriginal) {
    return async function(path, data, opts) {
		const normalizedPath = normalize( path );
        const dir = join(normalizedPath, "..")

        try {
            await access(dir);
        }
        catch {
            console.log("ARQUIVO NAO EXISTE");
            await mkdir( dirname(normalizedPath), { recursive : true} )
        }
        return fnOriginal(path, data, opts);
    }
}
export default inject



