"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StakingReward = void 0;
const tslib_1 = require("tslib");
const assert_1 = (0, tslib_1.__importDefault)(require("assert"));
class StakingReward {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        (0, assert_1.default)(id !== null, "Cannot save StakingReward entity without an ID");
        await store.set('StakingReward', id.toString(), this);
    }
    static async remove(id) {
        (0, assert_1.default)(id !== null, "Cannot remove StakingReward entity without an ID");
        await store.remove('StakingReward', id.toString());
    }
    static async get(id) {
        (0, assert_1.default)((id !== null && id !== undefined), "Cannot get StakingReward entity without an ID");
        const record = await store.get('StakingReward', id.toString());
        if (record) {
            return StakingReward.create(record);
        }
        else {
            return;
        }
    }
    static async getByAccountId(accountId) {
        const records = await store.getByField('StakingReward', 'accountId', accountId);
        return records.map(record => StakingReward.create(record));
    }
    static create(record) {
        (0, assert_1.default)(typeof record.id === 'string', "id must be provided");
        let entity = new StakingReward(record.id);
        Object.assign(entity, record);
        return entity;
    }
}
exports.StakingReward = StakingReward;
