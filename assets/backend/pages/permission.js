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
        element: null,
        url: {},
        list: {},
        result: {},
        item: {},
        newItem: {},
        list_url: null,
        currentPage: 1,
        pagination:{}
    },
    ready: function () {
        this.url.list = this.base_url + "/list";
        this.url.create = this.base_url + "/create";
        this.url.delete = this.base_url + "/delete";
        this.url.toggleStatus = this.base_url + "/toggle/status";
        this.fetchList();
    },
    methods: {
        //-----------------------------------------
        fetchList: function () {
            NProgress.start();
            this.$http.get(this.url.list).then((response) => {
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
            console.log("response", this.newItem);
            this.$http.post(this.url.create, this.newItem).then((response) => {
                console.log("response", response.data);
                this.fetchList();
            }, (response) => {
                // error callback
            });
        },

        //-----------------------------------------
        paginationClicked: function (e) {
            this.currentPage = event.currentTarget.getAttribute("data-page");
            this.url.list = this.base_url+"/list?page="+this.currentPage;
            this.fetchList();
            this.genPagination()
        },
        //-----------------------------------------
        toggleStatus(e)
        {
            this.element = event.currentTarget;
            var id = $(this.element).attr("data-id");

            var data = {
                id: id
            };
            this.$http.post(this.url.toggleStatus, data).then((response) => {
                console.log("response", response.data);
                if(response.data.status == "success")
                {
                    this.fetchList();
                }

            }, (response) => {
                // error callback
            });

        },
        //-----------------------------------------
        deleteItem(e)
        {
            this.element = event.currentTarget;
            var id = $(this.element).attr("data-id");
            var data = {
                id: id
            };
            this.$http.post(this.url.delete, data).then((response) => {
                console.log("response", response.data);
                if(response.data.status == "success")
                {
                    this.fetchList();
                }

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
                pagesToDisplay: 5
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
    }
});
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------