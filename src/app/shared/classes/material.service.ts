import * as M from "materialize-css";

// TODO 11
export class MaterialService {
  static toast(html: string){
    M.toast({html})
  }
}
