export class TodoUtils {
 
    static mapToModel<TModel>(nvpArr: JQuery.NameValuePair[], model: TModel) {
        for (var i = 0; i < nvpArr.length; i++) {
            let val = nvpArr[i].value;
            model[nvpArr[i].name] = val === '' ? null : val;
        }

        return model;
    }
}
