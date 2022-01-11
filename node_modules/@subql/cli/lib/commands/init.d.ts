import { Command, flags } from '@oclif/command';
export default class Init extends Command {
    static description: string;
    static flags: {
        force: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        starter: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        location: flags.IOptionFlag<string>;
        'install-dependencies': import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        npm: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        specVersion: flags.IOptionFlag<string>;
    };
    static args: {
        name: string;
        description: string;
    }[];
    run(): Promise<void>;
}
