/// <reference path="../enums/pageNamesEnum.d.ts" />
/// <reference path="../pages/IPage.d.ts" />

declare class PageProvider {
    public provide(pageName: PageNamesEnum): IPage;
}