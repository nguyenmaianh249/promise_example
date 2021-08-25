var users = [{
        id: 1,
        name: 'Mai Anh',
    },
    {
        id: 2,
        name: 'Tran Ha',
    },
    {
        id: 3,
        name: 'Hau Hoang',
    }
]
var comments = [{
        id: 1,
        user_id: 1,
        content: 'Anh hoc xong chua :)'
    },
    {
        id: 2,
        user_id: 2,
        content: 'Anh moi hoc xong em oi :)))'
    },
    {
        id: 3,
        user_id: 3,
        content: 'ok Mai Anh :)))'
    }
]

function getComments() {
    return new Promise((resolve) => {
        setTimeout(function() {
            resolve(comments)
        }, 1000);
    })
}
getComments()
    .then(function(comments) {
        var userIds = comments.map(function(comment) {
            return comment.user_id
        })
        return getUserByIds(userIds)
            .then(function(users) {
                return {
                    users: users,
                    comments: comments
                }
            })
    })
    .then(function(data) {
        var commentBlock = document.getElementById("comment_box");
        var html = '';
        data.comments.forEach(function(comment) {
            var user = data.users.find(function(user) {
                return user.id === comment.user_id
            })
            html += `<li>${user.name}: ${comment.content}</li>`
        })
        commentBlock.innerHTML = html;
    })

function getUserByIds(userIds) {
    return new Promise((resolve) => {
        var result = users.filter(function(user) {
            return userIds.includes(user.id)
        })
        resolve(result);
    })
}