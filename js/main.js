// Listen for form submit 
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function fetchBookmarks() { 
    // Fetch bookmarks from local storage. Parses string
    // into JSON format
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    // Get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    // Build output 
    bookmarksResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">'+
        '<h3>'+name+
        ' <a class="btn btn-primary" target="_blank" href="'+addhttp(url)+'">Visit</a> ' +
        ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
        '</h3>'+
        '</div>';
    }
}

// Save Bookmark
function saveBookmark(e){
    // Get form values 
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if (!validateForm(siteName, siteUrl)){
        return false;
    }

    var bookmark = { 
        name: siteName, 
        url: siteUrl
    }

    // Check if bookmarks exists in local storage
    if(localStorage.getItem('bookmarks') === null){
        // Initial array
        var bookmarks = [];
        // Add to bookmarks array
        bookmarks.push(bookmark)
        // Set to local storage 
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        
    } else { 
        // Get bookmarks array from local Storage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to bookmarks
        bookmarks.push(bookmark);
        // Set back into local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // Fetches bookmarks after adding new one. Essentially reloads 
    // the bookmarks
    fetchBookmarks();

    // Prevent form from submitting
    e.preventDefault();
}

// Delete bookmark 
function deleteBookmark(url){
    // Fetch bookmarks
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Iterate through and look for url passed in 
    for(var i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].url == url){
            // Remove from bookmarks
            bookmarks.splice(i,1);
        }
    }
    // Set back into local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Fetch bookmarks after deletion
    fetchBookmarks();
}

// Adds https:// to a URL
function addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "https://" + url;
    }
    return url;
}

// Form Validator
function validateForm(siteName, siteUrl){
    // Alerts if no name or url was entered
    if(!siteName || !siteUrl){
      alert('Please fill in the form');
      return false;
    }
  
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
  
    // Checks url to match expected format "https://www.google.com"
    if(!siteUrl.match(regex)){
      alert('Please use a valid URL');
      return false;
    }
    return true;
  }
