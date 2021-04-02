import { privateRESTRequest } from "../private_rest_request"

const getPairBalances = async ([base, quote]: string[]): Promise<string[]> => {
    let rawBalances = await privateRESTRequest({ url: 'Balance' })
    rawBalances = {
        ...rawBalances,
        'USD': rawBalances['ZUSD'] || 0
    }
    const rawCurrencies = Object.keys(rawBalances)
    const [baseBalance, quoteBalance] = rawCurrencies
        .filter(rc => [base, quote].includes(rc))
        .map(rc => rawBalances[rc])

    return [baseBalance, quoteBalance]
}

export default getPairBalances
