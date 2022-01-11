// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export class StakingReward implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public accountId: string;

    public balance: bigint;

    public date: Date;

    public blockheight?: number;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save StakingReward entity without an ID");
        await store.set('StakingReward', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove StakingReward entity without an ID");
        await store.remove('StakingReward', id.toString());
    }

    static async get(id:string): Promise<StakingReward | undefined>{
        assert((id !== null && id !== undefined), "Cannot get StakingReward entity without an ID");
        const record = await store.get('StakingReward', id.toString());
        if (record){
            return StakingReward.create(record);
        }else{
            return;
        }
    }


    static async getByAccountId(accountId: string): Promise<StakingReward[] | undefined>{
      
      const records = await store.getByField('StakingReward', 'accountId', accountId);
      return records.map(record => StakingReward.create(record));
      
    }


    static create(record: Partial<Omit<StakingReward, FunctionPropertyNames<StakingReward>>> & Entity): StakingReward {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new StakingReward(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
