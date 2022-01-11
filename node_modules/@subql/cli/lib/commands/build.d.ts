import { Command, flags } from '@oclif/command';
export default class Build extends Command {
    static description: string;
    static flags: {
        location: flags.IOptionFlag<string>;
        mode: flags.IOptionFlag<string>;
    };
    run(): Promise<void>;
}
