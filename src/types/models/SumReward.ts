// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export class SumReward implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public totalReward: bigint;

    public blockheight?: number;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save SumReward entity without an ID");
        await store.set('SumReward', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove SumReward entity without an ID");
        await store.remove('SumReward', id.toString());
    }

    static async get(id:string): Promise<SumReward | undefined>{
        assert((id !== null && id !== undefined), "Cannot get SumReward entity without an ID");
        const record = await store.get('SumReward', id.toString());
        if (record){
            return SumReward.create(record);
        }else{
            return;
        }
    }



    static create(record: Partial<Omit<SumReward, FunctionPropertyNames<SumReward>>> & Entity): SumReward {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new SumReward(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
