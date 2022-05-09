import RootStore from '../store'
import { ChainCoin } from '../data/asset-list'

const { assetStore } = new RootStore()

const existAsset: ChainCoin = {
    description: 'The native token of Osmosis',
    denom_units: [
        {
            denom: 'uosmo',
            exponent: 0,
            aliases: [],
        },
        {
            denom: 'osmo',
            exponent: 6,
            aliases: [],
        },
    ],
    base: 'uosmo',
    name: 'Osmosis',
    display: 'osmo',
    symbol: 'OSMO',
    logo_URIs: {
        png:
            'https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/osmo.png',
        svg:
            'https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/osmo.svg',
    },
    coingecko_id: 'osmosis',
}

const testAsset: ChainCoin = {
    description: 'Test token',
    denom_units: [
        {
            denom: 'utest',
            exponent: 0,
            aliases: [],
        },
        {
            denom: 'test',
            exponent: 6,
            aliases: [],
        },
    ],
    base: 'utest',
    name: '**TEST**',
    display: '**TEST**',
    symbol: '**TEST**',
    logo_URIs: {
        png:
            'https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/osmo.png',
    },
}

const updatedTestAsset: ChainCoin = {
    description: 'Test token',
    denom_units: [
        {
            denom: 'utest',
            exponent: 0,
            aliases: [],
        },
        {
            denom: 'test',
            exponent: 6,
            aliases: [],
        },
        {
            denom: 'test-updated',
            exponent: 6,
            aliases: [],
        },
    ],
    base: 'test-updated',
    name: '**TEST**',
    display: '**TEST**',
    symbol: '**TEST**',
    logo_URIs: {
        png:
            'test-updated.png',
    },
}

describe("Asset store methods: ", () => {
    it("add exist Asset", () => {
        const originalLength = assetStore.chain.assets.length
        assetStore.addAsset(existAsset);
        expect(assetStore.chain.assets.length).toEqual(originalLength);
    });

    it("update non-exist Asset: ", () => {
        assetStore.updateAsset(updatedTestAsset);
        const updatedAssetOptions = assetStore.chain.assets.filter(v => v.symbol === updatedTestAsset.symbol)
        expect(updatedAssetOptions.length).toEqual(0);
    });

    it("remove non-exist Asset", () => {
        const originalLength = assetStore.chain.assets.length
        assetStore.removeAsset(testAsset);
        expect(assetStore.chain.assets.length).toEqual(originalLength);
    });

    it("add new Asset with symbol **TEST**", () => {
        const originalLength = assetStore.chain.assets.length
        assetStore.addAsset(testAsset);
        expect(assetStore.chain.assets.length).toEqual(originalLength + 1);
    });

    it("update symbol **TEST** Asset: ", () => {
        assetStore.updateAsset(updatedTestAsset);
        const updatedAssetOptions = assetStore.chain.assets.filter(v => v.symbol === updatedTestAsset.symbol)
        expect(updatedAssetOptions.length).toEqual(1);
        expect(updatedAssetOptions[0].denom_units).toEqual(updatedTestAsset.denom_units);
        expect(updatedAssetOptions[0].base).toEqual(updatedTestAsset.base);
        expect(updatedAssetOptions[0].logo_URIs.png).toEqual(updatedTestAsset.logo_URIs.png);
    });

    it("remove symbol **TEST** Asset", () => {
        const originalLength = assetStore.chain.assets.length
        assetStore.removeAsset(testAsset);
        expect(assetStore.chain.assets.length).toEqual(originalLength - 1);
    });
});