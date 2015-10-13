angular.module('starter.services', [])

.factory('Estados', function($q, $http) {
    return {
        all: function(){
            var defer = $q.defer();
            $http.get('files/estados.json')
                .then(function(result){
                    defer.resolve(result.data);
                }, function(){
                    defer.reject();
                });
            return defer.promise;
        }
    };
})
.factory('Cidades', function($q, $http) {
    return {
        all: function(){
            var defer = $q.defer();
            $http.get('files/cidades.json')
                .then(function(result){
                    defer.resolve(result.data);
                }, function(){
                    defer.reject();
                });
            return defer.promise;
        }
    };
})
.factory('Planos', function($q, $http) {
    return {
        planos: [
            {
                id: 1,
                nome: 'Particular'
            },
            {
                id: 2,
                nome: 'AMIL'
            },
            {
                id: 3,
                nome: 'Unimed'
            },
        ],
        all: function(){
            return this.planos;
        }
    };
})
.factory('TiposMedico', function($q, $http) {
    return {
        tiposMedico: [
            {
                id: 'medico',
                nome: 'Médico'
            },
            {
                id: 'dentista',
                nome: 'Dentista'
            }
        ],
        all: function(){
            return this.tiposMedico;
        }
    };
})
.factory('Especialidades', function($q, $http) {
    return {
        especialidades: {
            dentista: [
                {
                    id: 1,
                    nome: 'Geral'
                },            
                {
                    id: 2,
                    nome: 'Aparelho'
                },
            ],
            medico: [
                {
                    id: 1,
                    nome: 'Cardiologista'
                },
                {
                    id: 2,
                    nome: 'Fisioterapeuto'
                },
            ]
        },
        all: function(){
            return this.especialidades;
        }
    };
})
.factory('Chats', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
    }, {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
    }, {
        id: 2,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
    }, {
        id: 3,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
    }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
    }];

    return {
        all: function() {
            return chats;
        },
        remove: function(chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function(chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        }
    };
});
