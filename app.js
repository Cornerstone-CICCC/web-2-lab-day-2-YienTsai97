$(function () {

  // your code here
  const nextBtn = $('header').find('button').last('button')
  const prevBtn = $('header').find('button').first('button')
  const infoText = $('.info__content')
  const img = $('img')
  const h1 = $('<h1>').addClass('name')
  const age = $('<p>').addClass('age')
  const email = $('<p>').addClass('email')
  const phone = $('<p>').addClass('phone')


  //method
  let userid = 1
  let postid = 1

  function userByUser(userid) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `https://dummyjson.com/users/${userid}`,
        type: 'GET',
        success: function (response) {
          resolve(response)
        },
        error: function (error) {
          reject(error)
        }
      })
    })
  }

  function postByUser(userid) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `https://dummyjson.com/users/${userid}/posts`,
        type: 'GET',
        success: function (response) {
          resolve(response)
        },
        error: function (error) {
          reject(error)
        }
      })
    })
  }

  function todoByUser(userid) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `https://dummyjson.com/users/${userid}/todos`,
        type: 'GET',
        success: function (response) {
          resolve(response)
        },
        error: function (error) {
          reject(error)
        }
      })
    })
  }



  function postByPost(postid) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `https://dummyjson.com/posts/${postid}`,
        type: 'GET',
        success: function (response) {
          resolve(response)
        },
        error: function (error) {
          reject(error)
        }
      })
    })
  }


  //User-Botton
  nextBtn.on('click', async function () {
    if (userid < 29) {
      userid++
      postid++
    } else if (userid === 30) {
      userid = 1
      postid = 1
    }
    build()
  })

  prevBtn.on('click', async function () {
    if (userid <= 30 && userid > 1) {
      userid--
      postid--
    } else if (userid === 1) {
      userid = 30
      postid = 30
    }
    build()
  })


  //Default-set
  $('h3').on('click',function(){
    $(this).next('ul').slideToggle()
  })




  //Build
  async function build() {
    const userinfo = await userByUser(userid)
    const postinfo = await postByUser(userid)
    const todoinfo = await todoByUser(userid)


    img.attr('src', `${userinfo.image}`)
    infoText.append(h1)
    h1.text(`${userinfo.firstName} ${userinfo.lastName}`)
    infoText.append(age)
    age.html(`<strong>Age:</strong> ${userinfo.age}`)
    infoText.append(email)
    email.html(`<strong>Email:</strong> ${userinfo.email}`)
    infoText.append(phone)
    phone.html(`<strong>Phone:</strong> ${userinfo.phone}`)



    //Build-post-todos
    $('.posts').find('h3').text(`${userinfo.firstName}'s Posts`)
    $('.todos').find('h3').text(`${userinfo.firstName}'s To Dos`)
    $('h3').next('ul').empty().hide()


    $.each(postinfo.posts, function (index) {
      $('.posts').find('ul').append('<li>')
      $('li').last().append('<h4>')
      $('h4').last().text(`${postinfo.posts[index].title}`)
      $('h4').last().attr('post-id',`${postinfo.posts[index].id}`)
      $('li').last().append('<p>')
      $('p').last().text(`${postinfo.posts[index].body}`)
    })


    $('h4').on('click', async function() {
      const postId = $(this).attr('post-id')
      const postcontent = await postByPost(postId)


      $('main').append('<div class ="overlay"></div>')
      $('.overlay').append('<div class ="modal"></div>')
      $('.modal').append('<h2>')
      $('h2').text(`${postcontent.title}`)
      $('.modal').append(`<p>${postcontent.body}</p>`)
      $('.modal').append(`<p>Views: ${postcontent.views}</p>`)
      $('.modal').find('p').last().css({'font-style':'italic'})
      $('.modal').append('<button>close  modal</button>')
      $('button').on('click',function(){
        $('main').find('div').remove('.overlay')
      })
    })

    $.each(todoinfo.todos, function (index) {
      $('.todos').find('ul').append('<li>')
      $('li').last().text(`${todoinfo.todos[index].todo}`)
    })
  }
  build()


})