var usersTemplateElements = new Vue({
    el: '#usersComponent',
    data: {
        dataArray: [],
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Accept-Language': 'application/json'
        },
        subscribe: '/user',
        url: 'http://localhost:8080/api/user/?limit=15'
    },
    methods: {
        getData: function () {
            var self = this;
            fetch(self.url, {
                method: self.method,
                headers: self.headers
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    self.reloadData(response);
                });
        },
        reloadData: function (data) {
            while (this.dataArray.length > 0) {
                this.dataArray.pop();
            }
            for (var i = 0; i < data.length; i++) {
                this.dataArray.push(data[i]);
            }
        },
        subscribeSocket: function () {
            var self = this;
            stompClient.subscribe(self.subscribe, function (data) {
                self.getData();
            });
        }
    }
});

function sendImage() {
    var header = $("meta[name='_csrf_header']").attr("content");
    var token = $("meta[name='_csrf']").attr("content");
    var data = new FormData($("#formAddUserImage")[0]);

    $.ajax({
        url: 'http://localhost:8080/api/user/upload-img',
        type: 'POST',
        processData: false,  // Important!
        contentType: false,
        cache: false,
        enctype: 'multipart/form-data',
        data: data,
        beforeSend: function (xhr) {
            xhr.setRequestHeader(header, token);
        },
        success: function (data) {
            location.reload();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + ": " + thrownError);
        }
    });
}

var usersMembersElements = new Vue({
    el: '#usersMembersComponent',
    data: {
        dataArray: [],
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Accept-Language': 'application/json'
        },
        active: '#usersMembersComponent',
        subscribe: '/user',
        url: 'http://localhost:8080/api/user/'
    },
    methods: {
        getData: function () {
            var self = this;
            if ($(self.active).attr("data-active") === undefined) {
                return;
            }

            fetch(self.url, {
                method: self.method,
                headers: self.headers
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    self.reloadData(response);
                });
        },
        reloadData: function (data) {
            while (this.dataArray.length > 0) {
                this.dataArray.pop();
            }
            for (var i = 0; i < data.length; i++) {
                this.dataArray.push(data[i]);
            }
        },
        subscribeSocket: function () {
            var self = this;
            if ($(self.active).attr("data-active") === undefined) {
                return;
            }

            stompClient.subscribe(self.subscribe, function (data) {
                self.getData();
            });
        }
    }
});
