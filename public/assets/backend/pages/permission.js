//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
Vue.config.delimiters = ['[[', ']]'];
Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
var vm = new Vue({
    el: '#vueApp',
    data: {
        countries: [],
        base_url: null,
        current_url: null,
        list: {},
        result: {},
        item: {},
        newItem: {},
        list_url: null,
        pagination: {},
        currentPage: 1
    },
    ready: function () {
        this.list_url = this.base_url + "/list";
        this.fetchList();
    },
    methods: {
        //-----------------------------------------
        fetchList: function () {
            NProgress.start();
            console.log("response", this.list_url);
            this.$http.get(this.list_url).then((response) => {
                NProgress.done();
                if (response.data.status == "success") {
                    this.list = response.data.data.data;
                    this.result = response.data;
                    this.genPagination();
                }
            }, (response) => {
                // error callback
            });
        },
        //-----------------------------------------
        createItem: function (e) {
            var url = $("#formCreate").attr("action");
            console.log("response", url);
            this.$http.post(url, this.newItem).then((response) => {
                this.fetchList();
            }, (response) => {
                // error callback
            });
        },
        //-----------------------------------------
        genPagination: function () {
            this.pagination = {
                totalRecords: this.result.data.total,
                startPage: 1,
                lastPage: this.result.data.lastPage,
                perPage: this.result.data.perPage,
                currentPage: this.currentPage,
                pagesToDisplay: 5,
            };
            this.pagination.offset = Math.ceil(this.pagination.pagesToDisplay / 2);
            this.pagination.range = {};
            if (this.pagination.currentPage != this.pagination.startPage) {
                this.pagination.range.first = {
                    number: this.pagination.startPage,
                }
            }
            if (this.pagination.currentPage > this.pagination.startPage) {
                this.pagination.range.previous = {
                    number: parseFloat(this.pagination.currentPage) - 1,
                }
            }
            if (this.pagination.currentPage < this.pagination.lastPage) {
                this.pagination.range.next = {
                    number: parseFloat(this.pagination.currentPage) + 1,
                }
            }
            if (this.pagination.currentPage != this.pagination.lastPage) {
                this.pagination.range.last = {
                    number: this.pagination.lastPage,
                }
            }
            var start = this.pagination.startPage;
            var end;
            if (this.pagination.currentPage == 1) {
                end = this.pagination.pagesToDisplay;
            }
            if (this.pagination.currentPage > 1 && this.pagination.currentPage <= this.pagination.lastPage) {
                start = parseFloat(this.pagination.currentPage) - parseFloat(this.pagination.offset);
                end = parseFloat(this.pagination.currentPage) + parseFloat(this.pagination.offset);
            }
            if (start < 1) {
                start = 1;
            }
            if (end > this.pagination.lastPage) {
                end = this.pagination.lastPage;
            }
            this.pagination.range.pages = {};
            for (start; start <= end; start++) {
                this.pagination.range.pages[start] = {
                    number: start,
                };
                if (start == this.pagination.currentPage) {
                    this.pagination.range.pages[start].isCurrent = true;
                }
            }
        },
        //-----------------------------------------
        paginationClicked: function (e) {
            this.currentPage = event.currentTarget.getAttribute("data-page");
            this.list_url = this.base_url+"/list?page="+this.currentPage;
            this.fetchList();
            this.genPagination()
        }
        //-----------------------------------------
    }
});
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------