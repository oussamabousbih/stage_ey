import{DEBUG} from "@angular/compiler-cli/src/ngtsc/logging/src/console_logger";

(window as any).global=window;
(window as any).process = {
    env:{DEBUG:undefined},
};
