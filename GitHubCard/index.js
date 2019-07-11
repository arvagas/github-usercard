/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

axios.get(`https://api.github.com/users/arvagas`)
  .then(user=>{
    console.log('API data succesfully retrieved', user)
    cards.appendChild(ghUser(user.data))
    userFollowers(user.data)
  })
  .catch(error =>{
    console.log('API currently down', error)
  })

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

const cards = document.querySelector('.cards')

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = ['tetondan','dustinmyers','justsml','luishrd','bigknell'];
followersArray.forEach(user => {
  axios.get(`https://api.github.com/users/${user}`)
  .then(user=>{
    console.log('API data succesfully retrieved', user)
    cards.appendChild(ghUser(user.data))
  })
  .catch(error =>{
    console.log('API currently down', error)
  })
})


/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function ghUser(userData) {
  // Create elements
  const card = document.createElement('div')
  const expandBtn = document.createElement('button')
  const img = document.createElement('img')
  const cardInfo = document.createElement('div')
  const name = document.createElement('h3')
  const handle = document.createElement('p')
  const location = document.createElement('p')
  const profile = document.createElement('p')
  const profileLink = document.createElement('a')
  const followers = document.createElement('p')
  const following = document.createElement('p')
  const bio = document.createElement('p')
  const hiddenInfo = document.createElement('div')
  const publicRepos = document.createElement('p')
  const publicProjects = document.createElement('p')
  const userCreate = document.createElement('p')
  const userUpdate = document.createElement('p')
  const ghChart = document.createElement('img')

  // Structure elements
  card.appendChild(img)
  card.appendChild(cardInfo)
  card.appendChild(expandBtn)
  cardInfo.appendChild(name)
  cardInfo.appendChild(handle)
  cardInfo.appendChild(location)
  cardInfo.appendChild(profile)
  cardInfo.appendChild(followers)
  cardInfo.appendChild(following)
  cardInfo.appendChild(bio)
  cardInfo.appendChild(hiddenInfo)
  hiddenInfo.appendChild(publicRepos)
  hiddenInfo.appendChild(publicProjects)
  hiddenInfo.appendChild(userCreate)
  hiddenInfo.appendChild(userUpdate)
  hiddenInfo.appendChild(ghChart)

  // Set attributes
  expandBtn.textContent = 'Expand'
  img.src = userData.avatar_url
  name.textContent = userData.name
  handle.textContent = userData.login
  location.textContent = `Location: ${userData.location}`
  profile.textContent = `Profile: `
  profileLink.textContent = userData.html_url
  profileLink.href = userData.html_url
  profile.appendChild(profileLink) // Need to append profileLink afterwards to not overwrite textContent
  followers.textContent = `Followers: ${userData.followers}`
  following.textContent = `Following: ${userData.following}`
  bio.textContent = `Bio: ${userData.bio}`
  publicRepos.textContent = `Public Repos: ${userData.public_repos}`
  publicProjects.textContent = `Public Projects: ${userData.public_gists}`
  userCreate.textContent = `Account created on ${userData.created_at}`
  userUpdate.textContent = `Account updated on ${userData.updated_at}`
  // Attribute below is from https://github.com/2016rshah/githubchart-api
  ghChart.src = `http://ghchart.rshah.org/${userData.login}`

  // Set classes
  card.classList.add('card')
  expandBtn.classList.add('expand-btn')
  cardInfo.classList.add('card-info')
  name.classList.add('name')
  handle.classList.add('username')
  hiddenInfo.classList.add('hidden-info')
  ghChart.classList.add('gh-chart')

  // Button events
  expandBtn.addEventListener('click', () => {
    card.classList.toggle('expand-card')
  })

  return card
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

// @@@@@@@@@@@@@@@@@@@@ Stretch Goals @@@@@@@@@@@@@@@@@@@@

// Instead of manually creating a list of followers, do it programmatically. Create a function that requests the followers data from the API after it has received your data and create a card for each of your followers. Hint: you can chain promises.

function userFollowers(userData) {
  // Get the api list of users following inputted user
  axios.get(`https://api.github.com/users/${userData.login}/followers`)
    .then(user=>{
      console.log('API data for followers succesfully retrieved', user)
      // We want to push all the followers logins into an array
      const userFollowersArray = []
      user.data.forEach(follower => {
        userFollowersArray.push(follower.login)
      })
      // Display cards for the followers
      userFollowersArray.forEach(user => {
        axios.get(`https://api.github.com/users/${user}`)
        .then(user=>{
          // Follower data retrieved
          console.log('API data succesfully retrieved', user)
          cards.appendChild(ghUser(user.data))
        })

        .catch(error =>{
          // Follower retrieval unsuccessful
          console.log('API currently down', error)
        })
      })
    })

    .catch(error =>{
      // Could not retrieve follower list
      console.log('API followers currently down', error)
    })
}

// Look into adding more info as an expanding card. You will need to create some new CSS and a button that expands and contracts the card.

// Look into adding your GitHub contribution graph. There are a number of different ways of doing this, this Stack Overflow discussion will get you started: https://stackoverflow.com/questions/34516592/embed-github-contributions-graph-in-website