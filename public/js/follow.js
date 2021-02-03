$(document).on('click', "#follow", function () {
    console.log($(this).data('id'))
    $.post(`/api/follow/${$(this).data('id')}`, {

    }).then(data => {
        console.log(data)
        console.log('followed')
    }).fail(err => {
        console.log(err)
    })
})



$(document).on('click', "#unfollow", function () {
    console.log($(this).data('id'))
    $.post(`/api/unfollow/${$(this).data('id')}`, {

    }).then(data => {
        console.log(data)
        console.log('unfollowed')
    }).fail(err => {
        console.log(err)
    })
})


$(document).on('click', "#getfollowers", function () {
    console.log($(this).data('id'))
    $.get(`/api/followers/`, {

    }).then(data => {
        console.log(data)
        console.log('unfollowed')
    }).fail(err => {
        console.log(err)
    })
})