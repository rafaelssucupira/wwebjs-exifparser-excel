import { describe, it, expect, vi } from "vitest"
import Utils from "../utils/utils.js"
describe('Utils', () => {

	it("dateCurrent", async () => {

		const utils = new Utils()

		vi.useFakeTimers()
		vi.setSystemTime( new Date("2024-09-11 15:08") )
				const result = utils.dateCurrent()
		vi.useRealTimers()

		expect(result.replace(/\:\d{2}$/g, "")).toStrictEqual( "2024-09-11 15:08" )

	})

	it("secondsInMiliseconds", () => {

		const utils = new Utils()
		const result = utils.secondsInMiliseconds( 1633024800 )
		expect(result).toStrictEqual( "2021-09-30 18:00:00" )

	})

})
