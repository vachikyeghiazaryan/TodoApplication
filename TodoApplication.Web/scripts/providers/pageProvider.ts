/// <reference path="../enums/pageNamesEnum.d.ts" />
/// <reference path="../pages/IPage.d.ts" />
/// <reference path="../pages/todoPage.d.ts" />

export class PageProvider {
    private pages: { [pageName: number]: IPage; } = {};

    constructor() {
        this.init();
    }

    private init(): void {
        this.pages[PageNamesEnum.TodoPage] = new TodoPage();
    }

    public provide(pageName: PageNamesEnum): IPage {
        return this.pages[pageName];
    }
}