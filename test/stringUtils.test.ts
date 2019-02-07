import {expect} from "chai";
import {StringUtils} from "../src/utilities/stringUtils";

describe('StringUtils Tests', () => {

    describe("ToLower Tests", () => {
        it('should return empty string', () => {
            expect(StringUtils.toLower("")).to.equal("");
        });

        // it('should return empty string', () => {
        //     expect(StringUtils.toLower(undefined)).to.equal("");
        // });

        it('should return lower cased string xyz', () => {
            expect(StringUtils.toLower("XyZ")).to.equal("xyz");
        });

    });

    describe("ToUpper Tests", () => {
        it('should return upper cased string XYZ', () => {
            expect(StringUtils.toUpper("XyZ")).to.equal("XYZ");
        });

    });



});