/// <reference path="./enums/pageNamesEnum.d.ts" />
/// <reference path="./pages/IPage.d.ts" />
/// <reference path="./providers/pageProvider.d.ts" />

module AppModule {
    export class App {
        private pageProvider: PageProvider;
        private page: IPage;

        constructor() {
            this.pageProvider = new PageProvider();
        }

        public setPage(pageName: PageNamesEnum): void {
            this.page = this.pageProvider.provide(pageName);
        }

        public run() {
            this.page.run();
        }
    }
}
