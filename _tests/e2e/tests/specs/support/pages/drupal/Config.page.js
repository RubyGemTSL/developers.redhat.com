import Page from "../Page";
import Driver from "../../utils/Driver.Extension";

export class Config extends Page {
    open() {
        Driver.visit(this.drupalHost() + '/admin/config/development/configuration')
    }

    source() {
        return Driver.getPageSource()
    }
}
export default new Config;
