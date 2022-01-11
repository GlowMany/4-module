import { Command, flags } from '@oclif/command';
export default class Migrate extends Command {
    static description: string;
    static flags: {
        force: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        file: flags.IOptionFlag<string>;
        location: flags.IOptionFlag<string>;
    };
    run(): Promise<void>;
}
