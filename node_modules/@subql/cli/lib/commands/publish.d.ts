import { Command, flags } from '@oclif/command';
export default class Publish extends Command {
    static description: string;
    static flags: {
        location: flags.IOptionFlag<string>;
        ipfs: flags.IOptionFlag<string>;
    };
    run(): Promise<void>;
}
