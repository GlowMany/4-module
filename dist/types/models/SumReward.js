"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SumReward = void 0;
const tslib_1 = require("tslib");
const assert_1 = (0, tslib_1.__importDefault)(require("assert"));
class SumReward {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        (0, assert_1.default)(id !== null, "Cannot save SumReward entity without an ID");
        await store.set('SumReward', id.toString(), this);
    }
    static async remove(id) {
        (0, assert_1.default)(id !== null, "Cannot remove SumReward entity without an ID");
        await store.remove('SumReward', id.toString());
    }
    static async get(id) {
        (0, assert_1.default)((id !== null && id !== undefined), "Cannot get SumReward entity without an ID");
        const record = await store.get('SumReward', id.toString());
        if (record) {
            return SumReward.create(record);
        }
        else {
            return;
        }
    }
    static create(record) {
        (0, assert_1.default)(typeof record.id === 'string', "id must be provided");
        let entity = new SumReward(record.id);
        Object.assign(entity, record);
        return entity;
    }
}
exports.SumReward = SumReward;
