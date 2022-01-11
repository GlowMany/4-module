import { Command, flags } from '@oclif/command';
export default class Validate extends Command {
    static description: string;
    static flags: {
        location: flags.IOptionFlag<string>;
        ipfs: flags.IOptionFlag<string>;
        silent: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
    };
    run(): Promise<void>;
}
